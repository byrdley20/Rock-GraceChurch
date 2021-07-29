System.register(["vue", "../../Elements/RockButton", "../../Util/Guid", "./RegistrationEntry/Intro", "./RegistrationEntry/Registrants", "./RegistrationEntry/RegistrationEntryBlockViewModel", "./RegistrationEntry/RegistrationStart", "./RegistrationEntry/RegistrationEnd", "./RegistrationEntry/Summary", "../../Elements/ProgressTracker", "../../Services/Number", "../../Services/String", "../../Elements/Alert", "../../Elements/CountdownTimer", "./RegistrationEntry/Success", "../../Util/Page", "../../Elements/JavaScriptAnchor", "./RegistrationEntry/SessionRenewal"], function (exports_1, context_1) {
    "use strict";
    var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var vue_1, RockButton_1, Guid_1, Intro_1, Registrants_1, RegistrationEntryBlockViewModel_1, RegistrationStart_1, RegistrationEnd_1, Summary_1, Registrants_2, ProgressTracker_1, Number_1, String_1, Alert_1, CountdownTimer_1, Success_1, Page_1, JavaScriptAnchor_1, SessionRenewal_1, Step, unknownSingleFamilyGuid;
    var __moduleName = context_1 && context_1.id;
    function getForcedFamilyGuid(currentPerson, viewModel) {
        return (currentPerson && viewModel.registrantsSameFamily === RegistrationEntryBlockViewModel_1.RegistrantsSameFamily.Yes) ?
            (currentPerson.primaryFamilyGuid || unknownSingleFamilyGuid) :
            null;
    }
    exports_1("getForcedFamilyGuid", getForcedFamilyGuid);
    function getDefaultRegistrantInfo(currentPerson, viewModel, familyGuid) {
        const forcedFamilyGuid = getForcedFamilyGuid(currentPerson, viewModel);
        const ownFamilyGuid = Guid_1.newGuid();
        if (forcedFamilyGuid) {
            familyGuid = forcedFamilyGuid;
        }
        if (!familyGuid) {
            familyGuid = ownFamilyGuid;
        }
        return {
            isOnWaitList: false,
            familyGuid: familyGuid,
            fieldValues: {},
            feeItemQuantities: {},
            guid: Guid_1.newGuid(),
            personGuid: '',
            ownFamilyGuid: ownFamilyGuid
        };
    }
    exports_1("getDefaultRegistrantInfo", getDefaultRegistrantInfo);
    function getRegistrantBasicInfo(registrant, registrantForms) {
        var _a, _b, _c;
        const fields = (registrantForms === null || registrantForms === void 0 ? void 0 : registrantForms.reduce((acc, f) => acc.concat(f.fields), [])) || [];
        const firstNameGuid = ((_a = fields.find(f => f.personFieldType === RegistrationEntryBlockViewModel_1.RegistrationPersonFieldType.FirstName)) === null || _a === void 0 ? void 0 : _a.guid) || '';
        const lastNameGuid = ((_b = fields.find(f => f.personFieldType === RegistrationEntryBlockViewModel_1.RegistrationPersonFieldType.LastName)) === null || _b === void 0 ? void 0 : _b.guid) || '';
        const emailGuid = ((_c = fields.find(f => f.personFieldType === RegistrationEntryBlockViewModel_1.RegistrationPersonFieldType.Email)) === null || _c === void 0 ? void 0 : _c.guid) || '';
        return {
            firstName: ((registrant === null || registrant === void 0 ? void 0 : registrant.fieldValues[firstNameGuid]) || ''),
            lastName: ((registrant === null || registrant === void 0 ? void 0 : registrant.fieldValues[lastNameGuid]) || ''),
            email: ((registrant === null || registrant === void 0 ? void 0 : registrant.fieldValues[emailGuid]) || ''),
            guid: registrant === null || registrant === void 0 ? void 0 : registrant.guid
        };
    }
    exports_1("getRegistrantBasicInfo", getRegistrantBasicInfo);
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (RockButton_1_1) {
                RockButton_1 = RockButton_1_1;
            },
            function (Guid_1_1) {
                Guid_1 = Guid_1_1;
            },
            function (Intro_1_1) {
                Intro_1 = Intro_1_1;
            },
            function (Registrants_1_1) {
                Registrants_1 = Registrants_1_1;
                Registrants_2 = Registrants_1_1;
            },
            function (RegistrationEntryBlockViewModel_1_1) {
                RegistrationEntryBlockViewModel_1 = RegistrationEntryBlockViewModel_1_1;
            },
            function (RegistrationStart_1_1) {
                RegistrationStart_1 = RegistrationStart_1_1;
            },
            function (RegistrationEnd_1_1) {
                RegistrationEnd_1 = RegistrationEnd_1_1;
            },
            function (Summary_1_1) {
                Summary_1 = Summary_1_1;
            },
            function (ProgressTracker_1_1) {
                ProgressTracker_1 = ProgressTracker_1_1;
            },
            function (Number_1_1) {
                Number_1 = Number_1_1;
            },
            function (String_1_1) {
                String_1 = String_1_1;
            },
            function (Alert_1_1) {
                Alert_1 = Alert_1_1;
            },
            function (CountdownTimer_1_1) {
                CountdownTimer_1 = CountdownTimer_1_1;
            },
            function (Success_1_1) {
                Success_1 = Success_1_1;
            },
            function (Page_1_1) {
                Page_1 = Page_1_1;
            },
            function (JavaScriptAnchor_1_1) {
                JavaScriptAnchor_1 = JavaScriptAnchor_1_1;
            },
            function (SessionRenewal_1_1) {
                SessionRenewal_1 = SessionRenewal_1_1;
            }
        ],
        execute: function () {
            (function (Step) {
                Step["intro"] = "intro";
                Step["registrationStartForm"] = "registrationStartForm";
                Step["perRegistrantForms"] = "perRegistrantForms";
                Step["registrationEndForm"] = "registrationEndForm";
                Step["reviewAndPayment"] = "reviewAndPayment";
                Step["success"] = "success";
            })(Step || (Step = {}));
            exports_1("Step", Step);
            unknownSingleFamilyGuid = Guid_1.newGuid();
            exports_1("default", vue_1.defineComponent({
                name: 'Event.RegistrationEntry',
                components: {
                    RockButton: RockButton_1.default,
                    Registrants: Registrants_2.default,
                    RegistrationEntryIntro: Intro_1.default,
                    RegistrationEntryRegistrants: Registrants_1.default,
                    RegistrationEntryRegistrationStart: RegistrationStart_1.default,
                    RegistrationEntryRegistrationEnd: RegistrationEnd_1.default,
                    RegistrationEntrySummary: Summary_1.default,
                    RegistrationEntrySuccess: Success_1.default,
                    ProgressTracker: ProgressTracker_1.default,
                    Alert: Alert_1.default,
                    CountdownTimer: CountdownTimer_1.default,
                    JavaScriptAnchor: JavaScriptAnchor_1.default,
                    SessionRenewal: SessionRenewal_1.default
                },
                setup() {
                    var _a, _b, _c, _d, _e, _f, _g, _h;
                    const steps = {
                        [Step.intro]: Step.intro,
                        [Step.registrationStartForm]: Step.registrationStartForm,
                        [Step.perRegistrantForms]: Step.perRegistrantForms,
                        [Step.registrationEndForm]: Step.registrationEndForm,
                        [Step.reviewAndPayment]: Step.reviewAndPayment,
                        [Step.success]: Step.success
                    };
                    const notFound = vue_1.ref(false);
                    const viewModel = vue_1.inject('configurationValues');
                    const invokeBlockAction = vue_1.inject('invokeBlockAction');
                    if (!(viewModel === null || viewModel === void 0 ? void 0 : viewModel.registrationAttributesStart)) {
                        notFound.value = true;
                    }
                    const hasPreAttributes = ((_a = viewModel.registrationAttributesStart) === null || _a === void 0 ? void 0 : _a.length) > 0;
                    let currentStep = steps.intro;
                    if (viewModel.successViewModel) {
                        currentStep = steps.success;
                    }
                    else if (viewModel.session && !viewModel.startAtBeginning) {
                        currentStep = steps.reviewAndPayment;
                    }
                    else if (viewModel.maxRegistrants === 1 && String_1.isNullOrWhitespace(viewModel.instructionsHtml)) {
                        currentStep = hasPreAttributes ? steps.registrationStartForm : steps.perRegistrantForms;
                    }
                    const registrationEntryState = vue_1.reactive({
                        steps: steps,
                        viewModel: viewModel,
                        firstStep: currentStep,
                        currentStep: currentStep,
                        currentRegistrantFormIndex: 0,
                        currentRegistrantIndex: 0,
                        registrants: ((_b = viewModel.session) === null || _b === void 0 ? void 0 : _b.registrants) || [getDefaultRegistrantInfo(null, viewModel, null)],
                        registrationFieldValues: ((_c = viewModel.session) === null || _c === void 0 ? void 0 : _c.fieldValues) || {},
                        registrar: ((_d = viewModel.session) === null || _d === void 0 ? void 0 : _d.registrar) || {
                            nickName: '',
                            lastName: '',
                            email: '',
                            updateEmail: true,
                            ownFamilyGuid: Guid_1.newGuid(),
                            familyGuid: null
                        },
                        gatewayToken: '',
                        discountCode: ((_e = viewModel.session) === null || _e === void 0 ? void 0 : _e.discountCode) || '',
                        discountAmount: ((_f = viewModel.session) === null || _f === void 0 ? void 0 : _f.discountAmount) || 0,
                        discountPercentage: ((_g = viewModel.session) === null || _g === void 0 ? void 0 : _g.discountPercentage) || 0,
                        successViewModel: viewModel.successViewModel,
                        amountToPayToday: 0,
                        sessionExpirationDate: null,
                        registrationSessionGuid: ((_h = viewModel.session) === null || _h === void 0 ? void 0 : _h.registrationSessionGuid) || Guid_1.newGuid()
                    });
                    vue_1.provide('registrationEntryState', registrationEntryState);
                    const getRegistrationEntryBlockArgs = () => {
                        var _a;
                        return {
                            registrationSessionGuid: registrationEntryState.registrationSessionGuid,
                            gatewayToken: registrationEntryState.gatewayToken,
                            discountCode: registrationEntryState.discountCode,
                            fieldValues: registrationEntryState.registrationFieldValues,
                            registrar: registrationEntryState.registrar,
                            registrants: registrationEntryState.registrants,
                            amountToPayNow: registrationEntryState.amountToPayToday,
                            registrationGuid: ((_a = viewModel.session) === null || _a === void 0 ? void 0 : _a.registrationGuid) || null
                        };
                    };
                    vue_1.provide('getRegistrationEntryBlockArgs', getRegistrationEntryBlockArgs);
                    const persistSession = (force = false) => __awaiter(this, void 0, void 0, function* () {
                        if (!force && !viewModel.timeoutMinutes) {
                            return;
                        }
                        const response = yield invokeBlockAction('PersistSession', {
                            args: getRegistrationEntryBlockArgs()
                        });
                        if (response.data) {
                            const asDate = new Date(response.data.expirationDateTime);
                            registrationEntryState.sessionExpirationDate = asDate;
                        }
                    });
                    vue_1.provide('persistSession', persistSession);
                    return {
                        viewModel,
                        steps,
                        registrationEntryState,
                        notFound,
                        persistSession
                    };
                },
                data() {
                    return {
                        secondsBeforeExpiration: -1,
                        hasSessionRenewalSuccess: false
                    };
                },
                computed: {
                    currentPerson() {
                        return this.$store.state.currentPerson;
                    },
                    isSessionExpired() {
                        return this.secondsBeforeExpiration === 0 && this.currentStep !== this.steps.success;
                    },
                    viewModel() {
                        return this.registrationEntryState.viewModel;
                    },
                    mustLogin() {
                        return !this.$store.state.currentPerson && (this.viewModel.isUnauthorized || this.viewModel.loginRequiredToRegister);
                    },
                    isUnauthorized() {
                        return this.viewModel.isUnauthorized;
                    },
                    currentStep() {
                        return this.registrationEntryState.currentStep;
                    },
                    registrants() {
                        return this.registrationEntryState.registrants;
                    },
                    hasPreAttributes() {
                        return this.viewModel.registrationAttributesStart.length > 0;
                    },
                    hasPostAttributes() {
                        return this.viewModel.registrationAttributesEnd.length > 0;
                    },
                    progressTrackerIndex() {
                        if (this.currentStep === this.steps.intro) {
                            return 0;
                        }
                        const stepsBeforePre = this.registrationEntryState.firstStep === this.steps.intro ? 1 : 0;
                        if (this.currentStep === this.steps.registrationStartForm) {
                            return stepsBeforePre;
                        }
                        const stepsBeforeRegistrants = stepsBeforePre + (this.hasPreAttributes ? 1 : 0);
                        if (this.currentStep === this.steps.perRegistrantForms) {
                            return this.registrationEntryState.currentRegistrantIndex + stepsBeforeRegistrants;
                        }
                        const stepsToCompleteRegistrants = this.registrationEntryState.registrants.length + stepsBeforeRegistrants;
                        if (this.currentStep === this.steps.registrationEndForm) {
                            return stepsToCompleteRegistrants;
                        }
                        if (this.currentStep === this.steps.reviewAndPayment) {
                            return stepsToCompleteRegistrants + (this.hasPostAttributes ? 1 : 0);
                        }
                        return 0;
                    },
                    uppercaseRegistrantTerm() {
                        return String_1.default.toTitleCase(this.viewModel.registrantTerm);
                    },
                    currentRegistrantTitle() {
                        const ordinal = Number_1.default.toOrdinal(this.registrationEntryState.currentRegistrantIndex + 1);
                        let title = String_1.default.toTitleCase(this.registrants.length <= 1 ?
                            this.uppercaseRegistrantTerm :
                            ordinal + ' ' + this.uppercaseRegistrantTerm);
                        if (this.registrationEntryState.currentRegistrantFormIndex > 0) {
                            title += ' (cont)';
                        }
                        return title;
                    },
                    stepTitleHtml() {
                        var _a;
                        if (this.currentStep === this.steps.registrationStartForm) {
                            return this.viewModel.registrationAttributeTitleStart;
                        }
                        if (this.currentStep === this.steps.perRegistrantForms) {
                            return this.currentRegistrantTitle;
                        }
                        if (this.currentStep === this.steps.registrationEndForm) {
                            return this.viewModel.registrationAttributeTitleEnd;
                        }
                        if (this.currentStep === this.steps.reviewAndPayment) {
                            return 'Review Registration';
                        }
                        if (this.currentStep === this.steps.success) {
                            return ((_a = this.registrationEntryState.successViewModel) === null || _a === void 0 ? void 0 : _a.titleHtml) || 'Congratulations';
                        }
                        return '';
                    },
                    progressTrackerItems() {
                        const items = [];
                        if (this.registrationEntryState.firstStep === this.steps.intro) {
                            items.push({
                                key: 'Start',
                                title: 'Start',
                                subtitle: this.viewModel.registrationTerm
                            });
                        }
                        if (this.hasPreAttributes) {
                            items.push({
                                key: 'Pre',
                                title: this.viewModel.registrationAttributeTitleStart,
                                subtitle: this.viewModel.registrationTerm
                            });
                        }
                        if (!this.registrationEntryState.registrants.length) {
                            items.push({
                                key: 'Registrant',
                                title: String_1.toTitleCase(this.viewModel.registrantTerm),
                                subtitle: this.viewModel.registrationTerm
                            });
                        }
                        for (let i = 0; i < this.registrationEntryState.registrants.length; i++) {
                            const registrant = this.registrationEntryState.registrants[i];
                            const info = getRegistrantBasicInfo(registrant, this.viewModel.registrantForms);
                            if ((info === null || info === void 0 ? void 0 : info.firstName) && (info === null || info === void 0 ? void 0 : info.lastName)) {
                                items.push({
                                    key: `Registrant-${registrant.guid}`,
                                    title: info.firstName,
                                    subtitle: info.lastName
                                });
                            }
                            else {
                                items.push({
                                    key: `Registrant-${registrant.guid}`,
                                    title: String_1.toTitleCase(this.viewModel.registrantTerm),
                                    subtitle: String_1.toTitleCase(Number_1.toWord(i + 1))
                                });
                            }
                        }
                        if (this.hasPostAttributes) {
                            items.push({
                                key: 'Post',
                                title: this.viewModel.registrationAttributeTitleEnd,
                                subtitle: this.viewModel.registrationTerm
                            });
                        }
                        items.push({
                            key: 'Finalize',
                            title: 'Finalize',
                            subtitle: this.viewModel.registrationTerm
                        });
                        return items;
                    }
                },
                methods: {
                    onSessionRenewalSuccess() {
                        this.hasSessionRenewalSuccess = true;
                        setTimeout(() => this.hasSessionRenewalSuccess = false, 5000);
                    },
                    onIntroNext() {
                        return __awaiter(this, void 0, void 0, function* () {
                            yield this.persistSession(false);
                            this.registrationEntryState.currentStep = this.hasPreAttributes ? this.steps.registrationStartForm : this.steps.perRegistrantForms;
                            Page_1.default.smoothScrollToTop();
                        });
                    },
                    onRegistrationStartPrevious() {
                        return __awaiter(this, void 0, void 0, function* () {
                            yield this.persistSession(false);
                            this.registrationEntryState.currentStep = this.steps.intro;
                            Page_1.default.smoothScrollToTop();
                        });
                    },
                    onRegistrationStartNext() {
                        return __awaiter(this, void 0, void 0, function* () {
                            yield this.persistSession(false);
                            this.registrationEntryState.currentStep = this.steps.perRegistrantForms;
                            Page_1.default.smoothScrollToTop();
                        });
                    },
                    onRegistrantPrevious() {
                        return __awaiter(this, void 0, void 0, function* () {
                            yield this.persistSession(false);
                            this.registrationEntryState.currentStep = this.hasPreAttributes ? this.steps.registrationStartForm : this.steps.intro;
                            Page_1.default.smoothScrollToTop();
                        });
                    },
                    onRegistrantNext() {
                        return __awaiter(this, void 0, void 0, function* () {
                            yield this.persistSession(false);
                            this.registrationEntryState.currentStep = this.hasPostAttributes ? this.steps.registrationEndForm : this.steps.reviewAndPayment;
                            Page_1.default.smoothScrollToTop();
                        });
                    },
                    onRegistrationEndPrevious() {
                        return __awaiter(this, void 0, void 0, function* () {
                            yield this.persistSession(false);
                            this.registrationEntryState.currentStep = this.steps.perRegistrantForms;
                            Page_1.default.smoothScrollToTop();
                        });
                    },
                    onRegistrationEndNext() {
                        return __awaiter(this, void 0, void 0, function* () {
                            yield this.persistSession(false);
                            this.registrationEntryState.currentStep = this.steps.reviewAndPayment;
                            Page_1.default.smoothScrollToTop();
                        });
                    },
                    onSummaryPrevious() {
                        return __awaiter(this, void 0, void 0, function* () {
                            yield this.persistSession(false);
                            this.registrationEntryState.currentStep = this.hasPostAttributes ? this.steps.registrationEndForm : this.steps.perRegistrantForms;
                            Page_1.default.smoothScrollToTop();
                        });
                    },
                    onSummaryNext() {
                        return __awaiter(this, void 0, void 0, function* () {
                            this.registrationEntryState.currentStep = this.steps.success;
                            Page_1.default.smoothScrollToTop();
                        });
                    }
                },
                watch: {
                    currentPerson: {
                        immediate: true,
                        handler() {
                            const forcedFamilyGuid = getForcedFamilyGuid(this.currentPerson, this.viewModel);
                            if (forcedFamilyGuid) {
                                for (const registrant of this.registrationEntryState.registrants) {
                                    registrant.familyGuid = forcedFamilyGuid;
                                }
                            }
                        }
                    },
                    'registrationEntryState.SessionExpirationDate': {
                        immediate: true,
                        handler() {
                            if (!this.registrationEntryState.sessionExpirationDate) {
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
                mounted() {
                    if (this.viewModel.loginRequiredToRegister && !this.$store.state.currentPerson) {
                        this.$store.dispatch('redirectToLogin');
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
            }));
        }
    };
});
//# sourceMappingURL=RegistrationEntry.js.map