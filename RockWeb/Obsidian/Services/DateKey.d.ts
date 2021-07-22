export declare function getYear(dateKey: string | null): number;
export declare function getMonth(dateKey: string | null): number;
export declare function getDay(dateKey: string | null): number;
export declare function toDateKey(year: number | null, month: number | null, day: number | null): string;
export declare function toNoYearDateKey(month: number | null, day: number | null): string;
declare const _default: {
    getYear: typeof getYear;
    getMonth: typeof getMonth;
    getDay: typeof getDay;
    toDateKey: typeof toDateKey;
    toNoYearDateKey: typeof toNoYearDateKey;
};
export default _default;
