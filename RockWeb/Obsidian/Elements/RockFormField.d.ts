import { PropType } from 'vue';
import { FormState } from '../Controls/RockForm';
declare const _default: import("vue").DefineComponent<{
    modelValue: {
        required: true;
    };
    name: {
        type: PropType<string>;
        required: true;
    };
    label: {
        type: PropType<string>;
        default: string;
    };
    help: {
        type: PropType<string>;
        default: string;
    };
    rules: {
        type: PropType<string>;
        default: string;
    };
    disabled: {
        type: PropType<boolean>;
        default: boolean;
    };
    formGroupClasses: {
        type: PropType<string>;
        default: string;
    };
    inputGroupClasses: {
        type: PropType<string>;
        default: string;
    };
    validationTitle: {
        type: PropType<string>;
        default: string;
    };
    class: {
        type: PropType<string>;
        default: string;
    };
    tabIndex: {
        type: PropType<string>;
        default: string;
    };
}, {
    formState: FormState | null;
}, {
    uniqueId: string;
    internalValue: unknown;
}, {
    isRequired(): boolean;
    classAttr(): string;
    errorClasses(): (formState: FormState | null, errors: Record<string, string>) => string;
}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    modelValue?: unknown;
    name?: unknown;
    label?: unknown;
    help?: unknown;
    rules?: unknown;
    disabled?: unknown;
    formGroupClasses?: unknown;
    inputGroupClasses?: unknown;
    validationTitle?: unknown;
    class?: unknown;
    tabIndex?: unknown;
} & {
    label: string;
    name: string;
    help: string;
    disabled: boolean;
    rules: string;
    modelValue: unknown;
    formGroupClasses: string;
    inputGroupClasses: string;
    validationTitle: string;
    class: string;
    tabIndex: string;
} & {}>, {
    label: string;
    help: string;
    disabled: boolean;
    rules: string;
    formGroupClasses: string;
    inputGroupClasses: string;
    validationTitle: string;
    class: string;
    tabIndex: string;
}>;
export default _default;
