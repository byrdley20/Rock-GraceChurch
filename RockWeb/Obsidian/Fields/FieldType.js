System.register(["@Obsidian/Services/String", "vue", "./TextFieldComponents"], function (exports_1, context_1) {
    "use strict";
    var String_1, vue_1, TextFieldComponents_1, FieldTypeBase;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (String_1_1) {
                String_1 = String_1_1;
            },
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (TextFieldComponents_1_1) {
                TextFieldComponents_1 = TextFieldComponents_1_1;
            }
        ],
        execute: function () {
            FieldTypeBase = class FieldTypeBase {
                getTextValue(value) {
                    var _a;
                    return (_a = value.textValue) !== null && _a !== void 0 ? _a : '';
                }
                getHtmlValue(value) {
                    return `<span>${String_1.escapeHtml(this.getTextValue(value))}</span>`;
                }
                updateTextValue(value) {
                    value.textValue = value.value;
                }
                getCondensedTextValue(value) {
                    var _a;
                    return String_1.truncate((_a = value.textValue) !== null && _a !== void 0 ? _a : '', 10);
                }
                getCondensedHtmlValue(value) {
                    return `<span>${this.getHtmlValue(value)}</span>`;
                }
                getFormattedComponent(value) {
                    return vue_1.defineComponent(() => {
                        return vue_1.compile(this.getHtmlValue(value));
                    });
                }
                getCondensedFormattedComponent(value) {
                    return vue_1.defineComponent(() => {
                        return vue_1.compile(this.getCondensedHtmlValue(value));
                    });
                }
                getEditComponent(_value) {
                    return TextFieldComponents_1.EditComponent;
                }
            };
            exports_1("FieldTypeBase", FieldTypeBase);
        }
    };
});
//# sourceMappingURL=FieldType.js.map