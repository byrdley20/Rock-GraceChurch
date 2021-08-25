System.register([], function (exports_1, context_1) {
    "use strict";
    var actions;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            exports_1("actions", actions = {
                ["initialize"](context, value) {
                    context.commit("setPageInitializationData", { pageConfig: value.pageConfig });
                },
                ["redirectToLogin"](context) {
                    if (context.state.loginUrlWithReturnUrl) {
                        window.location.href = context.state.loginUrlWithReturnUrl;
                    }
                }
            });
        }
    };
});
//# sourceMappingURL=actions.js.map