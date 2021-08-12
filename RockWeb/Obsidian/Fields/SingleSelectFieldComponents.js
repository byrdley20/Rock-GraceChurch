System.register(["vue", "./Index", "../Elements/DropDownList", "../Elements/RadioButtonList", "@Obsidian/Services/Number"], function (exports_1, context_1) {
    "use strict";
    var vue_1, Index_1, DropDownList_1, RadioButtonList_1, Number_1, EditComponent;
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
            },
            function (Number_1_1) {
                Number_1 = Number_1_1;
            }
        ],
        execute: function () {
            exports_1("EditComponent", EditComponent = vue_1.defineComponent({
                name: 'SingleSelectField',
                components: {
                    DropDownList: DropDownList_1.default,
                    RadioButtonList: RadioButtonList_1.default
                },
                props: Index_1.getFieldEditorProps(),
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
                    options() {
                        var _a;
                        try {
                            const valuesConfig = JSON.parse((_a = this.configurationValues["values"]) !== null && _a !== void 0 ? _a : '[]');
                            const providedOptions = valuesConfig.map(v => {
                                return {
                                    text: v.text,
                                    value: v.value
                                };
                            });
                            if (this.isRadioButtons && !this.isRequired) {
                                providedOptions.unshift({
                                    text: 'None',
                                    value: ''
                                });
                            }
                            return providedOptions;
                        }
                        catch (_b) {
                            return [];
                        }
                    },
                    ddlConfigAttributes() {
                        const attributes = {};
                        const fieldTypeConfig = this.configurationValues["fieldtype"];
                        if (fieldTypeConfig === 'ddl_enhanced') {
                            attributes.enhanceForLongLists = true;
                        }
                        return attributes;
                    },
                    rbConfigAttributes() {
                        const attributes = {};
                        const repeatColumnsConfig = this.configurationValues["repeatColumns"];
                        if (repeatColumnsConfig) {
                            attributes['repeatColumns'] = Number_1.toNumberOrNull(repeatColumnsConfig) || 0;
                        }
                        return attributes;
                    },
                    isRadioButtons() {
                        const fieldTypeConfig = this.configurationValues["fieldtype"];
                        return fieldTypeConfig === 'rb';
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
<RadioButtonList v-if="isRadioButtons" v-model="internalValue" v-bind="rbConfigAttributes" :options="options" horizontal />
<DropDownList v-else v-model="internalValue" v-bind="ddlConfigAttributes" :options="options" />
`
            }));
        }
    };
});
//# sourceMappingURL=SingleSelectFieldComponents.js.map