System.register(["../../Controls/CampusPicker", "../../Controls/DefinedValuePicker", "../../Elements/CurrencyBox", "vue", "../../Elements/DatePicker", "../../Elements/RockButton", "../../Util/Guid", "../../Elements/Alert", "../../Services/Number", "../../Elements/Toggle", "../../Store/Index", "../../Elements/TextBox", "../../Services/String", "../../Util/RockDate", "../../Controls/GatewayControl", "../../Controls/RockValidation"], function (exports_1, context_1) {
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
    var CampusPicker_1, DefinedValuePicker_1, CurrencyBox_1, vue_1, DatePicker_1, RockButton_1, Guid_1, Alert_1, Number_1, Toggle_1, Index_1, TextBox_1, String_1, RockDate_1, GatewayControl_1, RockValidation_1;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (CampusPicker_1_1) {
                CampusPicker_1 = CampusPicker_1_1;
            },
            function (DefinedValuePicker_1_1) {
                DefinedValuePicker_1 = DefinedValuePicker_1_1;
            },
            function (CurrencyBox_1_1) {
                CurrencyBox_1 = CurrencyBox_1_1;
            },
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (DatePicker_1_1) {
                DatePicker_1 = DatePicker_1_1;
            },
            function (RockButton_1_1) {
                RockButton_1 = RockButton_1_1;
            },
            function (Guid_1_1) {
                Guid_1 = Guid_1_1;
            },
            function (Alert_1_1) {
                Alert_1 = Alert_1_1;
            },
            function (Number_1_1) {
                Number_1 = Number_1_1;
            },
            function (Toggle_1_1) {
                Toggle_1 = Toggle_1_1;
            },
            function (Index_1_1) {
                Index_1 = Index_1_1;
            },
            function (TextBox_1_1) {
                TextBox_1 = TextBox_1_1;
            },
            function (String_1_1) {
                String_1 = String_1_1;
            },
            function (RockDate_1_1) {
                RockDate_1 = RockDate_1_1;
            },
            function (GatewayControl_1_1) {
                GatewayControl_1 = GatewayControl_1_1;
            },
            function (RockValidation_1_1) {
                RockValidation_1 = RockValidation_1_1;
            }
        ],
        execute: function () {
            exports_1("default", vue_1.defineComponent({
                name: 'Finance.TransactionEntry',
                components: {
                    CurrencyBox: CurrencyBox_1.default,
                    CampusPicker: CampusPicker_1.default,
                    DefinedValuePicker: DefinedValuePicker_1.default,
                    DatePicker: DatePicker_1.default,
                    RockButton: RockButton_1.default,
                    Alert: Alert_1.default,
                    Toggle: Toggle_1.default,
                    TextBox: TextBox_1.default,
                    GatewayControl: GatewayControl_1.default,
                    RockValidation: RockValidation_1.default
                },
                setup() {
                    return {
                        invokeBlockAction: vue_1.inject('invokeBlockAction'),
                        configurationValues: vue_1.inject('configurationValues')
                    };
                },
                data() {
                    return {
                        loading: false,
                        gatewayErrorMessage: '',
                        gatewayValidationFields: {},
                        transactionGuid: Guid_1.newGuid(),
                        criticalError: '',
                        doGatewayControlSubmit: false,
                        pageIndex: 1,
                        page1Error: '',
                        frequencyDefinedTypeGuid: "1F645CFB-5BBD-4465-B9CA-0D2104A1479B",
                        args: {
                            isGivingAsPerson: true,
                            email: '',
                            phoneNumber: '',
                            phoneCountryCode: '',
                            accountAmounts: {},
                            street1: '',
                            street2: '',
                            city: '',
                            state: '',
                            postalCode: '',
                            country: '',
                            firstName: '',
                            lastName: '',
                            businessName: '',
                            financialPersonSavedAccountGuid: null,
                            comment: '',
                            transactionEntityId: null,
                            referenceNumber: '',
                            campusGuid: '',
                            businessGuid: null,
                            frequencyValueGuid: '',
                            giftDate: RockDate_1.default.newDate(),
                            isGiveAnonymously: false
                        }
                    };
                },
                computed: {
                    totalAmount() {
                        let total = 0;
                        for (const accountGuid in this.args.accountAmounts) {
                            total += this.args.accountAmounts[accountGuid];
                        }
                        return total;
                    },
                    totalAmountFormatted() {
                        return `$${Number_1.asFormattedString(this.totalAmount, 2)}`;
                    },
                    gatewayControlModel() {
                        return this.configurationValues['gatewayControl'];
                    },
                    currentPerson() {
                        return Index_1.default.state.currentPerson;
                    },
                    accounts() {
                        return this.configurationValues['financialAccounts'] || [];
                    },
                    campus() {
                        return Index_1.default.getters['campuses/getByGuid'](this.args.campusGuid) || null;
                    },
                    accountAndCampusString() {
                        const accountNames = [];
                        for (const accountGuid in this.args.accountAmounts) {
                            const account = this.accounts.find(a => Guid_1.areEqual(accountGuid, a.guid));
                            if (!account || !account.publicName) {
                                continue;
                            }
                            accountNames.push(account.publicName);
                        }
                        if (this.campus) {
                            return `${String_1.asCommaAnd(accountNames)} - ${this.campus.name}`;
                        }
                        return String_1.asCommaAnd(accountNames);
                    }
                },
                methods: {
                    goBack() {
                        this.pageIndex--;
                        this.doGatewayControlSubmit = false;
                    },
                    onPageOneSubmit() {
                        if (this.totalAmount <= 0) {
                            this.page1Error = 'Please specify an amount';
                            return;
                        }
                        this.page1Error = '';
                        this.pageIndex = 2;
                    },
                    onPageTwoSubmit() {
                        this.loading = true;
                        this.gatewayErrorMessage = '';
                        this.gatewayValidationFields = {};
                        this.doGatewayControlSubmit = true;
                    },
                    onGatewayControlSuccess(token) {
                        this.loading = false;
                        this.args.referenceNumber = token;
                        this.pageIndex = 3;
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
                    onPageThreeSubmit() {
                        return __awaiter(this, void 0, void 0, function* () {
                            this.loading = true;
                            try {
                                yield this.invokeBlockAction('ProcessTransaction', {
                                    args: this.args,
                                    transactionGuid: this.transactionGuid
                                });
                                this.pageIndex = 4;
                            }
                            catch (e) {
                                console.log(e);
                            }
                            finally {
                                this.loading = false;
                            }
                        });
                    }
                },
                watch: {
                    currentPerson: {
                        immediate: true,
                        handler() {
                            if (!this.currentPerson) {
                                return;
                            }
                            this.args.firstName = this.args.firstName || this.currentPerson.firstName || '';
                            this.args.lastName = this.args.lastName || this.currentPerson.lastName || '';
                            this.args.email = this.args.email || this.currentPerson.email || '';
                        }
                    }
                },
                template: `
<div class="transaction-entry-v2">
    <Alert v-if="criticalError" danger>
        {{criticalError}}
    </Alert>
    <template v-else-if="!gatewayControlModel || !gatewayControlModel.fileUrl">
        <h4>Welcome to Rock's On-line Giving Experience</h4>
        <p>
            There is currently no gateway configured.
        </p>
    </template>
    <template v-else-if="pageIndex === 1">
        <h2>Your Generosity Changes Lives (Vue)</h2>
        <template v-for="account in accounts">
            <CurrencyBox :label="account.publicName" v-model="args.accountAmounts[account.guid]" />
        </template>
        <CampusPicker v-model="args.campusGuid" :showBlankItem="false" />
        <DefinedValuePicker :definedTypeGuid="frequencyDefinedTypeGuid" v-model="args.frequencyValueGuid" label="Frequency" :showBlankItem="false" />
        <DatePicker label="Process Gift On" v-model="args.giftDate" />
        <Alert alertType="validation" v-if="page1Error">{{page1Error}}</Alert>
        <RockButton btnType="primary" @click="onPageOneSubmit">Give Now</RockButton>
    </template>
    <template v-else-if="pageIndex === 2">
        <div class="amount-summary">
            <div class="amount-summary-text">
                {{accountAndCampusString}}
            </div>
            <div class="amount-display">
                {{totalAmountFormatted}}
            </div>
        </div>
        <div>
            <Alert v-if="gatewayErrorMessage" alertType="danger">{{gatewayErrorMessage}}</Alert>
            <RockValidation :errors="gatewayValidationFields" />
            <div class="hosted-payment-control">
                <GatewayControl
                    :gatewayControlModel="gatewayControlModel"
                    :submit="doGatewayControlSubmit"
                    @success="onGatewayControlSuccess"
                    @error="onGatewayControlError"
                    @validation="onGatewayControlValidation" />
            </div>
            <div class="navigation actions">
                <RockButton btnType="default" @click="goBack" :isLoading="loading">Back</RockButton>
                <RockButton btnType="primary" class="pull-right" @click="onPageTwoSubmit" :isLoading="loading">Next</RockButton>
            </div>
        </div>
    </template>
    <template v-else-if="pageIndex === 3">
        <Toggle v-model="args.isGivingAsPerson">
            <template #on>Individual</template>
            <template #off>Business</template>
        </Toggle>
        <template v-if="args.isGivingAsPerson && currentPerson">
            <div class="form-control-static">
                {{currentPerson.FullName}}
            </div>
        </template>
        <template v-else-if="args.isGivingAsPerson">
            <TextBox v-model="args.firstName" placeholder="First Name" class="margin-b-sm" />
            <TextBox v-model="args.lastName" placeholder="Last Name" class="margin-b-sm" />
        </template>
        <div class="navigation actions margin-t-md">
            <RockButton :isLoading="loading" @click="goBack">Back</RockButton>
            <RockButton :isLoading="loading" btnType="primary" class="pull-right" @click="onPageThreeSubmit">Finish</RockButton>
        </div>
    </template>
    <template v-else-if="pageIndex === 4">
        Last Page
    </template>
</div>`
            }));
        }
    };
});
//# sourceMappingURL=TransactionEntry.js.map