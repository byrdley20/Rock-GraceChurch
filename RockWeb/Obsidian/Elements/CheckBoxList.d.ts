import { PropType } from 'vue';
export declare type CheckBoxListOption = {
    value: string;
    text: string;
};
declare const _default: import("vue").DefineComponent<{
    modelValue: {
        type: PropType<string[]>;
        default: never[];
    };
    options: {
        type: PropType<string[]>;
        required: true;
    };
}, unknown, {
    internalValue: string[];
}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    modelValue?: unknown;
    options?: unknown;
} & {
    options: string[];
    modelValue: string[];
} & {}>, {
    modelValue: string[];
}>;
export default _default;
