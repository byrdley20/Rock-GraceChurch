System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function set(key, value, expiration = null) {
        if (!expiration) {
            const now = new Date();
            const oneMinute = 60000;
            expiration = new Date(now.getTime() + oneMinute);
        }
        const cache = { expiration, value };
        const cacheJson = JSON.stringify(cache);
        sessionStorage.setItem(key, cacheJson);
    }
    function get(key) {
        const cacheJson = sessionStorage.getItem(key);
        if (!cacheJson) {
            return null;
        }
        const cache = JSON.parse(cacheJson);
        if (!cache || !cache.expiration) {
            return null;
        }
        const expiration = new Date(cache.expiration);
        if (!expiration || expiration < new Date()) {
            return null;
        }
        return cache.value;
    }
    return {
        setters: [],
        execute: function () {
            exports_1("default", {
                set,
                get
            });
        }
    };
});
//# sourceMappingURL=cache.js.map