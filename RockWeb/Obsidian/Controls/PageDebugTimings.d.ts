import { PropType } from 'vue';
export declare type DebugTimingViewModel = {
    TimestampMs: number;
    Title: string;
    SubTitle: string;
    IndentLevel: number;
    DurationMs: number;
    IsTitleBold: boolean;
};
declare const _default: import("vue").DefineComponent<{
    serverViewModels: {
        type: PropType<DebugTimingViewModel[]>;
        required: true;
    };
}, unknown, unknown, {
    serverStartTimeMs(): number;
    serverEndTimeMs(): number;
    firstClientRelativeStartTimeMs(): number;
    clientRelativeEndTimeMs(): number;
    totalMs(): number;
    clientViewModels(): DebugTimingViewModel[];
    relativeClientViewModels(): DebugTimingViewModel[];
    clientHeader(): DebugTimingViewModel;
}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    serverViewModels?: unknown;
} & {
    serverViewModels: DebugTimingViewModel[];
} & {}>, {}>;
export default _default;
