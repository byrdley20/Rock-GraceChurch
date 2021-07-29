System.register(["vue", "./Index", "../Elements/DropDownList", "../Elements/RadioButtonList"], function (exports_1, context_1) {
    "use strict";
    var vue_1, Index_1, DropDownList_1, RadioButtonList_1, fieldTypeGuid, ConfigurationValueKey;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (Index_1_1) {
                Index_1 = Index_1_1;
            },
            function (DropDownList_1_1) {
                DropDownList_1 = DropDownList_1_1;
            },
            function (RadioButtonList_1_1) {
                RadioButtonList_1 = RadioButtonList_1_1;
            }
        ],
        execute: function () {
            fieldTypeGuid = '7525C4CB-EE6B-41D4-9B64-A08048D5A5C0';
            (function (ConfigurationValueKey) {
                ConfigurationValueKey["Values"] = "values";
                ConfigurationValueKey["FieldType"] = "fieldtype";
                ConfigurationValueKey["RepeatColumns"] = "repeatColumns";
            })(ConfigurationValueKey || (ConfigurationValueKey = {}));
            exports_1("default", Index_1.registerFieldType(fieldTypeGuid, vue_1.defineComponent({
                name: 'SingleSelectField',
                components: {
                    DropDownList: DropDownList_1.default,
                    RadioButtonList: RadioButtonList_1.default
                },
                props: Index_1.getFieldTypeProps(),
                setup() {
                    return {
                        isRequired: vue_1.inject('isRequired')
                    };
                },
                data() {
                    return {
                        internalValue: ''
                    };
                },
                computed: {
                    safeValue() {
                        return (this.modelValue || '').trim();
                    },
                    options() {
                        const valuesConfig = this.configurationValues[ConfigurationValueKey.Values];
                        if (valuesConfig && valuesConfig.value) {
                            const providedOptions = valuesConfig.value.split(',').map(v => {
                                if (v.indexOf('^') !== -1) {
                                    const parts = v.split('^');
                                    const value = parts[0];
                                    const text = parts[1];
                                    return {
                                        key: value,
                                        text,
                                        value
                                    };
                                }
                                return {
                                    key: v,
                                    text: v,
                                    value: v
                                };
                            });
                            if (this.isRadioButtons && !this.isRequired) {
                                providedOptions.unshift({
                                    key: 'None',
                                    text: 'None',
                                    value: ''
                                });
                            }
                            return providedOptions;
                        }
                        return [];
                    },
                    ddlConfigAttributes() {
                        const attributes = {};
                        const fieldTypeConfig = this.configurationValues[ConfigurationValueKey.FieldType];
                        if ((fieldTypeConfig === null || fieldTypeConfig === void 0 ? void 0 : fieldTypeConfig.value) === 'ddl_enhanced') {
                            attributes.enhanceForLongLists = true;
                        }
                        return attributes;
                    },
                    rbConfigAttributes() {
                        const attributes = {};
                        const repeatColumnsConfig = this.configurationValues[ConfigurationValueKey.RepeatColumns];
                        if (repeatColumnsConfig === null || repeatColumnsConfig === void 0 ? void 0 : repeatColumnsConfig.value) {
                            attributes['repeatColumns'] = Number(repeatColumnsConfig.value) || 0;
                        }
                        return attributes;
                    },
                    isRadioButtons() {
                        const fieldTypeConfig = this.configurationValues[ConfigurationValueKey.FieldType];
                        return (fieldTypeConfig === null || fieldTypeConfig === void 0 ? void 0 : fieldTypeConfig.value) === 'rb';
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
<RadioButtonList v-if="isEditMode && isRadioButtons" v-model="internalValue" v-bind="rbConfigAttributes" :options="options" horizontal />
<DropDownList v-else-if="isEditMode" v-model="internalValue" v-bind="ddlConfigAttributes" :options="options" />
<span v-else>{{ safeValue }}</span>`
            })));
        }
    };
});
//# sourceMappingURL=SingleSelect.js.map