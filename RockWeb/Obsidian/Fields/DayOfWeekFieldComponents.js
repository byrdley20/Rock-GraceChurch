System.register(["vue", "./Index", "../Elements/DropDownList"], function (exports_1, context_1) {
    "use strict";
    var vue_1, Index_1, DropDownList_1, EditComponent;
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
            }
        ],
        execute: function () {
            exports_1("EditComponent", EditComponent = vue_1.defineComponent({
                name: 'DayOfWeekField',
                components: {
                    DropDownList: DropDownList_1.default
                },
                props: Index_1.getFieldEditorProps(),
                data() {
                    return {
                        internalValue: ''
                    };
                },
                methods: {
                    options() {
                        return [
                            { text: 'Sunday', value: 0..toString() },
                            { text: 'Monday', value: 1..toString() },
                            { text: 'Tuesday', value: 2..toString() },
                            { text: 'Wednesday', value: 3..toString() },
                            { text: 'Thursday', value: 4..toString() },
                            { text: 'Friday', value: 5..toString() },
                            { text: 'Saturday', value: 6..toString() }
                        ];
                    },
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
<DropDownList v-model="internalValue" :options="options()" />
`
            }));
        }
    };
});
//# sourceMappingURL=DayOfWeekFieldComponents.js.map