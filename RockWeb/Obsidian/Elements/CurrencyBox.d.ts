import { PropType } from 'vue';
declare const _default: import("vue").DefineComponent<{
    modelValue: {
        type: PropType<number | null>;
        default: null;
    };
    minimumValue: {
        type: PropType<number | null>;
    };
    maximumValue: {
        type: PropType<number | null>;
    };
}, unknown, {
    internalValue: number | null;
}, {
    placeholder(): string;
}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    modelValue?: unknown;
    minimumValue?: unknown;
    maximumValue?: unknown;
} & {
    modelValue: number | null;
} & {
    minimumValue?: number | null | undefined;
    maximumValue?: number | null | undefined;
}>, {
    modelValue: number | null;
}>;
export default _default;
