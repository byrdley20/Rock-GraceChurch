System.register(["vue", "./RockFormField.js"], function (exports_1, context_1) {
    "use strict";
    var vue_1, RockFormField_js_1;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (RockFormField_js_1_1) {
                RockFormField_js_1 = RockFormField_js_1_1;
            }
        ],
        execute: function () {
            exports_1("default", vue_1.defineComponent({
                name: 'Rating',
                components: {
                    RockFormField: RockFormField_js_1.default
                },
                props: {
                    modelValue: {
                        type: Number,
                        default: 0
                    },
                    maxRating: {
                        type: Number,
                        default: 5
                    }
                },
                data: function () {
                    return {
                        internalValue: this.modelValue,
                        hoverValue: null
                    };
                },
                methods: {
                    setRating: function (value) {
                        this.internalValue = value;
                    },
                    onClear: function (e) {
                        e.preventDefault();
                        this.setRating(0);
                        return false;
                    },
                    classForRating: function (position) {
                        var _a;
                        var filledCount = Math.min(this.maxRating, (_a = this.hoverValue) !== null && _a !== void 0 ? _a : this.internalValue);
                        return position <= filledCount ? "fa fa-rating-selected" : "fa fa-rating-unselected";
                    },
                    setHover: function (position) {
                        this.hoverValue = position;
                    },
                    clearHover: function () {
                        this.hoverValue = null;
                    }
                },
                computed: {},
                watch: {
                    modelValue: function () {
                        this.internalValue = this.modelValue;
                    },
                    internalValue: function () {
                        this.$emit('update:modelValue', this.internalValue);
                    },
                },
                template: "\n<RockFormField\n    :modelValue=\"internalValue\"\n    formGroupClasses=\"rock-rating\"\n    name=\"rock-rating\">\n    <template #default=\"{uniqueId, field, errors, disabled}\">\n        <div class=\"control-wrapper\">\n            <div class=\"rating-input\">\n                <i v-for=\"i in maxRating\" :key=\"i\" :class=\"classForRating(i)\" @click=\"setRating(i)\" @mouseover=\"setHover(i)\" @mouseleave=\"clearHover()\"></i>\n                <a class=\"clear-rating\" href=\"#\" v-on:click=\"onClear\" @mouseover=\"setHover(0)\" @mouseleave=\"clearHover()\">\n                    <span class=\"fa fa-remove\"></span>\n                </a>\n            </div>\n        </div>\n    </template>\n</RockFormField>\n"
            }));
        }
    };
});
//# sourceMappingURL=Rating.js.map