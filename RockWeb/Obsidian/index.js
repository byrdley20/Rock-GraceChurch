System.register(["vue", "./Controls/rockBlock", "./Store/index", "./Rules/index", "./Controls/pageDebugTimings", "./Elements/alert"], function (exports_1, context_1) {
    "use strict";
    var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var vue_1, rockBlock_1, index_1, pageDebugTimings_1, alert_1;
    var __moduleName = context_1 && context_1.id;
    function initializeBlock(config) {
        return __awaiter(this, void 0, void 0, function* () {
            const blockPath = `${config.blockFileUrl}.js`;
            let blockComponent = null;
            let errorMessage = "";
            try {
                const blockComponentModule = yield context_1.import(blockPath);
                blockComponent = blockComponentModule ?
                    (blockComponentModule.default || blockComponentModule) :
                    null;
            }
            catch (e) {
                console.error(e);
                errorMessage = `${e}`;
            }
            const name = `Root${config.blockFileUrl.replace(/\//g, ".")}`;
            const startTimeMs = (new Date()).getTime();
            const app = vue_1.createApp({
                name,
                components: {
                    RockBlock: rockBlock_1.default,
                    Alert: alert_1.default
                },
                data() {
                    return {
                        config: config,
                        blockComponent: blockComponent ? vue_1.markRaw(blockComponent) : null,
                        startTimeMs,
                        errorMessage
                    };
                },
                template: `
<Alert v-if="errorMessage" alertType="danger">
    <strong>Error Initializing Block</strong>
    <br />
    {{errorMessage}}
</Alert>
<RockBlock v-else :config="config" :blockComponent="blockComponent" :startTimeMs="startTimeMs" />`
            });
            app.use(index_1.default);
            app.mount(config.rootElement);
            return app;
        });
    }
    exports_1("initializeBlock", initializeBlock);
    function initializePage(pageConfig) {
        return __awaiter(this, void 0, void 0, function* () {
            yield index_1.default.dispatch("initialize", { pageConfig });
        });
    }
    exports_1("initializePage", initializePage);
    function initializePageTimings(config) {
        const rootElement = document.getElementById(config.elementId);
        if (!rootElement) {
            console.error("Could not show Obsidian debug timings because the HTML element did not resolve.");
            return;
        }
        const app = vue_1.createApp({
            name: "PageDebugTimingsRoot",
            components: {
                PageDebugTimings: pageDebugTimings_1.default
            },
            data() {
                return {
                    viewModels: config.debugTimingViewModels
                };
            },
            template: `<PageDebugTimings :serverViewModels="viewModels" />`
        });
        app.use(index_1.default);
        app.mount(rootElement);
    }
    exports_1("initializePageTimings", initializePageTimings);
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (rockBlock_1_1) {
                rockBlock_1 = rockBlock_1_1;
            },
            function (index_1_1) {
                index_1 = index_1_1;
            },
            function (_1) {
            },
            function (pageDebugTimings_1_1) {
                pageDebugTimings_1 = pageDebugTimings_1_1;
            },
            function (alert_1_1) {
                alert_1 = alert_1_1;
            }
        ],
        execute: function () {
        }
    };
});
//# sourceMappingURL=index.js.map