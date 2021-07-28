import { Component, PropType } from 'vue';
import '../Fields/BooleanField';
import '../Fields/CurrencyField';
import '../Fields/DateField';
import '../Fields/DateTimeField';
import '../Fields/DayOfWeekField';
import '../Fields/DaysOfWeekField';
import '../Fields/DecimalField';
import '../Fields/DecimalRangeField';
import '../Fields/DefinedValueField';
import '../Fields/EmailField';
import '../Fields/GenderField';
import '../Fields/IntegerField';
import '../Fields/IntegerRangeField';
import '../Fields/MemoField';
import '../Fields/MonthDayField';
import '../Fields/SingleSelect';
import '../Fields/PhoneNumber';
import '../Fields/RatingField';
import '../Fields/TimeField';
declare const _default: import("vue").DefineComponent<{
    fieldTypeGuid: {
        type: PropType<string>;
        required: true;
    };
    rules: {
        type: PropType<string>;
        default: string;
    };
}, void, unknown, {
    fieldComponent(): Component | null;
}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    fieldTypeGuid?: unknown;
    rules?: unknown;
} & {
    rules: string;
    fieldTypeGuid: string;
} & {}>, {
    rules: string;
}>;
export default _default;
