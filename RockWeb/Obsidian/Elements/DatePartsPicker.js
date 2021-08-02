System.register(["vue", "../Rules/Index", "@Obsidian/Services/DateKey", "@Obsidian/Services/Number", "./RockFormField"], function (exports_1, context_1) {
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
                data() {
                    return {
                        internalDay: "0",
                        internalMonth: "0",
                        internalYear: "0",
                        days: []
                    };
                },
                methods: {
                    getValue() {
                        return {
                            day: Number_1.toNumber(this.internalDay),
                            month: Number_1.toNumber(this.internalMonth),
                            year: Number_1.toNumber(this.internalYear)
                        };
                    },
                    updateDays() {
                        let dayCount = 31;
                        const year = Number_1.toNumber(this.internalYear);
                        const month = Number_1.toNumber(this.internalMonth);
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
                        const days = [];
                        for (let day = 1; day <= dayCount; day++) {
                            days.push(day.toString());
                        }
                        this.days = days;
                    }
                },
                computed: {
                    computedRequireYear() {
                        return this.showYear && this.requireYear;
                    },
                    internalDateKey() {
                        if (!this.modelValue.year && !this.computedRequireYear) {
                            const dateKey = DateKey_1.default.toNoYearDateKey(this.modelValue.month, this.modelValue.day);
                            return dateKey;
                        }
                        const dateKey = DateKey_1.default.toDateKey(this.modelValue.year, this.modelValue.month, this.modelValue.day);
                        return dateKey;
                    },
                    computedRules() {
                        const rules = Index_1.ruleStringToArray(this.rules);
                        if (rules.indexOf('required') !== -1 && rules.indexOf('datekey') === -1) {
                            rules.push('datekey');
                        }
                        return Index_1.ruleArrayToString(rules);
                    },
                    years() {
                        const years = [];
                        let year = new Date().getFullYear();
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
                        handler() {
                            this.internalDay = this.modelValue.day.toString();
                            this.internalMonth = this.modelValue.month.toString();
                            this.internalYear = this.modelValue.year.toString();
                            this.updateDays();
                        }
                    },
                    showYear: {
                        immediate: true,
                        handler() {
                            this.updateDays();
                        }
                    },
                    internalDay() {
                        this.updateDays();
                        this.$emit('update:modelValue', this.getValue());
                    },
                    internalMonth() {
                        this.updateDays();
                        this.$emit('update:modelValue', this.getValue());
                    },
                    internalYear() {
                        this.updateDays();
                        this.$emit('update:modelValue', this.getValue());
                    },
                },
                template: `
<RockFormField
    :modelValue="internalDateKey"
    formGroupClasses="birthday-picker"
    name="birthday"
    :rules="computedRules">
    <template #default="{uniqueId, field, errors, disabled}">
        <div class="control-wrapper">
            <div class="form-control-group">
                <select :id="uniqueId + '-month'" class="form-control input-width-sm" :disabled="disabled" v-model="internalMonth">
                    <option value="0"></option>
                    <option value="1">Jan</option>
                    <option value="2">Feb</option>
                    <option value="3">Mar</option>
                    <option value="4">Apr</option>
                    <option value="5">May</option>
                    <option value="6">Jun</option>
                    <option value="7">Jul</option>
                    <option value="8">Aug</option>
                    <option value="9">Sep</option>
                    <option value="10">Oct</option>
                    <option value="11">Nov</option>
                    <option value="12">Dec</option>
                </select>
                <span class="separator">/</span>
                <select :id="uniqueId + '-day'" class="form-control input-width-sm" v-model="internalDay">
                    <option value="0"></option>
                    <option v-for="day in days" :key="day" :value="day">{{day}}</option>
                </select>
                <span v-if="showYear" class="separator">/</span>
                <select v-if="showYear" :id="uniqueId + '-year'" class="form-control input-width-sm" v-model="internalYear">
                    <option value="0"></option>
                    <option v-for="year in years" :value="year">{{year}}</option>
                </select>
            </div>
        </div>
    </template>
</RockFormField>`
            }));
        }
    };
});
//# sourceMappingURL=DatePartsPicker.js.map