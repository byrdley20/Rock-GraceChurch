System.register(["vue", "./Index", "@Obsidian/Services/Number", "../Elements/NumberBox"], function (exports_1, context_1) {
    "use strict";
    var vue_1, Index_1, Number_1, NumberBox_1, EditComponent;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (Index_1_1) {
                Index_1 = Index_1_1;
            },
            function (Number_1_1) {
                Number_1 = Number_1_1;
            },
            function (NumberBox_1_1) {
                NumberBox_1 = NumberBox_1_1;
            }
        ],
        execute: function () {
            exports_1("EditComponent", EditComponent = vue_1.defineComponent({
                name: 'IntegerField',
                components: {
                    NumberBox: NumberBox_1.default
                },
                props: Index_1.getFieldEditorProps(),
                data() {
                    return {
                        internalValue: null
                    };
                },
                watch: {
                    internalValue() {
                        this.$emit('update:modelValue', this.internalValue !== null ? this.internalValue.toString() : '');
                    },
                    modelValue: {
                        immediate: true,
                        handler() {
                            this.internalValue = Number_1.toNumberOrNull(this.modelValue || '');
                        }
                    }
                },
                template: `
<NumberBox v-model="internalValue" rules="integer" :decimal-count="0" />
`
            }));
        }
    };
});
//# sourceMappingURL=IntegerFieldComponents.js.map