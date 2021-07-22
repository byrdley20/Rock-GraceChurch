export declare type RockDateType = string;
export declare function stripTimezone(val: Date): Date;
export declare function toRockDate(d: Date): RockDateType;
export declare function newDate(): RockDateType;
export declare function getDay(d: RockDateType | null): number | null;
export declare function getMonth(d: RockDateType | null): number | null;
export declare function getYear(d: RockDateType | null): number | null;
declare const _default: {
    newDate: typeof newDate;
    toRockDate: typeof toRockDate;
    getDay: typeof getDay;
    getMonth: typeof getMonth;
    getYear: typeof getYear;
    stripTimezone: typeof stripTimezone;
};
export default _default;
