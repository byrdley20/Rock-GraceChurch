System.register(["vue", "./FieldType", "@Obsidian/Services/Number", "@Obsidian/Services/String"], function (exports_1, context_1) {
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
    var vue_1, FieldType_1, Number_1, String_1, editComponent, TimeFieldType;
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
            },
            function (String_1_1) {
                String_1 = String_1_1;
            }
        ],
        execute: function () {
            editComponent = vue_1.defineAsyncComponent(() => __awaiter(void 0, void 0, void 0, function* () {
                return (yield context_1.import('./TimeFieldComponents')).EditComponent;
            }));
            TimeFieldType = class TimeFieldType extends FieldType_1.FieldTypeBase {
                updateTextValue(value) {
                    var _a;
                    const values = /^(\d+):(\d+)/.exec((_a = value.value) !== null && _a !== void 0 ? _a : '');
                    if (values === null || values.length < 3) {
                        value.textValue = '';
                        return;
                    }
                    let hour = Number_1.toNumber(values[1]);
                    const minute = Number_1.toNumber(values[2]);
                    const meridiem = hour >= 12 ? 'PM' : 'AM';
                    if (hour > 12) {
                        hour -= 12;
                    }
                    value.textValue = `${hour}:${String_1.padLeft(minute.toString(), 2, '0')} ${meridiem}`;
                }
                getEditComponent(_value) {
                    return editComponent;
                }
            };
            exports_1("TimeFieldType", TimeFieldType);
        }
    };
});
//# sourceMappingURL=TimeField.js.map