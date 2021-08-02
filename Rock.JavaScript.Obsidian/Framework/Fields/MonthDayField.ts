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
import { toNumber } from '@Obsidian/Services/Number';
import DatePartsPicker, { DatePartsPickerModel } from '../Elements/DatePartsPicker';

const fieldTypeGuid: Guid = '8BED8DD8-8167-4052-B807-A1E72C133611';

enum ConfigurationValueKey {
}

export default registerFieldType(fieldTypeGuid, defineComponent({
    name: 'MonthDayField',
    components: {
        DatePartsPicker
    },
    props: getFieldTypeProps(),
    data() {
        return {
            /** The user input value. */
            internalValue: {
                year: 0,
                month: 0,
                day: 0
            } as DatePartsPickerModel
        };
    },
    computed: {
        /** The display safe value. */
        displayValue(): string {
            const components = (this.modelValue || "").split("/");

            if (components.length == 2) {
                const month = toNumber(components[0]);
                const day = toNumber(components[1]);

                if (month !== 0 && day !== 0 && month <= 12) {
                    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

                    return `${months[month]} ${day}`;
                }
            }

            return "";
        }
    },
    watch: {
        /**
         * Watch for changes to internalValue and emit the new value out to
         * the consuming component.
         */
        internalValue(): void {
            const value = this.internalValue.month !== 0 && this.internalValue.day !== 0
                ? `${this.internalValue.month}/${this.internalValue.day}`
                : "";

            this.$emit('update:modelValue', value);
        },

        /**
         * Watch for changes to modelValue which indicate the component
         * using us has given us a new value to work with.
         */
        modelValue: {
            immediate: true,
            handler(): void {
                const components = (this.modelValue || "").split("/");

                if (components.length == 2) {
                    this.internalValue = {
                        year: 0,
                        month: toNumber(components[0]),
                        day: toNumber(components[1])
                    };
                }
                else {
                    this.internalValue = {
                        year: 0,
                        month: 0,
                        day: 0
                    };
                }
            }
        }
    },
    template: `
<DatePartsPicker v-show="isEditMode" v-model="internalValue" :showYear="false" />
<span v-else>{{ displayValue }}</span>`
}));
