System.register([], function (exports_1, context_1) {
    "use strict";
    var state;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            exports_1("state", state = {
                areSecondaryBlocksShown: true,
                currentPerson: null,
                pageParameters: {},
                contextEntities: {},
                pageId: 0,
                pageGuid: '',
                executionStartTime: new Date(),
                debugTimings: [],
                loginUrlWithReturnUrl: ''
            });
        }
    };
});
//# sourceMappingURL=State.js.map