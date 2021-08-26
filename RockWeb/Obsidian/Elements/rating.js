System.register(["vue", "./rockFormField"], function (exports_1, context_1) {
    "use strict";
    var vue_1, rockFormField_1;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (rockFormField_1_1) {
                rockFormField_1 = rockFormField_1_1;
            }
        ],
        execute: function () {
            exports_1("default", vue_1.defineComponent({
                name: "Rating",
                components: {
                    RockFormField: rockFormField_1.default
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
                    setRating(value) {
                        this.internalValue = value;
                    },
                    onClear(e) {
                        e.preventDefault();
                        this.setRating(0);
                        return false;
                    },
                    classForRating(position) {
                        var _a;
                        const filledCount = Math.min(this.maxRating, (_a = this.hoverValue) !== null && _a !== void 0 ? _a : this.internalValue);
                        return position <= filledCount ? "fa fa-rating-selected" : "fa fa-rating-unselected";
                    },
                    setHover(position) {
                        this.hoverValue = position;
                    },
                    clearHover() {
                        this.hoverValue = null;
                    }
                },
                computed: {},
                watch: {
                    modelValue() {
                        this.internalValue = this.modelValue;
                    },
                    internalValue() {
                        this.$emit("update:modelValue", this.internalValue);
                    },
                },
                template: `
<RockFormField
    :modelValue="internalValue"
    formGroupClasses="rock-rating"
    name="rock-rating">
    <template #default="{uniqueId, field, errors, disabled}">
        <div class="control-wrapper">
            <div class="rating-input">
                <i v-for="i in maxRating" :key="i" :class="classForRating(i)" @click="setRating(i)" @mouseover="setHover(i)" @mouseleave="clearHover()"></i>
                <a class="clear-rating" href="#" v-on:click="onClear" @mouseover="setHover(0)" @mouseleave="clearHover()">
                    <span class="fa fa-remove"></span>
                </a>
            </div>
        </div>
    </template>
</RockFormField>
`
            }));
        }
    };
});
//# sourceMappingURL=rating.js.map