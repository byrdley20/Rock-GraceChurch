System.register(["../Services/String", "vue", "./RockField"], function (exports_1, context_1) {
    "use strict";
    var String_1, vue_1, RockField_1;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (String_1_1) {
                String_1 = String_1_1;
            },
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (RockField_1_1) {
                RockField_1 = RockField_1_1;
            }
        ],
        execute: function () {
            exports_1("default", vue_1.defineComponent({
                name: 'AttributeValuesContainer',
                components: {
                    RockField: RockField_1.default
                },
                props: {
                    isEditMode: {
                        type: Boolean,
                        default: false
                    },
                    attributeValues: {
                        type: Array,
                        required: true
                    },
                    showEmptyValues: {
                        type: Boolean,
                        default: true
                    },
                    showAbbreviatedName: {
                        type: Boolean,
                        default: false
                    }
                },
                methods: {
                    getAttributeLabel: function (attributeValue) {
                        var _a, _b;
                        if (this.showAbbreviatedName && ((_a = attributeValue.attribute) === null || _a === void 0 ? void 0 : _a.abbreviatedName)) {
                            return attributeValue.attribute.abbreviatedName;
                        }
                        return ((_b = attributeValue.attribute) === null || _b === void 0 ? void 0 : _b.name) || '';
                    }
                },
                computed: {
                    validAttributeValues: function () {
                        return this.attributeValues.filter(function (av) { return av.attribute; });
                    },
                    valuesToShow: function () {
                        if (this.showEmptyValues) {
                            return this.validAttributeValues;
                        }
                        return this.validAttributeValues.filter(function (av) { return !String_1.isNullOrWhitespace(av.value); });
                    }
                },
                template: "\n<div v-if=\"!isEditMode\" v-for=\"a in valuesToShow\" class=\"form-group static-control\">\n    <template v-if=\"a.value\">\n        <label class=\"control-label\">\n            {{ getAttributeLabel(a) }}\n        </label>\n        <div class=\"control-wrapper\">\n            <div class=\"form-control-static\">\n                <RockField :fieldTypeGuid=\"a.attribute.fieldTypeGuid\" v-model=\"a.value\" :configurationValues=\"a.attribute.qualifierValues\" />\n            </div>\n        </div>\n    </template>\n</div>\n<template v-else>\n    <template v-for=\"a in validAttributeValues\">\n        <RockField\n            isEditMode\n            :fieldTypeGuid=\"a.attribute.fieldTypeGuid\"\n            v-model=\"a.value\"\n            :label=\"getAttributeLabel(a)\"\n            :help=\"a.attribute.description\"\n            :rules=\"a.attribute.isRequired ? 'required' : ''\"\n            :configurationValues=\"a.attribute.qualifierValues\"  />\n    </template>\n</template>"
            }));
        }
    };
});
//# sourceMappingURL=AttributeValuesContainer.js.map