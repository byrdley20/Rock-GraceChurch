System.register(["vue", "../Rules/Index", "../Services/DateKey", "../Services/Number", "./RockFormField"], function (exports_1, context_1) {
    "use strict";
    var vue_1, Index_1, DateKey_1, Number_1, RockFormField_1;
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
            function (DateKey_1_1) {
                DateKey_1 = DateKey_1_1;
            },
            function (Number_1_1) {
                Number_1 = Number_1_1;
            },
            function (RockFormField_1_1) {
                RockFormField_1 = RockFormField_1_1;
            }
        ],
        execute: function () {
            exports_1("default", vue_1.defineComponent({
                name: 'DatePartsPicker',
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
                        required: true
                    },
                    requireYear: {
                        type: Boolean,
                        default: true
                    },
                    showYear: {
                        type: Boolean,
                        default: true
                    },
                    allowFutureDates: {
                        type: Boolean,
                        default: true
                    },
                    futureYearCount: {
                        type: Number,
                        default: 50
                    },
                    startYear: {
                        type: Number,
                        default: 1900
                    }
                },
                data: function () {
                    return {
                        internalDay: "0",
                        internalMonth: "0",
                        internalYear: "0",
                        days: []
                    };
                },
                methods: {
                    getValue: function () {
                        return {
                            day: Number_1.toNumber(this.internalDay),
                            month: Number_1.toNumber(this.internalMonth),
                            year: Number_1.toNumber(this.internalYear)
                        };
                    },
                    updateDays: function () {
                        var dayCount = 31;
                        var year = Number_1.toNumber(this.internalYear);
                        var month = Number_1.toNumber(this.internalMonth);
                        if (this.showYear && year > 0 && month > 0) {
                            dayCount = new Date(year, month, 0).getDate();
                        }
                        else if ([1, 3, 5, 7, 8, 10, 12].indexOf(month) !== -1) {
                            dayCount = 31;
                        }
                        else if ([4, 6, 9, 11].indexOf(month) !== -1) {
                            dayCount = 30;
                        }
                        else if (month === 2) {
                            dayCount = 29;
                        }
                        var days = [];
                        for (var day = 1; day <= dayCount; day++) {
                            days.push(day.toString());
                        }
                        this.days = days;
                    }
                },
                computed: {
                    computedRequireYear: function () {
                        return this.showYear && this.requireYear;
                    },
                    internalDateKey: function () {
                        if (!this.modelValue.year && !this.computedRequireYear) {
                            var dateKey_1 = DateKey_1.default.toNoYearDateKey(this.modelValue.month, this.modelValue.day);
                            return dateKey_1;
                        }
                        var dateKey = DateKey_1.default.toDateKey(this.modelValue.year, this.modelValue.month, this.modelValue.day);
                        return dateKey;
                    },
                    computedRules: function () {
                        var rules = Index_1.ruleStringToArray(this.rules);
                        if (rules.indexOf('required') !== -1 && rules.indexOf('datekey') === -1) {
                            rules.push('datekey');
                        }
                        return Index_1.ruleArrayToString(rules);
                    },
                    years: function () {
                        var years = [];
                        var year = new Date().getFullYear();
                        if (this.futureYearCount > 0 && this.allowFutureDates) {
                            year += this.futureYearCount;
                        }
                        while (year >= 1900) {
                            years.push(year);
                            year--;
                        }
                        return years;
                    },
                },
                watch: {
                    modelValue: {
                        immediate: true,
                        handler: function () {
                            this.internalDay = this.modelValue.day.toString();
                            this.internalMonth = this.modelValue.month.toString();
                            this.internalYear = this.modelValue.year.toString();
                            this.updateDays();
                        }
                    },
                    showYear: {
                        immediate: true,
                        handler: function () {
                            this.updateDays();
                        }
                    },
                    internalDay: function () {
                        this.updateDays();
                        this.$emit('update:modelValue', this.getValue());
                    },
                    internalMonth: function () {
                        this.updateDays();
                        this.$emit('update:modelValue', this.getValue());
                    },
                    internalYear: function () {
                        this.updateDays();
                        this.$emit('update:modelValue', this.getValue());
                    },
                },
                template: "\n<RockFormField\n    :modelValue=\"internalDateKey\"\n    formGroupClasses=\"birthday-picker\"\n    name=\"birthday\"\n    :rules=\"computedRules\">\n    <template #default=\"{uniqueId, field, errors, disabled}\">\n        <div class=\"control-wrapper\">\n            <div class=\"form-control-group\">\n                <select :id=\"uniqueId + '-month'\" class=\"form-control input-width-sm\" :disabled=\"disabled\" v-model=\"internalMonth\">\n                    <option value=\"0\"></option>\n                    <option value=\"1\">Jan</option>\n                    <option value=\"2\">Feb</option>\n                    <option value=\"3\">Mar</option>\n                    <option value=\"4\">Apr</option>\n                    <option value=\"5\">May</option>\n                    <option value=\"6\">Jun</option>\n                    <option value=\"7\">Jul</option>\n                    <option value=\"8\">Aug</option>\n                    <option value=\"9\">Sep</option>\n                    <option value=\"10\">Oct</option>\n                    <option value=\"11\">Nov</option>\n                    <option value=\"12\">Dec</option>\n                </select>\n                <span class=\"separator\">/</span>\n                <select :id=\"uniqueId + '-day'\" class=\"form-control input-width-sm\" v-model=\"internalDay\">\n                    <option value=\"0\"></option>\n                    <option v-for=\"day in days\" :key=\"day\" :value=\"day\">{{day}}</option>\n                </select>\n                <span v-if=\"showYear\" class=\"separator\">/</span>\n                <select v-if=\"showYear\" :id=\"uniqueId + '-year'\" class=\"form-control input-width-sm\" v-model=\"internalYear\">\n                    <option value=\"0\"></option>\n                    <option v-for=\"year in years\" :value=\"year\">{{year}}</option>\n                </select>\n            </div>\n        </div>\n    </template>\n</RockFormField>"
            }));
        }
    };
});
//# sourceMappingURL=DatePartsPicker.js.map