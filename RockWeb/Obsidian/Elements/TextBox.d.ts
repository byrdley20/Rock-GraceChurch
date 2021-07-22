import { PropType } from 'vue';
declare const _default: import("vue").DefineComponent<{
    modelValue: {
        type: PropType<string>;
        required: true;
    };
    type: {
        type: PropType<string>;
        default: string;
    };
    maxLength: {
        type: PropType<number>;
        default: number;
    };
    showCountDown: {
        type: PropType<boolean>;
        default: boolean;
    };
    placeholder: {
        type: PropType<string>;
        default: string;
    };
    inputClasses: {
        type: PropType<string>;
        default: string;
    };
    rows: {
        type: PropType<number>;
        default: number;
    };
    textMode: {
        type: PropType<string>;
        default: string;
    };
}, unknown, {
    internalValue: string;
}, {
    isTextarea(): boolean;
    charsRemaining(): number;
    countdownClass(): string;
}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    modelValue?: unknown;
    type?: unknown;
    maxLength?: unknown;
    showCountDown?: unknown;
    placeholder?: unknown;
    inputClasses?: unknown;
    rows?: unknown;
    textMode?: unknown;
} & {
    type: string;
    modelValue: string;
    maxLength: number;
    showCountDown: boolean;
    placeholder: string;
    inputClasses: string;
    rows: number;
    textMode: string;
} & {}>, {
    type: string;
    maxLength: number;
    showCountDown: boolean;
    placeholder: string;
    inputClasses: string;
    rows: number;
    textMode: string;
}>;
export default _default;
