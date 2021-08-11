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
import { Guid } from '../Util/Guid';
import { getFieldEditorProps, legacyRegisterFieldType } from './Index';
import DateTimePicker from '../Elements/DateTimePicker';
import { toNumber } from '@Obsidian/Services/Number';
import { BlockHttp } from '../Controls/RockBlock';
import { asElapsedString } from '@Obsidian/Services/Date';
import { asBoolean } from '@Obsidian/Services/Boolean';

const fieldTypeGuid: Guid = 'FE95430C-322D-4B67-9C77-DFD1D4408725';

enum ConfigurationValueKey {
    DateTimeFormat = "format",
    DisplayAsElapsedTime = "displayDiff",
    DisplayCurrentOption = "displayCurrentOption"
}

export default legacyRegisterFieldType(fieldTypeGuid, defineComponent({
    name: 'DateTimeField',

    components: {
        DateTimePicker
    },

    props: getFieldEditorProps(),

    setup() {
        return {
            http: inject('http') as BlockHttp
        };
    },

    data() {
        return {
            internalValue: '',
            formattedString: ''
        };
    },

    methods: {
        async syncModelValue(): Promise<void> {
            this.internalValue = this.modelValue ?? '';

            await this.fetchAndSetFormattedValue();
        },

        async fetchAndSetFormattedValue(): Promise<void> {
            if (this.isCurrentDateValue) {
                const parts = this.internalValue.split(':');
                const diff = parts.length === 2 ? toNumber(parts[1]) : 0;

                if (diff === 1) {
                    this.formattedString = 'Current Date plus 1 minute';
                }
                else if (diff > 0) {
                    this.formattedString = `Current Date plus ${diff} minutes`;
                }
                else if (diff === -1) {
                    this.formattedString = 'Current Date minus 1 minute';
                }
                else if (diff < 0) {
                    this.formattedString = `Current Date minus ${Math.abs(diff)} minutes`;
                }
                else {
                    this.formattedString = 'Current Date';
                }
            }
            else if (this.asDate) {
                this.formattedString = await this.getFormattedDateString(this.asDate, this.dateFormatTemplate);
            }
            else {
                this.formattedString = '';
            }
        },

        async getFormattedDateString(value: Date | string, format: string): Promise<string> {
            const get = this.http.get;
            const result = await get<string>('/api/Utility/FormatDate', { value, format });
            return result.data || `${value}`;
        },
    },

    computed: {
        isCurrentDateValue(): boolean {
            return this.internalValue.indexOf('CURRENT') === 0;
        },

        asDate(): Date | null {
            const ms = Date.parse(this.internalValue);

            if (isNaN(ms)) {
                return null;
            }

            return new Date(ms);
        },

        dateFormatTemplate(): string {
            const formatConfig = this.configurationValues[ConfigurationValueKey.DateTimeFormat];
            return formatConfig || 'MM/dd/yyyy';
        },

        elapsedString(): string {
            const dateValue = this.asDate;

            if (this.isCurrentDateValue || !dateValue) {
                return '';
            }

            const formatConfig = this.configurationValues[ConfigurationValueKey.DisplayAsElapsedTime];
            const displayDiff = asBoolean(formatConfig);

            if (!displayDiff) {
                return '';
            }

            return asElapsedString(dateValue);
        },

        configAttributes(): Record<string, number | boolean> {
            const attributes: Record<string, number | boolean> = {};

            const displayCurrentConfig = this.configurationValues[ConfigurationValueKey.DisplayCurrentOption];
            const displayCurrent = asBoolean(displayCurrentConfig);
            attributes.displayCurrentOption = displayCurrent;
            attributes.isCurrentDateOffset = displayCurrent;

            return attributes;
        }
    },

    watch: {
        internalValue(): void {
            if (this.internalValue !== this.modelValue) {
                const d1 = Date.parse(this.internalValue);
                const d2 = Date.parse(this.modelValue ?? '');

                if (isNaN(d1) || isNaN(d2) || d1 !== d2) {
                    this.$emit('update:modelValue', this.internalValue);
                }
            }
        },

        modelValue: {
            immediate: true,
            async handler(): Promise<void> {
                await this.syncModelValue();
            }
        },

        async dateFormatTemplate(): Promise<void> {
            await this.fetchAndSetFormattedValue();
        }
    },
    template: `
<DateTimePicker v-if="isEditMode" v-model="internalValue" v-bind="configAttributes" />
<span v-else>
    {{ formattedString }}
    <template v-if="elapsedString">
        ({{ elapsedString }})
    </template>
</span>`
}));
