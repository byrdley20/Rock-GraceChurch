System.register(["linqts", "./String"], function (exports_1, context_1) {
    "use strict";
    var linqts_1, String_1, englishDayNames, englishMonthNames, dateFormatters, dateFormatterKeys, standardDateFormats;
    var __moduleName = context_1 && context_1.id;
    function parseDirtyRoundTripDateOrNull(value) {
        var _a, _b, _c, _d;
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
                hour = Math.min(23, parseInt((_a = components[4]) !== null && _a !== void 0 ? _a : '0'));
                minute = Math.min(59, parseInt((_b = components[5]) !== null && _b !== void 0 ? _b : '0'));
                second = Math.min(59, parseInt((_c = components[6]) !== null && _c !== void 0 ? _c : '0'));
            }
            if (components.length == 8) {
                millisecond = parseInt((_d = components[7]) !== null && _d !== void 0 ? _d : '0');
            }
            return new Date(year, month - 1, day, hour, minute, second, millisecond);
        }
        catch (_e) {
            return null;
        }
    }
    exports_1("parseDirtyRoundTripDateOrNull", parseDirtyRoundTripDateOrNull);
    function asDateOrNull(val) {
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
    exports_1("asDateOrNull", asDateOrNull);
    function asDateString(val) {
        const dateOrNull = asDateOrNull(val);
        if (!dateOrNull) {
            return '';
        }
        return dateOrNull.toLocaleDateString();
    }
    exports_1("asDateString", asDateString);
    function asElapsedString(dateTime) {
        const now = new Date();
        const msPerHour = 1000 * 60 * 60;
        const hoursPerDay = 24;
        const daysPerMonth = 30.4167;
        const daysPerYear = 365.25;
        const totalMs = Math.abs(now.getTime() - dateTime.getTime());
        const totalHours = totalMs / msPerHour;
        const totalDays = totalHours / hoursPerDay;
        if (totalDays < 2) {
            return '1day';
        }
        if (totalDays < 31) {
            return `${Math.floor(totalDays)}days`;
        }
        const totalMonths = totalDays / daysPerMonth;
        if (totalMonths <= 1) {
            return '1mon';
        }
        if (totalMonths <= 18) {
            return `${Math.round(totalMonths)}mon`;
        }
        const totalYears = totalDays / daysPerYear;
        if (totalYears <= 1) {
            return '1yr';
        }
        return `${Math.round(totalYears)}yrs`;
    }
    exports_1("asElapsedString", asElapsedString);
    function blankIfZero(value) {
        return parseInt(value) === 0 ? '' : value;
    }
    function get12HourValue(hour) {
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
    function formatAspCustomDate(date, format) {
        let result = '';
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
            if (format[i] === '\\') {
                i++;
                if (i < format.length) {
                    result += format[i++];
                }
            }
            else if (format[i] === '\'') {
                i++;
                for (; i < format.length && format[i] !== '\''; i++) {
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
    function formatAspStandardDate(date, format) {
        if (standardDateFormats[format] !== undefined) {
            return standardDateFormats[format](date);
        }
        return format;
    }
    function formatAspDate(date, format) {
        if (format.length === 1) {
            return formatAspStandardDate(date, format);
        }
        else if (format.length === 2 && format[0] === '%') {
            return formatAspCustomDate(date, format[1]);
        }
        else {
            return formatAspCustomDate(date, format);
        }
    }
    exports_1("formatAspDate", formatAspDate);
    return {
        setters: [
            function (linqts_1_1) {
                linqts_1 = linqts_1_1;
            },
            function (String_1_1) {
                String_1 = String_1_1;
            }
        ],
        execute: function () {
            englishDayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            englishMonthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            dateFormatters = {
                'yyyyy': date => String_1.padLeft(date.getFullYear().toString(), 5, '0'),
                'yyyy': date => String_1.padLeft(date.getFullYear().toString(), 4, '0'),
                'yyy': date => String_1.padLeft(date.getFullYear().toString(), 3, '0'),
                'yy': date => String_1.padLeft((date.getFullYear() % 100).toString(), 2, '0'),
                'y': date => (date.getFullYear() % 100).toString(),
                'MMMM': date => englishMonthNames[date.getMonth()],
                'MMM': date => englishMonthNames[date.getMonth()].substr(0, 3),
                'MM': date => String_1.padLeft((date.getMonth() + 1).toString(), 2, '0'),
                'M': date => (date.getMonth() + 1).toString(),
                'dddd': date => englishDayNames[date.getDay()],
                'ddd': date => englishDayNames[date.getDay()].substr(0, 3),
                'dd': date => String_1.padLeft(date.getDate().toString(), 2, '0'),
                'd': date => date.getDate().toString(),
                'fffffff': date => String_1.padRight((date.getMilliseconds() * 10000).toString(), 7, '0'),
                'ffffff': date => String_1.padRight((date.getMilliseconds() * 1000).toString(), 6, '0'),
                'fffff': date => String_1.padRight((date.getMilliseconds() * 100).toString(), 5, '0'),
                'ffff': date => String_1.padRight((date.getMilliseconds() * 10).toString(), 4, '0'),
                'fff': date => String_1.padRight(date.getMilliseconds().toString(), 3, '0'),
                'ff': date => String_1.padRight(Math.floor(date.getMilliseconds() / 10).toString(), 2, '0'),
                'f': date => String_1.padRight(Math.floor(date.getMilliseconds() / 100).toString(), 1, '0'),
                'FFFFFFF': date => blankIfZero(String_1.padRight((date.getMilliseconds() * 10000).toString(), 7, '0')),
                'FFFFFF': date => blankIfZero(String_1.padRight((date.getMilliseconds() * 1000).toString(), 6, '0')),
                'FFFFF': date => blankIfZero(String_1.padRight((date.getMilliseconds() * 100).toString(), 5, '0')),
                'FFFF': date => blankIfZero(String_1.padRight((date.getMilliseconds() * 10).toString(), 4, '0')),
                'FFF': date => blankIfZero(String_1.padRight(date.getMilliseconds().toString(), 3, '0')),
                'FF': date => blankIfZero(String_1.padRight(Math.floor(date.getMilliseconds() / 10).toString(), 2, '0')),
                'F': date => blankIfZero(String_1.padRight(Math.floor(date.getMilliseconds() / 100).toString(), 1, '0')),
                'g': date => date.getFullYear() < 0 ? 'B.C.' : 'A.D.',
                'gg': date => date.getFullYear() < 0 ? 'B.C.' : 'A.D.',
                'hh': date => String_1.padLeft(get12HourValue(date.getHours()).toString(), 2, '0'),
                'h': date => get12HourValue(date.getHours()).toString(),
                'HH': date => String_1.padLeft(date.getHours().toString(), 2, '0'),
                'H': date => date.getHours().toString(),
                'mm': date => String_1.padLeft(date.getMinutes().toString(), 2, '0'),
                'm': date => date.getMinutes().toString(),
                'ss': date => String_1.padLeft(date.getSeconds().toString(), 2, '0'),
                's': date => date.getSeconds().toString(),
                'K': date => {
                    const offset = date.getTimezoneOffset();
                    const offsetHour = Math.abs(Math.floor(offset / 60));
                    const offsetMinute = Math.abs(offset % 60);
                    return `${offset > 0 ? '-' : '+'}${String_1.padLeft(offsetHour.toString(), 2, '0')}:${String_1.padLeft(offsetMinute.toString(), 2, '0')}`;
                },
                'tt': date => date.getHours() >= 12 ? 'PM' : 'AM',
                't': date => date.getHours() >= 12 ? 'P' : 'A',
                'zzz': date => {
                    const offset = date.getTimezoneOffset();
                    const offsetHour = Math.abs(Math.floor(offset / 60));
                    const offsetMinute = Math.abs(offset % 60);
                    return `${offset > 0 ? '-' : '+'}${String_1.padLeft(offsetHour.toString(), 2, '0')}:${String_1.padLeft(offsetMinute.toString(), 2, '0')}`;
                },
                'zz': date => {
                    const offset = date.getTimezoneOffset();
                    const offsetHour = Math.abs(Math.floor(offset / 60));
                    return `${offset > 0 ? '-' : '+'}${String_1.padLeft(offsetHour.toString(), 2, '0')}`;
                },
                'z': date => {
                    const offset = date.getTimezoneOffset();
                    const offsetHour = Math.abs(Math.floor(offset / 60));
                    return `${offset > 0 ? '-' : '+'}${offsetHour}`;
                },
                ':': () => ':',
                '/': () => '/'
            };
            dateFormatterKeys = new linqts_1.List(Object.keys(dateFormatters))
                .OrderByDescending(k => k.length)
                .ToArray();
            standardDateFormats = {
                'd': date => formatAspDate(date, 'M/dd/yyyy'),
                'D': date => formatAspDate(date, 'dddd, MMMM dd, yyyy'),
                't': date => formatAspDate(date, 'h:mm tt'),
                'T': date => formatAspDate(date, 'h:mm:ss tt'),
                'M': date => formatAspDate(date, 'MMMM dd'),
                'm': date => formatAspDate(date, 'MMMM dd'),
                'Y': date => formatAspDate(date, 'yyyy MMMM'),
                'y': date => formatAspDate(date, 'yyyy MMMM'),
                'f': date => `${formatAspDate(date, 'D')} ${formatAspDate(date, 't')}`,
                'F': date => `${formatAspDate(date, 'D')} ${formatAspDate(date, 'T')}`,
                'g': date => `${formatAspDate(date, 'd')} ${formatAspDate(date, 't')}`,
                'G': date => `${formatAspDate(date, 'd')} ${formatAspDate(date, 'T')}`,
                'o': date => formatAspDate(date, `yyyy'-'MM'-'dd'T'HH':'mm':'ss'.'fffffffzzz`),
                'O': date => formatAspDate(date, `yyyy'-'MM'-'dd'T'HH':'mm':'ss'.'fffffffzzz`),
                'r': date => formatAspDate(date, `ddd, dd MMM yyyy HH':'mm':'ss 'GMT'`),
                'R': date => formatAspDate(date, `ddd, dd MMM yyyy HH':'mm':'ss 'GMT'`),
                's': date => formatAspDate(date, `yyyy'-'MM'-'dd'T'HH':'mm':'ss`),
                'u': date => formatAspDate(date, `yyyy'-'MM'-'dd HH':'mm':'ss'Z'`),
                'U': date => {
                    const utcDate = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds(), date.getUTCMilliseconds());
                    return formatAspDate(utcDate, `F`);
                },
            };
        }
    };
});
//# sourceMappingURL=Date.js.map