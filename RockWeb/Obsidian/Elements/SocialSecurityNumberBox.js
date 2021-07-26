System.register(["vue", "../Rules/Index", "./RockFormField"], function (exports_1, context_1) {
    "use strict";
    var vue_1, Index_1, RockFormField_1;
    var __moduleName = context_1 && context_1.id;
    function getDefaultDatePartsPickerModel() {
        return {
            year: 0,
            month: 0,
            day: 0
        };
    }
    exports_1("getDefaultDatePartsPickerModel", getDefaultDatePartsPickerModel);
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (Index_1_1) {
                Index_1 = Index_1_1;
            },
            function (RockFormField_1_1) {
                RockFormField_1 = RockFormField_1_1;
            }
        ],
        execute: function () {
            exports_1("default", vue_1.defineComponent({
                name: 'SocialSecurityNumberBox',
                components: {
                    RockFormField: RockFormField_1.default
                },
                props: {
                    rules: {
                        type: String,
                        default: ''
                    },
                    modelValue: {
                        type: String,
                        default: ""
                    }
                },
                data: function () {
                    return {
                        internalArea: "",
                        internalGroup: "",
                        internalSerial: "",
                        internalValue: ""
                    };
                },
                methods: {
                    getValue: function () {
                        var value = this.internalArea + "-" + this.internalGroup + "-" + this.internalSerial;
                        return value === "--" ? "" : value;
                    },
                    keyPress: function (e) {
                        if (/^[0-9]$/.test(e.key) === false) {
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
                    }
                },
                computed: {
                    computedRules: function () {
                        var rules = Index_1.ruleStringToArray(this.rules);
                        rules.push("ssn");
                        return Index_1.ruleArrayToString(rules);
                    }
                },
                watch: {
                    modelValue: {
                        immediate: true,
                        handler: function () {
                            var components = this.modelValue.split("-");
                            this.internalArea = components.length >= 1 ? components[0] : "";
                            this.internalGroup = components.length >= 2 ? components[1] : "";
                            this.internalSerial = components.length >= 3 ? components[2] : "";
                            this.internalValue = this.getValue();
                        }
                    },
                    internalArea: function () {
                        this.internalValue = this.getValue();
                        if (this.internalValue.length === 0 || this.internalValue.length === 11) {
                            this.$emit('update:modelValue', this.internalValue);
                        }
                    },
                    internalGroup: function () {
                        this.internalValue = this.getValue();
                        if (this.internalValue.length === 0 || this.internalValue.length === 11) {
                            this.$emit('update:modelValue', this.internalValue);
                        }
                    },
                    internalSerial: function () {
                        this.internalValue = this.getValue();
                        if (this.internalValue.length === 0 || this.internalValue.length === 11) {
                            this.$emit('update:modelValue', this.internalValue);
                        }
                    },
                },
                template: "\n<RockFormField\n    :modelValue=\"internalValue\"\n    formGroupClasses=\"social-security-number-box\"\n    name=\"birthday\"\n    :rules=\"computedRules\">\n    <template #default=\"{uniqueId, field, errors, disabled}\">\n        <div class=\"control-wrapper\">\n            <div class=\"form-control-group\">\n                <input ref=\"area\" class=\"form-control ssn-part ssn-area\" type=\"password\" pattern=\"[0-9]*\" maxlength=\"3\" v-model=\"internalArea\" v-on:keypress=\"keyPress\" v-on:keyup=\"keyUp\" />\n                <span class=\"separator\">-</span>\n                <input ref=\"group\" class=\"form-control ssn-part ssn-group\" type=\"password\" pattern=\"[0-9]*\" maxlength=\"2\" v-model=\"internalGroup\" v-on:keypress=\"keyPress\" v-on:keyup=\"keyUp\" />\n                <span class=\"separator\">-</span>\n                <input ref=\"serial\" class=\"form-control ssn-part ssn-serial\" type=\"password\" pattern=\"[0-9]*\" maxlength=\"4\" v-model=\"internalSerial\" v-on:keypress=\"keyPress\" v-on:keyup=\"keyUp\" />\n            </div>\n        </div>\n    </template>\n</RockFormField>"
            }));
        }
    };
});
//# sourceMappingURL=SocialSecurityNumberBox.js.map