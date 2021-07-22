import { PropType } from 'vue';
declare const _default: import("vue").DefineComponent<{
    modelValue: {
        type: PropType<boolean>;
        required: true;
    };
    label: {
        type: PropType<string>;
        required: true;
    };
    inline: {
        type: PropType<boolean>;
        default: boolean;
    };
    rules: {
        type: PropType<string>;
        default: string;
    };
}, unknown, {
    uniqueId: string;
    internalValue: boolean;
}, {
    isRequired(): boolean;
}, {
    toggle(): void;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    modelValue?: unknown;
    label?: unknown;
    inline?: unknown;
    rules?: unknown;
} & {
    label: string;
    inline: boolean;
    rules: string;
    modelValue: boolean;
} & {}>, {
    inline: boolean;
    rules: string;
}>;
export default _default;
