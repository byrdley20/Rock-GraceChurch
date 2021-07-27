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
//
import { defineComponent } from 'vue';
import { Guid } from '../Util/Guid';
import { registerFieldType, getFieldTypeProps } from './Index';
import { toNumber, toNumberOrNull } from '../Services/Number';
import NumberRangeBox, { NumberRangeModelValue } from '../Elements/NumberRangeBox';

const fieldTypeGuid: Guid = '9D5F21E0-DEA0-4E8E-BA42-71151F6A8ED4';

enum ConfigurationValueKey {
}

export default registerFieldType(fieldTypeGuid, defineComponent({
    name: 'IntegerRangeField',

    components: {
        NumberRangeBox
    },

    props: getFieldTypeProps(),

    data() {
        return {
            /** The user input value as a number of null if it isn't valid. */
            internalValue: {} as NumberRangeModelValue
        };
    },

    computed: {
        /** The display value. */
        displayValue(): string {
            if (this.internalValue.lower === null && this.internalValue.upper === null) {
                return "";
            }
            else {
                return `${this.internalValue.lower ?? ""} to ${this.internalValue.upper ?? ""}`;
            }
        }
    },

    watch: {
        /**
         * Watch for changes to internalValue and emit the new value out to
         * the consuming component.
         */
        internalValue() {
            const value = `${this.internalValue.lower ?? ""},${this.internalValue.upper ?? ""}`;

            this.$emit('update:modelValue', value !== "," ? value : "");
        },

        /**
         * Watch for changes to modelValue which indicate the component
         * using us has given us a new value to work with.
         */
        modelValue: {
            immediate: true,
            handler() {
                const values = (this.modelValue ?? "").split(",");
                const lower = toNumberOrNull(values[0]);
                const upper = values.length >= 2 ? toNumberOrNull(values[1]) : null;

                if (lower !== this.internalValue.lower || upper !== this.internalValue.upper) {
                    this.internalValue = {
                        lower: lower,
                        upper: upper
                    };
                }
            }
        }
    },
    template: `
<NumberRangeBox v-if="isEditMode" v-model="internalValue" :decimal-count="0" />
<span v-else>{{ displayValue }}</span>`
}));
