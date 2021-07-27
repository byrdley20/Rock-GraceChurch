System.register(["vue", "../Elements/LoadingIndicator", "../Elements/TextBox", "../Util/Guid", "./GatewayControl"], function (exports_1, context_1) {
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
    var vue_1, LoadingIndicator_1, TextBox_1, Guid_1, GatewayControl_1;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (LoadingIndicator_1_1) {
                LoadingIndicator_1 = LoadingIndicator_1_1;
            },
            function (TextBox_1_1) {
                TextBox_1 = TextBox_1_1;
            },
            function (Guid_1_1) {
                Guid_1 = Guid_1_1;
            },
            function (GatewayControl_1_1) {
                GatewayControl_1 = GatewayControl_1_1;
            }
        ],
        execute: function () {
            exports_1("default", vue_1.defineComponent({
                name: 'TestGatewayControl',
                components: {
                    LoadingIndicator: LoadingIndicator_1.default,
                    TextBox: TextBox_1.default
                },
                props: {
                    settings: {
                        type: Object,
                        required: true
                    },
                    submit: {
                        type: Boolean,
                        required: true
                    }
                },
                data() {
                    return {
                        loading: false,
                        cardNumber: ''
                    };
                },
                watch: {
                    submit() {
                        return __awaiter(this, void 0, void 0, function* () {
                            if (!this.submit || this.loading) {
                                return;
                            }
                            this.loading = true;
                            yield new Promise(resolve => setTimeout(resolve, 500));
                            if (this.cardNumber === '0000') {
                                this.$emit('error', 'This is a serious problem with the gateway.');
                                this.loading = false;
                                return;
                            }
                            if (this.cardNumber.length <= 10) {
                                const validationFields = [GatewayControl_1.ValidationField.CardNumber];
                                this.$emit('validationRaw', validationFields);
                                this.loading = false;
                                return;
                            }
                            const token = Guid_1.newGuid().replace(/-/g, '');
                            this.$emit('successRaw', token);
                            this.loading = false;
                        });
                    }
                },
                template: `
<div>
    <div v-if="loading" class="text-center">
        <LoadingIndicator />
    </div>
    <div v-else>
        <TextBox label="Credit Card" v-model="cardNumber" />
    </div>
</div>`
            }));
        }
    };
});
//# sourceMappingURL=TestGatewayControl.js.map