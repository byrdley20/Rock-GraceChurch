System.register(["vue", "./Index", "../Elements/DatePicker", "@Obsidian/Services/Boolean", "@Obsidian/Services/Number", "../Elements/DatePartsPicker"], function (exports_1, context_1) {
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
    var vue_1, Index_1, DatePicker_1, Boolean_1, Number_1, DatePartsPicker_1, EditComponent;
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
            exports_1("EditComponent", EditComponent = vue_1.defineComponent({
                name: 'DateField',
                components: {
                    DatePicker: DatePicker_1.default,
                    DatePartsPicker: DatePartsPicker_1.default
                },
                props: Index_1.getFieldEditorProps(),
                data() {
                    return {
                        internalValue: '',
                        internalDateParts: DatePartsPicker_1.getDefaultDatePartsPickerModel(),
                        formattedString: ''
                    };
                },
                setup() {
                    return {};
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
                        const config = this.configurationValues["datePickerControlType"];
                        return (config === null || config === void 0 ? void 0 : config.toLowerCase()) === 'date parts picker';
                    },
                    configAttributes() {
                        const attributes = {};
                        const displayCurrentConfig = this.configurationValues["displayCurrentOption"];
                        const displayCurrent = Boolean_1.asBoolean(displayCurrentConfig);
                        attributes.displayCurrentOption = displayCurrent;
                        attributes.isCurrentDateOffset = displayCurrent;
                        const futureYearConfig = this.configurationValues["futureYearCount"];
                        const futureYears = Number_1.toNumber(futureYearConfig);
                        if (futureYears > 0) {
                            attributes.futureYearCount = futureYears;
                        }
                        return attributes;
                    }
                },
                methods: {
                    syncModelValue() {
                        var _a, _b;
                        this.internalValue = (_a = this.modelValue) !== null && _a !== void 0 ? _a : '';
                        const dateParts = /^(\d{4})-(\d{1,2})-(\d{1,2})/.exec((_b = this.modelValue) !== null && _b !== void 0 ? _b : '');
                        if (dateParts != null) {
                            this.internalDateParts.year = Number_1.toNumber(dateParts[1]);
                            this.internalDateParts.month = Number_1.toNumber(dateParts[2]);
                            this.internalDateParts.day = Number_1.toNumber(dateParts[3]);
                        }
                        else {
                            this.internalDateParts.year = 0;
                            this.internalDateParts.month = 0;
                            this.internalDateParts.day = 0;
                        }
                    }
                },
                watch: {
                    datePartsAsDate() {
                        var _a;
                        if (this.isDatePartsPicker) {
                            const d1 = this.datePartsAsDate;
                            const d2 = Date.parse((_a = this.modelValue) !== null && _a !== void 0 ? _a : '');
                            if (d1 === null || isNaN(d2) || d1.getTime() !== d2) {
                                this.$emit('update:modelValue', d1 !== null ? d1.toISOString().split('T')[0] : '');
                            }
                        }
                    },
                    internalValue() {
                        var _a;
                        if (!this.isDatePartsPicker) {
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
                    }
                },
                template: `
<DatePartsPicker v-if="isDatePartsPicker" v-model="internalDateParts" v-bind="configAttributes" />
<DatePicker v-else v-model="internalValue" v-bind="configAttributes" />
`
            }));
        }
    };
});
//# sourceMappingURL=DateFieldComponents.js.map