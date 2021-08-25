System.register(["vuex", "./state", "./mutations", "./actions", "./getters"], function (exports_1, context_1) {
    "use strict";
    var vuex_1, state_1, mutations_1, actions_1, getters_1, store;
    var __moduleName = context_1 && context_1.id;
    function useStore() {
        return store;
    }
    exports_1("useStore", useStore);
    return {
        setters: [
            function (vuex_1_1) {
                vuex_1 = vuex_1_1;
            },
            function (state_1_1) {
                state_1 = state_1_1;
            },
            function (mutations_1_1) {
                mutations_1 = mutations_1_1;
            },
            function (actions_1_1) {
                actions_1 = actions_1_1;
            },
            function (getters_1_1) {
                getters_1 = getters_1_1;
            }
        ],
        execute: function () {
            exports_1("store", store = vuex_1.createStore({
                state: state_1.state,
                getters: getters_1.getters,
                mutations: mutations_1.mutations,
                actions: actions_1.actions,
                modules: {}
            }));
            exports_1("default", store);
        }
    };
});
//# sourceMappingURL=index.js.map