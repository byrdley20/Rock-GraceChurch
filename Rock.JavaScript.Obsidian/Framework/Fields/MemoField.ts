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
import { legacyRegisterFieldType, getFieldEditorProps } from './Index';
import TextBox from '../Elements/TextBox';
import { asBoolean, asBooleanOrNull } from '@Obsidian/Services/Boolean';
import { toNumber } from '@Obsidian/Services/Number';

const fieldTypeGuid: Guid = 'C28C7BF3-A552-4D77-9408-DEDCF760CED0';

enum ConfigurationValueKey {
    NumberOfRows = 'numberofrows',
    AllowHtml = 'allowhtml',
    MaxCharacters = 'maxcharacters',
    ShowCountDown = 'showcountdown'
}

export default legacyRegisterFieldType(fieldTypeGuid, defineComponent({
    name: 'MemoField',
    components: {
        TextBox
    },
    props: getFieldEditorProps(),
    data() {
        return {
            internalValue: ''
        };
    },
    computed: {
        allowHtml(): boolean {
            const config = this.configurationValues[ConfigurationValueKey.AllowHtml];
            return asBoolean(config);
        },
        safeValue(): string {
            return (this.modelValue || '').trim();
        },
        configAttributes(): Record<string, number | boolean> {
            const attributes: Record<string, number | boolean> = {};

            const maxCharsConfig = this.configurationValues[ConfigurationValueKey.MaxCharacters];
            const maxCharsValue = toNumber(maxCharsConfig);

            if (maxCharsValue) {
                attributes.maxLength = maxCharsValue;
            }

            const showCountDownConfig = this.configurationValues[ConfigurationValueKey.ShowCountDown];
            const showCountDownValue = asBooleanOrNull(showCountDownConfig) || false;

            if (showCountDownValue) {
                attributes.showCountDown = showCountDownValue;
            }

            const rowsConfig = this.configurationValues[ConfigurationValueKey.NumberOfRows];
            const rows = toNumber(rowsConfig || null) || 3;

            if (rows > 0) {
                attributes.rows = rows;
            }

            return attributes;
        }
    },
    watch: {
        internalValue(): void {
            this.$emit('update:modelValue', this.internalValue);
        },
        modelValue: {
            immediate: true,
            handler(): void {
                this.internalValue = this.modelValue || '';
            }
        }
    },
    template: `
<TextBox v-if="isEditMode" v-model="internalValue" v-bind="configAttributes" textMode="MultiLine" />
<div v-else-if="allowHtml">
    <div v-html="modelValue"></div>
</div>
<span v-else>{{ safeValue }}</span>`
}));
