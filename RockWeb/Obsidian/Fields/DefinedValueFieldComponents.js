System.register(["vue", "./Index", "../Elements/CheckBoxList", "../Elements/DropDownList", "@Obsidian/Services/Boolean"], function (exports_1, context_1) {
    "use strict";
    var vue_1, Index_1, CheckBoxList_1, DropDownList_1, Boolean_1, EditComponent;
    var __moduleName = context_1 && context_1.id;
    function parseModelValue(modelValue) {
        try {
            const clientValue = JSON.parse(modelValue !== null && modelValue !== void 0 ? modelValue : '');
            return clientValue.value;
        }
        catch (_a) {
            return '';
        }
    }
    function getClientValue(value, valueOptions) {
        const values = Array.isArray(value) ? value : [value];
        const selectedValues = valueOptions.filter(v => values.includes(v.value));
        if (selectedValues.length >= 1) {
            return {
                value: selectedValues.map(v => v.value).join(','),
                text: selectedValues.map(v => v.text).join(', '),
                description: selectedValues.map(v => v.description).join(', ')
            };
        }
        else {
            return {
                value: '',
                text: '',
                description: ''
            };
        }
    }
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (Index_1_1) {
                Index_1 = Index_1_1;
            },
            function (CheckBoxList_1_1) {
                CheckBoxList_1 = CheckBoxList_1_1;
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
                    DropDownList: DropDownList_1.default,
                    CheckBoxList: CheckBoxList_1.default
                },
                props: Index_1.getFieldEditorProps(),
                setup(props, { emit }) {
                    const internalValue = vue_1.ref(parseModelValue(props.modelValue));
                    const internalValues = vue_1.ref(parseModelValue(props.modelValue).split(',').filter(v => v !== ''));
                    const valueOptions = vue_1.computed(() => {
                        var _a;
                        try {
                            return JSON.parse((_a = props.configurationValues["values"]) !== null && _a !== void 0 ? _a : '[]');
                        }
                        catch (_b) {
                            return [];
                        }
                    });
                    const options = vue_1.computed(() => {
                        const providedOptions = valueOptions.value.map(v => {
                            return {
                                text: v.text,
                                value: v.value
                            };
                        });
                        return providedOptions;
                    });
                    const optionsMultiple = vue_1.computed(() => {
                        return valueOptions.value.map(v => {
                            return {
                                text: v.text,
                                value: v.value
                            };
                        });
                    });
                    const isMultiple = vue_1.computed(() => Boolean_1.asBoolean(props.configurationValues["allowmultiple"]));
                    const configAttributes = vue_1.computed(() => {
                        const attributes = {};
                        const enhancedConfig = props.configurationValues["enhancedselection"];
                        if (enhancedConfig) {
                            attributes.enhanceForLongLists = Boolean_1.asBoolean(enhancedConfig);
                        }
                        return attributes;
                    });
                    vue_1.watch(() => props.modelValue, () => {
                        internalValue.value = parseModelValue(props.modelValue);
                        internalValues.value = parseModelValue(props.modelValue).split(',').filter(v => v !== '');
                    });
                    vue_1.watch(() => internalValue.value, () => {
                        if (!isMultiple.value) {
                            const clientValue = getClientValue(internalValue.value, valueOptions.value);
                            emit('update:modelValue', JSON.stringify(clientValue));
                        }
                    });
                    vue_1.watch(() => internalValues.value, () => {
                        if (isMultiple.value) {
                            const clientValue = getClientValue(internalValues.value, valueOptions.value);
                            emit('update:modelValue', JSON.stringify(clientValue));
                        }
                    });
                    return {
                        configAttributes,
                        internalValue,
                        internalValues,
                        isMultiple,
                        isRequired: vue_1.inject('isRequired'),
                        options,
                        optionsMultiple
                    };
                },
                template: `
<DropDownList v-if="!isMultiple" v-model="internalValue" v-bind="configAttributes" :options="options" :showBlankItem="!isRequired" />
<CheckBoxList v-else v-model="internalValues" :options="optionsMultiple" />
`
            }));
        }
    };
});
//# sourceMappingURL=DefinedValueFieldComponents.js.map