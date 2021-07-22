import { PropType } from 'vue';
import { DropDownListOption } from '../Elements/DropDownList';
import { BlockHttp } from './RockBlock';
import DefinedValue from '../ViewModels/CodeGenerated/DefinedValueViewModel';
declare const _default: import("vue").DefineComponent<{
    modelValue: {
        type: PropType<string>;
        required: true;
    };
    label: {
        type: PropType<string>;
        default: string;
    };
    definedTypeGuid: {
        type: PropType<string>;
        default: string;
    };
    displayDescriptions: {
        type: PropType<boolean>;
        default: boolean;
    };
    show: {
        type: PropType<boolean>;
        default: boolean;
    };
}, {
    http: BlockHttp;
}, {
    isInitialLoadDone: boolean;
    internalValue: string;
    definedValues: DefinedValue[];
    isLoading: boolean;
}, {
    isEnabled(): boolean;
    options(): DropDownListOption[];
}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("update:modelValue" | "update:model" | "receivedDefinedValues")[], "update:modelValue" | "update:model" | "receivedDefinedValues", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    modelValue?: unknown;
    label?: unknown;
    definedTypeGuid?: unknown;
    displayDescriptions?: unknown;
    show?: unknown;
} & {
    label: string;
    show: boolean;
    modelValue: string;
    definedTypeGuid: string;
    displayDescriptions: boolean;
} & {}>, {
    label: string;
    show: boolean;
    definedTypeGuid: string;
    displayDescriptions: boolean;
}>;
export default _default;
