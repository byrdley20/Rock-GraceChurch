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
import { defineComponent, PropType } from 'vue';
import RockFormField from './RockFormField.js';

export type CheckBoxListOption = {
    value: string,
    text: string
};

export default defineComponent({
    name: 'CheckBoxList',

    components: {
        RockFormField
    },

    props: {
        modelValue: {
            type: Array as PropType<Array<string>>,
            default: []
        },

        options: {
            type: Array as PropType<Array<string>>,
            required: true
        },
    },

    data: function () {
        return {
            internalValue: this.modelValue
        };
    },

    methods: {
    },

    computed: {
    },

    watch: {
        modelValue() {
            this.internalValue = this.modelValue;
        },

        internalValue() {
            this.$emit('update:modelValue', this.internalValue);
        },
    },
    template: `
<RockFormField
    :modelValue="internalValue"
    formGroupClasses="check-box-list"
    name="check-box-list">
    <template #default="{uniqueId, field, errors, disabled}">
        <div class="control-wrapper">
            <div class="controls rockcheckboxlist rockcheckboxlist-vertical">
                <div class="checkbox" v-for="o in options" :key="o.value">
                    <label>
                        <input type="checkbox" :value="o.value" v-model="internalValue" />
                        <span class="label-text">{{ o.text }}</span>
                    </label>
                </div>
            </div>
        </div>
    </template>
</RockFormField>
`
});
