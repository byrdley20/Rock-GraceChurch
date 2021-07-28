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
import { Guid, areEqual as guidsAreEqual } from '../Util/Guid';
import { registerFieldType, getFieldTypeProps, getConfigurationValue } from './Index';
import DefinedValuePicker from '../Controls/DefinedValuePicker';
import { toNumberOrNull } from '../Services/Number';
import DefinedType from '../ViewModels/DefinedTypeViewModel';
import DefinedValue from '../ViewModels/DefinedValueViewModel';
import { asBoolean } from '../Services/Boolean';

const fieldTypeGuid: Guid = '59D5A94C-94A0-4630-B80A-BB25697D74C7';

enum ConfigurationValueKey {
    DefinedType = 'definedtype',
    AllowMultiple = 'allowmultiple',
    DisplayDescription = 'displaydescription',
    EnhancedSelection = 'enhancedselection',
    IncludeInactive = 'includeInactive',
    AllowAddingNewValues = 'AllowAddingNewValues',
    RepeatColumns = 'RepeatColumns'
}

export default registerFieldType( fieldTypeGuid, defineComponent( {
    name: 'DefinedValueField',
    inheritAttrs: false,
    components: {
        DefinedValuePicker
    },
    props: getFieldTypeProps(),
    data ()
    {
        return {
            definedValues: [] as DefinedValue[],
            internalValue: ''
        };
    },
    computed: {
        selectedDefinedValues(): Array<DefinedValue>
        {
            const guids = this.internalValue.toLowerCase().split(",");

            return this.definedValues.filter(dv => guids.indexOf(dv.guid.toLowerCase()) !== -1);
        },
        displayValue (): string
        {
            if (this.selectedDefinedValues.length === 0)
            {
                return '';
            }

            if ( this.displayDescription )
            {
                return this.selectedDefinedValues.map(v => v.description ?? "").join(", ");
            }

            return this.selectedDefinedValues.map(v => v.value ?? "").join(", ");
        },
        displayDescription (): boolean
        {
            const displayDescription = getConfigurationValue( ConfigurationValueKey.DisplayDescription, this.configurationValues );
            return asBoolean( displayDescription );
        },
        configAttributes (): Record<string, unknown>
        {
            const attributes: Record<string, unknown> = {};

            const definedType = getConfigurationValue( ConfigurationValueKey.DefinedType, this.configurationValues );
            if ( definedType )
            {
                const definedTypeId = toNumberOrNull( definedType );

                if ( definedTypeId )
                {
                    const definedType = this.$store.getters[ 'definedTypes/getById' ]( definedTypeId ) as DefinedType | null;
                    attributes.definedTypeGuid = definedType?.guid || '';
                }
            }

            if ( this.displayDescription )
            {
                attributes.displayDescriptions = true;
            }

            const enhancedConfig = getConfigurationValue( ConfigurationValueKey.EnhancedSelection, this.configurationValues );
            if ( enhancedConfig )
            {
                attributes.enhanceForLongLists = asBoolean( enhancedConfig );
            }

            return attributes;
        }
    },
    methods: {
        receivedDefinedValues ( definedValues: DefinedValue[] )
        {
            this.definedValues = definedValues;
        }
    },
    watch: {
        internalValue ()
        {
            this.$emit( 'update:modelValue', this.internalValue );
        },
        modelValue: {
            immediate: true,
            handler ()
            {
                this.internalValue = this.modelValue || '';
            }
        }
    },
    template: `
<DefinedValuePicker :show="isEditMode" v-model="internalValue" v-bind="configAttributes" @receivedDefinedValues="receivedDefinedValues" />
<span v-if="!isEditMode">{{ displayValue }}</span>`
} ) );
