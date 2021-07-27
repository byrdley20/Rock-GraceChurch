System.register(["vue", "./Index", "../Elements/EmailBox"], function (exports_1, context_1) {
    "use strict";
    var vue_1, Index_1, EmailBox_1, fieldTypeGuid, ConfigurationValueKey;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (Index_1_1) {
                Index_1 = Index_1_1;
            },
            function (EmailBox_1_1) {
                EmailBox_1 = EmailBox_1_1;
            }
        ],
        execute: function () {
            fieldTypeGuid = '3D045CAE-EA72-4A04-B7BE-7FD1D6214217';
            (function (ConfigurationValueKey) {
            })(ConfigurationValueKey || (ConfigurationValueKey = {}));
            exports_1("default", Index_1.registerFieldType(fieldTypeGuid, vue_1.defineComponent({
                name: 'EmailField',
                components: {
                    EmailBox: EmailBox_1.default
                },
                props: Index_1.getFieldTypeProps(),
                data() {
                    return {
                        internalValue: ''
                    };
                },
                computed: {
                    safeValue() {
                        return (this.modelValue || '').trim();
                    },
                },
                watch: {
                    internalValue() {
                        this.$emit('update:modelValue', this.internalValue);
                    },
                    modelValue: {
                        immediate: true,
                        handler() {
                            this.internalValue = this.modelValue || '';
                        }
                    }
                },
                template: `
<EmailBox v-if="isEditMode" v-model="internalValue" />
<span v-else>{{ safeValue }}</span>`
            })));
        }
    };
});
//# sourceMappingURL=EmailField.js.map