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

import RockDate, { RockDateType } from '../Util/RockDate';
import { List } from 'linqts';
import { padLeft } from './String';

/**
 * Transform the value into a date or null
 * @param val
 */
export function asDateOrNull(val: unknown) {
    if (val === undefined || val === null) {
        return null;
    }

    if (val instanceof Date) {
        return val;
    }

    if (typeof val === 'string') {
        const ms = Date.parse(val);

        if (isNaN(ms)) {
            return null;
        }

        return new Date(ms);
    }

    return null;
}

/**
 * To a RockDate value.  Mon Dec 2 => 2000-12-02
 * @param val
 */
export function toRockDateOrNull(val: unknown): RockDateType | null {
    const date = asDateOrNull(val);

    if (date === null) {
        return null;
    }

    return RockDate.toRockDate(date);
}

/**
 * Transforms the value into a string like '9/13/2001'
 * @param val
 */
export function asDateString(val: unknown) {
    const dateOrNull = asDateOrNull(val);

    if (!dateOrNull) {
        return '';
    }

    return dateOrNull.toLocaleDateString();
}

/**
 * Transforms the date into a human friendly elapsed time string.
 * Ex: March 4, 2000 => 21yrs
 * @param dateTime
 */
export function asElapsedString ( dateTime: Date )
{
    const now = new Date();
    const msPerHour = 1000 * 60 * 60;
    const hoursPerDay = 24;
    const daysPerMonth = 30.4167;
    const daysPerYear = 365.25;

    const totalMs = Math.abs( now.getTime() - dateTime.getTime() );
    const totalHours = totalMs / msPerHour;
    const totalDays = totalHours / hoursPerDay;

    if ( totalDays < 2 )
    {
        return '1day';
    }

    if ( totalDays < 31 )
    {
        return `${Math.floor( totalDays )}days`;
    }

    const totalMonths = totalDays / daysPerMonth;

    if ( totalMonths <= 1 )
    {
        return '1mon';
    }

    if ( totalMonths <= 18 )
    {
        return `${Math.round( totalMonths )}mon`;
    }

    const totalYears = totalDays / daysPerYear;

    if ( totalYears <= 1 )
    {
        return '1yr';
    }

    return `${Math.round( totalYears )}yrs`;
}


type DateFormatterCommand = (date: Date) => string;

const englishDayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const englishMonthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const dateFormatters: Record<string, DateFormatterCommand> = {
    'yyyyy': date => padLeft(date.getFullYear().toString(), 5, '0'),
    'yyyy': date => padLeft(date.getFullYear().toString(), 4, '0'),
    'yyy': date => padLeft(date.getFullYear().toString(), 3, '0'),
    'yy': date => padLeft((date.getFullYear() % 100).toString(), 2, '0'),
    'y': date => (date.getFullYear() % 100).toString(),

    'MMMM': date => englishMonthNames[date.getMonth()],
    'MMM': date => englishMonthNames[date.getMonth()].substr(0, 3),
    'MM': date => padLeft((date.getMonth() + 1).toString(), 2, '0'),
    'M': date => (date.getMonth() + 1).toString(),


    'dddd': date => englishDayNames[date.getDay()],
    'ddd': date => englishDayNames[date.getDay()].substr(0, 3),
    'dd': date => padLeft(date.getDate().toString(), 2, '0'),
    'd': date => date.getDate().toString(),
};
const dateFormatterKeys = new List<string>(Object.keys(dateFormatters))
    .OrderByDescending(k => k.length)
    .ToArray();

export function formatAspDate(date: Date, format: string): string {
    let result = '';

    for (let i = 0; i < format.length; i++) {
        let matchFound = false;

        for (const k of dateFormatterKeys) {
            if (format.substr(i, k.length) === k) {
                result += dateFormatters[k](date);
                matchFound = true;
                break;
            }
        }

        if (!matchFound) {
            result += format[i];
        }
    }

    return result;
}
