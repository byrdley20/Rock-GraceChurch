import { PropType } from 'vue';
declare const _default: import("vue").DefineComponent<{
    modelValue: {
        type: PropType<string>;
        required: true;
    };
    rules: {
        type: PropType<string>;
        default: string;
    };
}, unknown, {
    internalValue: string;
}, {
    computedRules(): string;
}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    modelValue?: unknown;
    rules?: unknown;
} & {
    rules: string;
    modelValue: string;
} & {}>, {
    rules: string;
}>;
export default _default;
