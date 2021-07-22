import { PropType } from 'vue';
declare type Settings = {
    PublicApiKey: string;
    GatewayUrl: string;
};
declare type Tokenizer = {
    create: () => void;
    submit: () => void;
};
interface Response {
    status: 'success' | 'error' | 'validation';
}
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
    tokenizer: Tokenizer | null;
    loading: boolean;
}, {
    publicApiKey(): string;
    gatewayUrl(): string;
}, {
    mountControl(): Promise<void>;
    handleResponse(response: Response | null | undefined): void;
    getTokenizerSettings(): unknown;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    settings?: unknown;
    submit?: unknown;
} & {
    submit: boolean;
    settings: Settings;
} & {}>, {}>;
export default _default;
