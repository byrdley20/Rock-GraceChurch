System.register(["vue", "../Rules/Index", "./BasicTimePicker", "./RockFormField"], function (exports_1, context_1) {
    "use strict";
    var vue_1, Index_1, BasicTimePicker_1, RockFormField_1;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (Index_1_1) {
                Index_1 = Index_1_1;
            },
            function (BasicTimePicker_1_1) {
                BasicTimePicker_1 = BasicTimePicker_1_1;
            },
            function (RockFormField_1_1) {
                RockFormField_1 = RockFormField_1_1;
            }
        ],
        execute: function () {
            exports_1("default", vue_1.defineComponent({
                name: 'TimePicker',
                components: {
                    RockFormField: RockFormField_1.default,
                    BasicTimePicker: BasicTimePicker_1.default
                },
                props: {
                    rules: {
                        type: String,
                        default: ''
                    },
                    modelValue: {
                        type: Object,
                        default: {}
                    }
                },
                data() {
                    return {
                        internalValue: {}
                    };
                },
                methods: {},
                computed: {
                    computedRules() {
                        const rules = Index_1.ruleStringToArray(this.rules);
                        return Index_1.ruleArrayToString(rules);
                    }
                },
                watch: {
                    modelValue: {
                        immediate: true,
                        handler() {
                            this.internalValue = this.modelValue;
                        }
                    },
                    internalValue() {
                        this.$emit("update:modelValue", this.internalValue);
                    }
                },
                template: `
<RockFormField
    :modelValue="internalValue"
    formGroupClasses="timepicker-input"
    name="time-picker"
    :rules="computedRules">
    <template #default="{uniqueId, field, errors, disabled}">
        <div class="control-wrapper">
            <div class="timepicker-input">
                <BasicTimePicker v-model="internalValue" />
            </div>
        </div>
    </template>
</RockFormField>`
            }));
        }
    };
});
//# sourceMappingURL=TimePicker.js.map