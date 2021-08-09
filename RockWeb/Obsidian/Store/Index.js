System.register(["vuex", "./CommonEntities", "./State", "./Mutations", "./Actions", "./Getters"], function (exports_1, context_1) {
    "use strict";
    var vuex_1, CommonEntities_1, State_1, Mutations_1, Actions_1, Getters_1, store;
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
            function (CommonEntities_1_1) {
                CommonEntities_1 = CommonEntities_1_1;
            },
            function (State_1_1) {
                State_1 = State_1_1;
            },
            function (Mutations_1_1) {
                Mutations_1 = Mutations_1_1;
            },
            function (Actions_1_1) {
                Actions_1 = Actions_1_1;
                exports_1({
                    "ActionType": Actions_1_1["ActionType"]
                });
            },
            function (Getters_1_1) {
                Getters_1 = Getters_1_1;
            }
        ],
        execute: function () {
            exports_1("store", store = vuex_1.createStore({
                state: State_1.state,
                getters: Getters_1.getters,
                mutations: Mutations_1.mutations,
                actions: Actions_1.actions,
                modules: Object.assign({}, CommonEntities_1.commonEntityModules)
            }));
            exports_1("default", store);
        }
    };
});
//# sourceMappingURL=Index.js.map