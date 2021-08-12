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
import DropDownList from '../Elements/DropDownList';
import { asBoolean } from '@Obsidian/Services/Boolean';
import { ClientValue, ConfigurationValueKey, ValueItem } from './DefinedValueField';
import { DropDownListOption } from 'Elements/DropDownList';

export const EditComponent = defineComponent({
    name: 'DefinedValueField',

    components: {
        DropDownList
    },

    props: getFieldEditorProps(),

    setup() {
        return {
            isRequired: inject('isRequired') as boolean
        };
    },

    data() {
        return {
            internalValue: ''
        };
    },

    computed: {
        valueOptions(): ValueItem[] {
            try {
                return JSON.parse(this.configurationValues[ConfigurationValueKey.Values] ?? '[]') as ValueItem[];
            }
            catch {
                return [];
            }
        },

        /** The options to choose from in the drop down list */
        options(): DropDownListOption[] {
            const valueOptions = this.valueOptions;

            const providedOptions: DropDownListOption[] = valueOptions.map(v => {
                return {
                    text: v.text,
                    value: v.value
                };
            });

            return providedOptions;
        },

        configAttributes(): Record<string, unknown> {
            const attributes: Record<string, unknown> = { };

            const enhancedConfig = this.configurationValues[ConfigurationValueKey.EnhancedSelection];
            if (enhancedConfig) {
                attributes.enhanceForLongLists = asBoolean(enhancedConfig);
            }

            return attributes;
        }
    },

    watch: {
        internalValue(): void {
            const selectedValues = this.valueOptions.filter(v => v.value === this.internalValue);
            let clientValue: ClientValue;

            if (selectedValues.length >= 1) {
                clientValue = {
                    value: selectedValues[0].value,
                    text: selectedValues[0].text,
                    description: selectedValues[0].description
                };
            }
            else {
                clientValue = {
                    value: '',
                    text: '',
                    description: ''
                };
            }

            this.$emit('update:modelValue', JSON.stringify(clientValue));
        },

        modelValue: {
            immediate: true,
            handler(): void {
                try {
                    const clientValue = JSON.parse(this.modelValue ?? '') as ClientValue;

                    this.internalValue = clientValue.value;
                }
                catch {
                    this.internalValue = '';
                }
            }
        }
    },

    template: `
<DropDownList v-model="internalValue" v-bind="configAttributes" :options="options" :showBlankItem="!isRequired" />
`
});
