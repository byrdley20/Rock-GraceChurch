System.register(["vue", "./FieldType", "@Obsidian/Services/Boolean", "@Obsidian/Services/Number", "@Obsidian/Services/Date"], function (exports_1, context_1) {
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
    var vue_1, FieldType_1, Boolean_1, Number_1, Date_1, editComponent, DateTimeFieldType;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (FieldType_1_1) {
                FieldType_1 = FieldType_1_1;
            },
            function (Boolean_1_1) {
                Boolean_1 = Boolean_1_1;
            },
            function (Number_1_1) {
                Number_1 = Number_1_1;
            },
            function (Date_1_1) {
                Date_1 = Date_1_1;
            }
        ],
        execute: function () {
            editComponent = vue_1.defineAsyncComponent(() => __awaiter(void 0, void 0, void 0, function* () {
                return (yield context_1.import('./DateTimeFieldComponents')).EditComponent;
            }));
            DateTimeFieldType = class DateTimeFieldType extends FieldType_1.FieldTypeBase {
                updateTextValue(value) {
                    var _a, _b, _c;
                    if (this.isCurrentDateValue(value)) {
                        const parts = ((_a = value.value) !== null && _a !== void 0 ? _a : '').split(':');
                        const diff = parts.length === 2 ? Number_1.toNumber(parts[1]) : 0;
                        if (diff === 1) {
                            value.textValue = 'Current Date plus 1 day';
                        }
                        else if (diff > 0) {
                            value.textValue = `Current Date plus ${diff} days`;
                        }
                        else if (diff === -1) {
                            value.textValue = 'Current Date minus 1 day';
                        }
                        else if (diff < 0) {
                            value.textValue = `Current Date minus ${Math.abs(diff)} days`;
                        }
                        else {
                            value.textValue = 'Current Date';
                        }
                    }
                    else {
                        const dateValue = Date_1.parseDirtyRoundTripDateOrNull(value.value);
                        const dateFormatTemplate = ((_b = value.configurationValues) === null || _b === void 0 ? void 0 : _b["format"]) || 'MM/dd/yyy';
                        if (dateValue !== null) {
                            let textValue = Date_1.formatAspDate(dateValue, dateFormatTemplate);
                            const displayDiff = Boolean_1.asBoolean((_c = value.configurationValues) === null || _c === void 0 ? void 0 : _c["displayDiff"]);
                            if (displayDiff === true) {
                                textValue = `${textValue} ${Date_1.asElapsedString(dateValue)}`;
                            }
                            value.textValue = textValue;
                        }
                        else {
                            value.textValue = '';
                        }
                    }
                }
                getEditComponent(_value) {
                    return editComponent;
                }
                isCurrentDateValue(value) {
                    var _a;
                    return ((_a = value.value) === null || _a === void 0 ? void 0 : _a.indexOf('CURRENT')) === 0;
                }
            };
            exports_1("DateTimeFieldType", DateTimeFieldType);
        }
    };
});
//# sourceMappingURL=DateTimeField.js.map