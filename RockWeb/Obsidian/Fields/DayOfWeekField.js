System.register(["vue", "./Index", "../Elements/DropDownList"], function (exports_1, context_1) {
    "use strict";
    var vue_1, Index_1, DropDownList_1, fieldTypeGuid, DayOfWeek, ConfigurationValueKey;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (Index_1_1) {
                Index_1 = Index_1_1;
            },
            function (DropDownList_1_1) {
                DropDownList_1 = DropDownList_1_1;
            }
        ],
        execute: function () {
            fieldTypeGuid = '7EDFA2DE-FDD3-4AC1-B356-1F5BFC231DAE';
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
                name: 'DayOfWeekField',
                components: {
                    DropDownList: DropDownList_1.default
                },
                props: Index_1.getFieldTypeProps(),
                data: function () {
                    return {
                        internalValue: ''
                    };
                },
                methods: {
                    options: function () {
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
                    displayValue: function () {
                        var _a;
                        var value = (_a = this.modelValue) !== null && _a !== void 0 ? _a : "";
                        if (value === "") {
                            return "";
                        }
                        var matchedOptions = this.options().filter(function (v) { return v.value === value; });
                        return matchedOptions.length === 0 ? "" : matchedOptions[0].text;
                    }
                },
                watch: {
                    internalValue: function () {
                        this.$emit('update:modelValue', this.internalValue);
                    },
                    modelValue: {
                        immediate: true,
                        handler: function () {
                            this.internalValue = this.modelValue || '';
                        }
                    }
                },
                template: "\n<DropDownList v-if=\"isEditMode\" v-model=\"internalValue\" :options=\"options()\" />\n<span v-else>{{ displayValue }}</span>"
            })));
        }
    };
});
//# sourceMappingURL=DayOfWeekField.js.map