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
import { defineComponent, inject } from 'vue';
import { getFieldEditorProps } from './Index';
import DatePicker from '../Elements/DatePicker';
import { BlockHttp } from '../Controls/RockBlock';
import { asDateOrNull, toRockDateOrNull } from '@Obsidian/Services/Date';
import { asBoolean } from '@Obsidian/Services/Boolean';
import { toNumber } from '@Obsidian/Services/Number';
import DatePartsPicker, { getDefaultDatePartsPickerModel } from '../Elements/DatePartsPicker';
import { ConfigurationValueKey } from './DateField';

export const EditComponent = defineComponent({
    name: 'DateField',
    components: {
        DatePicker,
        DatePartsPicker
    },
    props: getFieldEditorProps(),
    data() {
        return {
            internalValue: '',
            internalDateParts: getDefaultDatePartsPickerModel(),
            formattedString: ''
        };
    },
    setup() {
        return {
            http: inject('http') as BlockHttp
        };
    },
    computed: {
        datePartsAsDate(): Date | null {
            if (!this.internalDateParts?.day || !this.internalDateParts.month || !this.internalDateParts.year) {
                return null;
            }

            return new Date(this.internalDateParts.year, this.internalDateParts.month - 1, this.internalDateParts.day) || null;
        },

        isDatePartsPicker(): boolean {
            const config = this.configurationValues[ConfigurationValueKey.DatePickerControlType];
            return config?.toLowerCase() === 'date parts picker';
        },

        configAttributes(): Record<string, number | boolean> {
            const attributes: Record<string, number | boolean> = {};

            const displayCurrentConfig = this.configurationValues[ConfigurationValueKey.DisplayCurrentOption];
            const displayCurrent = asBoolean(displayCurrentConfig);
            attributes.displayCurrentOption = displayCurrent;
            attributes.isCurrentDateOffset = displayCurrent;

            const futureYearConfig = this.configurationValues[ConfigurationValueKey.FutureYearCount];
            const futureYears = toNumber(futureYearConfig);

            if (futureYears > 0) {
                attributes.futureYearCount = futureYears;
            }

            return attributes;
        }
    },
    methods: {
        syncModelValue(): void {
            this.internalValue = this.modelValue || '';
            const asDate = asDateOrNull(this.modelValue);

            if (asDate) {
                this.internalDateParts.year = asDate.getFullYear();
                this.internalDateParts.month = asDate.getMonth() + 1;
                this.internalDateParts.day = asDate.getDate();
            }
            else {
                this.internalDateParts.year = 0;
                this.internalDateParts.month = 0;
                this.internalDateParts.day = 0;
            }
        }
    },
    watch: {
        datePartsAsDate(): void {
            if (this.isDatePartsPicker) {
                this.$emit('update:modelValue', toRockDateOrNull(this.datePartsAsDate) || '');
            }
        },
        internalValue(): void {
            if (!this.isDatePartsPicker) {
                this.$emit('update:modelValue', this.internalValue || '');
            }
        },
        modelValue: {
            immediate: true,
            async handler(): Promise<void> {
                await this.syncModelValue();
            }
        }
    },
    template: `
<DatePartsPicker v-if="isDatePartsPicker" v-model="internalDateParts" v-bind="configAttributes" />
<DatePicker v-else v-model="internalValue" v-bind="configAttributes" />
`
});
