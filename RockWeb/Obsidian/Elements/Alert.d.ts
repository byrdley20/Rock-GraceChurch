import { PropType } from 'vue';
export declare enum AlertType {
    default = "default",
    success = "success",
    info = "info",
    danger = "danger",
    warning = "warning",
    primary = "primary",
    validation = "validation"
}
declare const Alert: import("vue").DefineComponent<{
    dismissible: {
        type: PropType<boolean>;
        default: boolean;
    };
    alertType: {
        type: PropType<AlertType>;
        default: AlertType;
    };
}, unknown, unknown, {
    typeClass(): string;
}, {
    onDismiss: () => void;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "dismiss"[], "dismiss", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    dismissible?: unknown;
    alertType?: unknown;
} & {
    dismissible: boolean;
    alertType: AlertType;
} & {}>, {
    dismissible: boolean;
    alertType: AlertType;
}>;
export default Alert;
