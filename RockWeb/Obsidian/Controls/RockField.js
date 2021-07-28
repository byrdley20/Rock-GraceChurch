System.register(["../Fields/Index", "vue", "../Fields/TextField", "../Fields/BooleanField", "../Fields/CurrencyField", "../Fields/DateField", "../Fields/DateTimeField", "../Fields/DayOfWeekField", "../Fields/DaysOfWeekField", "../Fields/DecimalField", "../Fields/DecimalRangeField", "../Fields/DefinedValueField", "../Fields/EmailField", "../Fields/GenderField", "../Fields/IntegerField", "../Fields/IntegerRangeField", "../Fields/MemoField", "../Fields/MonthDayField", "../Fields/SingleSelect", "../Fields/PhoneNumber", "../Fields/RatingField", "../Fields/TimeField"], function (exports_1, context_1) {
    "use strict";
    var Index_1, vue_1, TextField_1;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (Index_1_1) {
                Index_1 = Index_1_1;
            },
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (TextField_1_1) {
                TextField_1 = TextField_1_1;
            },
            function (_1) {
            },
            function (_2) {
            },
            function (_3) {
            },
            function (_4) {
            },
            function (_5) {
            },
            function (_6) {
            },
            function (_7) {
            },
            function (_8) {
            },
            function (_9) {
            },
            function (_10) {
            },
            function (_11) {
            },
            function (_12) {
            },
            function (_13) {
            },
            function (_14) {
            },
            function (_15) {
            },
            function (_16) {
            },
            function (_17) {
            },
            function (_18) {
            },
            function (_19) {
            }
        ],
        execute: function () {
            Index_1.registerFieldType("D747E6AE-C383-4E22-8846-71518E3DD06F", vue_1.defineAsyncComponent(() => context_1.import('../Fields/ColorField')));
            exports_1("default", vue_1.defineComponent({
                name: 'RockField',
                props: {
                    fieldTypeGuid: {
                        type: String,
                        required: true
                    },
                    rules: {
                        type: String,
                        default: ''
                    }
                },
                setup(props) {
                    const isRequired = vue_1.computed(() => props.rules.includes('required'));
                    vue_1.provide('isRequired', isRequired);
                },
                computed: {
                    fieldComponent() {
                        const field = Index_1.getFieldTypeComponent(this.fieldTypeGuid);
                        if (!field) {
                            return TextField_1.default.component;
                        }
                        return field;
                    }
                },
                template: `
<component :is="fieldComponent" :rules="rules" />`
            }));
        }
    };
});
//# sourceMappingURL=RockField.js.map