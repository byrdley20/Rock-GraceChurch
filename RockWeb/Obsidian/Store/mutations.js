System.register([], function (exports_1, context_1) {
    "use strict";
    var mutations;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            exports_1("mutations", mutations = {
                ["setAreSecondaryBlocksShown"](state, value) {
                    state.areSecondaryBlocksShown = value.areSecondaryBlocksShown;
                },
                ["setPageInitializationData"](state, value) {
                    state.currentPerson = value.pageConfig.currentPerson || null;
                    state.pageParameters = value.pageConfig.pageParameters || {};
                    state.contextEntities = value.pageConfig.contextEntities || {};
                    state.pageId = value.pageConfig.pageId || 0;
                    state.pageGuid = value.pageConfig.pageGuid || '';
                    state.executionStartTime = value.pageConfig.executionStartTime;
                    state.loginUrlWithReturnUrl = value.pageConfig.loginUrlWithReturnUrl;
                },
                ["addPageDebugTiming"](state, value) {
                    const pageStartTime = state.executionStartTime.getTime();
                    const timestampMs = value.startTimeMs - pageStartTime;
                    const durationMs = value.finishTimeMs - value.startTimeMs;
                    state.debugTimings.push({
                        TimestampMs: timestampMs,
                        DurationMs: durationMs,
                        IndentLevel: 1,
                        IsTitleBold: false,
                        SubTitle: value.subtitle,
                        Title: value.title
                    });
                }
            });
        }
    };
});
//# sourceMappingURL=mutations.js.map