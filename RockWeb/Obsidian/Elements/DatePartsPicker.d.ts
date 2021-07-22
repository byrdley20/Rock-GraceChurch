import { PropType } from 'vue';
export interface DatePartsPickerModel {
    Year: number;
    Month: number;
    Day: number;
}
export declare function getDefaultDatePartsPickerModel(): DatePartsPickerModel;
declare const _default: import("vue").DefineComponent<{
    rules: {
        type: PropType<string>;
        default: string;
    };
    modelValue: {
        type: PropType<DatePartsPickerModel>;
        required: true;
    };
    requireYear: {
        type: PropType<boolean>;
        default: boolean;
    };
    allowFutureDates: {
        type: PropType<boolean>;
        default: boolean;
    };
    futureYearCount: {
        type: PropType<number>;
        default: number;
    };
    startYear: {
        type: PropType<number>;
        default: number;
    };
}, unknown, unknown, {
    internalDateKey(): string;
    computedRules(): string;
    years(): number[];
}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    rules?: unknown;
    modelValue?: unknown;
    requireYear?: unknown;
    allowFutureDates?: unknown;
    futureYearCount?: unknown;
    startYear?: unknown;
} & {
    rules: string;
    modelValue: DatePartsPickerModel;
    requireYear: boolean;
    allowFutureDates: boolean;
    futureYearCount: number;
    startYear: number;
} & {}>, {
    rules: string;
    requireYear: boolean;
    allowFutureDates: boolean;
    futureYearCount: number;
    startYear: number;
}>;
export default _default;
