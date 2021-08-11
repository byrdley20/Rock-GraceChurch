System.register(["./FieldType"], function (exports_1, context_1) {
    "use strict";
    var FieldType_1, TextFieldType;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (FieldType_1_1) {
                FieldType_1 = FieldType_1_1;
            }
        ],
        execute: function () {
            TextFieldType = class TextFieldType extends FieldType_1.FieldTypeBase {
            };
            exports_1("TextFieldType", TextFieldType);
        }
    };
});
//# sourceMappingURL=TextField.js.map