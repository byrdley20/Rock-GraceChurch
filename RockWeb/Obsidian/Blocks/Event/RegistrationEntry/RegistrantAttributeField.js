System.register(["vue", "../../../Controls/RockField", "../../../Elements/Alert", "./RegistrationEntryBlockViewModel"], function (exports_1, context_1) {
    "use strict";
    var vue_1, RockField_1, Alert_1, RegistrationEntryBlockViewModel_1;
    var __moduleName = context_1 && context_1.id;
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
                data() {
                    return {
                        fieldControlComponent: null,
                        fieldControlComponentProps: {}
                    };
                },
                methods: {
                    isRuleMet(rule) {
                        const value = this.fieldValues[rule.comparedToRegistrationTemplateFormFieldGuid] || '';
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
                },
                computed: {
                    isVisible() {
                        switch (this.field.visibilityRuleType) {
                            case RegistrationEntryBlockViewModel_1.FilterExpressionType.GroupAll:
                                return this.field.visibilityRules.every(vr => this.isRuleMet(vr));
                            case RegistrationEntryBlockViewModel_1.FilterExpressionType.GroupAllFalse:
                                return this.field.visibilityRules.every(vr => !this.isRuleMet(vr));
                            case RegistrationEntryBlockViewModel_1.FilterExpressionType.GroupAny:
                                return this.field.visibilityRules.some(vr => this.isRuleMet(vr));
                            case RegistrationEntryBlockViewModel_1.FilterExpressionType.GroupAnyFalse:
                                return this.field.visibilityRules.some(vr => !this.isRuleMet(vr));
                        }
                        return true;
                    },
                    attribute() {
                        return this.field.attribute || null;
                    },
                    fieldProps() {
                        if (!this.attribute) {
                            return {};
                        }
                        return {
                            fieldTypeGuid: this.attribute.fieldTypeGuid,
                            isEditMode: true,
                            label: this.attribute.name,
                            help: this.attribute.description,
                            rules: this.field.isRequired ? 'required' : '',
                            configurationValues: this.attribute.qualifierValues
                        };
                    }
                },
                watch: {
                    field: {
                        immediate: true,
                        handler() {
                            var _a;
                            if (!(this.field.guid in this.fieldValues)) {
                                this.fieldValues[this.field.guid] = ((_a = this.attribute) === null || _a === void 0 ? void 0 : _a.defaultValue) || '';
                            }
                        }
                    }
                },
                template: `
<template v-if="isVisible">
    <RockField v-if="attribute" v-bind="fieldProps" v-model="this.fieldValues[this.field.guid]" />
    <Alert v-else alertType="danger">Could not resolve attribute field</Alert>
</template>`
            }));
        }
    };
});
//# sourceMappingURL=RegistrantAttributeField.js.map