System.register(["vue", "./Index", "../Services/Number", "../Elements/NumberRangeBox"], function (exports_1, context_1) {
    "use strict";
    var vue_1, Index_1, Number_1, NumberRangeBox_1, fieldTypeGuid, ConfigurationValueKey;
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
            function (NumberRangeBox_1_1) {
                NumberRangeBox_1 = NumberRangeBox_1_1;
            }
        ],
        execute: function () {
            fieldTypeGuid = '9D5F21E0-DEA0-4E8E-BA42-71151F6A8ED4';
            (function (ConfigurationValueKey) {
            })(ConfigurationValueKey || (ConfigurationValueKey = {}));
            exports_1("default", Index_1.registerFieldType(fieldTypeGuid, vue_1.defineComponent({
                name: 'IntegerRangeField',
                components: {
                    NumberRangeBox: NumberRangeBox_1.default
                },
                props: Index_1.getFieldTypeProps(),
                data() {
                    return {
                        internalValue: {}
                    };
                },
                computed: {
                    displayValue() {
                        var _a, _b;
                        if (this.internalValue.lower === null && this.internalValue.upper === null) {
                            return "";
                        }
                        else {
                            return `${(_a = this.internalValue.lower) !== null && _a !== void 0 ? _a : ""} to ${(_b = this.internalValue.upper) !== null && _b !== void 0 ? _b : ""}`;
                        }
                    }
                },
                watch: {
                    internalValue() {
                        var _a, _b;
                        const value = `${(_a = this.internalValue.lower) !== null && _a !== void 0 ? _a : ""},${(_b = this.internalValue.upper) !== null && _b !== void 0 ? _b : ""}`;
                        this.$emit('update:modelValue', value !== "," ? value : "");
                    },
                    modelValue: {
                        immediate: true,
                        handler() {
                            var _a;
                            const values = ((_a = this.modelValue) !== null && _a !== void 0 ? _a : "").split(",");
                            const lower = Number_1.toNumberOrNull(values[0]);
                            const upper = values.length >= 2 ? Number_1.toNumberOrNull(values[1]) : null;
                            if (lower !== this.internalValue.lower || upper !== this.internalValue.upper) {
                                this.internalValue = {
                                    lower: lower,
                                    upper: upper
                                };
                            }
                        }
                    }
                },
                template: `
<NumberRangeBox v-if="isEditMode" v-model="internalValue" :decimal-count="0" />
<span v-else>{{ displayValue }}</span>`
            })));
        }
    };
});
//# sourceMappingURL=IntegerRangeField.js.map