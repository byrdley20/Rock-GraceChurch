System.register([], function (exports_1, context_1) {
    "use strict";
    var getters;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            exports_1("getters", getters = {
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
            });
        }
    };
});
//# sourceMappingURL=getters.js.map