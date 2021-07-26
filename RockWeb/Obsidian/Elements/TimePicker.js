System.register(["vue", "../Rules/Index", "../Services/Number", "../Services/String", "./RockFormField"], function (exports_1, context_1) {
    "use strict";
    var vue_1, Index_1, Number_1, String_1, RockFormField_1;
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
            function (String_1_1) {
                String_1 = String_1_1;
            },
            function (RockFormField_1_1) {
                RockFormField_1 = RockFormField_1_1;
            }
        ],
        execute: function () {
            exports_1("default", vue_1.defineComponent({
                name: 'TimePicker',
                components: {
                    RockFormField: RockFormField_1.default
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
                data: function () {
                    return {
                        internalHour: null,
                        internalMinute: null,
                        internalMeridiem: "AM",
                        internalValue: ""
                    };
                },
                methods: {
                    keyPress: function (e) {
                        if (e.key === "a" || e.key === "p" || e.key === "A" || e.key == "P") {
                            this.internalMeridiem = e.key === "a" || e.key === "A" ? "AM" : "PM";
                            this.maybeUpdateValue();
                            e.preventDefault();
                            return false;
                        }
                        if (/^[0-9:]$/.test(e.key) === false) {
                            e.preventDefault();
                            return false;
                        }
                        return true;
                    },
                    keyUp: function (e) {
                        var area = this.$refs.area;
                        var group = this.$refs.group;
                        var serial = this.$refs.serial;
                        if (/^[0-9]$/.test(e.key) === false) {
                            return true;
                        }
                        if (area === e.target && area.selectionStart === 3) {
                            this.$nextTick(function () {
                                group.focus();
                                group.setSelectionRange(0, 2);
                            });
                        }
                        else if (group === e.target && group.selectionStart === 2) {
                            this.$nextTick(function () {
                                serial.focus();
                                serial.setSelectionRange(0, 4);
                            });
                        }
                        return true;
                    },
                    updateValue: function () {
                        var values = /(\d+):(\d+)/.exec(this.internalValue);
                        var value = {};
                        if (values !== null) {
                            value.hour = Number_1.toNumber(values[1]) + (this.internalMeridiem === "PM" ? 12 : 0);
                            value.minute = Number_1.toNumber(values[2]);
                        }
                        this.$emit('update:modelValue', value);
                    },
                    maybeUpdateValue: function () {
                        var values = /(\d+):(\d+)/.exec(this.internalValue);
                        if (values !== null) {
                            this.updateValue();
                        }
                    },
                    toggleMeridiem: function (e) {
                        e.preventDefault();
                        this.internalMeridiem = this.internalMeridiem === "AM" ? "PM" : "AM";
                        this.maybeUpdateValue();
                        return false;
                    }
                },
                computed: {
                    computedRules: function () {
                        var rules = Index_1.ruleStringToArray(this.rules);
                        return Index_1.ruleArrayToString(rules);
                    }
                },
                watch: {
                    modelValue: {
                        immediate: true,
                        handler: function () {
                            if (this.modelValue.hour) {
                                if (this.modelValue.hour > 12) {
                                    this.internalHour = this.modelValue.hour - 12;
                                }
                                else {
                                    this.internalHour = this.modelValue.hour;
                                }
                                if (this.modelValue.hour >= 12) {
                                    this.internalMeridiem = "PM";
                                }
                            }
                            else {
                                this.internalHour = null;
                            }
                            if (this.modelValue.minute) {
                                this.internalMinute = this.modelValue.minute;
                            }
                            else if (this.internalHour != null) {
                                this.internalMinute = 0;
                            }
                            else {
                                this.internalMinute = null;
                            }
                            if (this.internalHour === null || this.internalMinute === null) {
                                return "";
                            }
                            this.internalValue = this.internalHour + ":" + String_1.padLeft(this.internalMinute.toString(), 2, "0");
                        }
                    },
                    internalValue: function () {
                        var values = /(\d+):(\d+)/.exec(this.internalValue);
                        if (values === null) {
                            return;
                        }
                    }
                },
                template: "\n<RockFormField\n    :modelValue=\"internalValue\"\n    formGroupClasses=\"timepicker-input\"\n    name=\"time-picker\"\n    :rules=\"computedRules\">\n    <template #default=\"{uniqueId, field, errors, disabled}\">\n        <div class=\"control-wrapper\">\n            <div class=\"timepicker-input\">\n                <div class=\"input-group input-width-md\">\n                    <input class=\"form-control\" type=\"text\" v-model=\"internalValue\" v-on:change=\"updateValue\" v-on:keypress=\"keyPress\" />\n                    <span class=\"input-group-btn\"><button class=\"btn btn-default\" v-on:click=\"toggleMeridiem\">{{ internalMeridiem }}</button></span>\n                </div>\n            </div>\n        </div>\n    </template>\n</RockFormField>"
            }));
        }
    };
});
//# sourceMappingURL=TimePicker.js.map