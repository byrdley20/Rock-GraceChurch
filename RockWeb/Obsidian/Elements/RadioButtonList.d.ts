import { PropType } from 'vue';
import { Guid } from '../Util/Guid';
import { DropDownListOption } from './DropDownList';
declare const _default: import("vue").DefineComponent<{
    options: {
        type: PropType<DropDownListOption[]>;
        default: never[];
    };
    modelValue: {
        type: PropType<string>;
        default: string;
    };
    repeatColumns: {
        type: PropType<number>;
        default: number;
    };
    horizontal: {
        type: PropType<boolean>;
        default: boolean;
    };
}, unknown, {
    internalValue: string;
}, {
    containerClasses(): string;
}, {
    getOptionUniqueId(uniqueId: Guid, option: DropDownListOption): string;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    options?: unknown;
    modelValue?: unknown;
    repeatColumns?: unknown;
    horizontal?: unknown;
} & {
    horizontal: boolean;
    options: DropDownListOption[];
    modelValue: string;
    repeatColumns: number;
} & {}>, {
    horizontal: boolean;
    options: DropDownListOption[];
    modelValue: string;
    repeatColumns: number;
}>;
export default _default;
