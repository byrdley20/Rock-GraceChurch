export declare function asFormattedString(num: number | null, digits?: number): string;
export declare function toNumber(str: string | null): number;
export declare function toNumberOrNull(str: string | null): number | null;
export declare function toOrdinalSuffix(num: number | null): string;
export declare function toOrdinal(num: number | null): string;
export declare function toWord(num: number | null): string;
export declare function zeroPad(num: number, length: number): string;
declare const _default: {
    toOrdinal: typeof toOrdinal;
    toOrdinalSuffix: typeof toOrdinalSuffix;
    toNumberOrNull: typeof toNumberOrNull;
    asFormattedString: typeof asFormattedString;
};
export default _default;
