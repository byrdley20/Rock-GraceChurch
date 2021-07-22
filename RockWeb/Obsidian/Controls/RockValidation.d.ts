import { PropType } from 'vue';
declare const _default: import("vue").DefineComponent<{
    errors: {
        type: PropType<Record<string, string>>;
        required: true;
    };
    submitCount: {
        type: PropType<number>;
        default: number;
    };
}, unknown, {
    errorsToShow: Record<string, string>;
    lastSubmitCount: number;
    lastErrorChangeMs: number;
}, {
    hasErrors(): boolean;
}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    errors?: unknown;
    submitCount?: unknown;
} & {
    errors: Record<string, string>;
    submitCount: number;
} & {}>, {
    submitCount: number;
}>;
export default _default;
