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
import DropDownList, { DropDownListOption } from '../Elements/DropDownList';
import RockLabel from '../Elements/RockLabel';
import TextBox from '../Elements/TextBox';
import { ruleStringToArray } from '../Rules/Index';
import { newGuid } from '../Util/Guid';
import { Location } from '@Obsidian/ViewModels';

export interface AddressControlModel {
    street1: string;
    street2: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
}

export function getDefaultAddressControlModel() {
    return {
        street1: '',
        street2: '',
        city: '',
        state: 'AZ',
        postalCode: '',
        country: 'US'
    } as AddressControlModel;
}

export default defineComponent({
    name: 'AddressControl',
    components: {
        TextBox,
        RockLabel,
        DropDownList
    },
    props: {
        modelValue: {
            type: Object as PropType<AddressControlModel>,
            required: true
        },
        label: {
            type: String as PropType<string>,
            default: 'Address'
        },
        help: {
            type: String as PropType<string>,
            default: ''
        },
        rules: {
            type: String as PropType<string>,
            default: ''
        }
    },
    data() {
        return {
            state: '',
            uniqueId: `rock-addresscontrol-${newGuid()}`,
            stateOptions: [
                { value: 'AL', text: 'AL' },
                { value: 'AK', text: 'AK' },
                { value: 'AS', text: 'AS' },
                { value: 'AZ', text: 'AZ' },
                { value: 'AR', text: 'AR' },
                { value: 'CA', text: 'CA' },
                { value: 'CO', text: 'CO' },
                { value: 'CT', text: 'CT' },
                { value: 'DE', text: 'DE' },
                { value: 'DC', text: 'DC' },
                { value: 'FM', text: 'FM' },
                { value: 'FL', text: 'FL' },
                { value: 'GA', text: 'GA' },
                { value: 'GU', text: 'GU' },
                { value: 'HI', text: 'HI' },
                { value: 'ID', text: 'ID' },
                { value: 'IL', text: 'IL' },
                { value: 'IN', text: 'IN' },
                { value: 'IA', text: 'IA' },
                { value: 'KS', text: 'KS' },
                { value: 'KY', text: 'KY' },
                { value: 'LA', text: 'LA' },
                { value: 'ME', text: 'ME' },
                { value: 'MH', text: 'MH' },
                { value: 'MD', text: 'MD' },
                { value: 'MA', text: 'MA' },
                { value: 'MI', text: 'MI' },
                { value: 'MN', text: 'MN' },
                { value: 'MS', text: 'MS' },
                { value: 'MO', text: 'MO' },
                { value: 'MT', text: 'MT' },
                { value: 'NE', text: 'NE' },
                { value: 'NV', text: 'NV' },
                { value: 'NH', text: 'NH' },
                { value: 'NJ', text: 'NJ' },
                { value: 'NM', text: 'NM' },
                { value: 'NY', text: 'NY' },
                { value: 'NC', text: 'NC' },
                { value: 'ND', text: 'ND' },
                { value: 'MP', text: 'MP' },
                { value: 'OH', text: 'OH' },
                { value: 'OK', text: 'OK' },
                { value: 'OR', text: 'OR' },
                { value: 'PW', text: 'PW' },
                { value: 'PA', text: 'PA' },
                { value: 'PR', text: 'PR' },
                { value: 'RI', text: 'RI' },
                { value: 'SC', text: 'SC' },
                { value: 'SD', text: 'SD' },
                { value: 'TN', text: 'TN' },
                { value: 'TX', text: 'TX' },
                { value: 'UT', text: 'UT' },
                { value: 'VT', text: 'VT' },
                { value: 'VI', text: 'VI' },
                { value: 'VA', text: 'VA' },
                { value: 'WA', text: 'WA' },
                { value: 'WV', text: 'WV' },
                { value: 'WI', text: 'WI' },
                { value: 'WY', text: 'WY' }
            ] as DropDownListOption[]
        };
    },
    computed: {
        isRequired(): boolean {
            const rules = ruleStringToArray(this.rules);
            return rules.indexOf('required') !== -1;
        }
    },
    template: `
<div class="form-group address-control" :class="isRequired ? 'required' : ''">
    <RockLabel v-if="label || help" :for="uniqueId" :help="help">
        {{label}}
    </RockLabel>
    <div class="control-wrapper">
        <TextBox placeholder="Address Line 1" :rules="rules" v-model="modelValue.street1" validationTitle="Address Line 1" />
        <TextBox placeholder="Address Line 2" v-model="modelValue.street2" validationTitle="Address Line 2" />
        <div class="form-row">
            <TextBox placeholder="City" :rules="rules" v-model="modelValue.city" class="col-sm-6" validationTitle="City" />
            <DropDownList :showBlankItem="false" v-model="modelValue.state" class="col-sm-3" :options="stateOptions" />
            <TextBox placeholder="Zip" :rules="rules" v-model="modelValue.postalCode" class="col-sm-3" validationTitle="Zip" />
        </div>
    </div>
</div>`
});
