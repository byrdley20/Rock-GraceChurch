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
import CheckBoxList, { CheckBoxListOption } from '../Elements/CheckBoxList';
import { toNumber } from '@Obsidian/Services/Number';

const fieldTypeGuid: Guid = '08943FF9-F2A8-4DB4-A72A-31938B200C8C';

enum DayOfWeek {
    Sunday = 0,
    Monday = 1,
    Tuesday = 2,
    Wednesday = 3,
    Thursday = 4,
    Friday = 5,
    Saturday = 6
}

enum ConfigurationValueKey {
}

export default registerFieldType(fieldTypeGuid, defineComponent({
    name: 'DaysOfWeekField',
    components: {
        CheckBoxList
    },
    props: getFieldTypeProps(),

    data() {
        return {
            /** The currently selected values. */
            internalValue: [] as Array<string>,
        };
    },

    methods: {
        /**
         * Builds a list of the drop down options that are used to display
         * in the drop down list.
         */
        options(): Array<CheckBoxListOption> {
            return [
                { text: 'Sunday', value: DayOfWeek.Sunday.toString() },
                { text: 'Monday', value: DayOfWeek.Monday.toString() },
                { text: 'Tuesday', value: DayOfWeek.Tuesday.toString() },
                { text: 'Wednesday', value: DayOfWeek.Wednesday.toString() },
                { text: 'Thursday', value: DayOfWeek.Thursday.toString() },
                { text: 'Friday', value: DayOfWeek.Friday.toString() },
                { text: 'Saturday', value: DayOfWeek.Saturday.toString() }
            ];
        },
    },

    computed: {
        /**
         * The display safe value.
         * */
        displayValue(): string {
            if (this.internalValue.length === 0) {
                return "";
            }

            return this.options()
                .filter(v => this.internalValue.indexOf(v.value) !== -1)
                .map(v => v.text)
                .join(", ");
        }
    },

    watch: {
        /**
         * Watch for changes to internalValue and emit the new value out to
         * the consuming component.
         */
        internalValue(): void {
            this.$emit('update:modelValue', this.internalValue.sort((a, b) => toNumber(a) - toNumber(b)).join(","));
        },

        /**
         * Watch for changes to modelValue which indicate the component
         * using us has given us a new value to work with.
         */
        modelValue: {
            immediate: true,
            handler(): void {
                const value = this.modelValue ?? "";

                this.internalValue = value !== "" ? value.split(",") : [];
            }
        }
    },
    template: `
<CheckBoxList v-if="isEditMode" v-model="internalValue" :options="options()" />
<span v-else>{{ displayValue }}</span>`
}));
