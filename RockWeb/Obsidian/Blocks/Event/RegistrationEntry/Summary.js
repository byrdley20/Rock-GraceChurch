System.register(["vue", "../../../Controls/gatewayControl", "../../../Controls/rockForm", "../../../Controls/rockValidation", "../../../Elements/alert", "../../../Elements/checkBox", "../../../Elements/emailBox", "../../../Elements/rockButton", "../RegistrationEntry", "./CostSummary", "./DiscountCodeForm", "./Registrar"], function (exports_1, context_1) {
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
    var vue_1, gatewayControl_1, rockForm_1, rockValidation_1, alert_1, checkBox_1, emailBox_1, rockButton_1, RegistrationEntry_1, CostSummary_1, DiscountCodeForm_1, Registrar_1;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (gatewayControl_1_1) {
                gatewayControl_1 = gatewayControl_1_1;
            },
            function (rockForm_1_1) {
                rockForm_1 = rockForm_1_1;
            },
            function (rockValidation_1_1) {
                rockValidation_1 = rockValidation_1_1;
            },
            function (alert_1_1) {
                alert_1 = alert_1_1;
            },
            function (checkBox_1_1) {
                checkBox_1 = checkBox_1_1;
            },
            function (emailBox_1_1) {
                emailBox_1 = emailBox_1_1;
            },
            function (rockButton_1_1) {
                rockButton_1 = rockButton_1_1;
            },
            function (RegistrationEntry_1_1) {
                RegistrationEntry_1 = RegistrationEntry_1_1;
            },
            function (CostSummary_1_1) {
                CostSummary_1 = CostSummary_1_1;
            },
            function (DiscountCodeForm_1_1) {
                DiscountCodeForm_1 = DiscountCodeForm_1_1;
            },
            function (Registrar_1_1) {
                Registrar_1 = Registrar_1_1;
            }
        ],
        execute: function () {
            exports_1("default", vue_1.defineComponent({
                name: 'Event.RegistrationEntry.Summary',
                components: {
                    RockButton: rockButton_1.default,
                    CheckBox: checkBox_1.default,
                    EmailBox: emailBox_1.default,
                    RockForm: rockForm_1.default,
                    Alert: alert_1.default,
                    GatewayControl: gatewayControl_1.default,
                    RockValidation: rockValidation_1.default,
                    CostSummary: CostSummary_1.default,
                    Registrar: Registrar_1.default,
                    DiscountCodeForm: DiscountCodeForm_1.default
                },
                setup() {
                    return {
                        getRegistrationEntryBlockArgs: vue_1.inject('getRegistrationEntryBlockArgs'),
                        invokeBlockAction: vue_1.inject('invokeBlockAction'),
                        registrationEntryState: vue_1.inject('registrationEntryState')
                    };
                },
                data() {
                    return {
                        loading: false,
                        doGatewayControlSubmit: false,
                        gatewayErrorMessage: '',
                        gatewayValidationFields: {},
                        submitErrorMessage: ''
                    };
                },
                computed: {
                    gatewayControlModel() {
                        return this.viewModel.gatewayControl;
                    },
                    viewModel() {
                        return this.registrationEntryState.viewModel;
                    },
                    registrantInfos() {
                        return this.registrationEntryState.registrants.map(r => RegistrationEntry_1.getRegistrantBasicInfo(r, this.viewModel.registrantForms));
                    },
                    registrantTerm() {
                        return this.registrantInfos.length === 1 ? this.viewModel.registrantTerm : this.viewModel.pluralRegistrantTerm;
                    },
                    instanceName() {
                        return this.viewModel.instanceName;
                    },
                    finishButtonText() {
                        return (this.viewModel.isRedirectGateway && this.registrationEntryState.amountToPayToday) ? 'Pay' : 'Finish';
                    }
                },
                methods: {
                    onPrevious() {
                        this.$emit('previous');
                    },
                    onNext() {
                        return __awaiter(this, void 0, void 0, function* () {
                            this.loading = true;
                            if (this.registrationEntryState.amountToPayToday) {
                                if (this.viewModel.isRedirectGateway) {
                                    const redirectUrl = yield this.getPaymentRedirect();
                                    if (redirectUrl) {
                                        location.href = redirectUrl;
                                    }
                                    else {
                                        this.loading = false;
                                    }
                                }
                                else {
                                    this.gatewayErrorMessage = '';
                                    this.gatewayValidationFields = {};
                                    this.doGatewayControlSubmit = true;
                                }
                            }
                            else {
                                const success = yield this.submit();
                                this.loading = false;
                                if (success) {
                                    this.$emit('next');
                                }
                            }
                        });
                    },
                    onGatewayControlSuccess(token) {
                        return __awaiter(this, void 0, void 0, function* () {
                            this.registrationEntryState.gatewayToken = token;
                            const success = yield this.submit();
                            this.loading = false;
                            if (success) {
                                this.$emit('next');
                            }
                        });
                    },
                    onGatewayControlReset() {
                        return __awaiter(this, void 0, void 0, function* () {
                            this.registrationEntryState.gatewayToken = '';
                            this.doGatewayControlSubmit = false;
                        });
                    },
                    onGatewayControlError(message) {
                        this.doGatewayControlSubmit = false;
                        this.loading = false;
                        this.gatewayErrorMessage = message;
                    },
                    onGatewayControlValidation(invalidFields) {
                        this.doGatewayControlSubmit = false;
                        this.loading = false;
                        this.gatewayValidationFields = invalidFields;
                    },
                    submit() {
                        return __awaiter(this, void 0, void 0, function* () {
                            const result = yield this.invokeBlockAction('SubmitRegistration', {
                                args: this.getRegistrationEntryBlockArgs()
                            });
                            if (result.isError || !result.data) {
                                this.submitErrorMessage = result.errorMessage || 'Unknown error';
                            }
                            else {
                                this.registrationEntryState.successViewModel = result.data;
                            }
                            return result.isSuccess;
                        });
                    },
                    getPaymentRedirect() {
                        return __awaiter(this, void 0, void 0, function* () {
                            const result = yield this.invokeBlockAction('GetPaymentRedirect', {
                                args: this.getRegistrationEntryBlockArgs()
                            });
                            if (result.isError || !result.data) {
                                this.submitErrorMessage = result.errorMessage || 'Unknown error';
                            }
                            return result.data || '';
                        });
                    }
                },
                template: `
<div class="registrationentry-summary">
    <RockForm @submit="onNext">

        <Registrar />

        <div v-if="viewModel.cost">
            <h4>Payment Summary</h4>
            <DiscountCodeForm />
            <CostSummary />
        </div>

        <div v-if="gatewayControlModel && registrationEntryState.amountToPayToday" class="well">
            <h4>Payment Method</h4>
            <Alert v-if="gatewayErrorMessage" alertType="danger">{{gatewayErrorMessage}}</Alert>
            <RockValidation :errors="gatewayValidationFields" />
            <div class="hosted-payment-control">
                <GatewayControl
                    :gatewayControlModel="gatewayControlModel"
                    :submit="doGatewayControlSubmit"
                    @success="onGatewayControlSuccess"
                    @reset="onGatewayControlReset"
                    @error="onGatewayControlError"
                    @validation="onGatewayControlValidation" />
            </div>
        </div>

        <div v-if="!viewModel.cost" class="margin-b-md">
            <p>The following {{registrantTerm}} will be registered for {{instanceName}}:</p>
            <ul>
                <li v-for="r in registrantInfos" :key="r.guid">
                    <strong>{{r.firstName}} {{r.lastName}}</strong>
                </li>
            </ul>
        </div>

        <Alert v-if="submitErrorMessage" alertType="danger">{{submitErrorMessage}}</Alert>

        <div class="actions text-right">
            <RockButton v-if="viewModel.allowRegistrationUpdates" class="pull-left" btnType="default" @click="onPrevious" :isLoading="loading">
                Previous
            </RockButton>
            <RockButton btnType="primary" type="submit" :isLoading="loading">
                {{finishButtonText}}
            </RockButton>
        </div>
    </RockForm>
</div>`
            }));
        }
    };
});
//# sourceMappingURL=Summary.js.map