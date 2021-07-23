System.register(["vue", "./NumberBox"], function (exports_1, context_1) {
    "use strict";
    var vue_1, NumberBox_1;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (NumberBox_1_1) {
                NumberBox_1 = NumberBox_1_1;
            }
        ],
        execute: function () {
            exports_1("default", vue_1.defineComponent({
                name: 'CurrencyBox',
                components: {
                    NumberBox: NumberBox_1.default
                },
                props: {
                    modelValue: {
                        type: Number,
                        default: null
                    },
                    minimumValue: {
                        type: Number
                    },
                    maximumValue: {
                        type: Number
                    },
                },
                emits: [
                    'update:modelValue'
                ],
                data: function () {
                    return {
                        internalValue: null
                    };
                },
                computed: {
                    placeholder: function () {
                        return "0.00";
                    }
                },
                watch: {
                    internalValue: function () {
                        this.$emit('update:modelValue', this.internalValue);
                    },
                    modelValue: {
                        immediate: true,
                        handler: function () {
                            if (this.modelValue !== this.internalValue) {
                                this.internalValue = this.modelValue;
                            }
                        }
                    }
                },
                template: "\n<NumberBox v-model=\"internalValue\"\n    :placeholder=\"placeholder\"\n    :minimum-value=\"minimumValue\"\n    :maximum-value=\"maximumValue\"\n    :decimal-count=\"2\"\n    rules=\"decimal\">\n    <template v-slot:prepend>\n        <span class=\"input-group-addon\">$</span>\n    </template>\n</NumberBox>\n"
            }));
        }
    };
});
//# sourceMappingURL=CurrencyBox.js.map