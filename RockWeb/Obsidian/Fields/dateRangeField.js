System.register(["vue", "./fieldType", "@Obsidian/Services/date", "@Obsidian/Services/number"], function (exports_1, context_1) {
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
    var vue_1, fieldType_1, date_1, number_1, editComponent, DateRangeFieldType;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (fieldType_1_1) {
                fieldType_1 = fieldType_1_1;
            },
            function (date_1_1) {
                date_1 = date_1_1;
            },
            function (number_1_1) {
                number_1 = number_1_1;
            }
        ],
        execute: function () {
            editComponent = vue_1.defineAsyncComponent(() => __awaiter(void 0, void 0, void 0, function* () {
                return (yield context_1.import("./dateRangeFieldComponents")).EditComponent;
            }));
            DateRangeFieldType = class DateRangeFieldType extends fieldType_1.FieldTypeBase {
                updateTextValue(value) {
                    var _a;
                    const dateParts = ((_a = value.value) !== null && _a !== void 0 ? _a : "").split(",");
                    if (dateParts.length !== 2) {
                        value.textValue = "";
                        return;
                    }
                    const lowerDateParts = /^(\d+)-(\d+)-(\d+)/.exec(dateParts[0]);
                    const upperDateParts = /^(\d+)-(\d+)-(\d+)/.exec(dateParts[1]);
                    const lowerDate = lowerDateParts !== null ? new Date(number_1.toNumber(lowerDateParts[1]), number_1.toNumber(lowerDateParts[2]) - 1, number_1.toNumber(lowerDateParts[3])) : null;
                    const upperDate = upperDateParts !== null ? new Date(number_1.toNumber(upperDateParts[1]), number_1.toNumber(upperDateParts[2]) - 1, number_1.toNumber(upperDateParts[3])) : null;
                    if (lowerDate !== null && upperDate !== null) {
                        value.textValue = `${date_1.formatAspDate(lowerDate, "d")} to ${date_1.formatAspDate(upperDate, "d")}`;
                    }
                    else if (lowerDate !== null) {
                        value.textValue = `from ${date_1.formatAspDate(lowerDate, "d")}`;
                    }
                    else if (upperDate !== null) {
                        value.textValue = `through ${date_1.formatAspDate(upperDate, "d")}`;
                    }
                    else {
                        value.textValue = "";
                    }
                }
                getEditComponent(_value) {
                    return editComponent;
                }
            };
            exports_1("DateRangeFieldType", DateRangeFieldType);
        }
    };
});
//# sourceMappingURL=dateRangeField.js.map