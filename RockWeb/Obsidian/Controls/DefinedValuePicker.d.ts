import { PropType } from 'vue';
import { DropDownListOption } from '../Elements/DropDownList';
import { BlockHttp } from './RockBlock';
import DefinedValue from '../ViewModels/DefinedValueViewModel';
declare const _default: import("vue").DefineComponent<{
    modelValue: {
        type: PropType<string>;
        required: true;
    };
    definedTypeGuid: {
        type: PropType<string>;
        default: string;
    };
    displayDescriptions: {
        type: PropType<boolean>;
        default: boolean;
    };
}, {
    http: BlockHttp;
}, {
    internalValue: string;
    definedValues: DefinedValue[];
    isLoading: boolean;
}, {
    isEnabled(): boolean;
    options(): DropDownListOption[];
}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("update:modelValue" | "update:model" | "receivedDefinedValues")[], "update:modelValue" | "update:model" | "receivedDefinedValues", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    modelValue?: unknown;
    definedTypeGuid?: unknown;
    displayDescriptions?: unknown;
} & {
    modelValue: string;
    definedTypeGuid: string;
    displayDescriptions: boolean;
} & {}>, {
    definedTypeGuid: string;
    displayDescriptions: boolean;
}>;
export default _default;
