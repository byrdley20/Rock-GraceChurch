System.register(["vue", "./Index", "../Services/Number", "../Elements/NumberBox"], function (exports_1, context_1) {
    "use strict";
    var vue_1, Index_1, Number_1, NumberBox_1, fieldTypeGuid, ConfigurationValueKey;
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
            function (NumberBox_1_1) {
                NumberBox_1 = NumberBox_1_1;
            }
        ],
        execute: function () {
            fieldTypeGuid = 'A75DFC58-7A1B-4799-BF31-451B2BBE38FF';
            (function (ConfigurationValueKey) {
            })(ConfigurationValueKey || (ConfigurationValueKey = {}));
            exports_1("default", Index_1.registerFieldType(fieldTypeGuid, vue_1.defineComponent({
                name: 'IntegerField',
                components: {
                    NumberBox: NumberBox_1.default
                },
                props: Index_1.getFieldTypeProps(),
                data: function () {
                    return {
                        internalValue: null
                    };
                },
                computed: {
                    safeValue: function () {
                        return (this.modelValue || '').trim();
                    }
                },
                watch: {
                    internalValue: function () {
                        this.$emit('update:modelValue', this.internalValue !== null ? this.internalValue.toString() : '');
                    },
                    modelValue: {
                        immediate: true,
                        handler: function () {
                            this.internalValue = Number_1.toNumberOrNull(this.modelValue || '');
                        }
                    }
                },
                template: "\n<NumberBox v-if=\"isEditMode\" v-model=\"internalValue\" rules=\"integer\" :decimal-count=\"0\" />\n<span v-else>{{ safeValue }}</span>"
            })));
        }
    };
});
//# sourceMappingURL=IntegerField.js.map