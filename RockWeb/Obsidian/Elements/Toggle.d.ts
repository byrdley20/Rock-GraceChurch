import { PropType } from 'vue';
declare const _default: import("vue").DefineComponent<{
    modelValue: {
        type: PropType<boolean>;
        required: true;
    };
    trueText: {
        type: PropType<string>;
        default: string;
    };
    falseText: {
        type: PropType<string>;
        default: string;
    };
}, unknown, {
    selectedClasses: string;
    unselectedClasses: string;
}, {}, {
    onClick(isOn: boolean): void;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    modelValue?: unknown;
    trueText?: unknown;
    falseText?: unknown;
} & {
    modelValue: boolean;
    trueText: string;
    falseText: string;
} & {}>, {
    trueText: string;
    falseText: string;
}>;
export default _default;
