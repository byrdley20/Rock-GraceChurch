System.register(["vue", "../../../Controls/RockField", "../../../Elements/Alert", "./RegistrationEntryBlockViewModel"], function (exports_1, context_1) {
    "use strict";
    var vue_1, RockField_1, Alert_1, RegistrationEntryBlockViewModel_1;
    var __moduleName = context_1 && context_1.id;
    function isRuleMet(rule, fieldValues) {
        const value = fieldValues[rule.comparedToRegistrationTemplateFormFieldGuid] || '';
        if (typeof value !== 'string') {
            return false;
        }
        const strVal = value.toLowerCase().trim();
        const comparison = rule.comparedToValue.toLowerCase().trim();
        if (!strVal) {
            return false;
        }
        switch (rule.comparisonType) {
            case RegistrationEntryBlockViewModel_1.ComparisonType.EqualTo:
                return strVal === comparison;
            case RegistrationEntryBlockViewModel_1.ComparisonType.NotEqualTo:
                return strVal !== comparison;
            case RegistrationEntryBlockViewModel_1.ComparisonType.Contains:
                return strVal.includes(comparison);
            case RegistrationEntryBlockViewModel_1.ComparisonType.DoesNotContain:
                return !strVal.includes(comparison);
        }
        return false;
    }
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (RockField_1_1) {
                RockField_1 = RockField_1_1;
            },
            function (Alert_1_1) {
                Alert_1 = Alert_1_1;
            },
            function (RegistrationEntryBlockViewModel_1_1) {
                RegistrationEntryBlockViewModel_1 = RegistrationEntryBlockViewModel_1_1;
            }
        ],
        execute: function () {
            exports_1("default", vue_1.defineComponent({
                name: 'Event.RegistrationEntry.RegistrantAttributeField',
                components: {
                    Alert: Alert_1.default,
                    RockField: RockField_1.default
                },
                props: {
                    field: {
                        type: Object,
                        required: true
                    },
                    fieldValues: {
                        type: Object,
                        required: true
                    }
                },
                setup(props) {
                    var _a, _b, _c;
                    const isVisible = vue_1.computed(() => {
                        switch (props.field.visibilityRuleType) {
                            case RegistrationEntryBlockViewModel_1.FilterExpressionType.GroupAll:
                                return props.field.visibilityRules.every(vr => isRuleMet(vr, props.fieldValues));
                            case RegistrationEntryBlockViewModel_1.FilterExpressionType.GroupAllFalse:
                                return props.field.visibilityRules.every(vr => !isRuleMet(vr, props.fieldValues));
                            case RegistrationEntryBlockViewModel_1.FilterExpressionType.GroupAny:
                                return props.field.visibilityRules.some(vr => isRuleMet(vr, props.fieldValues));
                            case RegistrationEntryBlockViewModel_1.FilterExpressionType.GroupAnyFalse:
                                return props.field.visibilityRules.some(vr => !isRuleMet(vr, props.fieldValues));
                        }
                        return true;
                    });
                    const attribute = vue_1.reactive(Object.assign(Object.assign({}, props.field.attribute), { value: (_c = (_a = props.fieldValues[props.field.guid]) !== null && _a !== void 0 ? _a : (_b = props.field.attribute) === null || _b === void 0 ? void 0 : _b.value) !== null && _c !== void 0 ? _c : '' }));
                    vue_1.watch(() => attribute.value, (value) => {
                        props.fieldValues[props.field.guid] = value;
                    });
                    return {
                        isVisible,
                        attribute
                    };
                },
                template: `
<template v-if="isVisible">
    <RockField v-if="attribute" isEditMode :attributeValue="attribute" />
    <Alert v-else alertType="danger">Could not resolve attribute field</Alert>
</template>`
            }));
        }
    };
});
//# sourceMappingURL=RegistrantAttributeField.js.map