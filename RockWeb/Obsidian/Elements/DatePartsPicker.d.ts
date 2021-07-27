import { PropType } from 'vue';
export interface DatePartsPickerModel {
    year: number;
    month: number;
    day: number;
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
    showYear: {
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
}, unknown, {
    internalDay: string;
    internalMonth: string;
    internalYear: string;
    days: string[];
}, {
    computedRequireYear(): boolean;
    internalDateKey(): string;
    computedRules(): string;
    years(): number[];
}, {
    getValue(): DatePartsPickerModel;
    updateDays(): void;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    rules?: unknown;
    modelValue?: unknown;
    requireYear?: unknown;
    showYear?: unknown;
    allowFutureDates?: unknown;
    futureYearCount?: unknown;
    startYear?: unknown;
} & {
    rules: string;
    modelValue: DatePartsPickerModel;
    requireYear: boolean;
    showYear: boolean;
    allowFutureDates: boolean;
    futureYearCount: number;
    startYear: number;
} & {}>, {
    rules: string;
    requireYear: boolean;
    showYear: boolean;
    allowFutureDates: boolean;
    futureYearCount: number;
    startYear: number;
}>;
export default _default;
