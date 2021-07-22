import { PropType } from 'vue';
declare const _default: import("vue").DefineComponent<{
    modelValue: {
        type: PropType<string>;
        default: string;
    };
}, unknown, {
    uniqueId: string;
    internalValue: string;
}, {
    strippedValue(): string;
    formattedValue(): string;
}, {
    onChange(): void;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    modelValue?: unknown;
} & {
    modelValue: string;
} & {}>, {
    modelValue: string;
}>;
export default _default;
