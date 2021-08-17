System.register(["../Util/RockDate", "linqts", "./String"], function (exports_1, context_1) {
    "use strict";
    var RockDate_1, linqts_1, String_1, englishDayNames, englishMonthNames, dateFormatters, dateFormatterKeys;
    var __moduleName = context_1 && context_1.id;
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
    function toRockDateOrNull(val) {
        const date = asDateOrNull(val);
        if (date === null) {
            return null;
        }
        return RockDate_1.default.toRockDate(date);
    }
    exports_1("toRockDateOrNull", toRockDateOrNull);
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
    function formatAspDate(date, format) {
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
    exports_1("formatAspDate", formatAspDate);
    return {
        setters: [
            function (RockDate_1_1) {
                RockDate_1 = RockDate_1_1;
            },
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
            };
            dateFormatterKeys = new linqts_1.List(Object.keys(dateFormatters))
                .OrderByDescending(k => k.length)
                .ToArray();
        }
    };
});
//# sourceMappingURL=Date.js.map