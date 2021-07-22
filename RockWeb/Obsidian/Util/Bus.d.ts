declare type LogItem = {
    date: Date;
    message: string;
};
declare function publish<T>(eventName: string, payload: T): void;
declare function subscribe<T>(eventName: string, callback: (payload: T) => void): void;
declare const _default: {
    publish: typeof publish;
    subscribe: typeof subscribe;
    log: LogItem[];
};
export default _default;
