import { DropDownListOption } from '../Elements/DropDownList';
declare enum ColorControlType {
    ColorPicker = 0,
    NamedColor = 1
}
declare const _default: import("vue").DefineComponent<{
    modelValue: {
        type: import("vue").PropType<string>;
        required: boolean;
    };
    isEditMode: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    configurationValues: {
        type: import("vue").PropType<import("./Index").ConfigurationValues>;
        default: () => {};
    };
}, unknown, {
    internalBooleanValue: boolean;
    internalValue: string;
}, {
    colorControlType(): ColorControlType;
    isColorPicker(): boolean;
    isNamedPicker(): boolean;
    displayValue(): string;
    dropDownListOptions(): DropDownListOption[];
}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    modelValue?: unknown;
    isEditMode?: unknown;
    configurationValues?: unknown;
} & {
    configurationValues: import("./Index").ConfigurationValues;
    isEditMode: boolean;
} & {
    modelValue?: string | undefined;
}>, {
    configurationValues: import("./Index").ConfigurationValues;
    isEditMode: boolean;
}>;
export default _default;
