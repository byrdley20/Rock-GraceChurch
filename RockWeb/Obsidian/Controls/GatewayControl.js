System.register(["vue", "../Elements/JavaScriptAnchor", "./ComponentFromUrl"], function (exports_1, context_1) {
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
    var vue_1, JavaScriptAnchor_1, ComponentFromUrl_1, ValidationField;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (JavaScriptAnchor_1_1) {
                JavaScriptAnchor_1 = JavaScriptAnchor_1_1;
            },
            function (ComponentFromUrl_1_1) {
                ComponentFromUrl_1 = ComponentFromUrl_1_1;
            }
        ],
        execute: function () {
            (function (ValidationField) {
                ValidationField[ValidationField["CardNumber"] = 0] = "CardNumber";
                ValidationField[ValidationField["Expiry"] = 1] = "Expiry";
                ValidationField[ValidationField["SecurityCode"] = 2] = "SecurityCode";
            })(ValidationField || (ValidationField = {}));
            exports_1("ValidationField", ValidationField);
            exports_1("default", vue_1.defineComponent({
                name: 'GatewayControl',
                components: {
                    ComponentFromUrl: ComponentFromUrl_1.default,
                    JavaScriptAnchor: JavaScriptAnchor_1.default
                },
                props: {
                    gatewayControlModel: {
                        type: Object,
                        required: true
                    }
                },
                data() {
                    return {
                        isSuccess: false
                    };
                },
                computed: {
                    url() {
                        return this.gatewayControlModel.FileUrl;
                    },
                    settings() {
                        return this.gatewayControlModel.Settings;
                    }
                },
                methods: {
                    reset() {
                        this.isSuccess = true;
                        this.$nextTick(() => {
                            this.isSuccess = false;
                            this.$emit('reset');
                        });
                    },
                    onSuccess(token) {
                        return __awaiter(this, void 0, void 0, function* () {
                            this.isSuccess = true;
                            this.$emit('success', token);
                        });
                    },
                    transformValidation(validationFields) {
                        const errors = {};
                        let foundError = false;
                        if (validationFields === null || validationFields === void 0 ? void 0 : validationFields.includes(ValidationField.CardNumber)) {
                            errors['Card Number'] = 'is not valid.';
                            foundError = true;
                        }
                        if (validationFields === null || validationFields === void 0 ? void 0 : validationFields.includes(ValidationField.Expiry)) {
                            errors['Expiration Date'] = 'is not valid.';
                            foundError = true;
                        }
                        if (validationFields === null || validationFields === void 0 ? void 0 : validationFields.includes(ValidationField.SecurityCode)) {
                            errors['Security Code'] = 'is not valid.';
                            foundError = true;
                        }
                        if (!foundError) {
                            errors['Payment Info'] = 'is not valid.';
                        }
                        this.$emit('validation', errors);
                        return;
                    }
                },
                template: `
<ComponentFromUrl v-if="!isSuccess" :url="url" :settings="settings" @validationRaw="transformValidation" @successRaw="onSuccess" />
<div v-else class="text-center">
    Your payment is ready.
    <small>
        <JavaScriptAnchor @click="reset">
            Reset Payment
        </JavaScriptAnchor>
    </small>
</div>`
            }));
        }
    };
});
//# sourceMappingURL=GatewayControl.js.map