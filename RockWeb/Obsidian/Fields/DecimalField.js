System.register(["vue", "./Index", "@Obsidian/Services/Number", "../Elements/NumberBox"], function (exports_1, context_1) {
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
            fieldTypeGuid = 'C757A554-3009-4214-B05D-CEA2B2EA6B8F';
            (function (ConfigurationValueKey) {
            })(ConfigurationValueKey || (ConfigurationValueKey = {}));
            exports_1("default", Index_1.registerFieldType(fieldTypeGuid, vue_1.defineComponent({
                name: 'DecimalField',
                components: {
                    NumberBox: NumberBox_1.default
                },
                props: Index_1.getFieldTypeProps(),
                data() {
                    return {
                        internalValue: null
                    };
                },
                computed: {
                    displayValue() {
                        return (this.modelValue || '').trim();
                    }
                },
                watch: {
                    internalValue() {
                        this.$emit('update:modelValue', this.internalValue !== null ? this.internalValue.toString() : '');
                    },
                    modelValue: {
                        immediate: true,
                        handler() {
                            this.internalValue = Number_1.toNumberOrNull(this.modelValue || '');
                        }
                    }
                },
                template: `
<NumberBox v-if="isEditMode" v-model="internalValue" rules="decimal" />
<span v-else>{{ displayValue }}</span>`
            })));
        }
    };
});
//# sourceMappingURL=DecimalField.js.map