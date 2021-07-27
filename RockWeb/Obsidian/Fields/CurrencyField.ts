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
import { toNumberOrNull, toCurrencyOrNull } from '../Services/Number';
import CurrencyBox from '../Elements/CurrencyBox';

const fieldTypeGuid: Guid = '3EE69CBC-35CE-4496-88CC-8327A447603F';

enum ConfigurationValueKey {
}

export default registerFieldType(fieldTypeGuid, defineComponent({
    name: 'CurrencyField',
    components: {
        CurrencyBox
    },
    props: getFieldTypeProps(),
    data() {
        return {
            /** The user input value as a number of null if it isn't valid. */
            internalValue: null as number | null
        };
    },
    computed: {
        /** The display safe value. */
        safeValue(): string {
            return toCurrencyOrNull((this.modelValue || '').trim()) ?? "";
        }
    },
    watch: {
        /**
         * Watch for changes to internalValue and emit the new value out to
         * the consuming component.
         */
        internalValue() {
            this.$emit('update:modelValue', this.internalValue !== null ? this.internalValue.toString() : '');
        },

        /**
         * Watch for changes to modelValue which indicate the component
         * using us has given us a new value to work with.
         */
        modelValue: {
            immediate: true,
            handler() {
                this.internalValue = toNumberOrNull(this.modelValue || '');
            }
        }
    },
    template: `
<CurrencyBox v-if="isEditMode" v-model="internalValue" />
<span v-else>{{ safeValue }}</span>`
}));
