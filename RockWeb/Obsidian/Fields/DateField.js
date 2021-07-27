System.register(["vue", "./Index", "../Elements/DatePicker", "../Services/Date", "../Services/Boolean", "../Services/Number", "../Elements/DatePartsPicker"], function (exports_1, context_1) {
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
    var vue_1, Index_1, DatePicker_1, Date_1, Boolean_1, Number_1, DatePartsPicker_1, fieldTypeGuid, ConfigurationValueKey;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (Index_1_1) {
                Index_1 = Index_1_1;
            },
            function (DatePicker_1_1) {
                DatePicker_1 = DatePicker_1_1;
            },
            function (Date_1_1) {
                Date_1 = Date_1_1;
            },
            function (Boolean_1_1) {
                Boolean_1 = Boolean_1_1;
            },
            function (Number_1_1) {
                Number_1 = Number_1_1;
            },
            function (DatePartsPicker_1_1) {
                DatePartsPicker_1 = DatePartsPicker_1_1;
            }
        ],
        execute: function () {
            fieldTypeGuid = '6B6AA175-4758-453F-8D83-FCD8044B5F36';
            (function (ConfigurationValueKey) {
                ConfigurationValueKey["Format"] = "format";
                ConfigurationValueKey["DisplayDiff"] = "displayDiff";
                ConfigurationValueKey["DisplayCurrentOption"] = "displayCurrentOption";
                ConfigurationValueKey["DatePickerControlType"] = "datePickerControlType";
                ConfigurationValueKey["FutureYearCount"] = "futureYearCount";
            })(ConfigurationValueKey || (ConfigurationValueKey = {}));
            exports_1("default", Index_1.registerFieldType(fieldTypeGuid, vue_1.defineComponent({
                name: 'DateField',
                components: {
                    DatePicker: DatePicker_1.default,
                    DatePartsPicker: DatePartsPicker_1.default
                },
                props: Index_1.getFieldTypeProps(),
                data() {
                    return {
                        internalValue: '',
                        internalDateParts: DatePartsPicker_1.getDefaultDatePartsPickerModel(),
                        formattedString: ''
                    };
                },
                setup() {
                    return {
                        http: vue_1.inject('http')
                    };
                },
                computed: {
                    datePartsAsDate() {
                        var _a;
                        if (!((_a = this.internalDateParts) === null || _a === void 0 ? void 0 : _a.day) || !this.internalDateParts.month || !this.internalDateParts.year) {
                            return null;
                        }
                        return new Date(this.internalDateParts.year, this.internalDateParts.month - 1, this.internalDateParts.day) || null;
                    },
                    isDatePartsPicker() {
                        var _a;
                        const config = this.configurationValues[ConfigurationValueKey.DatePickerControlType];
                        return ((_a = config === null || config === void 0 ? void 0 : config.Value) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === 'date parts picker';
                    },
                    isCurrentDateValue() {
                        return this.internalValue.indexOf('CURRENT') === 0;
                    },
                    asDate() {
                        return Date_1.asDateOrNull(this.internalValue);
                    },
                    dateFormatTemplate() {
                        const formatConfig = this.configurationValues[ConfigurationValueKey.Format];
                        return (formatConfig === null || formatConfig === void 0 ? void 0 : formatConfig.Value) || 'MM/dd/yyyy';
                    },
                    elapsedString() {
                        const dateValue = this.isDatePartsPicker ? this.datePartsAsDate : this.asDate;
                        if (this.isCurrentDateValue || !dateValue) {
                            return '';
                        }
                        const formatConfig = this.configurationValues[ConfigurationValueKey.DisplayDiff];
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
                        const futureYearConfig = this.configurationValues[ConfigurationValueKey.FutureYearCount];
                        if (futureYearConfig === null || futureYearConfig === void 0 ? void 0 : futureYearConfig.Value) {
                            const futureYears = Number_1.toNumber(futureYearConfig.Value);
                            if (futureYears > 0) {
                                attributes.futureYearCount = futureYears;
                            }
                        }
                        return attributes;
                    }
                },
                methods: {
                    syncModelValue() {
                        return __awaiter(this, void 0, void 0, function* () {
                            this.internalValue = this.modelValue || '';
                            const asDate = Date_1.asDateOrNull(this.modelValue);
                            if (asDate) {
                                this.internalDateParts.year = asDate.getFullYear();
                                this.internalDateParts.month = asDate.getMonth() + 1;
                                this.internalDateParts.day = asDate.getDate();
                            }
                            else {
                                this.internalDateParts.year = 0;
                                this.internalDateParts.month = 0;
                                this.internalDateParts.day = 0;
                            }
                            yield this.fetchAndSetFormattedValue();
                        });
                    },
                    fetchAndSetFormattedValue() {
                        return __awaiter(this, void 0, void 0, function* () {
                            if (this.isCurrentDateValue) {
                                const parts = this.internalValue.split(':');
                                const diff = parts.length === 2 ? Number_1.toNumber(parts[1]) : 0;
                                if (diff === 1) {
                                    this.formattedString = 'Current Date plus 1 day';
                                }
                                else if (diff > 0) {
                                    this.formattedString = `Current Date plus ${diff} days`;
                                }
                                else if (diff === -1) {
                                    this.formattedString = 'Current Date minus 1 day';
                                }
                                else if (diff < 0) {
                                    this.formattedString = `Current Date minus ${Math.abs(diff)} days`;
                                }
                                else {
                                    this.formattedString = 'Current Date';
                                }
                            }
                            else if (this.isDatePartsPicker && this.datePartsAsDate) {
                                this.formattedString = yield this.getFormattedDateString(this.datePartsAsDate, this.dateFormatTemplate);
                            }
                            else if (!this.isDatePartsPicker && this.asDate) {
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
                            const result = yield get('api/Utility/FormatDate', { value, format });
                            return result.data || `${value}`;
                        });
                    }
                },
                watch: {
                    datePartsAsDate() {
                        if (this.isDatePartsPicker) {
                            this.$emit('update:modelValue', Date_1.toRockDateOrNull(this.datePartsAsDate) || '');
                        }
                    },
                    internalValue() {
                        if (!this.isDatePartsPicker) {
                            this.$emit('update:modelValue', this.internalValue || '');
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
<DatePartsPicker v-if="isEditMode && isDatePartsPicker" v-model="internalDateParts" v-bind="configAttributes" />
<DatePicker v-else-if="isEditMode" v-model="internalValue" v-bind="configAttributes" />
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
//# sourceMappingURL=DateField.js.map