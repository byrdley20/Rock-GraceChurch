System.register(["../Util/Http", "vue", "../Store/Index", "../Elements/Alert"], function (exports_1, context_1) {
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
    var Http_1, vue_1, Index_1, Alert_1;
    var __moduleName = context_1 && context_1.id;
    function standardBlockSetup() {
        return {
            configurationValues: vue_1.inject('configurationValues'),
            invokeBlockAction: vue_1.inject('invokeBlockAction')
        };
    }
    exports_1("standardBlockSetup", standardBlockSetup);
    return {
        setters: [
            function (Http_1_1) {
                Http_1 = Http_1_1;
            },
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (Index_1_1) {
                Index_1 = Index_1_1;
            },
            function (Alert_1_1) {
                Alert_1 = Alert_1_1;
            }
        ],
        execute: function () {
            exports_1("default", vue_1.defineComponent({
                name: 'RockBlock',
                components: {
                    Alert: Alert_1.default
                },
                props: {
                    config: {
                        type: Object,
                        required: true
                    },
                    blockComponent: {
                        type: Object,
                        default: null
                    },
                    startTimeMs: {
                        type: Number,
                        required: true
                    }
                },
                setup(props) {
                    const log = vue_1.reactive([]);
                    const writeLog = (method, url) => {
                        log.push({
                            date: new Date(),
                            method,
                            url
                        });
                    };
                    const httpCall = (method, url, params = undefined, data = undefined) => __awaiter(this, void 0, void 0, function* () {
                        writeLog(method, url);
                        return yield Http_1.doApiCall(method, url, params, data);
                    });
                    const get = (url, params = undefined) => __awaiter(this, void 0, void 0, function* () {
                        return yield httpCall('GET', url, params);
                    });
                    const post = (url, params = undefined, data = undefined) => __awaiter(this, void 0, void 0, function* () {
                        return yield httpCall('POST', url, params, data);
                    });
                    const invokeBlockAction = (actionName, data = undefined) => __awaiter(this, void 0, void 0, function* () {
                        return yield post(`/api/blocks/action/${props.config.blockGuid}/${actionName}`, undefined, Object.assign({ __context: {
                                pageParameters: Index_1.default.state.pageParameters
                            } }, data));
                    });
                    const blockHttp = { get, post };
                    vue_1.provide('http', blockHttp);
                    vue_1.provide('invokeBlockAction', invokeBlockAction);
                    vue_1.provide('configurationValues', props.config.configurationValues);
                },
                data() {
                    return {
                        blockGuid: this.config.blockGuid,
                        error: '',
                        finishTimeMs: null
                    };
                },
                methods: {
                    clearError() {
                        this.error = '';
                    }
                },
                computed: {
                    renderTimeMs() {
                        if (!this.finishTimeMs || !this.startTimeMs) {
                            return null;
                        }
                        return this.finishTimeMs - this.startTimeMs;
                    },
                    pageGuid() {
                        return Index_1.default.state.pageGuid;
                    }
                },
                errorCaptured(err) {
                    const defaultMessage = 'An unknown error was caught from the block.';
                    if (err instanceof Error) {
                        this.error = err.message || defaultMessage;
                    }
                    else if (err) {
                        this.error = JSON.stringify(err) || defaultMessage;
                    }
                    else {
                        this.error = defaultMessage;
                    }
                },
                mounted() {
                    var _a;
                    this.finishTimeMs = (new Date()).getTime();
                    const componentName = ((_a = this.blockComponent) === null || _a === void 0 ? void 0 : _a.name) || '';
                    const nameParts = componentName.split('.');
                    let subtitle = nameParts[0] || '';
                    if (subtitle && subtitle.indexOf('(') !== 0) {
                        subtitle = `(${subtitle})`;
                    }
                    if (nameParts.length) {
                        Index_1.default.commit('reportOnLoadDebugTiming', {
                            title: nameParts[1] || '<Unnamed>',
                            subtitle: subtitle,
                            startTimeMs: this.startTimeMs,
                            finishTimeMs: this.finishTimeMs
                        });
                    }
                },
                template: `
<div class="obsidian-block">
    <Alert v-if="!blockComponent" alertType="danger">
        <strong>Not Found</strong>
        Could not find block component: "{{this.config.blockFileUrl}}"
    </Alert>
    <Alert v-if="error" alertType="danger" :dismissible="true" @dismiss="clearError">
        <strong>Uncaught Error</strong>
        {{error}}
    </Alert>
    <component :is="blockComponent" />
</div>`
            }));
        }
    };
});
//# sourceMappingURL=RockBlock.js.map