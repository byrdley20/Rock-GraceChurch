import { PropType } from 'vue';
import { BasicTimePickerModelValue as TimePickerModelValue } from './BasicTimePicker';
export { BasicTimePickerModelValue as TimePickerModelValue } from './BasicTimePicker';
declare const _default: import("vue").DefineComponent<{
    rules: {
        type: PropType<string>;
        default: string;
    };
    modelValue: {
        type: PropType<TimePickerModelValue>;
        default: {};
    };
}, unknown, {
    internalValue: TimePickerModelValue;
}, {
    computedRules(): string;
}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    rules?: unknown;
    modelValue?: unknown;
} & {
    rules: string;
    modelValue: TimePickerModelValue;
} & {}>, {
    rules: string;
    modelValue: TimePickerModelValue;
}>;
export default _default;
