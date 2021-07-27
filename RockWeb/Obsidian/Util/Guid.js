System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function newGuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : r & 0x3 | 0x8;
            return v.toString(16);
        });
    }
    exports_1("newGuid", newGuid);
    function normalize(a) {
        if (!a) {
            return null;
        }
        return a.toLowerCase();
    }
    exports_1("normalize", normalize);
    function areEqual(a, b) {
        return normalize(a) === normalize(b);
    }
    exports_1("areEqual", areEqual);
    return {
        setters: [],
        execute: function () {
            exports_1("default", {
                newGuid,
                normalize,
                areEqual
            });
        }
    };
});
//# sourceMappingURL=Guid.js.map