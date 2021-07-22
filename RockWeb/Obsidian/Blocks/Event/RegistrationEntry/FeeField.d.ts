import { PropType } from 'vue';
import { DropDownListOption } from '../../../Elements/DropDownList';
import { NumberUpDownGroupOption } from '../../../Elements/NumberUpDownGroup';
import { RegistrationEntryBlockFeeViewModel, RegistrationEntryBlockFeeItemViewModel } from './RegistrationEntryBlockViewModel';
declare const _default: import("vue").DefineComponent<{
    modelValue: {
        type: PropType<Record<string, number>>;
        required: true;
    };
    fee: {
        type: PropType<RegistrationEntryBlockFeeViewModel>;
        required: true;
    };
}, unknown, {
    dropDownValue: string;
    checkboxValue: boolean;
}, {
    label(): string;
    singleItem(): RegistrationEntryBlockFeeItemViewModel | null;
    isHidden(): boolean;
    isCheckbox(): boolean;
    isNumberUpDown(): boolean;
    isNumberUpDownGroup(): boolean;
    isDropDown(): boolean;
    dropDownListOptions(): DropDownListOption[];
    numberUpDownGroupOptions(): NumberUpDownGroupOption[];
    rules(): string;
}, {
    getItemLabel(item: RegistrationEntryBlockFeeItemViewModel): string;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    modelValue?: unknown;
    fee?: unknown;
} & {
    modelValue: Record<string, number>;
    fee: RegistrationEntryBlockFeeViewModel;
} & {}>, {}>;
export default _default;
