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
import { Component, PropType } from 'vue';
import { Guid, normalize, isValidGuid } from '../Util/Guid';
import { FieldType } from './FieldType';
import { FieldType as FieldTypeGuids } from '@Obsidian/SystemGuids';

const fieldTypeTable: Record<Guid, FieldType> = {};

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
}

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

export function legacyRegisterFieldType(fieldTypeGuid: Guid, component: Component) {
    return {};
}

/**
 * Register a new field type in the system. This must be called for all field
 * types a plugin registers.
 * 
 * @param fieldTypeGuid The unique identifier of the field type.
 * @param fieldType The class instance that will handle the field type.
 */
export function registerFieldType(fieldTypeGuid: Guid, fieldType: FieldType): void {
    const normalizedGuid = normalize(fieldTypeGuid);

    if (!isValidGuid(fieldTypeGuid) || normalizedGuid === null) {
        throw 'Invalid guid specified when registering field type.';
    }

    if (fieldTypeTable[normalizedGuid] !== undefined) {
        throw 'Invalid attempt to replace existing field type.';
    }

    fieldTypeTable[normalizedGuid] = fieldType;
}

/**
 * Get the field type handler for a given unique identifier.
 *
 * @param fieldTypeGuid The unique identifier of the field type.
 * @returns The field type instance or null if not found.
 */
export function getFieldType(fieldTypeGuid: Guid): FieldType | null {
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

import { BooleanFieldType } from './BooleanField';
registerFieldType(FieldTypeGuids.Boolean, new BooleanFieldType());

import { ColorFieldType } from './ColorField';
registerFieldType(FieldTypeGuids.Color, new ColorFieldType());

import { CurrencyFieldType } from './CurrencyField';
registerFieldType(FieldTypeGuids.Currency, new CurrencyFieldType());

import { DateFieldType } from './DateField';
registerFieldType(FieldTypeGuids.Date, new DateFieldType());

import { DateTimeFieldType } from './DateTimeField';
registerFieldType(FieldTypeGuids.DateTime, new DateTimeFieldType());

import { DayOfWeekFieldType } from './DayOfWeekField';
registerFieldType(FieldTypeGuids.DayOfWeek, new DayOfWeekFieldType());

import { DaysOfWeekFieldType } from './DaysOfWeekField';
registerFieldType(FieldTypeGuids.DaysOfWeek, new DaysOfWeekFieldType());

import { DecimalFieldType } from './DecimalField';
registerFieldType(FieldTypeGuids.Decimal, new DecimalFieldType());

import { DecimalRangeFieldType } from './DecimalRangeField';
registerFieldType(FieldTypeGuids.DecimalRange, new DecimalRangeFieldType());

import { EmailFieldType } from './EmailField';
registerFieldType(FieldTypeGuids.Email, new EmailFieldType());

import { GenderFieldType } from './GenderField';
registerFieldType(FieldTypeGuids.Gender, new GenderFieldType());

import { IntegerFieldType } from './IntegerField';
registerFieldType(FieldTypeGuids.Integer, new IntegerFieldType());

import { IntegerRangeFieldType } from './IntegerRangeField';
registerFieldType(FieldTypeGuids.IntegerRange, new IntegerRangeFieldType());

import { MonthDayFieldType } from './MonthDayField';
registerFieldType(FieldTypeGuids.MonthDay, new MonthDayFieldType());

import { PhoneNumberFieldType } from './PhoneNumberField';
registerFieldType(FieldTypeGuids.PhoneNumber, new PhoneNumberFieldType());

import { RatingFieldType } from './RatingField';
registerFieldType(FieldTypeGuids.Rating, new RatingFieldType());

import { SingleSelectFieldType } from './SingleSelectField';
registerFieldType(FieldTypeGuids.SingleSelect, new SingleSelectFieldType());

import { TextFieldType } from './TextField';
registerFieldType(FieldTypeGuids.Text, new TextFieldType());

import { TimeFieldType } from './TimeField';
registerFieldType(FieldTypeGuids.Time, new TimeFieldType());
