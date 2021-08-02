System.register(["vue", "./Index", "../Elements/TextBox", "@Obsidian/Services/Boolean", "@Obsidian/Services/Number"], function (exports_1, context_1) {
    "use strict";
    var vue_1, Index_1, TextBox_1, Boolean_1, Number_1, fieldTypeGuid, ConfigurationValueKey;
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
            },
            function (Number_1_1) {
                Number_1 = Number_1_1;
            }
        ],
        execute: function () {
            fieldTypeGuid = 'C28C7BF3-A552-4D77-9408-DEDCF760CED0';
            (function (ConfigurationValueKey) {
                ConfigurationValueKey["NumberOfRows"] = "numberofrows";
                ConfigurationValueKey["AllowHtml"] = "allowhtml";
                ConfigurationValueKey["MaxCharacters"] = "maxcharacters";
                ConfigurationValueKey["ShowCountDown"] = "showcountdown";
            })(ConfigurationValueKey || (ConfigurationValueKey = {}));
            exports_1("default", Index_1.registerFieldType(fieldTypeGuid, vue_1.defineComponent({
                name: 'MemoField',
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
                    allowHtml() {
                        const config = this.configurationValues[ConfigurationValueKey.AllowHtml];
                        return Boolean_1.asBoolean(config === null || config === void 0 ? void 0 : config.value);
                    },
                    safeValue() {
                        return (this.modelValue || '').trim();
                    },
                    configAttributes() {
                        const attributes = {};
                        const maxCharsConfig = this.configurationValues[ConfigurationValueKey.MaxCharacters];
                        if (maxCharsConfig && maxCharsConfig.value) {
                            const maxCharsValue = Number(maxCharsConfig.value);
                            if (maxCharsValue) {
                                attributes.maxLength = maxCharsValue;
                            }
                        }
                        const showCountDownConfig = this.configurationValues[ConfigurationValueKey.ShowCountDown];
                        if (showCountDownConfig && showCountDownConfig.value) {
                            const showCountDownValue = Boolean_1.asBooleanOrNull(showCountDownConfig.value) || false;
                            if (showCountDownValue) {
                                attributes.showCountDown = showCountDownValue;
                            }
                        }
                        const rowsConfig = this.configurationValues[ConfigurationValueKey.NumberOfRows];
                        if (rowsConfig === null || rowsConfig === void 0 ? void 0 : rowsConfig.value) {
                            const rows = Number_1.toNumber(rowsConfig.value) || 3;
                            if (rows > 0) {
                                attributes.rows = rows;
                            }
                        }
                        return attributes;
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
<TextBox v-if="isEditMode" v-model="internalValue" v-bind="configAttributes" textMode="MultiLine" />
<div v-else-if="allowHtml">
    <div v-html="modelValue"></div>
</div>
<span v-else>{{ safeValue }}</span>`
            })));
        }
    };
});
//# sourceMappingURL=MemoField.js.map