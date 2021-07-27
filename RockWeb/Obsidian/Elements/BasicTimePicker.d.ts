import { PropType } from 'vue';
export interface BasicTimePickerModelValue {
    hour?: number;
    minute?: number;
}
declare const _default: import("vue").DefineComponent<{
    modelValue: {
        type: PropType<BasicTimePickerModelValue>;
        default: {};
    };
    disabled: {
        type: PropType<boolean>;
        default: boolean;
    };
}, unknown, {
    internalHour: number | null;
    internalMinute: number | null;
    internalMeridiem: "AM" | "PM";
    internalValue: string;
}, {}, {
    keyPress(e: KeyboardEvent): boolean;
    keyUp(e: KeyboardEvent): boolean;
    updateValue(): void;
    maybeUpdateValue(): void;
    toggleMeridiem(e: Event): boolean;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    modelValue?: unknown;
    disabled?: unknown;
} & {
    disabled: boolean;
    modelValue: BasicTimePickerModelValue;
} & {}>, {
    disabled: boolean;
    modelValue: BasicTimePickerModelValue;
}>;
export default _default;
