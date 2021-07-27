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
                name: 'CheckBoxList',
                components: {
                    RockFormField: RockFormField_js_1.default
                },
                props: {
                    modelValue: {
                        type: Array,
                        default: []
                    },
                    options: {
                        type: Array,
                        required: true
                    },
                },
                data: function () {
                    return {
                        internalValue: this.modelValue
                    };
                },
                methods: {},
                computed: {},
                watch: {
                    modelValue: function () {
                        this.internalValue = this.modelValue;
                    },
                    internalValue: function () {
                        this.$emit('update:modelValue', this.internalValue);
                    },
                },
                template: "\n<RockFormField\n    :modelValue=\"internalValue\"\n    formGroupClasses=\"check-box-list\"\n    name=\"check-box-list\">\n    <template #default=\"{uniqueId, field, errors, disabled}\">\n        <div class=\"control-wrapper\">\n            <div class=\"controls rockcheckboxlist rockcheckboxlist-vertical\">\n                <div class=\"checkbox\" v-for=\"o in options\" :key=\"o.value\">\n                    <label>\n                        <input type=\"checkbox\" :value=\"o.value\" v-model=\"internalValue\" />\n                        <span class=\"label-text\">{{ o.text }}</span>\n                    </label>\n                </div>\n            </div>\n        </div>\n    </template>\n</RockFormField>\n"
            }));
        }
    };
});
//# sourceMappingURL=CheckBoxList.js.map