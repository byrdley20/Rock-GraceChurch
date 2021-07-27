import { PropType } from 'vue';
export interface NumberRangeModelValue {
    lower: number | null;
    upper: number | null;
}
declare const _default: import("vue").DefineComponent<{
    modelValue: {
        type: PropType<NumberRangeModelValue>;
        default: {
            lower: null;
            upper: null;
        };
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
    internalValue: {
        lower: string;
        upper: string;
    };
    validationValue: string;
}, {
    computedValue(): NumberRangeModelValue;
    internalDecimalCount(): number | null;
    internalStep(): string;
    computedRules(): string;
}, {
    onChange(): void;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    modelValue?: unknown;
    decimalCount?: unknown;
    inputClasses?: unknown;
    rules?: unknown;
} & {
    rules: string;
    modelValue: NumberRangeModelValue;
    inputClasses: string;
    decimalCount: number | null;
} & {}>, {
    rules: string;
    modelValue: NumberRangeModelValue;
    inputClasses: string;
    decimalCount: number | null;
}>;
export default _default;
