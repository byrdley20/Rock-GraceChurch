import { PropType } from 'vue';
export declare enum BtnType {
    default = "default",
    primary = "primary",
    danger = "danger",
    warning = "warning",
    success = "success",
    info = "info",
    link = "link"
}
export declare enum BtnSize {
    default = "",
    xs = "xs",
    sm = "sm",
    lg = "lg"
}
declare const _default: import("vue").DefineComponent<{
    isLoading: {
        type: PropType<boolean>;
        default: boolean;
    };
    loadingText: {
        type: PropType<string>;
        default: string;
    };
    type: {
        type: PropType<string>;
        default: string;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    btnType: {
        type: PropType<BtnType>;
        default: BtnType;
    };
    btnSize: {
        type: PropType<BtnSize>;
        default: BtnSize;
    };
}, unknown, unknown, {
    typeClass(): string;
    sizeClass(): string;
    cssClasses(): string;
}, {
    handleClick: (event: Event) => void;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "click"[], "click", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    isLoading?: unknown;
    loadingText?: unknown;
    type?: unknown;
    disabled?: unknown;
    btnType?: unknown;
    btnSize?: unknown;
} & {
    type: string;
    disabled: boolean;
    isLoading: boolean;
    loadingText: string;
    btnType: BtnType;
    btnSize: BtnSize;
} & {}>, {
    type: string;
    disabled: boolean;
    isLoading: boolean;
    loadingText: string;
    btnType: BtnType;
    btnSize: BtnSize;
}>;
export default _default;
