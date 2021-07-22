import { PropType } from 'vue';
export declare enum AlertType {
    default = "default",
    success = "success",
    info = "info",
    danger = "danger",
    warning = "warning",
    primary = "primary",
    validation = "validation"
}
declare const CountdownTimer: import("vue").DefineComponent<{
    modelValue: {
        type: PropType<number>;
        required: true;
    };
}, unknown, {
    handle: number | null;
}, {
    timeString(): string;
}, {
    onInterval(): void;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    modelValue?: unknown;
} & {
    modelValue: number;
} & {}>, {}>;
export default CountdownTimer;
