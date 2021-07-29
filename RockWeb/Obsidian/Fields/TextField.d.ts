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
    internalValue: string;
}, {
    safeValue(): string;
    configAttributes(): Record<string, number | boolean>;
    isPassword(): boolean;
    passwordDisplay(): string;
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
