System.register(["vue", "./Index", "../Elements/EmailBox"], function (exports_1, context_1) {
    "use strict";
    var vue_1, Index_1, EmailBox_1, EditComponent;
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
            exports_1("EditComponent", EditComponent = vue_1.defineComponent({
                name: 'EmailField',
                components: {
                    EmailBox: EmailBox_1.default
                },
                props: Index_1.getFieldEditorProps(),
                data() {
                    return {
                        internalValue: ''
                    };
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
<EmailBox v-model="internalValue" />
`
            }));
        }
    };
});
//# sourceMappingURL=EmailFieldComponents.js.map