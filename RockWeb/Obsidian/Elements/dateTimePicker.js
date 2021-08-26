System.register(["vue", "@Obsidian/Services/number", "./rockFormField", "./textBox", "./basicTimePicker", "@Obsidian/Services/string"], function (exports_1, context_1) {
    "use strict";
    var vue_1, number_1, rockFormField_1, textBox_1, basicTimePicker_1, string_1;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (number_1_1) {
                number_1 = number_1_1;
            },
            function (rockFormField_1_1) {
                rockFormField_1 = rockFormField_1_1;
            },
            function (textBox_1_1) {
                textBox_1 = textBox_1_1;
            },
            function (basicTimePicker_1_1) {
                basicTimePicker_1 = basicTimePicker_1_1;
            },
            function (string_1_1) {
                string_1 = string_1_1;
            }
        ],
        execute: function () {
            exports_1("default", vue_1.defineComponent({
                name: "DateTimePicker",
                components: {
                    RockFormField: rockFormField_1.default,
                    BasicTimePicker: basicTimePicker_1.default,
                    TextBox: textBox_1.default
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
                    "update:modelValue"
                ],
                data: function () {
                    return {
                        internalDateValue: null,
                        internalTimeValue: {},
                        isCurrent: false,
                        currentDiff: "0",
                        validationValue: "",
                        skipEmit: false
                    };
                },
                computed: {
                    asRockDateTimeOrNull() {
                        if (this.internalDateValue) {
                            const date = new Date(this.internalDateValue);
                            if (this.internalTimeValue.hour !== undefined && this.internalTimeValue.minute !== undefined) {
                                date.setHours(this.internalTimeValue.hour);
                                date.setMinutes(this.internalTimeValue.minute);
                            }
                            const year = date.getFullYear().toString();
                            const month = string_1.padLeft((date.getMonth() + 1).toString(), 2, "0");
                            const day = string_1.padLeft(date.getDate().toString(), 2, "0");
                            const hour = string_1.padLeft(date.getHours().toString(), 2, "0");
                            const minute = string_1.padLeft(date.getMinutes().toString(), 2, "0");
                            const second = string_1.padLeft(date.getSeconds().toString(), 2, "0");
                            const millisecond = string_1.padLeft(date.getMilliseconds().toString(), 3, "0");
                            return `${year}-${month}-${day}T${hour}:${minute}:${second}.${millisecond}`;
                        }
                        else {
                            return null;
                        }
                    },
                    asCurrentDateValue() {
                        const plusMinus = `${number_1.toNumber(this.currentDiff)}`;
                        return `CURRENT:${plusMinus}`;
                    },
                    valueToEmit() {
                        var _a;
                        if (this.isCurrent) {
                            return this.asCurrentDateValue;
                        }
                        return (_a = this.asRockDateTimeOrNull) !== null && _a !== void 0 ? _a : "";
                    }
                },
                watch: {
                    isCurrentDateOffset: {
                        immediate: true,
                        handler() {
                            if (!this.isCurrentDateOffset) {
                                this.currentDiff = "0";
                            }
                        }
                    },
                    valueToEmit() {
                        if (!this.skipEmit) {
                            this.$emit("update:modelValue", this.valueToEmit);
                        }
                    },
                    modelValue: {
                        immediate: true,
                        handler() {
                            if (!this.modelValue) {
                                this.internalDateValue = null;
                                this.internalTimeValue = {};
                                this.isCurrent = false;
                                this.currentDiff = "0";
                                return;
                            }
                            if (this.modelValue.indexOf("CURRENT") === 0) {
                                this.isCurrent = true;
                                const parts = this.modelValue.split(":");
                                if (parts.length === 2) {
                                    this.currentDiff = `${number_1.toNumber(parts[1])}`;
                                }
                                return;
                            }
                            const date = new Date(this.modelValue);
                            const month = date.getMonth() + 1;
                            const day = date.getDate();
                            const year = date.getFullYear();
                            this.skipEmit = true;
                            this.internalDateValue = `${month}/${day}/${year}`;
                            this.internalTimeValue = {
                                hour: date.getHours(),
                                minute: date.getMinutes()
                            };
                            this.skipEmit = false;
                        }
                    }
                },
                mounted() {
                    const input = this.$refs["input"];
                    const inputId = input.id;
                    const Rock = window.Rock;
                    Rock.controls.datePicker.initialize({
                        id: inputId,
                        startView: 0,
                        showOnFocus: true,
                        format: "mm/dd/yyyy",
                        todayHighlight: true,
                        forceParse: true,
                        onChangeScript: () => {
                            if (!this.isCurrent) {
                                this.internalDateValue = input.value;
                            }
                        }
                    });
                },
                template: `
<RockFormField formGroupClasses="date-picker" #default="{uniqueId}" name="datepicker" v-model.lazy="internalDateValue">
    <div class="control-wrapper">
        <div class="form-control-group">
            <div class="form-row">
                <div class="input-group input-width-md js-date-picker date">
                    <input ref="input" type="text" :id="uniqueId" class="form-control" v-model.lazy="internalDateValue" :disabled="isCurrent" />
                    <span class="input-group-addon">
                        <i class="fa fa-calendar"></i>
                    </span>
                </div>
                <BasicTimePicker v-model="internalTimeValue" :disabled="isCurrent" />
                <div v-if="displayCurrentOption || isCurrent" class="input-group">
                    <div class="checkbox">
                        <label title="">
                        <input type="checkbox" v-model="isCurrent" />
                        <span class="label-text">Current Date</span></label>
                    </div>
                </div>
            </div>
            <div v-if="isCurrent && isCurrentDateOffset" class="form-row">
                <TextBox label="+- Minutes" v-model="currentDiff" inputClasses="input-width-md" help="Enter the number of minutes after the current time to use as the date. Use a negative number to specify minutes before." />
            </div>
        </div>
    </div>
</RockFormField>`
            }));
        }
    };
});
//# sourceMappingURL=dateTimePicker.js.map