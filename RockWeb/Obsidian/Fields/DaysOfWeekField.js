System.register(["vue", "./Index", "../Elements/CheckBoxList", "@Obsidian/Services/Number"], function (exports_1, context_1) {
    "use strict";
    var vue_1, Index_1, CheckBoxList_1, Number_1, fieldTypeGuid, DayOfWeek, ConfigurationValueKey;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (Index_1_1) {
                Index_1 = Index_1_1;
            },
            function (CheckBoxList_1_1) {
                CheckBoxList_1 = CheckBoxList_1_1;
            },
            function (Number_1_1) {
                Number_1 = Number_1_1;
            }
        ],
        execute: function () {
            fieldTypeGuid = '08943FF9-F2A8-4DB4-A72A-31938B200C8C';
            (function (DayOfWeek) {
                DayOfWeek[DayOfWeek["Sunday"] = 0] = "Sunday";
                DayOfWeek[DayOfWeek["Monday"] = 1] = "Monday";
                DayOfWeek[DayOfWeek["Tuesday"] = 2] = "Tuesday";
                DayOfWeek[DayOfWeek["Wednesday"] = 3] = "Wednesday";
                DayOfWeek[DayOfWeek["Thursday"] = 4] = "Thursday";
                DayOfWeek[DayOfWeek["Friday"] = 5] = "Friday";
                DayOfWeek[DayOfWeek["Saturday"] = 6] = "Saturday";
            })(DayOfWeek || (DayOfWeek = {}));
            (function (ConfigurationValueKey) {
            })(ConfigurationValueKey || (ConfigurationValueKey = {}));
            exports_1("default", Index_1.registerFieldType(fieldTypeGuid, vue_1.defineComponent({
                name: 'DaysOfWeekField',
                components: {
                    CheckBoxList: CheckBoxList_1.default
                },
                props: Index_1.getFieldTypeProps(),
                data() {
                    return {
                        internalValue: [],
                    };
                },
                methods: {
                    options() {
                        return [
                            { text: 'Sunday', value: DayOfWeek.Sunday.toString() },
                            { text: 'Monday', value: DayOfWeek.Monday.toString() },
                            { text: 'Tuesday', value: DayOfWeek.Tuesday.toString() },
                            { text: 'Wednesday', value: DayOfWeek.Wednesday.toString() },
                            { text: 'Thursday', value: DayOfWeek.Thursday.toString() },
                            { text: 'Friday', value: DayOfWeek.Friday.toString() },
                            { text: 'Saturday', value: DayOfWeek.Saturday.toString() }
                        ];
                    },
                },
                computed: {
                    displayValue() {
                        if (this.internalValue.length === 0) {
                            return "";
                        }
                        return this.options()
                            .filter(v => this.internalValue.indexOf(v.value) !== -1)
                            .map(v => v.text)
                            .join(", ");
                    }
                },
                watch: {
                    internalValue() {
                        this.$emit('update:modelValue', this.internalValue.sort((a, b) => Number_1.toNumber(a) - Number_1.toNumber(b)).join(","));
                    },
                    modelValue: {
                        immediate: true,
                        handler() {
                            var _a;
                            const value = (_a = this.modelValue) !== null && _a !== void 0 ? _a : "";
                            this.internalValue = value !== "" ? value.split(",") : [];
                        }
                    }
                },
                template: `
<CheckBoxList v-if="isEditMode" v-model="internalValue" :options="options()" />
<span v-else>{{ displayValue }}</span>`
            })));
        }
    };
});
//# sourceMappingURL=DaysOfWeekField.js.map