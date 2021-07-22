import { PropType } from 'vue';
import { DropDownListOption } from '../Elements/DropDownList';
export interface AddressControlModel {
    Street1: string;
    Street2: string;
    City: string;
    State: string;
    PostalCode: string;
    Country: string;
}
export declare function getDefaultAddressControlModel(): AddressControlModel;
declare const _default: import("vue").DefineComponent<{
    modelValue: {
        type: PropType<AddressControlModel>;
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
}, unknown, {
    state: string;
    uniqueId: string;
    stateOptions: DropDownListOption[];
}, {
    isRequired(): boolean;
}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    modelValue?: unknown;
    label?: unknown;
    help?: unknown;
    rules?: unknown;
} & {
    label: string;
    help: string;
    rules: string;
    modelValue: AddressControlModel;
} & {}>, {
    label: string;
    help: string;
    rules: string;
}>;
export default _default;
