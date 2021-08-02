System.register(["vue", "./Index", "@Obsidian/Services/Number", "../Elements/DatePartsPicker"], function (exports_1, context_1) {
    "use strict";
    var vue_1, Index_1, Number_1, DatePartsPicker_1, fieldTypeGuid, ConfigurationValueKey;
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
            fieldTypeGuid = '8BED8DD8-8167-4052-B807-A1E72C133611';
            (function (ConfigurationValueKey) {
            })(ConfigurationValueKey || (ConfigurationValueKey = {}));
            exports_1("default", Index_1.registerFieldType(fieldTypeGuid, vue_1.defineComponent({
                name: 'MonthDayField',
                components: {
                    DatePartsPicker: DatePartsPicker_1.default
                },
                props: Index_1.getFieldTypeProps(),
                data() {
                    return {
                        internalValue: {
                            year: 0,
                            month: 0,
                            day: 0
                        }
                    };
                },
                computed: {
                    displayValue() {
                        const components = (this.modelValue || "").split("/");
                        if (components.length == 2) {
                            const month = Number_1.toNumber(components[0]);
                            const day = Number_1.toNumber(components[1]);
                            if (month !== 0 && day !== 0 && month <= 12) {
                                const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                                return `${months[month]} ${day}`;
                            }
                        }
                        return "";
                    }
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
<DatePartsPicker v-show="isEditMode" v-model="internalValue" :showYear="false" />
<span v-else>{{ displayValue }}</span>`
            })));
        }
    };
});
//# sourceMappingURL=MonthDayField.js.map