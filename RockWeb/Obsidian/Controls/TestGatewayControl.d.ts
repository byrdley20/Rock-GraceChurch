import { PropType } from 'vue';
declare type Settings = {};
declare const _default: import("vue").DefineComponent<{
    settings: {
        type: PropType<Settings>;
        required: true;
    };
    submit: {
        type: PropType<boolean>;
        required: true;
    };
}, unknown, {
    loading: boolean;
    cardNumber: string;
}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    settings?: unknown;
    submit?: unknown;
} & {
    submit: boolean;
    settings: Settings;
} & {}>, {}>;
export default _default;
