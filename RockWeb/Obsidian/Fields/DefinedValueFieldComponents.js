System.register(["vue", "./Index", "../Elements/DropDownList", "@Obsidian/Services/Boolean"], function (exports_1, context_1) {
    "use strict";
    var vue_1, Index_1, DropDownList_1, Boolean_1, EditComponent;
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
            function (Boolean_1_1) {
                Boolean_1 = Boolean_1_1;
            }
        ],
        execute: function () {
            exports_1("EditComponent", EditComponent = vue_1.defineComponent({
                name: 'DefinedValueField',
                components: {
                    DropDownList: DropDownList_1.default
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
                    valueOptions() {
                        var _a;
                        try {
                            return JSON.parse((_a = this.configurationValues["values"]) !== null && _a !== void 0 ? _a : '[]');
                        }
                        catch (_b) {
                            return [];
                        }
                    },
                    options() {
                        const valueOptions = this.valueOptions;
                        const providedOptions = valueOptions.map(v => {
                            return {
                                text: v.text,
                                value: v.value
                            };
                        });
                        return providedOptions;
                    },
                    configAttributes() {
                        const attributes = {};
                        const enhancedConfig = this.configurationValues["enhancedselection"];
                        if (enhancedConfig) {
                            attributes.enhanceForLongLists = Boolean_1.asBoolean(enhancedConfig);
                        }
                        return attributes;
                    }
                },
                watch: {
                    internalValue() {
                        const selectedValues = this.valueOptions.filter(v => v.value === this.internalValue);
                        let clientValue;
                        if (selectedValues.length >= 1) {
                            clientValue = {
                                value: selectedValues[0].value,
                                text: selectedValues[0].text,
                                description: selectedValues[0].description
                            };
                        }
                        else {
                            clientValue = {
                                value: '',
                                text: '',
                                description: ''
                            };
                        }
                        this.$emit('update:modelValue', JSON.stringify(clientValue));
                    },
                    modelValue: {
                        immediate: true,
                        handler() {
                            var _a;
                            try {
                                const clientValue = JSON.parse((_a = this.modelValue) !== null && _a !== void 0 ? _a : '');
                                this.internalValue = clientValue.value;
                            }
                            catch (_b) {
                                this.internalValue = '';
                            }
                        }
                    }
                },
                template: `
<DropDownList v-model="internalValue" v-bind="configAttributes" :options="options" :showBlankItem="!isRequired" />
`
            }));
        }
    };
});
//# sourceMappingURL=DefinedValueFieldComponents.js.map