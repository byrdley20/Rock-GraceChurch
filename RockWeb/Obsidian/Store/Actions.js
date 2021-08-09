System.register(["./CommonEntities"], function (exports_1, context_1) {
    "use strict";
    var CommonEntities_1, ActionType, actions;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (CommonEntities_1_1) {
                CommonEntities_1 = CommonEntities_1_1;
            }
        ],
        execute: function () {
            (function (ActionType) {
                ActionType["Initialize"] = "initialize";
                ActionType["RedirectToLogin"] = "redirectToLogin";
            })(ActionType || (ActionType = {}));
            exports_1("ActionType", ActionType);
            exports_1("actions", actions = {
                [ActionType.Initialize](context, value) {
                    context.commit("setPageInitializationData", { pageConfig: value.pageConfig });
                    for (const commonEntity of CommonEntities_1.commonEntities) {
                        context.dispatch(`${commonEntity.namespace}/initialize`);
                    }
                },
                [ActionType.RedirectToLogin](context) {
                    if (context.state.loginUrlWithReturnUrl) {
                        window.location.href = context.state.loginUrlWithReturnUrl;
                    }
                }
            });
        }
    };
});
//# sourceMappingURL=Actions.js.map