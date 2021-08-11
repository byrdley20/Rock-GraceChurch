System.register(["vue", "./Index", "../Elements/TextBox", "@Obsidian/Services/Boolean"], function (exports_1, context_1) {
    "use strict";
    var vue_1, Index_1, TextBox_1, Boolean_1, ConfigurationValueKey, EditComponent;
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
            (function (ConfigurationValueKey) {
                ConfigurationValueKey["IsPassword"] = "ispassword";
                ConfigurationValueKey["MaxCharacters"] = "maxcharacters";
                ConfigurationValueKey["ShowCountDown"] = "showcountdown";
            })(ConfigurationValueKey || (ConfigurationValueKey = {}));
            exports_1("EditComponent", EditComponent = vue_1.defineComponent({
                name: 'TextField',
                components: {
                    TextBox: TextBox_1.default
                },
                props: Index_1.getFieldEditorProps(),
                data() {
                    return {
                        internalValue: ''
                    };
                },
                computed: {
                    configAttributes() {
                        const attributes = {};
                        const maxCharsConfig = this.configurationValues[ConfigurationValueKey.MaxCharacters];
                        if (maxCharsConfig) {
                            const maxCharsValue = Number(maxCharsConfig);
                            if (maxCharsValue) {
                                attributes.maxLength = maxCharsValue;
                            }
                        }
                        const showCountDownConfig = this.configurationValues[ConfigurationValueKey.ShowCountDown];
                        if (showCountDownConfig && showCountDownConfig) {
                            const showCountDownValue = Boolean_1.asBooleanOrNull(showCountDownConfig) || false;
                            if (showCountDownValue) {
                                attributes.showCountDown = showCountDownValue;
                            }
                        }
                        return attributes;
                    },
                    isPassword() {
                        const isPasswordConfig = this.configurationValues[ConfigurationValueKey.IsPassword];
                        return Boolean_1.asBooleanOrNull(isPasswordConfig) || false;
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
<TextBox v-model="internalValue" v-bind="configAttributes" :type="isPassword ? 'password' : ''" />
`
            }));
        }
    };
});
//# sourceMappingURL=TextFieldComponents.js.map