import { PropType } from 'vue';
declare const _default: import("vue").DefineComponent<{
    modelValue: {
        type: PropType<number | null>;
        default: null;
    };
}, unknown, {
    uniqueId: string;
    internalValue: string;
}, {
    internalNumberValue(): number | null;
}, {
    onChange(): void;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    modelValue?: unknown;
} & {
    modelValue: number | null;
} & {}>, {
    modelValue: number | null;
}>;
export default _default;
