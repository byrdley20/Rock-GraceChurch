System.register(["vue", "./Index", "../Elements/DatePicker", "@Obsidian/Services/Date", "@Obsidian/Services/Boolean", "@Obsidian/Services/Number", "../Elements/DatePartsPicker"], function (exports_1, context_1) {
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
    var vue_1, Index_1, DatePicker_1, Date_1, Boolean_1, Number_1, DatePartsPicker_1, EditComponent;
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