System.register(["../Elements/Alert", "vue"], function (exports_1, context_1) {
    "use strict";
    var Alert_1, vue_1;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (Alert_1_1) {
                Alert_1 = Alert_1_1;
            },
            function (vue_1_1) {
                vue_1 = vue_1_1;
            }
        ],
        execute: function () {
            exports_1("default", vue_1.defineComponent({
                name: 'RockValidation',
                components: {
                    Alert: Alert_1.default
                },
                props: {
                    errors: {
                        type: Object,
                        required: true
                    },
                    submitCount: {
                        type: Number,
                        default: -1
                    }
                },
                data() {
                    return {
                        errorsToShow: {},
                        lastSubmitCount: 0,
                        lastErrorChangeMs: 0
                    };
                },
                computed: {
                    hasErrors() {
                        return Object.keys(this.errorsToShow).length > 0;
                    }
                },
                watch: {
                    submitCount() {
                        const wasSubmitted = this.lastSubmitCount < this.submitCount;
                        if (wasSubmitted) {
                            const now = new Date().getTime();
                            this.errorsToShow = Object.assign({}, this.errors);
                            this.lastErrorChangeMs = now;
                            this.lastSubmitCount = this.submitCount;
                        }
                    },
                    errors: {
                        immediate: true,
                        handler() {
                            if (this.submitCount === -1) {
                                this.errorsToShow = Object.assign({}, this.errors);
                                return;
                            }
                            const now = new Date().getTime();
                            const msSinceLastChange = now - this.lastErrorChangeMs;
                            if (msSinceLastChange < 500) {
                                this.errorsToShow = Object.assign({}, this.errors);
                                this.lastErrorChangeMs = now;
                            }
                        }
                    }
                },
                template: `
<Alert v-show="hasErrors" alertType="validation">
    Please correct the following:
    <ul>
        <li v-for="(error, fieldLabel) of errorsToShow">
            <strong>{{fieldLabel}}</strong>
            {{error}}
        </li>
    </ul>
</Alert>`
            }));
        }
    };
});
//# sourceMappingURL=RockValidation.js.map