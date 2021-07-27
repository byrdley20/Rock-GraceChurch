import { PropType } from 'vue';
import { RockDateType } from '../Util/RockDate';
import { TimePickerModelValue } from './TimePicker';
declare const _default: import("vue").DefineComponent<{
    modelValue: {
        type: PropType<string | null>;
        default: null;
    };
    displayCurrentOption: {
        type: PropType<boolean>;
        default: boolean;
    };
    isCurrentDateOffset: {
        type: PropType<boolean>;
        default: boolean;
    };
}, unknown, {
    internalDateValue: string | null;
    internalTimeValue: TimePickerModelValue;
    isCurrent: boolean;
    currentDiff: string;
    validationValue: string;
    skipEmit: boolean;
}, {
    asRockDateTimeOrNull(): RockDateType | null;
    asCurrentDateValue(): string;
    valueToEmit(): string | RockDateType | null;
}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    modelValue?: unknown;
    displayCurrentOption?: unknown;
    isCurrentDateOffset?: unknown;
} & {
    modelValue: string | null;
    displayCurrentOption: boolean;
    isCurrentDateOffset: boolean;
} & {}>, {
    modelValue: string | null;
    displayCurrentOption: boolean;
    isCurrentDateOffset: boolean;
}>;
export default _default;
