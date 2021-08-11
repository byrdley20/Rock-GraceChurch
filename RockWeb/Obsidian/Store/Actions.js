System.register(["./CommonEntities"], function (exports_1, context_1) {
    "use strict";
    var CommonEntities_1, actions;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (CommonEntities_1_1) {
                CommonEntities_1 = CommonEntities_1_1;
            }
        ],
        execute: function () {
            exports_1("actions", actions = {
                ["initialize"](context, value) {
                    context.commit("setPageInitializationData", { pageConfig: value.pageConfig });
                    for (const commonEntity of CommonEntities_1.commonEntities) {
                        context.dispatch(`${commonEntity.namespace}/initialize`);
                    }
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
//# sourceMappingURL=Actions.js.map