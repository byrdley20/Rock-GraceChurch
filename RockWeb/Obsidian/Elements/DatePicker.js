System.register(["vue", "../Services/Number", "../Util/RockDate", "./RockFormField", "./TextBox"], function (exports_1, context_1) {
    "use strict";
    var vue_1, Number_1, RockDate_1, RockFormField_1, TextBox_1;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (Number_1_1) {
                Number_1 = Number_1_1;
            },
            function (RockDate_1_1) {
                RockDate_1 = RockDate_1_1;
            },
            function (RockFormField_1_1) {
                RockFormField_1 = RockFormField_1_1;
            },
            function (TextBox_1_1) {
                TextBox_1 = TextBox_1_1;
            }
        ],
        execute: function () {
            exports_1("default", vue_1.defineComponent({
                name: 'DatePicker',
                components: {
                    RockFormField: RockFormField_1.default,
                    TextBox: TextBox_1.default
                },
                props: {
                    modelValue: {
                        type: String,
                        default: null
                    },
                    displayCurrentOption: {
                        type: Boolean,
                        default: false
                    },
                    isCurrentDateOffset: {
                        type: Boolean,
                        default: false
                    }
                },
                emits: [
                    'update:modelValue'
                ],
                data: function () {
                    return {
                        internalValue: null,
                        isCurrent: false,
                        currentDiff: '0'
                    };
                },
                computed: {
                    asRockDateOrNull() {
                        return this.internalValue ? RockDate_1.default.toRockDate(new Date(this.internalValue)) : null;
                    },
                    asCurrentDateValue() {
                        const plusMinus = `${Number_1.toNumber(this.currentDiff)}`;
                        return `CURRENT:${plusMinus}`;
                    },
                    valueToEmit() {
                        if (this.isCurrent) {
                            return this.asCurrentDateValue;
                        }
                        return this.asRockDateOrNull;
                    }
                },
                watch: {
                    isCurrentDateOffset: {
                        immediate: true,
                        handler() {
                            if (!this.isCurrentDateOffset) {
                                this.currentDiff = '0';
                            }
                        }
                    },
                    isCurrent: {
                        immediate: true,
                        handler() {
                            if (this.isCurrent) {
                                this.internalValue = 'Current';
                            }
                        }
                    },
                    valueToEmit() {
                        this.$emit('update:modelValue', this.valueToEmit);
                    },
                    modelValue: {
                        immediate: true,
                        handler() {
                            if (!this.modelValue) {
                                this.internalValue = null;
                                this.isCurrent = false;
                                this.currentDiff = '0';
                                return;
                            }
                            if (this.modelValue.indexOf('CURRENT') === 0) {
                                this.isCurrent = true;
                                const parts = this.modelValue.split(':');
                                if (parts.length === 2) {
                                    this.currentDiff = `${Number_1.toNumber(parts[1])}`;
                                }
                                return;
                            }
                            const month = RockDate_1.default.getMonth(this.modelValue);
                            const day = RockDate_1.default.getDay(this.modelValue);
                            const year = RockDate_1.default.getYear(this.modelValue);
                            this.internalValue = `${month}/${day}/${year}`;
                        }
                    }
                },
                mounted() {
                    const input = this.$refs['input'];
                    const inputId = input.id;
                    const Rock = window['Rock'];
                    Rock.controls.datePicker.initialize({
                        id: inputId,
                        startView: 0,
                        showOnFocus: true,
                        format: 'mm/dd/yyyy',
                        todayHighlight: true,
                        forceParse: true,
                        onChangeScript: () => {
                            if (!this.isCurrent) {
                                this.internalValue = input.value;
                            }
                        }
                    });
                },
                template: `
<RockFormField formGroupClasses="date-picker" #default="{uniqueId}" name="datepicker" v-model.lazy="internalValue">
    <div class="control-wrapper">
        <div class="form-control-group">
            <div class="form-row">
                <div class="input-group input-width-md js-date-picker date">
                    <input ref="input" type="text" :id="uniqueId" class="form-control" v-model.lazy="internalValue" :disabled="isCurrent" />
                    <span class="input-group-addon">
                        <i class="fa fa-calendar"></i>
                    </span>
                </div>
                <div v-if="displayCurrentOption || isCurrent" class="input-group">
                    <div class="checkbox">
                        <label title="">
                        <input type="checkbox" v-model="isCurrent" />
                        <span class="label-text">Current Date</span></label>
                    </div>
                </div>
            </div>
            <div v-if="isCurrent && isCurrentDateOffset" class="form-row">
                <TextBox label="+- Days" v-model="currentDiff" inputClasses="input-width-md" help="Enter the number of days after the current date to use as the date. Use a negative number to specify days before." />
            </div>
        </div>
    </div>
</RockFormField>`
            }));
        }
    };
});
//# sourceMappingURL=DatePicker.js.map