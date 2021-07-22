import { PropType } from 'vue';
export interface GatewayControlModel {
    FileUrl: string;
    Settings: Record<string, unknown>;
}
export declare enum ValidationField {
    CardNumber = 0,
    Expiry = 1,
    SecurityCode = 2
}
declare const _default: import("vue").DefineComponent<{
    gatewayControlModel: {
        type: PropType<GatewayControlModel>;
        required: true;
    };
}, unknown, {
    isSuccess: boolean;
}, {
    url(): string;
    settings(): Record<string, unknown>;
}, {
    reset(): void;
    onSuccess(token: string): Promise<void>;
    transformValidation(validationFields: ValidationField[]): void;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    gatewayControlModel?: unknown;
} & {
    gatewayControlModel: GatewayControlModel;
} & {}>, {}>;
export default _default;
