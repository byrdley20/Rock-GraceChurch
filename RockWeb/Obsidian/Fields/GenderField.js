System.register(["vue", "./FieldType", "@Obsidian/Services/Number"], function (exports_1, context_1) {
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
    var vue_1, FieldType_1, Number_1, editComponent, GenderFieldType;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (FieldType_1_1) {
                FieldType_1 = FieldType_1_1;
            },
            function (Number_1_1) {
                Number_1 = Number_1_1;
            }
        ],
        execute: function () {
            editComponent = vue_1.defineAsyncComponent(() => __awaiter(void 0, void 0, void 0, function* () {
                return (yield context_1.import('./GenderFieldComponents')).EditComponent;
            }));
            GenderFieldType = class GenderFieldType extends FieldType_1.FieldTypeBase {
                updateTextValue(value) {
                    const numberValue = Number_1.toNumberOrNull(value.value);
                    if (numberValue === 0) {
                        value.textValue = 'Unknown';
                    }
                    else if (numberValue === 1) {
                        value.textValue = 'Male';
                    }
                    else if (numberValue === 2) {
                        value.textValue = 'Female';
                    }
                    else {
                        value.textValue = '';
                    }
                }
                getEditComponent(_value) {
                    return editComponent;
                }
            };
            exports_1("GenderFieldType", GenderFieldType);
        }
    };
});
//# sourceMappingURL=GenderField.js.map