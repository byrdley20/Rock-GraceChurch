System.register(["vue", "./Index", "@Obsidian/Services/Number", "../Elements/Rating"], function (exports_1, context_1) {
    "use strict";
    var vue_1, Index_1, Number_1, Rating_1, EditComponent;
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
            exports_1("EditComponent", EditComponent = vue_1.defineComponent({
                name: 'RatingField',
                components: {
                    Rating: Rating_1.default
                },
                props: Index_1.getFieldEditorProps(),
                data() {
                    return {
                        internalValue: 0
                    };
                },
                computed: {
                    maxRating() {
                        const maxRatingConfig = this.configurationValues["max"];
                        return Number_1.toNumberOrNull(maxRatingConfig) || 5;
                    },
                },
                watch: {
                    internalValue() {
                        const ratingValue = {
                            value: this.internalValue,
                            maxValue: this.maxRating
                        };
                        this.$emit('update:modelValue', JSON.stringify(ratingValue));
                    },
                    modelValue: {
                        immediate: true,
                        handler() {
                            var _a, _b;
                            try {
                                const ratingValue = JSON.parse((_a = this.modelValue) !== null && _a !== void 0 ? _a : '');
                                this.internalValue = (_b = ratingValue.value) !== null && _b !== void 0 ? _b : 0;
                            }
                            catch (_c) {
                                this.internalValue = 0;
                            }
                        }
                    }
                },
                template: `
<Rating v-model="internalValue" :maxRating="maxRating" />
`
            }));
        }
    };
});
//# sourceMappingURL=RatingFieldComponents.js.map