﻿// <copyright>
// Copyright by the Spark Development Network
//
// Licensed under the Rock Community License (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.rockrms.com/license
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
// </copyright>
//

import { defineComponent, inject, provide, reactive, ref } from 'vue';
import RockButton from '../../Elements/RockButton';
import { Guid, newGuid } from '../../Util/Guid';
import RegistrationEntryIntro from './RegistrationEntry/Intro';
import RegistrationEntryRegistrants from './RegistrationEntry/Registrants';
import { RegistrantInfo, RegistrantsSameFamily, RegistrarInfo, RegistrationEntryBlockFormFieldViewModel, RegistrationEntryBlockFormViewModel, RegistrationEntryBlockSuccessViewModel, RegistrationEntryBlockViewModel, RegistrationPersonFieldType } from './RegistrationEntry/RegistrationEntryBlockViewModel';
import RegistrationEntryRegistrationStart from './RegistrationEntry/RegistrationStart';
import RegistrationEntryRegistrationEnd from './RegistrationEntry/RegistrationEnd';
import RegistrationEntrySummary from './RegistrationEntry/Summary';
import Registrants from './RegistrationEntry/Registrants';
import ProgressTracker, { ProgressTrackerItem } from '../../Elements/ProgressTracker';
import NumberFilter, { toWord } from '@Obsidian/Services/Number';
import StringFilter, { isNullOrWhiteSpace, toTitleCase } from '@Obsidian/Services/String';
import Alert from '../../Elements/Alert';
import CountdownTimer from '../../Elements/CountdownTimer';
import RegistrationEntrySuccess from './RegistrationEntry/Success';
import Page from '../../Util/Page';
import { RegistrationEntryBlockArgs } from './RegistrationEntry/RegistrationEntryBlockArgs';
import { InvokeBlockActionFunc } from '../../Controls/RockBlock';
import JavaScriptAnchor from '../../Elements/JavaScriptAnchor';
import { Person } from '@Obsidian/ViewModels';
import SessionRenewal from './RegistrationEntry/SessionRenewal';
import { DropDownListOption } from 'Elements/DropDownList';

export enum Step
{
    'intro' = 'intro',
    'registrationStartForm' = 'registrationStartForm',
    'perRegistrantForms' = 'perRegistrantForms',
    'registrationEndForm' = 'registrationEndForm',
    'reviewAndPayment' = 'reviewAndPayment',
    'success' = 'success'
}

export type RegistrantBasicInfo = {
    firstName: string;
    lastName: string;
    email: string;
    guid: Guid;
};

export type RegistrationEntryState = {
    steps: Record<Step, Step>;
    viewModel: RegistrationEntryBlockViewModel;
    currentStep: string;
    firstStep: string;
    currentRegistrantIndex: number;
    currentRegistrantFormIndex: number;
    registrants: RegistrantInfo[];
    registrationFieldValues: Record<Guid, unknown>;
    registrar: RegistrarInfo;
    gatewayToken: string;
    discountCode: string;
    discountAmount: number;
    discountPercentage: number;
    successViewModel: RegistrationEntryBlockSuccessViewModel | null;
    amountToPayToday: number;
    sessionExpirationDate: Date | null;
    registrationSessionGuid: Guid;
};

/** If all registrants are to be in the same family, but there is no currently authenticated person,
 *  then this guid is used as a common family guid */
const unknownSingleFamilyGuid = newGuid();

/**
 * If there is a forced family guid because of RegistrantsSameFamily setting, then this returns that guid
 * @param currentPerson
 * @param viewModel
 */
export function getForcedFamilyGuid ( currentPerson: Person | null, viewModel: RegistrationEntryBlockViewModel ): string | null
{
    return ( currentPerson && viewModel.registrantsSameFamily === RegistrantsSameFamily.Yes ) ?
        ( currentPerson.primaryFamilyGuid || unknownSingleFamilyGuid ) :
        null;
}

/**
 * Get a default registrant object with the current family guid set.
 * @param currentPerson
 * @param viewModel
 * @param familyGuid
 */
export function getDefaultRegistrantInfo ( currentPerson: Person | null, viewModel: RegistrationEntryBlockViewModel, familyGuid: Guid | null ): RegistrantInfo
{
    const forcedFamilyGuid = getForcedFamilyGuid( currentPerson, viewModel );
    const ownFamilyGuid = newGuid();

    if ( forcedFamilyGuid )
    {
        familyGuid = forcedFamilyGuid;
    }

    // If the family is not specified, then assume the person is in their own family
    if ( !familyGuid )
    {
        familyGuid = ownFamilyGuid;
    }

    return {
        isOnWaitList: false,
        familyGuid: familyGuid,
        fieldValues: {},
        feeItemQuantities: {},
        guid: newGuid(),
        personGuid: '',
        ownFamilyGuid: ownFamilyGuid
    } as RegistrantInfo;
}

