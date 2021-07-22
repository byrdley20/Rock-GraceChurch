import { PropType } from 'vue';
declare const _default: import("vue").DefineComponent<{
    percent: {
        type: PropType<number>;
        required: true;
    };
}, unknown, unknown, {
    boundedPercent(): number;
    roundedBoundedPercent(): number;
    style(): string;
}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    percent?: unknown;
} & {
    percent: number;
} & {}>, {}>;
export default _default;
