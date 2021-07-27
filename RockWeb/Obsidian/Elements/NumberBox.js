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
                name: 'NumberBox',
                components: {
                    RockFormField: RockFormField_1.default
                },
                props: {
                    modelValue: {
                        type: Number,
                        default: null
                    },
                    placeholder: {
                        type: String,
                        default: ''
                    },
                    minimumValue: {
                        type: Number
                    },
                    maximumValue: {
                        type: Number
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
                        internalValue: '',
                    };
                },
                methods: {
                    onChange: function () {
                        var _a;
                        this.internalValue = Number_1.asFormattedString(this.modelValue, (_a = this.internalDecimalCount) !== null && _a !== void 0 ? _a : undefined);
                    }
                },
                computed: {
                    internalNumberValue: function () {
                        return Number_1.toNumberOrNull(this.internalValue);
                    },
                    internalDecimalCount: function () {
                        return this.decimalCount;
                    },
                    internalStep: function () {
                        return this.internalDecimalCount === null ? "any" : (1 / Math.pow(10, this.internalDecimalCount)).toString();
                    },
                    computedRules: function () {
                        var rules = Index_1.ruleStringToArray(this.rules);
                        if (this.maximumValue !== null && this.maximumValue !== undefined) {
                            rules.push("lte:" + this.maximumValue);
                        }
                        if (this.minimumValue !== null && this.minimumValue !== undefined) {
                            rules.push("gte:" + this.minimumValue);
                        }
                        return Index_1.ruleArrayToString(rules);
                    },
                    isGrouped: function () {
                        return this.$slots.prepend !== undefined || this.$slots.append !== undefined;
                    }
                },
                watch: {
                    internalNumberValue: function () {
                        this.$emit('update:modelValue', this.internalNumberValue);
                    },
                    modelValue: {
                        immediate: true,
                        handler: function () {
                            var _a;
                            if (this.modelValue !== this.internalNumberValue) {
                                this.internalValue = Number_1.asFormattedString(this.modelValue, (_a = this.internalDecimalCount) !== null && _a !== void 0 ? _a : undefined);
                            }
                        }
                    }
                },
                template: "\n<RockFormField\n    v-model=\"internalValue\"\n    @change=\"onChange\"\n    formGroupClasses=\"rock-number-box\"\n    name=\"numberbox\"\n    :rules=\"computedRules\">\n    <template #default=\"{uniqueId, field, errors, disabled, tabIndex}\">\n        <div class=\"control-wrapper\">\n            <div class=\"input-group\" v-if=\"isGrouped\">\n                <slot name=\"prepend\"></slot>\n                <input\n                    :id=\"uniqueId\"\n                    type=\"number\"\n                    class=\"form-control\"\n                    :class=\"inputClasses\"\n                    v-bind=\"field\"\n                    :disabled=\"disabled\"\n                    :placeholder=\"placeholder\"\n                    :tabindex=\"tabIndex\"\n                    :step=\"internalStep\"\n                    :min=\"minimumValue\"\n                    :max=\"maximumValue\" />\n                <slot name=\"append\"></slot>\n            </div>\n\n            <input v-else\n                :id=\"uniqueId\"\n                type=\"number\"\n                class=\"form-control\"\n                :class=\"inputClasses\"\n                v-bind=\"field\"\n                :disabled=\"disabled\"\n                :placeholder=\"placeholder\"\n                :tabindex=\"tabIndex\"\n                :step=\"internalStep\"\n                :min=\"minimumValue\"\n                :max=\"maximumValue\" />\n        </div>\n    </template>\n</RockFormField>"
            }));
        }
    };
});
//# sourceMappingURL=NumberBox.js.map