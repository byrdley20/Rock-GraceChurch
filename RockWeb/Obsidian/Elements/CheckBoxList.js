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
                    modelValue() {
                        this.internalValue = this.modelValue;
                    },
                    internalValue() {
                        this.$emit('update:modelValue', this.internalValue);
                    },
                },
                template: `
<RockFormField
    :modelValue="internalValue"
    formGroupClasses="check-box-list"
    name="check-box-list">
    <template #default="{uniqueId, field, errors, disabled}">
        <div class="control-wrapper">
            <div class="controls rockcheckboxlist rockcheckboxlist-vertical">
                <div class="checkbox" v-for="o in options" :key="o.value">
                    <label>
                        <input type="checkbox" :value="o.value" v-model="internalValue" />
                        <span class="label-text">{{ o.text }}</span>
                    </label>
                </div>
            </div>
        </div>
    </template>
</RockFormField>
`
            }));
        }
    };
});
//# sourceMappingURL=CheckBoxList.js.map