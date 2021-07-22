import { PropType } from 'vue';
export declare const NumberUpDownInternal: import("vue").DefineComponent<{
    modelValue: {
        type: PropType<number>;
        required: true;
    };
    min: {
        type: PropType<number>;
        default: number;
    };
    max: {
        type: PropType<number>;
        default: number;
    };
    disabled: {
        type: PropType<boolean>;
        default: boolean;
    };
}, unknown, {
    internalValue: number;
}, {
    isUpDisabled(): boolean;
    isDownDisabled(): boolean;
}, {
    goUp(): void;
    goDown(): void;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    modelValue?: unknown;
    min?: unknown;
    max?: unknown;
    disabled?: unknown;
} & {
    disabled: boolean;
    modelValue: number;
    min: number;
    max: number;
} & {}>, {
    disabled: boolean;
    min: number;
    max: number;
}>;
declare const _default: import("vue").DefineComponent<{
    modelValue: {
        type: PropType<number>;
        required: true;
    };
    min: {
        type: PropType<number>;
        default: number;
    };
    max: {
        type: PropType<number>;
        default: number;
    };
    numberIncrementClasses: {
        type: PropType<string>;
        default: string;
    };
}, unknown, {
    internalValue: number;
}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    modelValue?: unknown;
    min?: unknown;
    max?: unknown;
    numberIncrementClasses?: unknown;
} & {
    modelValue: number;
    min: number;
    max: number;
    numberIncrementClasses: string;
} & {}>, {
    min: number;
    max: number;
    numberIncrementClasses: string;
}>;
export default _default;
