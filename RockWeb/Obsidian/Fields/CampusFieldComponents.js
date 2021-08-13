System.register(["vue", "./Index", "../Elements/DropDownList"], function (exports_1, context_1) {
    "use strict";
    var vue_1, Index_1, DropDownList_1, EditComponent;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (Index_1_1) {
                Index_1 = Index_1_1;
            },
            function (DropDownList_1_1) {
                DropDownList_1 = DropDownList_1_1;
            }
        ],
        execute: function () {
            exports_1("EditComponent", EditComponent = vue_1.defineComponent({
                name: 'CampusField.Edit',
                components: {
                    DropDownList: DropDownList_1.default
                },
                props: Index_1.getFieldEditorProps(),
                setup(props, context) {
                    var _a;
                    const internalValue = vue_1.ref((_a = props.modelValue) !== null && _a !== void 0 ? _a : '');
                    const options = vue_1.computed(() => {
                        var _a;
                        try {
                            const valueOptions = JSON.parse((_a = props.configurationValues["values"]) !== null && _a !== void 0 ? _a : '[]');
                            return valueOptions.map(o => {
                                return {
                                    value: o.value,
                                    text: o.text
                                };
                            });
                        }
                        catch (_b) {
                            return [];
                        }
                    });
                    vue_1.watch(() => props.modelValue, () => { var _a; return internalValue.value = (_a = props.modelValue) !== null && _a !== void 0 ? _a : ''; });
                    vue_1.watchEffect(() => context.emit('update:modelValue', internalValue.value));
                    return {
                        internalValue,
                        options
                    };
                },
                template: `
<DropDownList v-model="internalValue" :options="options" />
`
            }));
        }
    };
});
//# sourceMappingURL=CampusFieldComponents.js.map