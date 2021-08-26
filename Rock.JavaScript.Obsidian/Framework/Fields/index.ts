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
import { PropType } from "vue";
import { Guid, normalize, isValidGuid } from "../Util/guid";
import { IFieldType } from "./fieldType";
import { FieldType as FieldTypeGuids } from "@Obsidian/SystemGuids";

const fieldTypeTable: Record<Guid, IFieldType> = {};

export type ConfigurationValues = Record<string, string>;

/**
 * The basic properties that all field editor components must support.
 */
type FieldEditorBaseProps = {
    modelValue: {
        type: PropType<string>,
        required: boolean
    };

    configurationValues: {
        type: PropType<ConfigurationValues>;
        default: () => ConfigurationValues;
    };
};

/**
 * Get the standard properties that all field editor components must support.
 */
export function getFieldEditorProps(): FieldEditorBaseProps {
    return {
        modelValue: {
            type: String as PropType<string>,
            required: true
        },

        configurationValues: {
            type: Object as PropType<ConfigurationValues>,
            default: () => ({})
        }
    };
}

/**
 * Register a new field type in the system. This must be called for all field
 * types a plugin registers.
 * 
 * @param fieldTypeGuid The unique identifier of the field type.
 * @param fieldType The class instance that will handle the field type.
 */
export function registerFieldType(fieldTypeGuid: Guid, fieldType: IFieldType): void {
    const normalizedGuid = normalize(fieldTypeGuid);

    if (!isValidGuid(fieldTypeGuid) || normalizedGuid === null) {
        throw "Invalid guid specified when registering field type.";
    }

    if (fieldTypeTable[normalizedGuid] !== undefined) {
        throw "Invalid attempt to replace existing field type.";
    }

    fieldTypeTable[normalizedGuid] = fieldType;
}

/**
 * Get the field type handler for a given unique identifier.
 *
 * @param fieldTypeGuid The unique identifier of the field type.
 * @returns The field type instance or null if not found.
 */
export function getFieldType(fieldTypeGuid: Guid): IFieldType | null {
    const normalizedGuid = normalize(fieldTypeGuid);

    if (normalizedGuid !== null) {
        const field = fieldTypeTable[normalizedGuid];

        if (field) {
            return field;
        }
    }

    console.error(`Field type "${fieldTypeGuid}" was not found`);
    return null;
}

/*
 * Define the standard field types in Rock.
 */

import { AddressFieldType } from "./addressField";
registerFieldType(FieldTypeGuids.Address, new AddressFieldType());

import { BooleanFieldType } from "./booleanField";
registerFieldType(FieldTypeGuids.Boolean, new BooleanFieldType());

import { CampusFieldType } from "./campusField";
registerFieldType(FieldTypeGuids.Campus, new CampusFieldType());

import { CampusesFieldType } from "./campusesField";
registerFieldType(FieldTypeGuids.Campuses, new CampusesFieldType());

import { ColorFieldType } from "./colorField";
registerFieldType(FieldTypeGuids.Color, new ColorFieldType());

import { CurrencyFieldType } from "./currencyField";
registerFieldType(FieldTypeGuids.Currency, new CurrencyFieldType());

import { DateFieldType } from "./dateField";
registerFieldType(FieldTypeGuids.Date, new DateFieldType());

import { DateRangeFieldType } from "./dateRangeField";
registerFieldType(FieldTypeGuids.DateRange, new DateRangeFieldType());

import { DateTimeFieldType } from "./dateTimeField";
registerFieldType(FieldTypeGuids.DateTime, new DateTimeFieldType());

import { DayOfWeekFieldType } from "./dayOfWeekField";
registerFieldType(FieldTypeGuids.DayOfWeek, new DayOfWeekFieldType());

import { DaysOfWeekFieldType } from "./daysOfWeekField";
registerFieldType(FieldTypeGuids.DaysOfWeek, new DaysOfWeekFieldType());

import { DecimalFieldType } from "./decimalField";
registerFieldType(FieldTypeGuids.Decimal, new DecimalFieldType());

import { DecimalRangeFieldType } from "./decimalRangeField";
registerFieldType(FieldTypeGuids.DecimalRange, new DecimalRangeFieldType());

import { DefinedValueFieldType } from "./definedValueField";
registerFieldType(FieldTypeGuids.DefinedValue, new DefinedValueFieldType());

import { DefinedValueRangeFieldType } from "./definedValueRangeField";
registerFieldType(FieldTypeGuids.DefinedValueRange, new DefinedValueRangeFieldType());

import { EmailFieldType } from "./emailField";
registerFieldType(FieldTypeGuids.Email, new EmailFieldType());

import { GenderFieldType } from "./genderField";
registerFieldType(FieldTypeGuids.Gender, new GenderFieldType());

import { IntegerFieldType } from "./integerField";
registerFieldType(FieldTypeGuids.Integer, new IntegerFieldType());

import { IntegerRangeFieldType } from "./integerRangeField";
registerFieldType(FieldTypeGuids.IntegerRange, new IntegerRangeFieldType());

import { MemoFieldType } from "./memoField";
registerFieldType(FieldTypeGuids.Memo, new MemoFieldType());

import { MonthDayFieldType } from "./monthDayField";
registerFieldType(FieldTypeGuids.MonthDay, new MonthDayFieldType());

import { MultiSelectFieldType } from "./multiSelectField";
registerFieldType(FieldTypeGuids.MultiSelect, new MultiSelectFieldType());

import { PhoneNumberFieldType } from "./phoneNumberField";
registerFieldType(FieldTypeGuids.PhoneNumber, new PhoneNumberFieldType());

import { RatingFieldType } from "./ratingField";
registerFieldType(FieldTypeGuids.Rating, new RatingFieldType());

import { SingleSelectFieldType } from "./singleSelectField";
registerFieldType(FieldTypeGuids.SingleSelect, new SingleSelectFieldType());

import { SSNFieldType } from "./ssnField";
registerFieldType(FieldTypeGuids.Ssn, new SSNFieldType());

import { TextFieldType } from "./textField";
registerFieldType(FieldTypeGuids.Text, new TextFieldType());

import { TimeFieldType } from "./timeField";
registerFieldType(FieldTypeGuids.Time, new TimeFieldType());
