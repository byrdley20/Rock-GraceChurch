System.register(["vue", "./Index", "../Elements/TextBox", "../Services/Boolean"], function (exports_1, context_1) {
    "use strict";
    var vue_1, Index_1, TextBox_1, Boolean_1, fieldTypeGuid, ConfigurationValueKey;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (Index_1_1) {
                Index_1 = Index_1_1;
            },
            function (TextBox_1_1) {
                TextBox_1 = TextBox_1_1;
            },
            function (Boolean_1_1) {
                Boolean_1 = Boolean_1_1;
            }
        ],
        execute: function () {
            fieldTypeGuid = '9C204CD0-1233-41C5-818A-C5DA439445AA';
            (function (ConfigurationValueKey) {
                ConfigurationValueKey["IsPassword"] = "ispassword";
                ConfigurationValueKey["MaxCharacters"] = "maxcharacters";
                ConfigurationValueKey["ShowCountDown"] = "showcountdown";
            })(ConfigurationValueKey || (ConfigurationValueKey = {}));
            exports_1("default", Index_1.registerFieldType(fieldTypeGuid, vue_1.defineComponent({
                name: 'TextField',
                components: {
                    TextBox: TextBox_1.default
                },
                props: Index_1.getFieldTypeProps(),
                data() {
                    return {
                        internalValue: ''
                    };
                },
                computed: {
                    safeValue() {
                        return (this.modelValue || '').trim();
                    },
                    configAttributes() {
                        const attributes = {};
                        const maxCharsConfig = this.configurationValues[ConfigurationValueKey.MaxCharacters];
                        if (maxCharsConfig && maxCharsConfig.Value) {
                            const maxCharsValue = Number(maxCharsConfig.Value);
                            if (maxCharsValue) {
                                attributes.maxLength = maxCharsValue;
                            }
                        }
                        const showCountDownConfig = this.configurationValues[ConfigurationValueKey.ShowCountDown];
                        if (showCountDownConfig && showCountDownConfig.Value) {
                            const showCountDownValue = Boolean_1.asBooleanOrNull(showCountDownConfig.Value) || false;
                            if (showCountDownValue) {
                                attributes.showCountDown = showCountDownValue;
                            }
                        }
                        return attributes;
                    },
                    isPassword() {
                        const isPasswordConfig = this.configurationValues[ConfigurationValueKey.IsPassword];
                        return Boolean_1.asBooleanOrNull(isPasswordConfig === null || isPasswordConfig === void 0 ? void 0 : isPasswordConfig.Value) || false;
                    },
                    passwordDisplay() {
                        return this.safeValue ? '********' : '';
                    }
                },
                watch: {
                    internalValue() {
                        this.$emit('update:modelValue', this.internalValue);
                    },
                    modelValue: {
                        immediate: true,
                        handler() {
                            this.internalValue = this.modelValue || '';
                        }
                    }
                },
                template: `
<TextBox v-if="isEditMode" v-model="internalValue" v-bind="configAttributes" :type="isPassword ? 'password' : ''" />
<span v-else-if="isPassword">{{passwordDisplay}}</span>
<span v-else>{{ safeValue }}</span>`
            })));
        }
    };
});
//# sourceMappingURL=TextField.js.map