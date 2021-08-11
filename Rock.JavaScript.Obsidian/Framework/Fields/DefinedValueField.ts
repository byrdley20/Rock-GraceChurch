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
import { legacyRegisterFieldType, getFieldEditorProps } from './Index';
import DefinedValuePicker from '../Controls/DefinedValuePicker';
import { toNumberOrNull } from '@Obsidian/Services/Number';
import { DefinedValue, DefinedType } from '@Obsidian/ViewModels';
import { asBoolean } from '@Obsidian/Services/Boolean';

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

export default legacyRegisterFieldType(fieldTypeGuid, defineComponent({
    name: 'DefinedValueField',
    inheritAttrs: false,
    components: {
        DefinedValuePicker
    },
    props: getFieldEditorProps(),
    data() {
        return {
            definedValues: [] as DefinedValue[],
            internalValue: ''
        };
    },
    computed: {
        selectedDefinedValues(): Array<DefinedValue> {
            const guids = this.internalValue.toLowerCase().split(",");

            return this.definedValues.filter(dv => guids.indexOf(dv.guid.toLowerCase()) !== -1);
        },
        displayValue(): string {
            if (this.selectedDefinedValues.length === 0) {
                return '';
            }

            if (this.displayDescription) {
                return this.selectedDefinedValues.map(v => v.description ?? "").join(", ");
            }

            return this.selectedDefinedValues.map(v => v.value ?? "").join(", ");
        },
        displayDescription(): boolean {
            const displayDescription = this.configurationValues[ConfigurationValueKey.DisplayDescription];
            return asBoolean(displayDescription);
        },
        configAttributes(): Record<string, unknown> {
            // Append this.$attrs because we have multiple root elements, Vue will
            // not automatically inherit our attributes down.
            const attributes: Record<string, unknown> = { ...this.$attrs };

            const definedType = this.configurationValues[ConfigurationValueKey.DefinedType];
            if (definedType) {
                const definedTypeId = toNumberOrNull(definedType);

                if (definedTypeId) {
                    const definedType = (<(id: number) => DefinedType | null>this.$store.getters['definedTypes/getById'])(definedTypeId);
                    attributes.definedTypeGuid = definedType?.guid || '';
                }
            }

            if (this.displayDescription) {
                attributes.displayDescriptions = true;
            }

            const enhancedConfig = this.configurationValues[ConfigurationValueKey.EnhancedSelection];
            if (enhancedConfig) {
                attributes.enhanceForLongLists = asBoolean(enhancedConfig);
            }

            return attributes;
        }
    },
    methods: {
        receivedDefinedValues(definedValues: DefinedValue[]): void {
            this.definedValues = definedValues;
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
<div v-show="isEditMode">
    <DefinedValuePicker v-model="internalValue" v-bind="configAttributes" @receivedDefinedValues="receivedDefinedValues" />
</div>
<span v-if="!isEditMode">{{ displayValue }}</span>`
}));
