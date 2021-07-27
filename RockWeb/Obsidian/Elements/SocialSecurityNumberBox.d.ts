import { PropType } from 'vue';
declare const _default: import("vue").DefineComponent<{
    rules: {
        type: PropType<string>;
        default: string;
    };
    modelValue: {
        type: PropType<string>;
        default: string;
    };
}, unknown, {
    internalArea: string;
    internalGroup: string;
    internalSerial: string;
    internalValue: string;
}, {
    computedRules(): string;
}, {
    getValue(): string;
    keyPress(e: KeyboardEvent): boolean;
    keyUp(e: KeyboardEvent): boolean;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    rules?: unknown;
    modelValue?: unknown;
} & {
    rules: string;
    modelValue: string;
} & {}>, {
    rules: string;
    modelValue: string;
}>;
export default _default;
