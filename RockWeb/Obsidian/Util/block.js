System.register(["vue"], function (exports_1, context_1) {
    "use strict";
    var vue_1;
    var __moduleName = context_1 && context_1.id;
    function useConfigurationValues() {
        return vue_1.inject('configurationValues');
    }
    exports_1("useConfigurationValues", useConfigurationValues);
    function useInvokeBlockAction() {
        return vue_1.inject('invokeBlockAction');
    }
    exports_1("useInvokeBlockAction", useInvokeBlockAction);
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            }
        ],
        execute: function () {
        }
    };
});
//# sourceMappingURL=block.js.map