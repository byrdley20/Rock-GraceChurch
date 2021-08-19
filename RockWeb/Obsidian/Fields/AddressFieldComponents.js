System.register(["vue", "./Index", "../Controls/AddressControl"], function (exports_1, context_1) {
    "use strict";
    var vue_1, Index_1, AddressControl_1, EditComponent;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (Index_1_1) {
                Index_1 = Index_1_1;
            },
            function (AddressControl_1_1) {
                AddressControl_1 = AddressControl_1_1;
            }
        ],
        execute: function () {
            exports_1("EditComponent", EditComponent = vue_1.defineComponent({
                name: 'AddressFieldEdit',
                components: {
                    AddressControl: AddressControl_1.default
                },
                props: Index_1.getFieldEditorProps(),
                setup(props, { emit }) {
                    const internalValue = vue_1.ref({});
                    vue_1.watch(() => props.modelValue, () => {
                        try {
                            internalValue.value = JSON.parse(props.modelValue || '{}');
                        }
                        catch (_a) {
                            internalValue.value = {};
                        }
                    }, { immediate: true });
                    vue_1.watch(() => internalValue.value, () => {
                        emit('update:modelValue', JSON.stringify(internalValue.value));
                    }, { deep: true });
                    return {
                        internalValue
                    };
                },
                template: `
<AddressControl v-model="internalValue" />
`
            }));
        }
    };
});
//# sourceMappingURL=AddressFieldComponents.js.map