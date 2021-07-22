import { Component, PropType } from 'vue';
declare const _default: import("vue").DefineComponent<{
    url: {
        type: PropType<string>;
        required: true;
    };
}, unknown, {
    control: Component<any, any, any, import("vue").ComputedOptions, import("vue").MethodOptions> | null;
    loading: boolean;
    error: string;
}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    url?: unknown;
} & {
    url: string;
} & {}>, {}>;
export default _default;
