System.register(["vue", "../Rules/Index", "./BasicTimePicker", "./RockFormField"], function (exports_1, context_1) {
    "use strict";
    var vue_1, Index_1, BasicTimePicker_1, RockFormField_1;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (Index_1_1) {
                Index_1 = Index_1_1;
            },
            function (BasicTimePicker_1_1) {
                BasicTimePicker_1 = BasicTimePicker_1_1;
            },
            function (RockFormField_1_1) {
                RockFormField_1 = RockFormField_1_1;
            }
        ],
        execute: function () {
            exports_1("default", vue_1.defineComponent({
                name: 'TimePicker',
                components: {
                    RockFormField: RockFormField_1.default,
                    BasicTimePicker: BasicTimePicker_1.default
                },
                props: {
                    rules: {
                        type: String,
                        default: ''
                    },
                    modelValue: {
                        type: Object,
                        default: {}
                    }
                },
                data: function () {
                    return {
                        internalValue: {}
                    };
                },
                methods: {},
                computed: {
                    computedRules: function () {
                        var rules = Index_1.ruleStringToArray(this.rules);
                        return Index_1.ruleArrayToString(rules);
                    }
                },
                watch: {
                    modelValue: {
                        immediate: true,
                        handler: function () {
                            this.internalValue = this.modelValue;
                        }
                    },
                    internalValue: function () {
                        this.$emit("update:modelValue", this.internalValue);
                    }
                },
                template: "\n<RockFormField\n    :modelValue=\"internalValue\"\n    formGroupClasses=\"timepicker-input\"\n    name=\"time-picker\"\n    :rules=\"computedRules\">\n    <template #default=\"{uniqueId, field, errors, disabled}\">\n        <div class=\"control-wrapper\">\n            <div class=\"timepicker-input\">\n                <BasicTimePicker v-model=\"internalValue\" />\n            </div>\n        </div>\n    </template>\n</RockFormField>"
            }));
        }
    };
});
//# sourceMappingURL=TimePicker.js.map