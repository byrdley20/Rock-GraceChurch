System.register(["vue", "./Index", "@Obsidian/Services/Boolean", "../Elements/DropDownList", "../Elements/Toggle", "../Elements/CheckBox"], function (exports_1, context_1) {
    "use strict";
    var vue_1, Index_1, Boolean_1, DropDownList_1, Toggle_1, CheckBox_1, fieldTypeGuid, BooleanControlType, ConfigurationValueKey;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (Index_1_1) {
                Index_1 = Index_1_1;
            },
            function (Boolean_1_1) {
                Boolean_1 = Boolean_1_1;
            },
            function (DropDownList_1_1) {
                DropDownList_1 = DropDownList_1_1;
            },
            function (Toggle_1_1) {
                Toggle_1 = Toggle_1_1;
            },
            function (CheckBox_1_1) {
                CheckBox_1 = CheckBox_1_1;
            }
        ],
        execute: function () {
            fieldTypeGuid = '1EDAFDED-DFE6-4334-B019-6EECBA89E05A';
            (function (BooleanControlType) {
                BooleanControlType[BooleanControlType["DropDown"] = 0] = "DropDown";
                BooleanControlType[BooleanControlType["Checkbox"] = 1] = "Checkbox";
                BooleanControlType[BooleanControlType["Toggle"] = 2] = "Toggle";
            })(BooleanControlType || (BooleanControlType = {}));
            (function (ConfigurationValueKey) {
                ConfigurationValueKey["BooleanControlType"] = "BooleanControlType";
                ConfigurationValueKey["FalseText"] = "falsetext";
                ConfigurationValueKey["TrueText"] = "truetext";
            })(ConfigurationValueKey || (ConfigurationValueKey = {}));
            exports_1("default", Index_1.registerFieldType(fieldTypeGuid, vue_1.defineComponent({
                name: 'BooleanField',
                components: {
                    DropDownList: DropDownList_1.default,
                    Toggle: Toggle_1.default,
                    CheckBox: CheckBox_1.default
                },
                props: Index_1.getFieldTypeProps(),
                data() {
                    return {
                        internalBooleanValue: false,
                        internalValue: ''
                    };
                },
                computed: {
                    booleanControlType() {
                        const controlType = Index_1.getConfigurationValue(ConfigurationValueKey.BooleanControlType, this.configurationValues);
                        switch (controlType) {
                            case '1':
                                return BooleanControlType.Checkbox;
                            case '2':
                                return BooleanControlType.Toggle;
                            default:
                                return BooleanControlType.DropDown;
                        }
                    },
                    trueText() {
                        let trueText = Boolean_1.asYesNoOrNull(true);
                        const trueConfig = Index_1.getConfigurationValue(ConfigurationValueKey.TrueText, this.configurationValues);
                        if (trueConfig) {
                            trueText = trueConfig;
                        }
                        return trueText || 'Yes';
                    },
                    falseText() {
                        let falseText = Boolean_1.asYesNoOrNull(false);
                        const falseConfig = Index_1.getConfigurationValue(ConfigurationValueKey.FalseText, this.configurationValues);
                        if (falseConfig) {
                            falseText = falseConfig;
                        }
                        return falseText || 'No';
                    },
                    isToggle() {
                        return this.booleanControlType === BooleanControlType.Toggle;
                    },
                    isCheckBox() {
                        return this.booleanControlType === BooleanControlType.Checkbox;
                    },
                    valueAsBooleanOrNull() {
                        return Boolean_1.asBooleanOrNull(this.modelValue);
                    },
                    displayValue() {
                        if (this.valueAsBooleanOrNull === null) {
                            return '';
                        }
                        if (this.valueAsBooleanOrNull) {
                            return this.trueText;
                        }
                        return this.falseText;
                    },
                    toggleOptions() {
                        return {
                            trueText: this.trueText,
                            falseText: this.falseText
                        };
                    },
                    dropDownListOptions() {
                        const trueVal = Boolean_1.asTrueFalseOrNull(true);
                        const falseVal = Boolean_1.asTrueFalseOrNull(false);
                        return [
                            { key: falseVal, text: this.falseText, value: falseVal },
                            { key: trueVal, text: this.trueText, value: trueVal }
                        ];
                    }
                },
                watch: {
                    internalValue() {
                        this.$emit('update:modelValue', this.internalValue);
                    },
                    internalBooleanValue() {
                        const valueToEmit = Boolean_1.asTrueFalseOrNull(this.internalBooleanValue) || '';
                        this.$emit('update:modelValue', valueToEmit);
                    },
                    modelValue: {
                        immediate: true,
                        handler() {
                            this.internalValue = Boolean_1.asTrueFalseOrNull(this.modelValue) || '';
                            this.internalBooleanValue = Boolean_1.asBoolean(this.modelValue);
                        }
                    }
                },
                template: `
<Toggle v-if="isEditMode && isToggle" v-model="internalBooleanValue" v-bind="toggleOptions" />
<CheckBox v-else-if="isEditMode && isCheckBox" v-model="internalBooleanValue" :inline="false" />
<DropDownList v-else-if="isEditMode" v-model="internalValue" :options="dropDownListOptions" />
<span v-else>{{ displayValue }}</span>`
            })));
        }
    };
});
//# sourceMappingURL=BooleanField.js.map