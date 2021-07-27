System.register(["vue", "./Index", "../Elements/DateTimePicker", "../Services/Number", "../Services/Date", "../Services/Boolean"], function (exports_1, context_1) {
    "use strict";
    var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var vue_1, Index_1, DateTimePicker_1, Number_1, Date_1, Boolean_1, fieldTypeGuid, ConfigurationValueKey;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (Index_1_1) {
                Index_1 = Index_1_1;
            },
            function (DateTimePicker_1_1) {
                DateTimePicker_1 = DateTimePicker_1_1;
            },
            function (Number_1_1) {
                Number_1 = Number_1_1;
            },
            function (Date_1_1) {
                Date_1 = Date_1_1;
            },
            function (Boolean_1_1) {
                Boolean_1 = Boolean_1_1;
            }
        ],
        execute: function () {
            fieldTypeGuid = 'FE95430C-322D-4B67-9C77-DFD1D4408725';
            (function (ConfigurationValueKey) {
                ConfigurationValueKey["DateTimeFormat"] = "format";
                ConfigurationValueKey["DisplayAsElapsedTime"] = "displayDiff";
                ConfigurationValueKey["DisplayCurrentOption"] = "displayCurrentOption";
            })(ConfigurationValueKey || (ConfigurationValueKey = {}));
            ;
            exports_1("default", Index_1.registerFieldType(fieldTypeGuid, vue_1.defineComponent({
                name: 'DateTimeField',
                components: {
                    DateTimePicker: DateTimePicker_1.default
                },
                props: Index_1.getFieldTypeProps(),
                setup() {
                    return {
                        http: vue_1.inject('http')
                    };
                },
                data() {
                    return {
                        internalValue: '',
                        formattedString: ''
                    };
                },
                methods: {
                    syncModelValue() {
                        var _a;
                        return __awaiter(this, void 0, void 0, function* () {
                            this.internalValue = (_a = this.modelValue) !== null && _a !== void 0 ? _a : '';
                            yield this.fetchAndSetFormattedValue();
                        });
                    },
                    fetchAndSetFormattedValue() {
                        return __awaiter(this, void 0, void 0, function* () {
                            if (this.isCurrentDateValue) {
                                const parts = this.internalValue.split(':');
                                const diff = parts.length === 2 ? Number_1.toNumber(parts[1]) : 0;
                                if (diff === 1) {
                                    this.formattedString = 'Current Date plus 1 minute';
                                }
                                else if (diff > 0) {
                                    this.formattedString = `Current Date plus ${diff} minutes`;
                                }
                                else if (diff === -1) {
                                    this.formattedString = 'Current Date minus 1 minute';
                                }
                                else if (diff < 0) {
                                    this.formattedString = `Current Date minus ${Math.abs(diff)} minutes`;
                                }
                                else {
                                    this.formattedString = 'Current Date';
                                }
                            }
                            else if (this.asDate) {
                                this.formattedString = yield this.getFormattedDateString(this.asDate, this.dateFormatTemplate);
                            }
                            else {
                                this.formattedString = '';
                            }
                        });
                    },
                    getFormattedDateString(value, format) {
                        return __awaiter(this, void 0, void 0, function* () {
                            const get = this.http.get;
                            const result = yield get('/api/Utility/FormatDate', { value, format });
                            return result.data || `${value}`;
                        });
                    },
                },
                computed: {
                    isCurrentDateValue() {
                        return this.internalValue.indexOf('CURRENT') === 0;
                    },
                    asDate() {
                        const ms = Date.parse(this.internalValue);
                        if (isNaN(ms)) {
                            return null;
                        }
                        return new Date(ms);
                    },
                    dateFormatTemplate() {
                        const formatConfig = this.configurationValues[ConfigurationValueKey.DateTimeFormat];
                        return (formatConfig === null || formatConfig === void 0 ? void 0 : formatConfig.Value) || 'MM/dd/yyyy';
                    },
                    elapsedString() {
                        const dateValue = this.asDate;
                        if (this.isCurrentDateValue || !dateValue) {
                            return '';
                        }
                        const formatConfig = this.configurationValues[ConfigurationValueKey.DisplayAsElapsedTime];
                        const displayDiff = Boolean_1.asBoolean(formatConfig === null || formatConfig === void 0 ? void 0 : formatConfig.Value);
                        if (!displayDiff) {
                            return '';
                        }
                        return Date_1.asElapsedString(dateValue);
                    },
                    configAttributes() {
                        const attributes = {};
                        const displayCurrentConfig = this.configurationValues[ConfigurationValueKey.DisplayCurrentOption];
                        if (displayCurrentConfig === null || displayCurrentConfig === void 0 ? void 0 : displayCurrentConfig.Value) {
                            const displayCurrent = Boolean_1.asBoolean(displayCurrentConfig.Value);
                            attributes.displayCurrentOption = displayCurrent;
                            attributes.isCurrentDateOffset = displayCurrent;
                        }
                        return attributes;
                    }
                },
                watch: {
                    internalValue() {
                        var _a;
                        if (this.internalValue !== this.modelValue) {
                            const d1 = Date.parse(this.internalValue);
                            const d2 = Date.parse((_a = this.modelValue) !== null && _a !== void 0 ? _a : '');
                            if (isNaN(d1) || isNaN(d2) || d1 !== d2) {
                                this.$emit('update:modelValue', this.internalValue);
                            }
                        }
                    },
                    modelValue: {
                        immediate: true,
                        handler() {
                            return __awaiter(this, void 0, void 0, function* () {
                                yield this.syncModelValue();
                            });
                        }
                    },
                    dateFormatTemplate() {
                        return __awaiter(this, void 0, void 0, function* () {
                            yield this.fetchAndSetFormattedValue();
                        });
                    }
                },
                template: `
<DateTimePicker v-if="isEditMode" v-model="internalValue" v-bind="configAttributes" />
<span v-else>
    {{ formattedString }}
    <template v-if="elapsedString">
        ({{ elapsedString }})
    </template>
</span>`
            })));
        }
    };
});
//# sourceMappingURL=DateTimeField.js.map