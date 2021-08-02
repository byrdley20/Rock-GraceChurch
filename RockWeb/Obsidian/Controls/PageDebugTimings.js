System.register(["@Obsidian/Services/Number", "vue", "../Store/Index"], function (exports_1, context_1) {
    "use strict";
    var Number_1, vue_1, Index_1, PageDebugTimingRow;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (Number_1_1) {
                Number_1 = Number_1_1;
            },
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (Index_1_1) {
                Index_1 = Index_1_1;
            }
        ],
        execute: function () {
            PageDebugTimingRow = vue_1.defineComponent({
                name: 'PageDebugTimingRow',
                props: {
                    viewModel: {
                        type: Object,
                        required: true
                    },
                    startTimeMs: {
                        type: Number,
                        required: true
                    },
                    totalMs: {
                        type: Number,
                        required: true
                    }
                },
                methods: {
                    numberAsFormattedString: Number_1.asFormattedString
                },
                computed: {
                    indentStyle() {
                        if (!this.viewModel.IndentLevel) {
                            return '';
                        }
                        const pixels = this.viewModel.IndentLevel * 24;
                        return `padding-left: ${pixels}px`;
                    },
                    waterfallTitle() {
                        const timestampString = this.numberAsFormattedString(this.viewModel.TimestampMs, 2);
                        const durationString = this.numberAsFormattedString(this.viewModel.DurationMs, 2);
                        return `Started at ${timestampString} ms / Duration ${durationString} ms`;
                    },
                    getPercentFromMs() {
                        return (ms) => {
                            if (!this.totalMs) {
                                return 0;
                            }
                            const msFromStart = ms - this.startTimeMs;
                            return (msFromStart / this.totalMs) * 100;
                        };
                    },
                    waterfallStyle() {
                        const leftPercent = this.getPercentFromMs(this.viewModel.TimestampMs);
                        const widthPercent = this.getPercentFromMs(this.viewModel.DurationMs);
                        return `left: ${leftPercent}%; width: ${widthPercent}%;`;
                    }
                },
                template: `
<tr>
    <td class="debug-timestamp">{{numberAsFormattedString(viewModel.TimestampMs, 2)}} ms</td>
    <td :style="indentStyle">
        <strong v-if="viewModel.IsTitleBold">
            {{viewModel.Title}}
        </strong>
        <template v-else>
            {{viewModel.Title}}
        </template>
        <small v-if="viewModel.SubTitle" style="color:#A4A4A4; padding-left: 3px;">
            {{viewModel.SubTitle}}
        </small>
    </td>
    <td class="debug-timestamp">{{numberAsFormattedString(viewModel.DurationMs, 2)}} ms</td>
    <td class="debug-waterfall">
        <span class="debug-chart-bar" :title="waterfallTitle" :style="waterfallStyle"></span>
    </td>
</tr>`
            });
            exports_1("default", vue_1.defineComponent({
                name: 'PageDebugTimings',
                components: {
                    PageDebugTimingRow
                },
                props: {
                    serverViewModels: {
                        type: Array,
                        required: true
                    }
                },
                computed: {
                    serverStartTimeMs() {
                        if (!this.serverViewModels.length) {
                            return 0;
                        }
                        return this.serverViewModels[0].TimestampMs;
                    },
                    serverEndTimeMs() {
                        if (!this.serverViewModels.length) {
                            return 0;
                        }
                        const lastIndex = this.serverViewModels.length - 1;
                        const lastViewModel = this.serverViewModels[lastIndex];
                        return lastViewModel.TimestampMs + lastViewModel.DurationMs;
                    },
                    firstClientRelativeStartTimeMs() {
                        if (!this.relativeClientViewModels.length) {
                            return this.serverEndTimeMs;
                        }
                        const viewModel = this.relativeClientViewModels[0];
                        return viewModel.TimestampMs;
                    },
                    clientRelativeEndTimeMs() {
                        if (!this.relativeClientViewModels.length) {
                            return this.serverEndTimeMs;
                        }
                        const lastIndex = this.relativeClientViewModels.length - 1;
                        const lastViewModel = this.relativeClientViewModels[lastIndex];
                        return lastViewModel.TimestampMs + lastViewModel.DurationMs;
                    },
                    totalMs() {
                        return this.clientRelativeEndTimeMs - this.serverStartTimeMs;
                    },
                    clientViewModels() {
                        return Index_1.default.state.debugTimings;
                    },
                    relativeClientViewModels() {
                        return this.clientViewModels.map(vm => (Object.assign(Object.assign({}, vm), { TimestampMs: this.serverEndTimeMs + vm.TimestampMs })));
                    },
                    clientHeader() {
                        return {
                            DurationMs: this.firstClientRelativeStartTimeMs - this.serverEndTimeMs,
                            IndentLevel: 0,
                            IsTitleBold: true,
                            Title: 'Client Mount Blocks',
                            TimestampMs: this.serverEndTimeMs,
                            SubTitle: ''
                        };
                    }
                },
                template: `
<span>
    <table class="table table-bordered table-striped debug-timings" style="width:100%; margin-bottom: 48px;">
        <thead>
            <tr>
                <th class="debug-timestamp">Timestamp</th>
                <th>Event</th>
                <th class="debug-timestamp">Duration</th>
                <th class="debug-waterfall">Waterfall</th>
            </tr>
        </thead>
        <tbody>
            <PageDebugTimingRow v-for="(vm, i) in serverViewModels" :key="\`s\${i}-\${vm.TimestampMs}\`" :viewModel="vm" :startTimeMs="serverStartTimeMs" :totalMs="totalMs" />
            <PageDebugTimingRow :viewModel="clientHeader" :startTimeMs="serverStartTimeMs" :totalMs="totalMs" />
            <PageDebugTimingRow v-for="(vm, i) in relativeClientViewModels" :key="\`c\${i}-\${vm.TimestampMs}\`" :viewModel="vm" :startTimeMs="serverStartTimeMs" :totalMs="totalMs" />
        </tbody>
    </table>
</span>`
            }));
        }
    };
});
//# sourceMappingURL=PageDebugTimings.js.map