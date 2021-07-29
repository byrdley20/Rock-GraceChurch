import { Guid } from '../../Util/Guid';
import { RegistrantInfo, RegistrantsSameFamily, RegistrarInfo, RegistrationEntryBlockFormViewModel, RegistrationEntryBlockSuccessViewModel, RegistrationEntryBlockViewModel, RegistrationPersonFieldType } from './RegistrationEntry/RegistrationEntryBlockViewModel';
import { ProgressTrackerItem } from '../../Elements/ProgressTracker';
import Person from '../../ViewModels/PersonViewModel';
export declare enum Step {
    'intro' = "intro",
    'registrationStartForm' = "registrationStartForm",
    'perRegistrantForms' = "perRegistrantForms",
    'registrationEndForm' = "registrationEndForm",
    'reviewAndPayment' = "reviewAndPayment",
    'success' = "success"
}
export declare type RegistrantBasicInfo = {
    firstName: string;
    lastName: string;
    email: string;
    guid: Guid;
};
export declare type RegistrationEntryState = {
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
export declare function getForcedFamilyGuid(currentPerson: Person | null, viewModel: RegistrationEntryBlockViewModel): string | null;
export declare function getDefaultRegistrantInfo(currentPerson: Person | null, viewModel: RegistrationEntryBlockViewModel, familyGuid: Guid | null): RegistrantInfo;
export declare function getRegistrantBasicInfo(registrant: RegistrantInfo, registrantForms: RegistrationEntryBlockFormViewModel[]): RegistrantBasicInfo;
declare const _default: import("vue").DefineComponent<{}, {
    viewModel: null;
    notFound: import("vue").Ref<boolean>;
    steps?: undefined;
    registrationEntryState?: undefined;
    persistSession?: undefined;
} | {
    viewModel: RegistrationEntryBlockViewModel;
    steps: Record<Step, Step>;
    registrationEntryState: {
        steps: {
            intro: Step;
            registrationStartForm: Step;
            perRegistrantForms: Step;
            registrationEndForm: Step;
            reviewAndPayment: Step;
            success: Step;
        };
        viewModel: {
            timeoutMinutes: number | null;
            registrantsSameFamily: RegistrantsSameFamily;
            maxRegistrants: number;
            registrationAttributeTitleStart: string;
            registrationAttributeTitleEnd: string;
            instructionsHtml: string;
            registrantTerm: string;
            registrationTerm: string;
            pluralRegistrationTerm: string;
            pluralRegistrantTerm: string;
            pluralFeeTerm: string;
            registrantForms: {
                fields: {
                    fieldSource: import("./RegistrationEntry/RegistrationEntryBlockViewModel").RegistrationFieldSource;
                    personFieldType: RegistrationPersonFieldType;
                    isRequired: boolean;
                    isSharedValue: boolean;
                    attribute: {
                        id: number;
                        abbreviatedName: string | null;
                        allowSearch: boolean;
                        attributes: {
                            [x: string]: {
                                id: number;
                                attribute: any | null;
                                attributeId: number;
                                attributes: any | null;
                                entityId: number | null;
                                isSystem: boolean;
                                value: string | null;
                                valueAsNumeric: number | null;
                                createdDateTime: string | null;
                                modifiedDateTime: string | null;
                                createdByPersonAliasId: number | null;
                                modifiedByPersonAliasId: number | null;
                                guid: string;
                            };
                        } | null;
                        categoryGuids: string[];
                        defaultValue: string | null;
                        description: string | null;
                        enableHistory: boolean;
                        entityTypeId: number | null;
                        entityTypeQualifierColumn: string | null;
                        entityTypeQualifierValue: string | null;
                        fieldTypeGuid: string;
                        fieldTypeId: number;
                        iconCssClass: string | null;
                        isActive: boolean;
                        isAnalytic: boolean;
                        isAnalyticHistory: boolean;
                        isGridColumn: boolean;
                        isIndexEnabled: boolean;
                        isMultiValue: boolean;
                        isPublic: boolean;
                        isRequired: boolean;
                        isSystem: boolean;
                        key: string;
                        name: string | null;
                        order: number;
                        postHtml: string | null;
                        preHtml: string | null;
                        qualifierValues: {
                            [x: string]: unknown;
                        };
                        showOnBulk: boolean;
                        createdDateTime: string | null;
                        modifiedDateTime: string | null;
                        createdByPersonAliasId: number | null;
                        modifiedByPersonAliasId: number | null;
                        guid: string;
                    };
                    visibilityRuleType: import("./RegistrationEntry/RegistrationEntryBlockViewModel").FilterExpressionType;
                    visibilityRules: {
                        comparedToRegistrationTemplateFormFieldGuid: string;
                        comparisonType: import("./RegistrationEntry/RegistrationEntryBlockViewModel").ComparisonType;
                        comparedToValue: string;
                    }[];
                    preHtml: string;
                    postHtml: string;
                    showOnWaitList: boolean;
                    guid: string;
                }[];
            }[];
            fees: {
                name: string;
                guid: string;
                allowMultiple: boolean;
                isRequired: boolean;
                items: {
                    name: string;
                    guid: string;
                    cost: number;
                    countRemaining: number | null;
                }[];
                discountApplies: boolean;
            }[];
            familyMembers: {
                guid: string;
                familyGuid: string;
                fullName: string;
                fieldValues: {
                    [x: string]: unknown;
                };
            }[];
            registrationAttributesStart: {
                id: number;
                abbreviatedName: string | null;
                allowSearch: boolean;
                attributes: {
                    [x: string]: {
                        id: number;
                        attribute: any | null;
                        attributeId: number;
                        attributes: any | null;
                        entityId: number | null;
                        isSystem: boolean;
                        value: string | null;
                        valueAsNumeric: number | null;
                        createdDateTime: string | null;
                        modifiedDateTime: string | null;
                        createdByPersonAliasId: number | null;
                        modifiedByPersonAliasId: number | null;
                        guid: string;
                    };
                } | null;
                categoryGuids: string[];
                defaultValue: string | null;
                description: string | null;
                enableHistory: boolean;
                entityTypeId: number | null;
                entityTypeQualifierColumn: string | null;
                entityTypeQualifierValue: string | null;
                fieldTypeGuid: string;
                fieldTypeId: number;
                iconCssClass: string | null;
                isActive: boolean;
                isAnalytic: boolean;
                isAnalyticHistory: boolean;
                isGridColumn: boolean;
                isIndexEnabled: boolean;
                isMultiValue: boolean;
                isPublic: boolean;
                isRequired: boolean;
                isSystem: boolean;
                key: string;
                name: string | null;
                order: number;
                postHtml: string | null;
                preHtml: string | null;
                qualifierValues: {
                    [x: string]: unknown;
                };
                showOnBulk: boolean;
                createdDateTime: string | null;
                modifiedDateTime: string | null;
                createdByPersonAliasId: number | null;
                modifiedByPersonAliasId: number | null;
                guid: string;
            }[];
            registrationAttributesEnd: {
                id: number;
                abbreviatedName: string | null;
                allowSearch: boolean;
                attributes: {
                    [x: string]: {
                        id: number;
                        attribute: any | null;
                        attributeId: number;
                        attributes: any | null;
                        entityId: number | null;
                        isSystem: boolean;
                        value: string | null;
                        valueAsNumeric: number | null;
                        createdDateTime: string | null;
                        modifiedDateTime: string | null;
                        createdByPersonAliasId: number | null;
                        modifiedByPersonAliasId: number | null;
                        guid: string;
                    };
                } | null;
                categoryGuids: string[];
                defaultValue: string | null;
                description: string | null;
                enableHistory: boolean;
                entityTypeId: number | null;
                entityTypeQualifierColumn: string | null;
                entityTypeQualifierValue: string | null;
                fieldTypeGuid: string;
                fieldTypeId: number;
                iconCssClass: string | null;
                isActive: boolean;
                isAnalytic: boolean;
                isAnalyticHistory: boolean;
                isGridColumn: boolean;
                isIndexEnabled: boolean;
                isMultiValue: boolean;
                isPublic: boolean;
                isRequired: boolean;
                isSystem: boolean;
                key: string;
                name: string | null;
                order: number;
                postHtml: string | null;
                preHtml: string | null;
                qualifierValues: {
                    [x: string]: unknown;
                };
                showOnBulk: boolean;
                createdDateTime: string | null;
                modifiedDateTime: string | null;
                createdByPersonAliasId: number | null;
                modifiedByPersonAliasId: number | null;
                guid: string;
            }[];
            forceEmailUpdate: boolean;
            registrarOption: import("./RegistrationEntry/RegistrationEntryBlockViewModel").RegistrarOption;
            cost: number;
            gatewayControl: {
                FileUrl: string;
                Settings: {
                    [x: string]: unknown;
                };
            };
            isRedirectGateway: boolean;
            spotsRemaining: number | null;
            waitListEnabled: boolean;
            instanceName: string;
            amountDueToday: number | null;
            initialAmountToPay: number | null;
            session: {
                discountAmount: number;
                discountPercentage: number;
                previouslyPaid: number;
                registrationGuid: string | null;
                registrationSessionGuid: string | null;
                registrants: {
                    isOnWaitList: boolean;
                    familyGuid: string;
                    personGuid: string;
                    fieldValues: {
                        [x: string]: unknown;
                    };
                    feeItemQuantities: {
                        [x: string]: number;
                    };
                    ownFamilyGuid: string;
                    guid: string;
                }[];
                fieldValues: {
                    [x: string]: unknown;
                };
                registrar: {
                    nickName: string;
                    lastName: string;
                    email: string;
                    updateEmail: boolean;
                    familyGuid: string | null;
                    ownFamilyGuid: string;
                };
                gatewayToken: string;
                discountCode: string;
                amountToPayNow: number;
            } | null;
            isUnauthorized: boolean;
            hasDiscountsAvailable: boolean;
            redirectGatewayUrl: string;
            loginRequiredToRegister: boolean;
            successViewModel: {
                titleHtml: string;
                messageHtml: string;
                transactionCode: string;
                gatewayPersonIdentifier: string;
            } | null;
            allowRegistrationUpdates: boolean;
            startAtBeginning: boolean;
            gatewayGuid: string | null;
        };
        currentStep: string;
        firstStep: string;
        currentRegistrantIndex: number;
        currentRegistrantFormIndex: number;
        registrants: {
            isOnWaitList: boolean;
            familyGuid: string;
            personGuid: string;
            fieldValues: {
                [x: string]: unknown;
            };
            feeItemQuantities: {
                [x: string]: number;
            };
            ownFamilyGuid: string;
            guid: string;
        }[];
        registrationFieldValues: {
            [x: string]: unknown;
        };
        registrar: {
            nickName: string;
            lastName: string;
            email: string;
            updateEmail: boolean;
            familyGuid: string | null;
            ownFamilyGuid: string;
        };
        gatewayToken: string;
        discountCode: string;
        discountAmount: number;
        discountPercentage: number;
        successViewModel: {
            titleHtml: string;
            messageHtml: string;
            transactionCode: string;
            gatewayPersonIdentifier: string;
        } | null;
        amountToPayToday: number;
        sessionExpirationDate: ({
            toString: () => string;
            toDateString: () => string;
            toTimeString: () => string;
            toLocaleString: {
                (): string;
                (locales?: string | string[] | undefined, options?: Intl.DateTimeFormatOptions | undefined): string;
            };
            toLocaleDateString: {
                (): string;
                (locales?: string | string[] | undefined, options?: Intl.DateTimeFormatOptions | undefined): string;
            };
            toLocaleTimeString: {
                (): string;
                (locales?: string | string[] | undefined, options?: Intl.DateTimeFormatOptions | undefined): string;
            };
            valueOf: () => number;
            getTime: () => number;
            getFullYear: () => number;
            getUTCFullYear: () => number;
            getMonth: () => number;
            getUTCMonth: () => number;
            getDate: () => number;
            getUTCDate: () => number;
            getDay: () => number;
            getUTCDay: () => number;
            getHours: () => number;
            getUTCHours: () => number;
            getMinutes: () => number;
            getUTCMinutes: () => number;
            getSeconds: () => number;
            getUTCSeconds: () => number;
            getMilliseconds: () => number;
            getUTCMilliseconds: () => number;
            getTimezoneOffset: () => number;
            setTime: (time: number) => number;
            setMilliseconds: (ms: number) => number;
            setUTCMilliseconds: (ms: number) => number;
            setSeconds: (sec: number, ms?: number | undefined) => number;
            setUTCSeconds: (sec: number, ms?: number | undefined) => number;
            setMinutes: (min: number, sec?: number | undefined, ms?: number | undefined) => number;
            setUTCMinutes: (min: number, sec?: number | undefined, ms?: number | undefined) => number;
            setHours: (hours: number, min?: number | undefined, sec?: number | undefined, ms?: number | undefined) => number;
            setUTCHours: (hours: number, min?: number | undefined, sec?: number | undefined, ms?: number | undefined) => number;
            setDate: (date: number) => number;
            setUTCDate: (date: number) => number;
            setMonth: (month: number, date?: number | undefined) => number;
            setUTCMonth: (month: number, date?: number | undefined) => number;
            setFullYear: (year: number, month?: number | undefined, date?: number | undefined) => number;
            setUTCFullYear: (year: number, month?: number | undefined, date?: number | undefined) => number;
            toUTCString: () => string;
            toISOString: () => string;
            toJSON: (key?: any) => string;
            [Symbol.toPrimitive]: {
                (hint: "default"): string;
                (hint: "string"): string;
                (hint: "number"): number;
                (hint: string): string | number;
            };
        } & {
            [Symbol.toPrimitive]: {
                (hint: "default"): string;
                (hint: "string"): string;
                (hint: "number"): number;
                (hint: string): string | number;
            };
        }) | null;
        registrationSessionGuid: string;
    };
    notFound: import("vue").Ref<boolean>;
    persistSession: (force: boolean) => Promise<void>;
}, {
    secondsBeforeExpiration: number;
    hasSessionRenewalSuccess: boolean;
}, {
    currentPerson(): Person | null;
    isSessionExpired(): boolean;
    mustLogin(): boolean;
    isUnauthorized(): boolean;
    currentStep(): string;
    registrants(): RegistrantInfo[];
    hasPreAttributes(): boolean;
    hasPostAttributes(): boolean;
    progressTrackerIndex(): number;
    uppercaseRegistrantTerm(): string;
    currentRegistrantTitle(): string;
    stepTitleHtml(): string;
    progressTrackerItems(): ProgressTrackerItem[];
}, {
    onSessionRenewalSuccess(): void;
    onIntroNext(): Promise<void>;
    onRegistrationStartPrevious(): Promise<void>;
    onRegistrationStartNext(): Promise<void>;
    onRegistrantPrevious(): Promise<void>;
    onRegistrantNext(): Promise<void>;
    onRegistrationEndPrevious(): Promise<void>;
    onRegistrationEndNext(): Promise<void>;
    onSummaryPrevious(): Promise<void>;
    onSummaryNext(): Promise<void>;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, import("vue").EmitsOptions, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{} & {} & {}>, {}>;
export default _default;
