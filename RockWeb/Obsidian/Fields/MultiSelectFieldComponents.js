System.register(["vue", "./Index", "../Elements/ListBox", "../Elements/CheckBoxList", "@Obsidian/Services/Number", "@Obsidian/Services/Boolean"], function (exports_1, context_1) {
    "use strict";
    var vue_1, Index_1, ListBox_1, CheckBoxList_1, Number_1, Boolean_1, EditComponent;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (Index_1_1) {
                Index_1 = Index_1_1;
            },
            function (ListBox_1_1) {
                ListBox_1 = ListBox_1_1;
            },
            function (CheckBoxList_1_1) {
                CheckBoxList_1 = CheckBoxList_1_1;
            },
            function (Number_1_1) {
                Number_1 = Number_1_1;
            },
            function (Boolean_1_1) {
                Boolean_1 = Boolean_1_1;
            }
        ],
        execute: function () {
            exports_1("EditComponent", EditComponent = vue_1.defineComponent({
                name: 'MultiSelectFieldEdit',
                components: {
                    ListBox: ListBox_1.default,
                    CheckBoxList: CheckBoxList_1.default
                },
                props: Index_1.getFieldEditorProps(),
                setup() {
                    return {
                        isRequired: vue_1.inject('isRequired')
                    };
                },
                data() {
                    return {
                        internalValue: []
                    };
                },
                computed: {
                    options() {
                        var _a;
                        try {
                            const valuesConfig = JSON.parse((_a = this.configurationValues["values"]) !== null && _a !== void 0 ? _a : '[]');
                            return valuesConfig.map(v => {
                                return {
                                    text: v.text,
                                    value: v.value
                                };
                            });
                        }
                        catch (_b) {
                            return [];
                        }
                    },
                    listBoxConfigAttributes() {
                        const attributes = {};
                        const enhancedSelection = this.configurationValues["enhancedselection"];
                        if (Boolean_1.asBoolean(enhancedSelection)) {
                            attributes.enhanceForLongLists = true;
                        }
                        return attributes;
                    },
                    checkBoxListConfigAttributes() {
                        const attributes = {};
                        const repeatColumnsConfig = this.configurationValues["repeatColumns"];
                        const repeatDirection = this.configurationValues["repeatDirection"];
                        if (repeatColumnsConfig) {
                            attributes['repeatColumns'] = Number_1.toNumberOrNull(repeatColumnsConfig) || 0;
                        }
                        if (repeatDirection !== 'Vertical') {
                            attributes['horizontal'] = true;
                        }
                        return attributes;
                    },
                    isListBox() {
                        const enhancedSelection = this.configurationValues["enhancedselection"];
                        return Boolean_1.asBoolean(enhancedSelection);
                    }
                },
                watch: {
                    internalValue() {
                        this.$emit('update:modelValue', this.internalValue.join(','));
                    },
                    modelValue: {
                        immediate: true,
                        handler() {
                            const value = this.modelValue || '';
                            this.internalValue = value !== '' ? value.split(',') : [];
                        }
                    }
                },
                template: `
<ListBox v-if="isListBox" v-model="internalValue" v-bind="listBoxConfigAttributes" :options="options" />
<CheckBoxList v-else v-model="internalValue" v-bind="checkBoxListConfigAttributes" :options="options" />
`
            }));
        }
    };
});
//# sourceMappingURL=MultiSelectFieldComponents.js.map