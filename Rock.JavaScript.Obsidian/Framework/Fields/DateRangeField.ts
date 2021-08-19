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
import { Component, defineAsyncComponent } from 'vue';
import { FieldTypeBase } from './FieldType';
import { ClientAttributeValue, ClientEditableAttributeValue } from '@Obsidian/ViewModels';
import { formatAspDate } from '@Obsidian/Services/Date';
import { toNumber } from '@Obsidian/Services/Number';


// The edit component can be quite large, so load it only as needed.
const editComponent = defineAsyncComponent(async () => {
    return (await import('./DateRangeFieldComponents')).EditComponent;
});

/**
 * The field type handler for the Date Range field.
 */
export class DateRangeFieldType extends FieldTypeBase {
    public override updateTextValue(value: ClientEditableAttributeValue): void {
        this.updateTextValueAsync(value);
    }

    public override getEditComponent(_value: ClientAttributeValue): Component {
        return editComponent;
    }

    private async updateTextValueAsync(value: ClientEditableAttributeValue): Promise<void> {
        const dateParts = (value.value ?? '').split(',');

        if (dateParts.length !== 2) {
            value.textValue = '';
            return;
        }

        const lowerDateParts = /^(\d+)-(\d+)-(\d+)/.exec(dateParts[0]);
        const upperDateParts = /^(\d+)-(\d+)-(\d+)/.exec(dateParts[1]);

        const lowerDate = lowerDateParts !== null ? new Date(toNumber(lowerDateParts[1]), toNumber(lowerDateParts[2]) - 1, toNumber(lowerDateParts[3])) : null;
        const upperDate = upperDateParts !== null ? new Date(toNumber(upperDateParts[1]), toNumber(upperDateParts[2]) - 1, toNumber(upperDateParts[3])) : null;

        if (lowerDate !== null && upperDate !== null) {
            value.textValue = `${formatAspDate(lowerDate, 'd')} to ${formatAspDate(upperDate, 'd')}`;
        }
        else if (lowerDate !== null) {
            value.textValue = `from ${formatAspDate(lowerDate, 'd')}`;
        }
        else if (upperDate !== null) {
            value.textValue = `through ${formatAspDate(upperDate, 'd')}`;
        }
        else {
            value.textValue = '';
        }
    }
}
