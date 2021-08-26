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

import { List } from "linqts";
import { padLeft, padRight } from "./string";

/**
 * This is a temporary function to parse a round trip date format into a Date
 * object. Any TZ data is ignored.
 * 
 * @param value The value to be parsed.
 * @returns A new date object or null if it couldn't be parsed.
 */
export function parseDirtyRoundTripDateOrNull(value: string | undefined | null): Date | null {
    if (value === undefined || value === null) {
        return null;
    }

    const components = /^(\d{4})-(\d{2})-(\d{2})(?:$|(?:T(\d{2}):(\d{2}):(\d{2})(?:$|\.(\d+))))/.exec(value);

    if (components === null) {
        return null;
    }

    try {
        const year = parseInt(components[1]);
        const month = parseInt(components[2]);
        const day = parseInt(components[3]);
        let hour = 0;
        let minute = 0;
        let second = 0;
        let millisecond = 0;

        if (components.length >= 7) {
            hour = Math.min(23, parseInt(components[4] ?? "0"));
            minute = Math.min(59, parseInt(components[5] ?? "0"));
            second = Math.min(59, parseInt(components[6] ?? "0"));
        }

        if (components.length == 8) {
            millisecond = parseInt(components[7] ?? "0");
        }

        return new Date(year, month - 1, day, hour, minute, second, millisecond);
    }
    catch {
        return null;
    }
}

/**
 * Transform the value into a date or null
 * @param val
 */
export function asDateOrNull(val: unknown): Date | null {
    if (val === undefined || val === null) {
        return null;
    }

    if (val instanceof Date) {
        return val;
    }

    if (typeof val === "string") {
        const ms = Date.parse(val);

        if (isNaN(ms)) {
            return null;
        }

        return new Date(ms);
    }

    return null;
}

/**
 * Transforms the value into a string like '9/13/2001'
 * @param val
 */
export function asDateString(val: unknown): string {
    const dateOrNull = asDateOrNull(val);

    if (!dateOrNull) {
        return "";
    }

    return dateOrNull.toLocaleDateString();
}

/**
 * Transforms the date into a human friendly elapsed time string.
 * Ex: March 4, 2000 => 21yrs
 * @param dateTime
 */
export function asElapsedString(dateTime: Date): string {
    const now = new Date();
    const msPerHour = 1000 * 60 * 60;
    const hoursPerDay = 24;
    const daysPerMonth = 30.4167;
    const daysPerYear = 365.25;

    const totalMs = Math.abs( now.getTime() - dateTime.getTime() );
    const totalHours = totalMs / msPerHour;
    const totalDays = totalHours / hoursPerDay;

    if ( totalDays < 2 ) {
        return "1day";
    }

    if ( totalDays < 31 ) {
        return `${Math.floor( totalDays )}days`;
    }

    const totalMonths = totalDays / daysPerMonth;

    if ( totalMonths <= 1 ) {
        return "1mon";
    }

    if ( totalMonths <= 18 ) {
        return `${Math.round( totalMonths )}mon`;
    }

    const totalYears = totalDays / daysPerYear;

    if ( totalYears <= 1 ) {
        return "1yr";
    }

    return `${Math.round( totalYears )}yrs`;
}


/**
 * Returns a blank string if the string value is 0.
 * 
 * @param value The value to check and return.
 * @returns The value passed in or an empty string if it equates to zero.
 */
function blankIfZero(value: string): string {
    return parseInt(value) === 0 ? "" : value;
}

/**
 * Gets the 12 hour value of the given 24-hour number.
 * 
 * @param hour The hour in a 24-hour format.
 * @returns The hour in a 12-hour format.
 */
function get12HourValue(hour: number): number {
    if (hour == 0) {
        return 12;
    }
    else if (hour < 13) {
        return hour;
    }
    else {
        return hour - 12;
    }
}
type DateFormatterCommand = (date: Date) => string;

const englishDayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const englishMonthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const dateFormatters: Record<string, DateFormatterCommand> = {
    "yyyyy": date => padLeft(date.getFullYear().toString(), 5, "0"),
    "yyyy": date => padLeft(date.getFullYear().toString(), 4, "0"),
    "yyy": date => padLeft(date.getFullYear().toString(), 3, "0"),
    "yy": date => padLeft((date.getFullYear() % 100).toString(), 2, "0"),
    "y": date => (date.getFullYear() % 100).toString(),

    "MMMM": date => englishMonthNames[date.getMonth()],
    "MMM": date => englishMonthNames[date.getMonth()].substr(0, 3),
    "MM": date => padLeft((date.getMonth() + 1).toString(), 2, "0"),
    "M": date => (date.getMonth() + 1).toString(),

    "dddd": date => englishDayNames[date.getDay()],
    "ddd": date => englishDayNames[date.getDay()].substr(0, 3),
    "dd": date => padLeft(date.getDate().toString(), 2, "0"),
    "d": date => date.getDate().toString(),

    "fffffff": date => padRight((date.getMilliseconds() * 10000).toString(), 7, "0"),
    "ffffff": date => padRight((date.getMilliseconds() * 1000).toString(), 6, "0"),
    "fffff": date => padRight((date.getMilliseconds() * 100).toString(), 5, "0"),
    "ffff": date => padRight((date.getMilliseconds() * 10).toString(), 4, "0"),
    "fff": date => padRight(date.getMilliseconds().toString(), 3, "0"),
    "ff": date => padRight(Math.floor(date.getMilliseconds() / 10).toString(), 2, "0"),
    "f": date => padRight(Math.floor(date.getMilliseconds() / 100).toString(), 1, "0"),

    "FFFFFFF": date => blankIfZero(padRight((date.getMilliseconds() * 10000).toString(), 7, "0")),
    "FFFFFF": date => blankIfZero(padRight((date.getMilliseconds() * 1000).toString(), 6, "0")),
    "FFFFF": date => blankIfZero(padRight((date.getMilliseconds() * 100).toString(), 5, "0")),
    "FFFF": date => blankIfZero(padRight((date.getMilliseconds() * 10).toString(), 4, "0")),
    "FFF": date => blankIfZero(padRight(date.getMilliseconds().toString(), 3, "0")),
    "FF": date => blankIfZero(padRight(Math.floor(date.getMilliseconds() / 10).toString(), 2, "0")),
    "F": date => blankIfZero(padRight(Math.floor(date.getMilliseconds() / 100).toString(), 1, "0")),

    "g": date => date.getFullYear() < 0 ? "B.C." : "A.D.",
    "gg": date => date.getFullYear() < 0 ? "B.C." : "A.D.",

    "hh": date => padLeft(get12HourValue(date.getHours()).toString(), 2, "0"),
    "h": date => get12HourValue(date.getHours()).toString(),

    "HH": date => padLeft(date.getHours().toString(), 2, "0"),
    "H": date => date.getHours().toString(),

    "mm": date => padLeft(date.getMinutes().toString(), 2, "0"),
    "m": date => date.getMinutes().toString(),

    "ss": date => padLeft(date.getSeconds().toString(), 2, "0"),
    "s": date => date.getSeconds().toString(),

    "K": date => {
        const offset = date.getTimezoneOffset();
        const offsetHour = Math.abs(Math.floor(offset / 60));
        const offsetMinute = Math.abs(offset % 60);
        return `${offset > 0 ? "-" : "+"}${padLeft(offsetHour.toString(), 2, "0")}:${padLeft(offsetMinute.toString(), 2, "0")}`;
    },

    "tt": date => date.getHours() >= 12 ? "PM" : "AM",
    "t": date => date.getHours() >= 12 ? "P" : "A",

    "zzz": date => {
        const offset = date.getTimezoneOffset();
        const offsetHour = Math.abs(Math.floor(offset / 60));
        const offsetMinute = Math.abs(offset % 60);
        return `${offset > 0 ? "-" : "+"}${padLeft(offsetHour.toString(), 2, "0")}:${padLeft(offsetMinute.toString(), 2, "0")}`;
    },
    "zz": date => {
        const offset = date.getTimezoneOffset();
        const offsetHour = Math.abs(Math.floor(offset / 60));
        return `${offset > 0 ? "-" : "+"}${padLeft(offsetHour.toString(), 2, "0")}`;
    },
    "z": date => {
        const offset = date.getTimezoneOffset();
        const offsetHour = Math.abs(Math.floor(offset / 60));
        return `${offset > 0 ? "-" : "+"}${offsetHour}`;
    },

    ":": () => ":",
    "/": () => "/"
};

