System.register(["vue", "./Index", "../Services/Number", "../Elements/CurrencyBox"], function (exports_1, context_1) {
    "use strict";
    var vue_1, Index_1, Number_1, CurrencyBox_1, fieldTypeGuid, ConfigurationValueKey;
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
            function (CurrencyBox_1_1) {
                CurrencyBox_1 = CurrencyBox_1_1;
            }
        ],
        execute: function () {
            fieldTypeGuid = '3EE69CBC-35CE-4496-88CC-8327A447603F';
            (function (ConfigurationValueKey) {
            })(ConfigurationValueKey || (ConfigurationValueKey = {}));
            exports_1("default", Index_1.registerFieldType(fieldTypeGuid, vue_1.defineComponent({
                name: 'CurrencyField',
                components: {
                    CurrencyBox: CurrencyBox_1.default
                },
                props: Index_1.getFieldTypeProps(),
                data() {
                    return {
                        internalValue: null
                    };
                },
                computed: {
                    safeValue() {
                        var _a;
                        return (_a = Number_1.toCurrencyOrNull((this.modelValue || '').trim())) !== null && _a !== void 0 ? _a : "";
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
<CurrencyBox v-if="isEditMode" v-model="internalValue" />
<span v-else>{{ safeValue }}</span>`
            })));
        }
    };
});
//# sourceMappingURL=CurrencyField.js.map