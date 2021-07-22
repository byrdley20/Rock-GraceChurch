import { CommonEntityOption } from '../Store/Generators';
declare const _default: import("vue").DefineComponent<{
    modelValue: {
        type: import("vue").PropType<string>;
        required: true;
    };
    label: {
        type: import("vue").PropType<string>;
        default: unknown;
    };
}, unknown, {
    providedOptions: CommonEntityOption[];
    selectedGuid: string;
    isLoading: boolean;
}, {
    options(): import("../Elements/DropDownList").DropDownListOption[];
}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    modelValue?: unknown;
    label?: unknown;
} & {
    label: string;
    modelValue: string;
} & {}>, {
    label: string;
}>;
export default _default;