const dateFormatterKeys = new List<string>(Object.keys(dateFormatters))
    .OrderByDescending(k => k.length)
    .ToArray();

const standardDateFormats: Record<string, DateFormatterCommand> = {
    "d": date => formatAspDate(date, "M/dd/yyyy"),
    "D": date => formatAspDate(date, "dddd, MMMM dd, yyyy"),
    "t": date => formatAspDate(date, "h:mm tt"),
    "T": date => formatAspDate(date, "h:mm:ss tt"),
    "M": date => formatAspDate(date, "MMMM dd"),
    "m": date => formatAspDate(date, "MMMM dd"),
    "Y": date => formatAspDate(date, "yyyy MMMM"),
    "y": date => formatAspDate(date, "yyyy MMMM"),
    "f": date => `${formatAspDate(date, "D")} ${formatAspDate(date, "t")}`,
    "F": date => `${formatAspDate(date, "D")} ${formatAspDate(date, "T")}`,
    "g": date => `${formatAspDate(date, "d")} ${formatAspDate(date, "t")}`,
    "G": date => `${formatAspDate(date, "d")} ${formatAspDate(date, "T")}`,
    "o": date => formatAspDate(date, `yyyy'-'MM'-'dd'T'HH':'mm':'ss'.'fffffffzzz`),
    "O": date => formatAspDate(date, `yyyy'-'MM'-'dd'T'HH':'mm':'ss'.'fffffffzzz`),
    "r": date => formatAspDate(date, `ddd, dd MMM yyyy HH':'mm':'ss 'GMT'`),
    "R": date => formatAspDate(date, `ddd, dd MMM yyyy HH':'mm':'ss 'GMT'`),
    "s": date => formatAspDate(date, `yyyy'-'MM'-'dd'T'HH':'mm':'ss`),
    "u": date => formatAspDate(date, `yyyy'-'MM'-'dd HH':'mm':'ss'Z'`),
    "U": date => {
        const utcDate = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds(), date.getUTCMilliseconds());
        return formatAspDate(utcDate, `F`);
    },
};

/**
 * Formats the Date object using custom format specifiers.
 * 
 * @param date The date object to be formatted.
 * @param format The custom format string.
 * @returns A string that represents the date in the specified format.
 */
function formatAspCustomDate(date: Date, format: string): string {
    let result = "";

    for (let i = 0; i < format.length;) {
        let matchFound = false;

        for (const k of dateFormatterKeys) {
            if (format.substr(i, k.length) === k) {
                result += dateFormatters[k](date);
                matchFound = true;
                i += k.length;
                break;
            }
        }

        if (matchFound) {
            continue;
        }

        if (format[i] === "\\") {
            i++;
            if (i < format.length) {
                result += format[i++];
            }
        }
        else if (format[i] === "'") {
            i++;
            for (; i < format.length && format[i] !== "'"; i++) {
                result += format[i];
            }
            i++;
        }
        else if (format[i] === '"') {
            i++;
            for (; i < format.length && format[i] !== '"'; i++) {
                result += format[i];
            }
            i++;
        }
        else {
            result += format[i++];
        }
    }

    return result;
}

/**
 * Formats the Date object using a standard format string.
 * 
 * @param date The date object to be formatted.
 * @param format The standard format specifier.
 * @returns A string that represents the date in the specified format.
 */
function formatAspStandardDate(date: Date, format: string): string {
    if (standardDateFormats[format] !== undefined) {
        return standardDateFormats[format](date);
    }

    return format;
}

/**
 * Formats the given Date object using nearly the same rules as the ASP C#
 * format methods.
 * 
 * @param date The date object to be formatted.
 * @param format The format string to use.
 */
export function formatAspDate(date: Date, format: string): string {
    if (format.length === 1) {
        return formatAspStandardDate(date, format);
    }
    else if (format.length === 2 && format[0] === "%") {
        return formatAspCustomDate(date, format[1]);
    }
    else {
        return formatAspCustomDate(date, format);
    }
}
