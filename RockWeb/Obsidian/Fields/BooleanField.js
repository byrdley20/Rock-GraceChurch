System.register(["vue", "./FieldType", "@Obsidian/Services/Boolean"], function (exports_1, context_1) {
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
    var vue_1, FieldType_1, Boolean_1, editComponent, BooleanFieldType;
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
            }
        ],
        execute: function () {
            editComponent = vue_1.defineAsyncComponent(() => __awaiter(void 0, void 0, void 0, function* () {
                return (yield context_1.import('./BooleanFieldComponents')).EditComponent;
            }));
            BooleanFieldType = class BooleanFieldType extends FieldType_1.FieldTypeBase {
                getCondensedTextValue(value) {
                    const boolValue = Boolean_1.asBooleanOrNull(value.value);
                    if (boolValue === null) {
                        return '';
                    }
                    else if (boolValue === true) {
                        return 'Y';
                    }
                    else {
                        return 'N';
                    }
                }
                updateTextValue(value) {
                    var _a, _b;
                    const boolValue = Boolean_1.asBooleanOrNull(value.value);
                    if (boolValue === null) {
                        value.textValue = '';
                    }
                    else if (boolValue === true) {
                        value.textValue = ((_a = value.configurationValues) === null || _a === void 0 ? void 0 : _a["truetext"]) || 'Yes';
                    }
                    else {
                        value.textValue = ((_b = value.configurationValues) === null || _b === void 0 ? void 0 : _b["falsetext"]) || 'No';
                    }
                }
                getEditComponent(_value) {
                    return editComponent;
                }
            };
            exports_1("BooleanFieldType", BooleanFieldType);
        }
    };
});
//# sourceMappingURL=BooleanField.js.map