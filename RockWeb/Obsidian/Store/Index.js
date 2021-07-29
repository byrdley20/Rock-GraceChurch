System.register(["vuex", "./CommonEntities"], function (exports_1, context_1) {
    "use strict";
    var vuex_1, CommonEntities_1;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (vuex_1_1) {
                vuex_1 = vuex_1_1;
            },
            function (CommonEntities_1_1) {
                CommonEntities_1 = CommonEntities_1_1;
            }
        ],
        execute: function () {
            exports_1("default", vuex_1.createStore({
                state: {
                    areSecondaryBlocksShown: true,
                    currentPerson: null,
                    pageParameters: {},
                    contextEntities: {},
                    pageId: 0,
                    pageGuid: '',
                    executionStartTime: new Date(),
                    debugTimings: [],
                    loginUrlWithReturnUrl: ''
                },
                getters: {
                    isAuthenticated(state) {
                        return !!state.currentPerson;
                    },
                    contextEntity(state) {
                        return (type) => (state.contextEntities[type] || null);
                    },
                    personContext(state, getters) {
                        return getters.contextEntity('person');
                    },
                    groupContext(state, getters) {
                        return getters.contextEntity('group');
                    },
                    pageParameter(state) {
                        return (key) => (state.pageParameters[key]);
                    }
                },
                mutations: {
                    setAreSecondaryBlocksShown(state, { areSecondaryBlocksShown }) {
                        state.areSecondaryBlocksShown = areSecondaryBlocksShown;
                    },
                    setPageInitializationData(state, pageConfig) {
                        state.currentPerson = pageConfig.currentPerson || null;
                        state.pageParameters = pageConfig.pageParameters || {};
                        state.contextEntities = pageConfig.contextEntities || {};
                        state.pageId = pageConfig.pageId || 0;
                        state.pageGuid = pageConfig.pageGuid || '';
                        state.executionStartTime = pageConfig.executionStartTime;
                        state.loginUrlWithReturnUrl = pageConfig.loginUrlWithReturnUrl;
                    },
                    reportOnLoadDebugTiming(state, payload) {
                        const pageStartTime = state.executionStartTime.getTime();
                        const timestampMs = payload.startTimeMs - pageStartTime;
                        const durationMs = payload.finishTimeMs - payload.startTimeMs;
                        state.debugTimings.push({
                            TimestampMs: timestampMs,
                            DurationMs: durationMs,
                            IndentLevel: 1,
                            IsTitleBold: false,
                            SubTitle: payload.subtitle,
                            Title: payload.title
                        });
                    }
                },
                actions: {
                    initialize(context, { pageConfig }) {
                        context.commit('setPageInitializationData', pageConfig);
                        for (const commonEntity of CommonEntities_1.commonEntities) {
                            context.dispatch(`${commonEntity.namespace}/initialize`);
                        }
                    },
                    redirectToLogin(context) {
                        if (context.state.loginUrlWithReturnUrl) {
                            window.location.href = context.state.loginUrlWithReturnUrl;
                        }
                    }
                },
                modules: Object.assign({}, CommonEntities_1.commonEntityModules)
            }));
        }
    };
});
//# sourceMappingURL=Index.js.map