System.register(["vue", "./Index", "../Elements/PhoneNumberBox"], function (exports_1, context_1) {
    "use strict";
    var vue_1, Index_1, PhoneNumberBox_1, EditComponent;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (Index_1_1) {
                Index_1 = Index_1_1;
            },
            function (PhoneNumberBox_1_1) {
                PhoneNumberBox_1 = PhoneNumberBox_1_1;
            }
        ],
        execute: function () {
            exports_1("EditComponent", EditComponent = vue_1.defineComponent({
                name: 'PhoneNumber',
                components: {
                    PhoneNumberBox: PhoneNumberBox_1.default
                },
                props: Index_1.getFieldEditorProps(),
                data() {
                    return {
                        internalValue: ''
                    };
                },
                computed: {
                    configAttributes() {
                        const attributes = {};
                        return attributes;
                    }
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
<PhoneNumberBox v-model="internalValue" v-bind="configAttributes" />
`
            }));
        }
    };
});
//# sourceMappingURL=PhoneNumberFieldComponents.js.map