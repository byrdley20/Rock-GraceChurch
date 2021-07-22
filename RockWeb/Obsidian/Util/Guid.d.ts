export declare type Guid = string;
export declare function newGuid(): Guid;
export declare function normalize(a: Guid | null): string | null;
export declare function areEqual(a: Guid | null, b: Guid | null): boolean;
declare const _default: {
    newGuid: typeof newGuid;
    normalize: typeof normalize;
    areEqual: typeof areEqual;
};
export default _default;
