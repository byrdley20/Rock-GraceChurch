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
import { isNullOrWhitespace } from '@Obsidian/Services/String';
import { defineComponent, PropType } from 'vue';
import { AttributeValue } from '@Obsidian/ViewModels';
import RockField from './RockField';

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
            type: Array as PropType<AttributeValue[]>,
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
    methods: {
        getAttributeLabel(attributeValue: AttributeValue): string {
            if (this.showAbbreviatedName && attributeValue.attribute?.abbreviatedName) {
                return attributeValue.attribute.abbreviatedName;
            }

            return attributeValue.attribute?.name || '';
        }
    },
    computed: {
        validAttributeValues(): AttributeValue[] {
            return this.attributeValues.filter(av => av.attribute);
        },
        valuesToShow(): AttributeValue[] {
            if (this.showEmptyValues) {
                return this.validAttributeValues;
            }

            return this.validAttributeValues.filter(av => !isNullOrWhitespace(av.value));
        }
    },
    template: `
<div v-if="!isEditMode" v-for="a in valuesToShow" class="form-group static-control">
    <template v-if="a.value">
        <label class="control-label">
            {{ getAttributeLabel(a) }}
        </label>
        <div class="control-wrapper">
            <div class="form-control-static">
                <RockField :fieldTypeGuid="a.attribute.fieldTypeGuid" v-model="a.value" :configurationValues="a.attribute.qualifierValues" />
            </div>
        </div>
    </template>
</div>
<template v-else>
    <template v-for="a in validAttributeValues">
        <RockField
            isEditMode
            :fieldTypeGuid="a.attribute.fieldTypeGuid"
            v-model="a.value"
            :label="getAttributeLabel(a)"
            :help="a.attribute.description"
            :rules="a.attribute.isRequired ? 'required' : ''"
            :configurationValues="a.attribute.qualifierValues"  />
    </template>
</template>`
});
