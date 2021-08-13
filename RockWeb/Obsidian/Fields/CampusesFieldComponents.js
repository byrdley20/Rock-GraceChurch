System.register(["vue", "./Index", "../Elements/CheckBoxList", "@Obsidian/Services/Number"], function (exports_1, context_1) {
    "use strict";
    var vue_1, Index_1, CheckBoxList_1, Number_1, EditComponent;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (Index_1_1) {
                Index_1 = Index_1_1;
            },
            function (CheckBoxList_1_1) {
                CheckBoxList_1 = CheckBoxList_1_1;
            },
            function (Number_1_1) {
                Number_1 = Number_1_1;
            }
        ],
        execute: function () {
            exports_1("EditComponent", EditComponent = vue_1.defineComponent({
                name: 'CampusesField.Edit',
                components: {
                    CheckBoxList: CheckBoxList_1.default
                },
                props: Index_1.getFieldEditorProps(),
                setup(props, context) {
                    const internalValue = vue_1.ref(props.modelValue ? props.modelValue.split(',') : []);
                    const options = vue_1.computed(() => {
                        var _a;
                        try {
                            return JSON.parse((_a = props.configurationValues["values"]) !== null && _a !== void 0 ? _a : '[]');
                        }
                        catch (_b) {
                            return [];
                        }
                    });
                    const repeatColumns = vue_1.computed(() => {
                        var _a;
                        const repeatColumnsConfig = props.configurationValues["repeatColumns"];
                        return (_a = Number_1.toNumberOrNull(repeatColumnsConfig)) !== null && _a !== void 0 ? _a : 4;
                    });
                    vue_1.watch(() => props.modelValue, () => internalValue.value = props.modelValue ? props.modelValue.split(',') : []);
                    vue_1.watchEffect(() => context.emit('update:modelValue', internalValue.value.join(',')));
                    return {
                        internalValue,
                        options,
                        repeatColumns
                    };
                },
                template: `
<CheckBoxList v-model="internalValue" horizontal :options="options" :repeatColumns="repeatColumns" />
`
            }));
        }
    };
});
//# sourceMappingURL=CampusesFieldComponents.js.map