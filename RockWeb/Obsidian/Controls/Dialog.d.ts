import { PropType } from 'vue';
export declare enum ValidationField {
    CardNumber = 0,
    Expiry = 1,
    SecurityCode = 2
}
declare const _default: import("vue").DefineComponent<{
    modelValue: {
        type: PropType<boolean>;
        required: true;
    };
    dismissible: {
        type: PropType<boolean>;
        default: boolean;
    };
}, unknown, {
    doShake: boolean;
}, {
    hasHeader(): boolean;
}, {
    close(): void;
    shake(): void;
    centerOnScreen(): void;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    modelValue?: unknown;
    dismissible?: unknown;
} & {
    modelValue: boolean;
    dismissible: boolean;
} & {}>, {
    dismissible: boolean;
}>;
export default _default;
