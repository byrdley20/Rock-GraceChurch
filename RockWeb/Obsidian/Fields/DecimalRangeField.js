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
            fieldTypeGuid = '758D9648-573E-4800-B5AF-7CC29F4BE170';
            (function (ConfigurationValueKey) {
            })(ConfigurationValueKey || (ConfigurationValueKey = {}));
            exports_1("default", Index_1.registerFieldType(fieldTypeGuid, vue_1.defineComponent({
                name: 'IntegerRangeField',
                components: {
                    NumberRangeBox: NumberRangeBox_1.default
                },
                props: Index_1.getFieldTypeProps(),
                data: function () {
                    return {
                        internalValue: {}
                    };
                },
                computed: {
                    displayValue: function () {
                        var _a, _b;
                        if (this.internalValue.lower === null && this.internalValue.upper === null) {
                            return "";
                        }
                        else {
                            return ((_a = this.internalValue.lower) !== null && _a !== void 0 ? _a : "") + " to " + ((_b = this.internalValue.upper) !== null && _b !== void 0 ? _b : "");
                        }
                    }
                },
                watch: {
                    internalValue: function () {
                        var _a, _b;
                        var value = ((_a = this.internalValue.lower) !== null && _a !== void 0 ? _a : "") + "," + ((_b = this.internalValue.upper) !== null && _b !== void 0 ? _b : "");
                        this.$emit('update:modelValue', value !== "," ? value : "");
                    },
                    modelValue: {
                        immediate: true,
                        handler: function () {
                            var _a;
                            var values = ((_a = this.modelValue) !== null && _a !== void 0 ? _a : "").split(",");
                            var lower = Number_1.toNumberOrNull(values[0]);
                            var upper = values.length >= 2 ? Number_1.toNumberOrNull(values[1]) : null;
                            if (lower !== this.internalValue.lower || upper !== this.internalValue.upper) {
                                this.internalValue = {
                                    lower: lower,
                                    upper: upper
                                };
                            }
                        }
                    }
                },
                template: "\n<NumberRangeBox v-if=\"isEditMode\" v-model=\"internalValue\" />\n<span v-else>{{ displayValue }}</span>"
            })));
        }
    };
});
//# sourceMappingURL=DecimalRangeField.js.map