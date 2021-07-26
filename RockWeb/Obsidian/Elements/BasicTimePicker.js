System.register(["vue", "../Services/Number", "../Services/String"], function (exports_1, context_1) {
    "use strict";
    var vue_1, Number_1, String_1;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (Number_1_1) {
                Number_1 = Number_1_1;
            },
            function (String_1_1) {
                String_1 = String_1_1;
            }
        ],
        execute: function () {
            exports_1("default", vue_1.defineComponent({
                name: 'BasicTimePicker',
                components: {},
                props: {
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
                computed: {},
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
                    }
                },
                template: "\n<div class=\"input-group input-width-md\">\n    <input class=\"form-control\" type=\"text\" v-model=\"internalValue\" v-on:change=\"updateValue\" v-on:keypress=\"keyPress\" />\n    <span class=\"input-group-btn\"><button class=\"btn btn-default\" v-on:click=\"toggleMeridiem\">{{ internalMeridiem }}</button></span>\n</div>\n"
            }));
        }
    };
});
//# sourceMappingURL=BasicTimePicker.js.map