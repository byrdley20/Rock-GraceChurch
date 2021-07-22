import { PropType } from 'vue';
export declare type NumberUpDownGroupOption = {
    key: string;
    label: string;
    min: number;
    max: number;
};
declare const _default: import("vue").DefineComponent<{
    modelValue: {
        type: PropType<Record<string, number>>;
        required: true;
    };
    options: {
        type: PropType<NumberUpDownGroupOption[]>;
        required: true;
    };
}, unknown, unknown, {
    total(): number;
}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    modelValue?: unknown;
    options?: unknown;
} & {
    options: NumberUpDownGroupOption[];
    modelValue: Record<string, number>;
} & {}>, {}>;
export default _default;
