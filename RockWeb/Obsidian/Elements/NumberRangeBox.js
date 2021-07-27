System.register(["vue", "../Rules/Index", "../Services/Number", "./RockFormField"], function (exports_1, context_1) {
    "use strict";
    var vue_1, Index_1, Number_1, RockFormField_1;
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
            function (RockFormField_1_1) {
                RockFormField_1 = RockFormField_1_1;
            }
        ],
        execute: function () {
            exports_1("default", vue_1.defineComponent({
                name: 'NumberRangeBox',
                components: {
                    RockFormField: RockFormField_1.default
                },
                props: {
                    modelValue: {
                        type: Object,
                        default: { lower: null, upper: null }
                    },
                    decimalCount: {
                        type: Number,
                        default: null
                    },
                    inputClasses: {
                        type: String,
                        default: ''
                    },
                    rules: {
                        type: String,
                        default: ''
                    }
                },
                emits: [
                    'update:modelValue'
                ],
                data: function () {
                    return {
                        internalValue: {
                            lower: '',
                            upper: ''
                        },
                        validationValue: ''
                    };
                },
                methods: {},
                computed: {
                    computedValue: function () {
                        return {
                            lower: Number_1.toNumberOrNull(this.internalValue.lower),
                            upper: Number_1.toNumberOrNull(this.internalValue.upper)
                        };
                    },
                    internalDecimalCount: function () {
                        return this.decimalCount;
                    },
                    internalStep: function () {
                        return this.internalDecimalCount === null ? "any" : (1 / Math.pow(10, this.internalDecimalCount)).toString();
                    },
                    computedRules: function () {
                        var rules = Index_1.ruleStringToArray(this.rules);
                        return Index_1.ruleArrayToString(rules);
                    },
                },
                watch: {
                    computedValue: function () {
                        this.$emit('update:modelValue', this.computedValue);
                    },
                    internalValue: function () {
                        var _a, _b;
                        var value = ((_a = this.internalValue.lower) !== null && _a !== void 0 ? _a : "") + "," + ((_b = this.internalValue.upper) !== null && _b !== void 0 ? _b : "");
                        this.validationValue = value;
                        var emitValue = {
                            lower: Number_1.toNumberOrNull(this.internalValue.lower),
                            upper: Number_1.toNumberOrNull(this.internalValue.upper)
                        };
                        this.$emit('update:modelValue', emitValue);
                    },
                    modelValue: {
                        immediate: true,
                        handler: function () {
                            var lower = this.modelValue.lower !== null ? this.modelValue.lower.toString() : "";
                            var upper = this.modelValue.upper !== null ? this.modelValue.upper.toString() : "";
                            if (this.internalValue.lower !== lower || this.internalValue.upper !== upper) {
                                this.internalValue = {
                                    lower: lower,
                                    upper: upper
                                };
                            }
                        }
                    }
                },
                template: "\n<RockFormField\n    v-model=\"validationValue\"\n    formGroupClasses=\"number-range-editor\"\n    name=\"number-range-box\"\n    :rules=\"computedRules\">\n    <template #default=\"{uniqueId, field, errors, disabled, tabIndex}\">\n        <div class=\"control-wrapper\">\n            <div class=\"form-control-group\">\n                <input\n                    :id=\"uniqueId + '_lower'\"\n                    type=\"number\"\n                    class=\"input-width-md form-control\"\n                    :class=\"inputClasses\"\n                    v-model=\"internalValue.lower\"\n                    :disabled=\"disabled\"\n                    :tabindex=\"tabIndex\"\n                    :step=\"internalStep\" />\n                <span class=\"to\">to</span>\n                <input\n                    :id=\"uniqueId + '_upper'\"\n                    type=\"number\"\n                    class=\"input-width-md form-control\"\n                    :class=\"inputClasses\"\n                    v-model=\"internalValue.upper\"\n                    :disabled=\"disabled\"\n                    :tabindex=\"tabIndex\"\n                    :step=\"internalStep\" />\n            </div>\n        </div>\n    </template>\n</RockFormField>"
            }));
        }
    };
});
//# sourceMappingURL=NumberRangeBox.js.map