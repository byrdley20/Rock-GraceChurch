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
    var vue_1, FieldType_1, Boolean_1, editComponent, DefinedValueFieldType;
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
                return (yield context_1.import('./DefinedValueFieldComponents')).EditComponent;
            }));
            DefinedValueFieldType = class DefinedValueFieldType extends FieldType_1.FieldTypeBase {
                updateTextValue(value) {
                    var _a, _b, _c, _d;
                    try {
                        const clientValue = JSON.parse((_a = value.value) !== null && _a !== void 0 ? _a : '');
                        try {
                            const values = JSON.parse((_c = (_b = value.configurationValues) === null || _b === void 0 ? void 0 : _b["values"]) !== null && _c !== void 0 ? _c : '[]');
                            const displayDescription = Boolean_1.asBoolean((_d = value.configurationValues) === null || _d === void 0 ? void 0 : _d["displaydescription"]);
                            const rawValues = clientValue.value.split(',');
                            value.textValue = values.filter(v => rawValues.includes(v.value))
                                .map(v => displayDescription ? v.description : v.text)
                                .join(', ');
                        }
                        catch (_e) {
                            value.textValue = clientValue.value;
                        }
                    }
                    catch (_f) {
                        value.textValue = '';
                    }
                }
                getEditComponent(_value) {
                    return editComponent;
                }
            };
            exports_1("DefinedValueFieldType", DefinedValueFieldType);
        }
    };
});
//# sourceMappingURL=DefinedValueField.js.map