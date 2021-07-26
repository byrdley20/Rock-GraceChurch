// <copyright>
// Copyright by the Spark Development Network
//
// Licensed under the Rock Community License (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.rockrms.com/license
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
// </copyright>

import { defineComponent, PropType } from 'vue';
import { ruleArrayToString, ruleStringToArray } from '../Rules/Index';
import RockFormField from './RockFormField';

export interface DatePartsPickerModel {
    year: number,
    month: number;
    day: number;
}

export function getDefaultDatePartsPickerModel() {
    return {
        year: 0,
        month: 0,
        day: 0
    } as DatePartsPickerModel;
}

export default defineComponent({
    name: 'SocialSecurityNumberBox',
    components: {
        RockFormField
    },
    props: {
        rules: {
            type: String as PropType<string>,
            default: ''
        },
        modelValue: {
            type: String as PropType<string>,
            default: ""
        }
    },

    data() {
        return {
            internalArea: "",
            internalGroup: "",
            internalSerial: "",
            internalValue: ""
        };
    },

    methods: {
        getValue(): string {
            let value = `${this.internalArea}-${this.internalGroup}-${this.internalSerial}`;

            return value === "--" ? "" : value;
        },

        keyPress(e: KeyboardEvent): boolean {
            if (/^[0-9]$/.test(e.key) === false) {
                e.preventDefault()
                return false;
            }

            return true;
        },

        keyUp(e: KeyboardEvent): boolean {
            const area = <HTMLInputElement>this.$refs.area;
            const group = <HTMLInputElement>this.$refs.group;
            const serial = <HTMLInputElement>this.$refs.serial;

            // Only move to next field if a number was pressed.
            if (/^[0-9]$/.test(e.key) === false) {
                return true;
            }

            if (area === e.target && area.selectionStart === 3) {
                this.$nextTick(() => {
                    group.focus();
                    group.setSelectionRange(0, 2);
                });
            }
            else if (group === e.target && group.selectionStart === 2) {
                this.$nextTick(() => {
                    serial.focus();
                    serial.setSelectionRange(0, 4);
                });
            }

            return true;
        }
    },

    computed: {
        computedRules(): string {
            const rules = ruleStringToArray(this.rules);

            rules.push("ssn");

            return ruleArrayToString(rules);
        }
    },

    watch: {
        modelValue: {
            immediate: true,
            handler() {
                const components = this.modelValue.split("-");

                this.internalArea = components.length >= 1 ? components[0] : "";
                this.internalGroup = components.length >= 2 ? components[1] : "";
                this.internalSerial = components.length >= 3 ? components[2] : "";

                this.internalValue = this.getValue();
            }
        },

        internalArea() {
            this.internalValue = this.getValue();

            if (this.internalValue.length === 0 || this.internalValue.length === 11) {
                this.$emit('update:modelValue', this.internalValue);
            }
        },

        internalGroup() {
            this.internalValue = this.getValue();

            if (this.internalValue.length === 0 || this.internalValue.length === 11) {
                this.$emit('update:modelValue', this.internalValue);
            }
        },

        internalSerial() {
            this.internalValue = this.getValue();

            if (this.internalValue.length === 0 || this.internalValue.length === 11) {
                this.$emit('update:modelValue', this.internalValue);
            }
        },
    },

    template: `
<RockFormField
    :modelValue="internalValue"
    formGroupClasses="social-security-number-box"
    name="birthday"
    :rules="computedRules">
    <template #default="{uniqueId, field, errors, disabled}">
        <div class="control-wrapper">
            <div class="form-control-group">
                <input ref="area" class="form-control ssn-part ssn-area" type="password" pattern="[0-9]*" maxlength="3" v-model="internalArea" v-on:keypress="keyPress" v-on:keyup="keyUp" />
                <span class="separator">-</span>
                <input ref="group" class="form-control ssn-part ssn-group" type="password" pattern="[0-9]*" maxlength="2" v-model="internalGroup" v-on:keypress="keyPress" v-on:keyup="keyUp" />
                <span class="separator">-</span>
                <input ref="serial" class="form-control ssn-part ssn-serial" type="password" pattern="[0-9]*" maxlength="4" v-model="internalSerial" v-on:keypress="keyPress" v-on:keyup="keyUp" />
            </div>
        </div>
    </template>
</RockFormField>`
});
