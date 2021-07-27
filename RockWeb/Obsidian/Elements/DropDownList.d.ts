import { PropType } from 'vue';
export declare type DropDownListOption = {
    key?: string;
    value: string;
    text: string;
};
declare const _default: import("vue").DefineComponent<{
    modelValue: {
        type: PropType<string>;
        required: true;
    };
    options: {
        type: PropType<DropDownListOption[]>;
        required: true;
    };
    showBlankItem: {
        type: PropType<boolean>;
        default: boolean;
    };
    blankValue: {
        type: PropType<string>;
        default: string;
    };
    formControlClasses: {
        type: PropType<string>;
        default: string;
    };
    enhanceForLongLists: {
        type: PropType<boolean>;
        default: boolean;
    };
}, unknown, {
    uniqueId: string;
    internalValue: string;
    isMounted: boolean;
}, {
    compiledFormControlClasses(): string;
}, {
    getChosenJqueryEl(): any;
    createOrDestroyChosen(): void;
    syncValue(): void;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    modelValue?: unknown;
    options?: unknown;
    showBlankItem?: unknown;
    blankValue?: unknown;
    formControlClasses?: unknown;
    enhanceForLongLists?: unknown;
} & {
    options: DropDownListOption[];
    modelValue: string;
    showBlankItem: boolean;
    blankValue: string;
    formControlClasses: string;
    enhanceForLongLists: boolean;
} & {}>, {
    showBlankItem: boolean;
    blankValue: string;
    formControlClasses: string;
    enhanceForLongLists: boolean;
}>;
export default _default;