export function getRegistrantBasicInfo ( registrant: RegistrantInfo, registrantForms: RegistrationEntryBlockFormViewModel[] ): RegistrantBasicInfo
{
    const fields = registrantForms?.reduce((acc, f) => acc.concat(f.fields), [] as RegistrationEntryBlockFormFieldViewModel[]) || [];

    const firstNameGuid = fields.find( f => f.personFieldType === RegistrationPersonFieldType.FirstName )?.guid || '';
    const lastNameGuid = fields.find( f => f.personFieldType === RegistrationPersonFieldType.LastName )?.guid || '';
    const emailGuid = fields.find( f => f.personFieldType === RegistrationPersonFieldType.Email )?.guid || '';

    return {
        firstName: ( registrant?.fieldValues[ firstNameGuid ] || '' ) as string,
        lastName: ( registrant?.fieldValues[ lastNameGuid ] || '' ) as string,
        email: ( registrant?.fieldValues[ emailGuid ] || '' ) as string,
        guid: registrant?.guid
    };
}

export default defineComponent( {
    name: 'Event.RegistrationEntry',
    components: {
        RockButton,
        Registrants,
        RegistrationEntryIntro,
        RegistrationEntryRegistrants,
        RegistrationEntryRegistrationStart,
        RegistrationEntryRegistrationEnd,
        RegistrationEntrySummary,
        RegistrationEntrySuccess,
        ProgressTracker,
        Alert,
        CountdownTimer,
        JavaScriptAnchor,
        SessionRenewal
    },
    setup ()
    {
        const steps: Record<Step, Step> = {
            [ Step.intro ]: Step.intro,
            [ Step.registrationStartForm ]: Step.registrationStartForm,
            [ Step.perRegistrantForms ]: Step.perRegistrantForms,
            [ Step.registrationEndForm ]: Step.registrationEndForm,
            [ Step.reviewAndPayment ]: Step.reviewAndPayment,
            [ Step.success ]: Step.success
        };

        const notFound = ref( false );
        const viewModel = inject( 'configurationValues' ) as RegistrationEntryBlockViewModel | null;
        const invokeBlockAction = inject( 'invokeBlockAction' ) as InvokeBlockActionFunc;

        if (viewModel === null) {
            notFound.value = true;

            return {
                viewModel,
                notFound
            };
        }

        if (!viewModel.registrationAttributesStart)
        {
            notFound.value = true;
        }

        const hasPreAttributes = viewModel.registrationAttributesStart?.length > 0;
        let currentStep = steps.intro;

        if ( viewModel.successViewModel )
        {
            // This is after having paid via redirect gateway
            currentStep = steps.success;
        }
        else if ( viewModel.session && !viewModel.startAtBeginning )
        {
            // This is an existing registration, start at the summary
            currentStep = steps.reviewAndPayment;
        }
        else if ( viewModel.maxRegistrants === 1 && isNullOrWhiteSpace( viewModel.instructionsHtml ) )
        {
            // There is no need to show the number of registrants selector or instructions. Start at the second page.
            currentStep = hasPreAttributes ? steps.registrationStartForm : steps.perRegistrantForms;
        }

        const registrationEntryState = reactive( {
            steps: steps,
            viewModel: viewModel,
            firstStep: currentStep,
            currentStep: currentStep,
            currentRegistrantFormIndex: 0,
            currentRegistrantIndex: 0,
            registrants: viewModel.session?.registrants || [ getDefaultRegistrantInfo( null, viewModel, null ) ],
            registrationFieldValues: viewModel.session?.fieldValues || {},
            registrar: viewModel.session?.registrar || {
                nickName: '',
                lastName: '',
                email: '',
                updateEmail: true,
                ownFamilyGuid: newGuid(),
                familyGuid: null
            },
            gatewayToken: '',
            discountCode: viewModel.session?.discountCode || '',
            discountAmount: viewModel.session?.discountAmount || 0,
            discountPercentage: viewModel.session?.discountPercentage || 0,
            successViewModel: viewModel.successViewModel,
            amountToPayToday: 0,
            sessionExpirationDate: null,
            registrationSessionGuid: viewModel.session?.registrationSessionGuid || newGuid()
        } as RegistrationEntryState );

        provide( 'registrationEntryState', registrationEntryState );

        /** A method to get the args needed for persisting the session */
        const getRegistrationEntryBlockArgs: () => RegistrationEntryBlockArgs = () =>
        {
            return {
                registrationSessionGuid: registrationEntryState.registrationSessionGuid,
                gatewayToken: registrationEntryState.gatewayToken,
                discountCode: registrationEntryState.discountCode,
                fieldValues: registrationEntryState.registrationFieldValues,
                registrar: registrationEntryState.registrar,
                registrants: registrationEntryState.registrants,
                amountToPayNow: registrationEntryState.amountToPayToday,
                registrationGuid: viewModel.session?.registrationGuid || null
            };
        };

        provide( 'getRegistrationEntryBlockArgs', getRegistrationEntryBlockArgs );

        /** A method to persist the session */
        const persistSession: ( force: boolean ) => Promise<void> = async ( force = false ) =>
        {
            if ( !force && !viewModel.timeoutMinutes )
            {
                return;
            }

            const response = await invokeBlockAction<{ expirationDateTime: string }>( 'PersistSession', {
                args: getRegistrationEntryBlockArgs()
            });

            if ( response.data )
            {
                const asDate = new Date( response.data.expirationDateTime );
                registrationEntryState.sessionExpirationDate = asDate;
            }
        };

        provide( 'persistSession', persistSession );

        /** Expose these members and make them available within the rest of the component */
        return {
            viewModel,
            steps,
            registrationEntryState,
            notFound,
            persistSession
        };
    },
    data ()
    {
        return {
            secondsBeforeExpiration: -1,
            hasSessionRenewalSuccess: false
        };
    },
    computed: {
        /** The person currently authenticated */
        currentPerson (): Person | null
        {
            return this.$store.state.currentPerson;
        },

        /** Is the session expired? */
        isSessionExpired (): boolean
        {
            return this.secondsBeforeExpiration === 0 && this.currentStep !== Step.success;
        },

        mustLogin (): boolean
        {
            return !this.$store.state.currentPerson && this.viewModel != null && ( this.viewModel.isUnauthorized || this.viewModel.loginRequiredToRegister );
        },
        isUnauthorized (): boolean
        {
            return this.viewModel?.isUnauthorized ?? false;
        },
        currentStep (): string
        {
            return this.registrationEntryState?.currentStep ?? "";
        },
        registrants (): RegistrantInfo[]
        {
            return this.registrationEntryState?.registrants ?? [];
        },
        hasPreAttributes (): boolean
        {
            return (this.viewModel?.registrationAttributesStart?.length ?? 0) > 0;
        },
        hasPostAttributes (): boolean
        {
            return (this.viewModel?.registrationAttributesEnd?.length ?? 0) > 0;
        },
        progressTrackerIndex (): number
        {
            if ( this.currentStep === Step.intro || this.registrationEntryState == null)
            {
                return 0;
            }

            const stepsBeforePre = this.registrationEntryState?.firstStep === Step.intro ? 1 : 0;

            if ( this.currentStep === Step.registrationStartForm )
            {
                return stepsBeforePre;
            }

            const stepsBeforeRegistrants = stepsBeforePre + ( this.hasPreAttributes ? 1 : 0 );

            if ( this.currentStep === Step.perRegistrantForms )
            {
                return this.registrationEntryState.currentRegistrantIndex + stepsBeforeRegistrants;
            }

            const stepsToCompleteRegistrants = this.registrationEntryState.registrants.length + stepsBeforeRegistrants;

            if ( this.currentStep === Step.registrationEndForm )
            {
                return stepsToCompleteRegistrants;
            }

            if ( this.currentStep === Step.reviewAndPayment )
            {
                return stepsToCompleteRegistrants + ( this.hasPostAttributes ? 1 : 0 );
            }

            return 0;
        },
        uppercaseRegistrantTerm (): string
        {
            return StringFilter.toTitleCase( this.viewModel?.registrantTerm ?? "" );
        },
        currentRegistrantTitle (): string
        {
            if (this.registrationEntryState == null) {
                return "";
            }

            const ordinal = NumberFilter.toOrdinal( this.registrationEntryState.currentRegistrantIndex + 1 );
            let title = StringFilter.toTitleCase(
                this.registrants.length <= 1 ?
                    this.uppercaseRegistrantTerm :
                    ordinal + ' ' + this.uppercaseRegistrantTerm );

            if ( this.registrationEntryState.currentRegistrantFormIndex > 0 )
            {
                title += ' (cont)';
            }

            return title;
        },
        stepTitleHtml (): string
        {
            if ( this.currentStep === Step.registrationStartForm )
            {
                return this.viewModel?.registrationAttributeTitleStart ?? "";
            }

            if ( this.currentStep === Step.perRegistrantForms )
            {
                return this.currentRegistrantTitle;
            }

            if ( this.currentStep === Step.registrationEndForm )
            {
                return this.viewModel?.registrationAttributeTitleEnd ?? "";
            }

            if ( this.currentStep === Step.reviewAndPayment )
            {
                return 'Review Registration';
            }

            if ( this.currentStep === Step.success )
            {
                return this.registrationEntryState?.successViewModel?.titleHtml || 'Congratulations';
            }

            return '';
        },

        /** The items to display in the progress tracker */
        progressTrackerItems (): ProgressTrackerItem[]
        {
            const items: ProgressTrackerItem[] = [];

            if (this.registrationEntryState == null) {
                return items;
            }

            if ( this.registrationEntryState.firstStep === Step.intro )
            {
                items.push( {
                    key: 'Start',
                    title: 'Start',
                    subtitle: this.viewModel.registrationTerm
                } );
            }

            if ( this.hasPreAttributes )
            {
                items.push( {
                    key: 'Pre',
                    title: this.viewModel.registrationAttributeTitleStart,
                    subtitle: this.viewModel.registrationTerm
                } );
            }

            if ( !this.registrationEntryState.registrants.length )
            {
                items.push( {
                    key: 'Registrant',
                    title: toTitleCase( this.viewModel.registrantTerm ),
                    subtitle: this.viewModel.registrationTerm
                } );
            }

            for ( let i = 0; i < this.registrationEntryState.registrants.length; i++ )
            {
                const registrant = this.registrationEntryState.registrants[ i ];
                const info = getRegistrantBasicInfo( registrant, this.viewModel.registrantForms );

                if ( info?.firstName && info?.lastName )
                {
                    items.push( {
                        key: `Registrant-${registrant.guid}`,
                        title: info.firstName,
                        subtitle: info.lastName
                    } );
                }
                else
                {
                    items.push( {
                        key: `Registrant-${registrant.guid}`,
                        title: toTitleCase( this.viewModel.registrantTerm ),
                        subtitle: toTitleCase( toWord( i + 1 ) )
                    } );
                }
            }

            if ( this.hasPostAttributes )
            {
                items.push( {
                    key: 'Post',
                    title: this.viewModel.registrationAttributeTitleEnd,
                    subtitle: this.viewModel.registrationTerm
                } );
            }

            items.push( {
                key: 'Finalize',
                title: 'Finalize',
                subtitle: this.viewModel.registrationTerm
            } );

            return items;
        }
    },
    methods: {
        /** The user requested an extension in time and it was granted */
        onSessionRenewalSuccess(): void {
            this.hasSessionRenewalSuccess = true;
            setTimeout(() => this.hasSessionRenewalSuccess = false, 5000);
        },

        async onIntroNext(): Promise<void> {
            if (this.persistSession && this.registrationEntryState) {
                await this.persistSession(false);
                this.registrationEntryState.currentStep = this.hasPreAttributes ? Step.registrationStartForm : Step.perRegistrantForms;
                Page.smoothScrollToTop();
            }
        },
        async onRegistrationStartPrevious(): Promise<void> {
            if (this.persistSession && this.registrationEntryState) {
                await this.persistSession(false);
                this.registrationEntryState.currentStep = Step.intro;
                Page.smoothScrollToTop();
            }
        },
        async onRegistrationStartNext(): Promise<void> {
            if (this.persistSession && this.registrationEntryState) {
                await this.persistSession(false);
                this.registrationEntryState.currentStep = Step.perRegistrantForms;
                Page.smoothScrollToTop();
            }
        },
        async onRegistrantPrevious(): Promise<void> {
            if (this.persistSession && this.registrationEntryState) {
                await this.persistSession(false);
                this.registrationEntryState.currentStep = this.hasPreAttributes ? Step.registrationStartForm : Step.intro;
                Page.smoothScrollToTop();
            }
        },
        async onRegistrantNext(): Promise<void> {
            if (this.persistSession && this.registrationEntryState) {
                await this.persistSession(false);
                this.registrationEntryState.currentStep = this.hasPostAttributes ? Step.registrationEndForm : Step.reviewAndPayment;
                Page.smoothScrollToTop();
            }
        },
        async onRegistrationEndPrevious(): Promise<void> {
            if (this.persistSession && this.registrationEntryState) {
                await this.persistSession(false);
                this.registrationEntryState.currentStep = Step.perRegistrantForms;
                Page.smoothScrollToTop();
            }
        },
        async onRegistrationEndNext(): Promise<void> {
            if (this.persistSession && this.registrationEntryState) {
                await this.persistSession(false);
                this.registrationEntryState.currentStep = Step.reviewAndPayment;
                Page.smoothScrollToTop();
            }
        },
        async onSummaryPrevious(): Promise<void> {
            if (this.persistSession && this.registrationEntryState) {
                await this.persistSession(false);
                this.registrationEntryState.currentStep = this.hasPostAttributes ? Step.registrationEndForm : Step.perRegistrantForms;
                Page.smoothScrollToTop();
            }
        },
        async onSummaryNext(): Promise<void> {
            if (this.persistSession && this.registrationEntryState) {
                this.registrationEntryState.currentStep = Step.success;
                Page.smoothScrollToTop();
            }
        }
    },
    watch: {
        currentPerson: {
            immediate: true,
            handler ()
            {
                if (this.viewModel != null && this.registrationEntryState != null) {
                    const forcedFamilyGuid = getForcedFamilyGuid(this.currentPerson, this.viewModel);

                    if (forcedFamilyGuid) {
                        for (const registrant of this.registrationEntryState.registrants) {
                            registrant.familyGuid = forcedFamilyGuid;
                        }
                    }
                }
            }
        },
        'registrationEntryState.sessionExpirationDate': {
            immediate: true,
            handler ()
            {
                if ( !this.registrationEntryState?.sessionExpirationDate )
                {
                    this.secondsBeforeExpiration = -1;
                    return;
                }

                const nowMs = new Date().getTime();
                const thenMs = this.registrationEntryState.sessionExpirationDate.getTime();
                const diffMs = thenMs - nowMs;
                this.secondsBeforeExpiration = diffMs / 1000;
            }
        }
    },
    mounted ()
    {
        if ( this.viewModel?.loginRequiredToRegister && !this.$store.state.currentPerson )
        {
            this.$store.dispatch( 'redirectToLogin' );
        }
    },
    template: `
<div>
    <Alert v-if="notFound" alertType="warning">
        <strong>Sorry</strong>
        <p>The selected registration could not be found or is no longer active.</p>
    </Alert>
    <Alert v-else-if="mustLogin" alertType="warning">
        <strong>Please log in</strong>
        <p>You must be logged in to access this registration.</p>
    </Alert>
    <Alert v-else-if="isUnauthorized" alertType="warning">
        <strong>Sorry</strong>
        <p>You are not allowed to view or edit the selected registration since you are not the one who created the registration.</p>
    </Alert>
    <template v-else>
        <h1 v-if="currentStep !== steps.intro" v-html="stepTitleHtml"></h1>
        <ProgressTracker v-if="currentStep !== steps.success" :items="progressTrackerItems" :currentIndex="progressTrackerIndex">
            <template #aside>
                <div v-if="secondsBeforeExpiration >= 0" v-show="secondsBeforeExpiration <= (30 * 60)" class="remaining-time flex-grow-1 flex-md-grow-0">
                    <Alert v-if="hasSessionRenewalSuccess" alertType="success" class="m-0 pt-3" style="position: absolute; top: 0; left: 0; right: 0; bottom: 0;">
                        <h4>Success</h4>
                    </Alert>
                    <span class="remaining-time-title">Time left before timeout</span>
                    <p class="remaining-time-countdown">
                        <CountdownTimer v-model="secondsBeforeExpiration" />
                    </p>
                </div>
            </template>
        </ProgressTracker>
        <RegistrationEntryIntro v-if="currentStep === steps.intro" @next="onIntroNext" />
        <RegistrationEntryRegistrationStart v-else-if="currentStep === steps.registrationStartForm" @next="onRegistrationStartNext" @previous="onRegistrationStartPrevious" />
        <RegistrationEntryRegistrants v-else-if="currentStep === steps.perRegistrantForms" @next="onRegistrantNext" @previous="onRegistrantPrevious" />
        <RegistrationEntryRegistrationEnd v-else-if="currentStep === steps.registrationEndForm" @next="onRegistrationEndNext" @previous="onRegistrationEndPrevious" />
        <RegistrationEntrySummary v-else-if="currentStep === steps.reviewAndPayment" @next="onSummaryNext" @previous="onSummaryPrevious" />
        <RegistrationEntrySuccess v-else-if="currentStep === steps.success" />
        <Alert v-else alertType="danger">Invalid State: '{{currentStep}}'</Alert>
    </template>
    <SessionRenewal :isSessionExpired="isSessionExpired" @success="onSessionRenewalSuccess" />
</div>`
} );
