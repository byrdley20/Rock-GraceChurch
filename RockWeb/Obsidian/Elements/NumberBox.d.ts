import { PropType } from 'vue';
declare const _default: import("vue").DefineComponent<{
    modelValue: {
        type: PropType<number | null>;
        default: null;
    };
    placeholder: {
        type: PropType<string>;
        default: string;
    };
    minimumValue: {
        type: PropType<number | null>;
    };
    maximumValue: {
        type: PropType<number | null>;
    };
    decimalCount: {
        type: PropType<number | null>;
        default: null;
    };
    inputClasses: {
        type: PropType<string>;
        default: string;
    };
    rules: {
        type: PropType<string>;
        default: string;
    };
}, unknown, {
    internalValue: string;
}, {
    internalNumberValue(): number | null;
    internalDecimalCount(): number | null;
    internalStep(): string;
    computedRules(): string;
    isGrouped(): boolean;
}, {
    onChange(): void;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    modelValue?: unknown;
    placeholder?: unknown;
    minimumValue?: unknown;
    maximumValue?: unknown;
    decimalCount?: unknown;
    inputClasses?: unknown;
    rules?: unknown;
} & {
    rules: string;
    modelValue: number | null;
    placeholder: string;
    inputClasses: string;
    decimalCount: number | null;
} & {
    minimumValue?: number | null | undefined;
    maximumValue?: number | null | undefined;
}>, {
    rules: string;
    modelValue: number | null;
    placeholder: string;
    inputClasses: string;
    decimalCount: number | null;
}>;
export default _default;
