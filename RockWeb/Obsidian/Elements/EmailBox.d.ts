import { PropType } from 'vue';
declare const _default: import("vue").DefineComponent<{
    modelValue: {
        type: PropType<string>;
        required: true;
    };
    allowLava: {
        type: PropType<boolean>;
        default: boolean;
    };
    allowMultiple: {
        type: PropType<boolean>;
        default: boolean;
    };
    rules: {
        type: PropType<string>;
        default: string;
    };
}, unknown, {
    internalValue: string;
}, {
    computedRules(): string;
    computedType(): string;
}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    modelValue?: unknown;
    allowLava?: unknown;
    allowMultiple?: unknown;
    rules?: unknown;
} & {
    rules: string;
    modelValue: string;
    allowLava: boolean;
    allowMultiple: boolean;
} & {}>, {
    rules: string;
    allowLava: boolean;
    allowMultiple: boolean;
}>;
export default _default;
