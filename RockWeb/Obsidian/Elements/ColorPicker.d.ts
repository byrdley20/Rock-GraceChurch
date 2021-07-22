import { PropType } from 'vue';
declare const _default: import("vue").DefineComponent<{
    modelValue: {
        type: PropType<string>;
        required: true;
    };
    placeholder: {
        type: PropType<string>;
        default: string;
    };
}, unknown, {
    internalValue: string;
}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    modelValue?: unknown;
    placeholder?: unknown;
} & {
    modelValue: string;
    placeholder: string;
} & {}>, {
    placeholder: string;
}>;
export default _default;
