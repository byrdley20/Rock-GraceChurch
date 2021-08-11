System.register(["vue", "./Index", "@Obsidian/Services/Number", "../Elements/DatePartsPicker"], function (exports_1, context_1) {
    "use strict";
    var vue_1, Index_1, Number_1, DatePartsPicker_1, EditComponent;
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
            function (DatePartsPicker_1_1) {
                DatePartsPicker_1 = DatePartsPicker_1_1;
            }
        ],
        execute: function () {
            exports_1("EditComponent", EditComponent = vue_1.defineComponent({
                name: 'MonthDayField',
                components: {
                    DatePartsPicker: DatePartsPicker_1.default
                },
                props: Index_1.getFieldEditorProps(),
                data() {
                    return {
                        internalValue: {
                            year: 0,
                            month: 0,
                            day: 0
                        }
                    };
                },
                watch: {
                    internalValue() {
                        const value = this.internalValue.month !== 0 && this.internalValue.day !== 0
                            ? `${this.internalValue.month}/${this.internalValue.day}`
                            : "";
                        this.$emit('update:modelValue', value);
                    },
                    modelValue: {
                        immediate: true,
                        handler() {
                            const components = (this.modelValue || "").split("/");
                            if (components.length == 2) {
                                this.internalValue = {
                                    year: 0,
                                    month: Number_1.toNumber(components[0]),
                                    day: Number_1.toNumber(components[1])
                                };
                            }
                            else {
                                this.internalValue = {
                                    year: 0,
                                    month: 0,
                                    day: 0
                                };
                            }
                        }
                    }
                },
                template: `
<DatePartsPicker v-model="internalValue" :showYear="false" />
`
            }));
        }
    };
});
//# sourceMappingURL=MonthDayFieldComponents.js.map