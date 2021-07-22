declare function set<T>(key: string, value: T, expiration?: Date | null): void;
declare function get<T>(key: string): T | null;
declare const _default: {
    set: typeof set;
    get: typeof get;
};
export default _default;
