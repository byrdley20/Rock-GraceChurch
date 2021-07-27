System.register(["vue", "./Index", "../Services/Number", "../Elements/Rating"], function (exports_1, context_1) {
    "use strict";
    var vue_1, Index_1, Number_1, Rating_1, fieldTypeGuid, ConfigurationValueKey;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (Index_1_1) {
                Index_1 = Index_1_1;
            },
            function (Number_1_1) {
                Number_1 = Number_1_1;
            },
            function (Rating_1_1) {
                Rating_1 = Rating_1_1;
            }
        ],
        execute: function () {
            fieldTypeGuid = '24BC2DD2-5745-4A97-A0F9-C1EC0E6E1862';
            (function (ConfigurationValueKey) {
                ConfigurationValueKey["MaxRating"] = "max";
            })(ConfigurationValueKey || (ConfigurationValueKey = {}));
            exports_1("default", Index_1.registerFieldType(fieldTypeGuid, vue_1.defineComponent({
                name: 'RatingField',
                components: {
                    Rating: Rating_1.default
                },
                props: Index_1.getFieldTypeProps(),
                data: function () {
                    return {
                        internalValue: 0
                    };
                },
                computed: {
                    displayValue: function () {
                        var value = Number_1.toNumber(this.modelValue || '');
                        var html = "";
                        for (var i = 0; i < value && i < this.maxRating; i++) {
                            html += "<i class=\"fa fa-rating-selected\"></i>";
                        }
                        for (var i = value; i < this.maxRating; i++) {
                            html += "<i class=\"fa fa-rating-unselected\"></i>";
                        }
                        return html;
                    },
                    maxRating: function () {
                        var maxRatingConfig = this.configurationValues[ConfigurationValueKey.MaxRating];
                        return Number_1.toNumberOrNull(maxRatingConfig === null || maxRatingConfig === void 0 ? void 0 : maxRatingConfig.Value) || 5;
                    },
                },
                watch: {
                    internalValue: function () {
                        this.$emit('update:modelValue', this.internalValue !== 0 ? this.internalValue.toString() : '');
                    },
                    modelValue: {
                        immediate: true,
                        handler: function () {
                            this.internalValue = Number_1.toNumber(this.modelValue || '');
                        }
                    }
                },
                template: "\n<Rating v-if=\"isEditMode\" v-model=\"internalValue\" :maxRating=\"maxRating\" />\n<span v-else v-html=\"displayValue\"></span>"
            })));
        }
    };
});
//# sourceMappingURL=RatingField.js.map