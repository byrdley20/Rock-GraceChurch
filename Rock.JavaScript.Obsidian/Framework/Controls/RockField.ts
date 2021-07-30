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
import { getFieldTypeComponent, registerFieldType } from '../Fields/Index';
import { Guid } from '../Util/Guid';
import { Component, computed, defineComponent, defineAsyncComponent, PropType, provide } from 'vue';
import { FieldType } from '@Obsidian/SystemGuids';

// Import and assign TextField because it is the fallback
import TextField from '../Fields/TextField';

// Import other field types so they are registered and available upon dynamic request
import '../Fields/BooleanField';
import '../Fields/CurrencyField';
import '../Fields/DateField';
import '../Fields/DateTimeField';
import '../Fields/DayOfWeekField';
import '../Fields/DaysOfWeekField';
import '../Fields/DecimalField';
import '../Fields/DecimalRangeField';
import '../Fields/DefinedValueField';
import '../Fields/EmailField';
import '../Fields/GenderField';
import '../Fields/IntegerField';
import '../Fields/IntegerRangeField';
import '../Fields/MemoField';
import '../Fields/MonthDayField';
import '../Fields/SingleSelect';
import '../Fields/PhoneNumber';
import '../Fields/RatingField';
import '../Fields/TimeField';

registerFieldType(FieldType.Text, TextField);
registerFieldType(FieldType.Color, defineAsyncComponent(() => import('../Fields/ColorField')));

export default defineComponent({
    name: 'RockField',
    props: {
        fieldTypeGuid: {
            type: String as PropType<Guid>,
            required: true
        },
        rules: {
            type: String as PropType<string>,
            default: ''
        }
    },
    setup(props) {
        const isRequired = computed(() => props.rules.includes('required'));

        const fieldComponent = computed(() => {
            const field = getFieldTypeComponent(props.fieldTypeGuid);

            if (!field) {
                // Fallback to text field
                return TextField;
            }

            return field;
        });

        provide('isRequired', isRequired);

        return {
            fieldComponent
        };
    },
    template: `
<component :is="fieldComponent" :rules="rules" />`
});
