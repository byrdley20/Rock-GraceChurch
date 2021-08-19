System.register(["vue", "./FieldType", "@Obsidian/Services/Date", "@Obsidian/Services/Number"], function (exports_1, context_1) {
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
    var vue_1, FieldType_1, Date_1, Number_1, editComponent, DateRangeFieldType;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (FieldType_1_1) {
                FieldType_1 = FieldType_1_1;
            },
            function (Date_1_1) {
                Date_1 = Date_1_1;
            },
            function (Number_1_1) {
                Number_1 = Number_1_1;
            }
        ],
        execute: function () {
            editComponent = vue_1.defineAsyncComponent(() => __awaiter(void 0, void 0, void 0, function* () {
                return (yield context_1.import('./DateRangeFieldComponents')).EditComponent;
            }));
            DateRangeFieldType = class DateRangeFieldType extends FieldType_1.FieldTypeBase {
                updateTextValue(value) {
                    this.updateTextValueAsync(value);
                }
                getEditComponent(_value) {
                    return editComponent;
                }
                updateTextValueAsync(value) {
                    var _a;
                    return __awaiter(this, void 0, void 0, function* () {
                        const dateParts = ((_a = value.value) !== null && _a !== void 0 ? _a : '').split(',');
                        if (dateParts.length !== 2) {
                            value.textValue = '';
                            return;
                        }
                        const lowerDateParts = /^(\d+)-(\d+)-(\d+)/.exec(dateParts[0]);
                        const upperDateParts = /^(\d+)-(\d+)-(\d+)/.exec(dateParts[1]);
                        const lowerDate = lowerDateParts !== null ? new Date(Number_1.toNumber(lowerDateParts[1]), Number_1.toNumber(lowerDateParts[2]) - 1, Number_1.toNumber(lowerDateParts[3])) : null;
                        const upperDate = upperDateParts !== null ? new Date(Number_1.toNumber(upperDateParts[1]), Number_1.toNumber(upperDateParts[2]) - 1, Number_1.toNumber(upperDateParts[3])) : null;
                        if (lowerDate !== null && upperDate !== null) {
                            value.textValue = `${Date_1.formatAspDate(lowerDate, 'd')} to ${Date_1.formatAspDate(upperDate, 'd')}`;
                        }
                        else if (lowerDate !== null) {
                            value.textValue = `from ${Date_1.formatAspDate(lowerDate, 'd')}`;
                        }
                        else if (upperDate !== null) {
                            value.textValue = `through ${Date_1.formatAspDate(upperDate, 'd')}`;
                        }
                        else {
                            value.textValue = '';
                        }
                    });
                }
            };
            exports_1("DateRangeFieldType", DateRangeFieldType);
        }
    };
});
//# sourceMappingURL=DateRangeField.js.map