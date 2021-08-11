System.register(["vue", "./Index", "../Elements/TextBox", "@Obsidian/Services/Boolean", "@Obsidian/Services/Number"], function (exports_1, context_1) {
    "use strict";
    var vue_1, Index_1, TextBox_1, Boolean_1, Number_1, EditComponent;
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
            exports_1("EditComponent", EditComponent = vue_1.defineComponent({
                name: 'MemoField',
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
                        const maxCharsConfig = this.configurationValues["maxcharacters"];
                        const maxCharsValue = Number_1.toNumber(maxCharsConfig);
                        if (maxCharsValue) {
                            attributes.maxLength = maxCharsValue;
                        }
                        const showCountDownConfig = this.configurationValues["showcountdown"];
                        const showCountDownValue = Boolean_1.asBooleanOrNull(showCountDownConfig) || false;
                        if (showCountDownValue) {
                            attributes.showCountDown = showCountDownValue;
                        }
                        const rowsConfig = this.configurationValues["numberofrows"];
                        const rows = Number_1.toNumber(rowsConfig || null) || 3;
                        if (rows > 0) {
                            attributes.rows = rows;
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
<TextBox v-model="internalValue" v-bind="configAttributes" textMode="MultiLine" />
`
            }));
        }
    };
});
//# sourceMappingURL=MemoFieldComponents.js.map