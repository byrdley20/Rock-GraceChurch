System.register(["vue", "./Index", "../Elements/CheckBoxList", "@Obsidian/Services/Number"], function (exports_1, context_1) {
    "use strict";
    var vue_1, Index_1, CheckBoxList_1, Number_1, EditComponent;
    var __moduleName = context_1 && context_1.id;
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
            function (Number_1_1) {
                Number_1 = Number_1_1;
            }
        ],
        execute: function () {
            exports_1("EditComponent", EditComponent = vue_1.defineComponent({
                name: 'DaysOfWeekField',
                components: {
                    CheckBoxList: CheckBoxList_1.default
                },
                props: Index_1.getFieldEditorProps(),
                data() {
                    return {
                        internalValue: [],
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
                        this.$emit('update:modelValue', this.internalValue.sort((a, b) => Number_1.toNumber(a) - Number_1.toNumber(b)).join(","));
                    },
                    modelValue: {
                        immediate: true,
                        handler() {
                            var _a;
                            const value = (_a = this.modelValue) !== null && _a !== void 0 ? _a : "";
                            this.internalValue = value !== "" ? value.split(",") : [];
                        }
                    }
                },
                template: `
<CheckBoxList v-model="internalValue" :options="options()" />
`
            }));
        }
    };
});
//# sourceMappingURL=DaysOfWeekFieldComponents.js.map