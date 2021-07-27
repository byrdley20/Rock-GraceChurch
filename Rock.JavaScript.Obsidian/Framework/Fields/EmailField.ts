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
import EmailBox from '../Elements/EmailBox';

const fieldTypeGuid: Guid = '3D045CAE-EA72-4A04-B7BE-7FD1D6214217';

enum ConfigurationValueKey {
}

export default registerFieldType(fieldTypeGuid, defineComponent({
    name: 'EmailField',
    components: {
        EmailBox
    },
    props: getFieldTypeProps(),
    data() {
        return {
            internalValue: ''
        };
    },
    computed: {
        safeValue(): string {
            return (this.modelValue || '').trim();
        },
    },
    watch: {
        internalValue() {
            this.$emit('update:modelValue', this.internalValue);
        },
        modelValue: {
            immediate: true,
            handler() {
                this.internalValue = this.modelValue || '';
            }
        }
    },
    template: `
<EmailBox v-if="isEditMode" v-model="internalValue" />
<span v-else>{{ safeValue }}</span>`
}));
