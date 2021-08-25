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
import { ClientAttributeValue } from '@Obsidian/ViewModels';
import RockField from './rockField';

export default defineComponent({
    name: 'AttributeValuesContainer',
    components: {
        RockField
    },
    props: {
        isEditMode: {
            type: Boolean as PropType<boolean>,
            default: false
        },
        attributeValues: {
            type: Array as PropType<ClientAttributeValue[]>,
            required: true
        },
        showEmptyValues: {
            type: Boolean as PropType<boolean>,
            default: true
        },
        showAbbreviatedName: {
            type: Boolean as PropType<boolean>,
            default: false
        }
    },
    computed: {
        validAttributeValues(): ClientAttributeValue[] {
            return this.attributeValues;
        }
    },
    template: `
<template v-for="a in validAttributeValues">
    <RockField
        :isEditMode="isEditMode"
        :attributeValue="a"
        :showEmptyValue="showEmptyValues"
        :showAbbreviatedName="showAbbreviatedName" />
</template>
`
});
