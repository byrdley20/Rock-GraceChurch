System.register(["vue", "./Index", "../Elements/TimePicker", "../Services/Number", "../Services/String"], function (exports_1, context_1) {
    "use strict";
    var vue_1, Index_1, TimePicker_1, Number_1, String_1, fieldTypeGuid, ConfigurationValueKey;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (Index_1_1) {
                Index_1 = Index_1_1;
            },
            function (TimePicker_1_1) {
                TimePicker_1 = TimePicker_1_1;
            },
            function (Number_1_1) {
                Number_1 = Number_1_1;
            },
            function (String_1_1) {
                String_1 = String_1_1;
            }
        ],
        execute: function () {
            fieldTypeGuid = '2F8F5EC4-57FA-4F6C-AB15-9D6616994580';
            (function (ConfigurationValueKey) {
            })(ConfigurationValueKey || (ConfigurationValueKey = {}));
            exports_1("default", Index_1.registerFieldType(fieldTypeGuid, vue_1.defineComponent({
                name: 'TimeField',
                components: {
                    TimePicker: TimePicker_1.default
                },
                props: Index_1.getFieldTypeProps(),
                data: function () {
                    return {
                        internalTimeValue: {},
                        internalValue: ''
                    };
                },
                computed: {
                    displayValue: function () {
                        if (this.internalTimeValue.hour === undefined || this.internalTimeValue.minute === undefined) {
                            return "";
                        }
                        var hour = this.internalTimeValue.hour;
                        var minute = this.internalTimeValue.minute;
                        var meridiem = hour >= 12 ? "PM" : "AM";
                        if (hour > 12) {
                            hour -= 12;
                        }
                        return hour + ":" + String_1.padLeft(minute.toString(), 2, "0") + " " + meridiem;
                    },
                },
                watch: {
                    internalValue: function () {
                        this.$emit('update:modelValue', this.internalValue);
                    },
                    internalTimeValue: function () {
                        if (this.internalTimeValue.hour === undefined || this.internalTimeValue.minute === undefined) {
                            this.internalValue = "";
                        }
                        else {
                            this.internalValue = this.internalTimeValue.hour + ":" + String_1.padLeft(this.internalTimeValue.minute.toString(), 2, "0") + ":00";
                        }
                    },
                    modelValue: {
                        immediate: true,
                        handler: function () {
                            var _a;
                            var values = /^(\d+):(\d+)/.exec((_a = this.modelValue) !== null && _a !== void 0 ? _a : "");
                            if (values !== null) {
                                this.internalTimeValue = {
                                    hour: Number_1.toNumber(values[1]),
                                    minute: Number_1.toNumber(values[2])
                                };
                            }
                            else {
                                this.internalTimeValue = {};
                            }
                        }
                    }
                },
                template: "\n<TimePicker v-if=\"isEditMode\" v-model=\"internalTimeValue\" />\n<span v-else>{{ displayValue }}</span>"
            })));
        }
    };
});
//# sourceMappingURL=TimeField.js.map