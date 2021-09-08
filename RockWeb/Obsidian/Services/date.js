System.register([], function (exports_1, context_1) {
    "use strict";
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
                hour = Math.min(23, parseInt((_a = components[4]) !== null && _a !== void 0 ? _a : "0"));
                minute = Math.min(59, parseInt((_b = components[5]) !== null && _b !== void 0 ? _b : "0"));
                second = Math.min(59, parseInt((_c = components[6]) !== null && _c !== void 0 ? _c : "0"));
            }
            if (components.length == 8) {
                millisecond = parseInt((_d = components[7]) !== null && _d !== void 0 ? _d : "0");
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
        if (typeof val === "string") {
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
            return "";
        }
        return dateOrNull.toLocaleDateString();
    }
    exports_1("asDateString", asDateString);
    return {
        setters: [],
        execute: function () {
        }
    };
});
//# sourceMappingURL=date.js.map