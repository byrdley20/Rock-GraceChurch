System.register(["vue", "../../../Elements/Alert", "../../../Elements/RockButton", "../../../Elements/TextBox", "../../../Services/Number"], function (exports_1, context_1) {
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
    var vue_1, Alert_1, RockButton_1, TextBox_1, Number_1;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (Alert_1_1) {
                Alert_1 = Alert_1_1;
            },
            function (RockButton_1_1) {
                RockButton_1 = RockButton_1_1;
            },
            function (TextBox_1_1) {
                TextBox_1 = TextBox_1_1;
            },
            function (Number_1_1) {
                Number_1 = Number_1_1;
            }
        ],
        execute: function () {
            exports_1("default", vue_1.defineComponent({
                name: 'Event.RegistrationEntry.DiscountCodeForm',
                components: {
                    RockButton: RockButton_1.default,
                    TextBox: TextBox_1.default,
                    Alert: Alert_1.default
                },
                setup() {
                    return {
                        invokeBlockAction: vue_1.inject('invokeBlockAction'),
                        registrationEntryState: vue_1.inject('registrationEntryState')
                    };
                },
                data() {
                    return {
                        loading: false,
                        discountCodeInput: '',
                        discountCodeWarningMessage: ''
                    };
                },
                computed: {
                    discountCodeSuccessMessage() {
                        const discountAmount = this.registrationEntryState.discountAmount;
                        const discountPercent = this.registrationEntryState.discountPercentage;
                        if (!discountPercent && !discountAmount) {
                            return '';
                        }
                        const discountText = discountPercent ?
                            `${Number_1.asFormattedString(discountPercent * 100, 0)}%` :
                            `$${Number_1.asFormattedString(discountAmount, 2)}`;
                        return `Your ${discountText} discount code for all registrants was successfully applied.`;
                    },
                    isDiscountPanelVisible() {
                        return this.viewModel.hasDiscountsAvailable;
                    },
                    viewModel() {
                        return this.registrationEntryState.viewModel;
                    }
                },
                methods: {
                    tryDiscountCode() {
                        return __awaiter(this, void 0, void 0, function* () {
                            this.loading = true;
                            try {
                                const result = yield this.invokeBlockAction('CheckDiscountCode', {
                                    code: this.discountCodeInput
                                });
                                if (result.isError || !result.data) {
                                    this.discountCodeWarningMessage = `'${this.discountCodeInput}' is not a valid Discount Code.`;
                                }
                                else {
                                    this.discountCodeWarningMessage = '';
                                    this.registrationEntryState.discountAmount = result.data.discountAmount;
                                    this.registrationEntryState.discountPercentage = result.data.discountPercentage;
                                    this.registrationEntryState.discountCode = result.data.discountCode;
                                }
                            }
                            finally {
                                this.loading = false;
                            }
                        });
                    }
                },
                watch: {
                    'registrationEntryState.DiscountCode': {
                        immediate: true,
                        handler() {
                            this.discountCodeInput = this.registrationEntryState.discountCode;
                        }
                    }
                },
                template: `
<div v-if="isDiscountPanelVisible || discountCodeInput" class="clearfix">
    <Alert v-if="discountCodeWarningMessage" alertType="warning">{{discountCodeWarningMessage}}</Alert>
    <Alert v-if="discountCodeSuccessMessage" alertType="success">{{discountCodeSuccessMessage}}</Alert>
    <div class="form-group pull-right">
        <label class="control-label">Discount Code</label>
        <div class="input-group">
            <input type="text" :disabled="loading || !!discountCodeSuccessMessage" class="form-control input-width-md input-sm" v-model="discountCodeInput" />
            <RockButton v-if="!discountCodeSuccessMessage" btnSize="sm" :isLoading="loading" class="margin-l-sm" @click="tryDiscountCode">
                Apply
            </RockButton>
        </div>
    </div>
</div>`
            }));
        }
    };
});
//# sourceMappingURL=DiscountCodeForm.js.map