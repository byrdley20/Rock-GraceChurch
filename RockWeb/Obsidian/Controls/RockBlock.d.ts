import { HttpBodyData, HttpResult, HttpUrlParams } from '../Util/Http';
import { Component, PropType } from 'vue';
import { BlockConfig } from '../Index';
import { Guid } from '../Util/Guid';
export declare type InvokeBlockActionFunc = <T>(actionName: string, data?: HttpBodyData) => Promise<HttpResult<T>>;
export declare type BlockHttpGet = <T>(url: string, params?: HttpUrlParams) => Promise<HttpResult<T>>;
export declare type BlockHttpPost = <T>(url: string, params?: HttpUrlParams, data?: HttpBodyData) => Promise<HttpResult<T>>;
export declare type BlockHttp = {
    get: BlockHttpGet;
    post: BlockHttpPost;
};
export declare function standardBlockSetup(): {
    configurationValues: Record<string, any>;
    invokeBlockAction: InvokeBlockActionFunc;
};
declare const _default: import("vue").DefineComponent<{
    config: {
        type: PropType<BlockConfig>;
        required: true;
    };
    blockComponent: {
        type: PropType<Component<any, any, any, import("vue").ComputedOptions, import("vue").MethodOptions>>;
        default: null;
    };
    startTimeMs: {
        type: PropType<number>;
        required: true;
    };
}, void, {
    blockGuid: string;
    error: string;
    finishTimeMs: number | null;
}, {
    renderTimeMs(): number | null;
    pageGuid(): Guid;
}, {
    clearError(): void;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    config?: unknown;
    blockComponent?: unknown;
    startTimeMs?: unknown;
} & {
    config: BlockConfig;
    startTimeMs: number;
    blockComponent: Component<any, any, any, import("vue").ComputedOptions, import("vue").MethodOptions>;
} & {}>, {
    blockComponent: Component<any, any, any, import("vue").ComputedOptions, import("vue").MethodOptions>;
}>;
export default _default;
