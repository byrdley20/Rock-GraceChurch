System.register(["vue", "./Index", "../Controls/DefinedValuePicker", "../Services/Number", "../Services/Boolean"], function (exports_1, context_1) {
    "use strict";
    var vue_1, Index_1, DefinedValuePicker_1, Number_1, Boolean_1, fieldTypeGuid, ConfigurationValueKey;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (Index_1_1) {
                Index_1 = Index_1_1;
            },
            function (DefinedValuePicker_1_1) {
                DefinedValuePicker_1 = DefinedValuePicker_1_1;
            },
            function (Number_1_1) {
                Number_1 = Number_1_1;
            },
            function (Boolean_1_1) {
                Boolean_1 = Boolean_1_1;
            }
        ],
        execute: function () {
            fieldTypeGuid = '59D5A94C-94A0-4630-B80A-BB25697D74C7';
            (function (ConfigurationValueKey) {
                ConfigurationValueKey["DefinedType"] = "definedtype";
                ConfigurationValueKey["AllowMultiple"] = "allowmultiple";
                ConfigurationValueKey["DisplayDescription"] = "displaydescription";
                ConfigurationValueKey["EnhancedSelection"] = "enhancedselection";
                ConfigurationValueKey["IncludeInactive"] = "includeInactive";
                ConfigurationValueKey["AllowAddingNewValues"] = "AllowAddingNewValues";
                ConfigurationValueKey["RepeatColumns"] = "RepeatColumns";
            })(ConfigurationValueKey || (ConfigurationValueKey = {}));
            exports_1("default", Index_1.registerFieldType(fieldTypeGuid, vue_1.defineComponent({
                name: 'DefinedValueField',
                inheritAttrs: false,
                components: {
                    DefinedValuePicker: DefinedValuePicker_1.default
                },
                props: Index_1.getFieldTypeProps(),
                data() {
                    return {
                        definedValues: [],
                        internalValue: ''
                    };
                },
                computed: {
                    selectedDefinedValues() {
                        const guids = this.internalValue.toLowerCase().split(",");
                        return this.definedValues.filter(dv => guids.indexOf(dv.guid.toLowerCase()) !== -1);
                    },
                    displayValue() {
                        if (this.selectedDefinedValues.length === 0) {
                            return '';
                        }
                        if (this.displayDescription) {
                            return this.selectedDefinedValues.map(v => { var _a; return (_a = v.description) !== null && _a !== void 0 ? _a : ""; }).join(", ");
                        }
                        return this.selectedDefinedValues.map(v => { var _a; return (_a = v.value) !== null && _a !== void 0 ? _a : ""; }).join(", ");
                    },
                    displayDescription() {
                        const displayDescription = Index_1.getConfigurationValue(ConfigurationValueKey.DisplayDescription, this.configurationValues);
                        return Boolean_1.asBoolean(displayDescription);
                    },
                    configAttributes() {
                        const attributes = {};
                        const definedType = Index_1.getConfigurationValue(ConfigurationValueKey.DefinedType, this.configurationValues);
                        if (definedType) {
                            const definedTypeId = Number_1.toNumberOrNull(definedType);
                            if (definedTypeId) {
                                const definedType = this.$store.getters['definedTypes/getById'](definedTypeId);
                                attributes.definedTypeGuid = (definedType === null || definedType === void 0 ? void 0 : definedType.guid) || '';
                            }
                        }
                        if (this.displayDescription) {
                            attributes.displayDescriptions = true;
                        }
                        const enhancedConfig = Index_1.getConfigurationValue(ConfigurationValueKey.EnhancedSelection, this.configurationValues);
                        if (enhancedConfig) {
                            attributes.enhanceForLongLists = Boolean_1.asBoolean(enhancedConfig);
                        }
                        return attributes;
                    }
                },
                methods: {
                    receivedDefinedValues(definedValues) {
                        this.definedValues = definedValues;
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
<DefinedValuePicker :show="isEditMode" v-model="internalValue" v-bind="configAttributes" @receivedDefinedValues="receivedDefinedValues" />
<span v-if="!isEditMode">{{ displayValue }}</span>`
            })));
        }
    };
});
//# sourceMappingURL=DefinedValueField.js.map