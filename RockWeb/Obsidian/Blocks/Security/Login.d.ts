import { InvokeBlockActionFunc } from '../../Controls/RockBlock';
declare type AuthCookie = {
    Expires: string;
    Name: string;
    Value: string;
};
declare const _default: import("vue").DefineComponent<{}, {
    invokeBlockAction: InvokeBlockActionFunc;
}, {
    username: string;
    password: string;
    rememberMe: boolean;
    isLoading: boolean;
    errorMessage: string;
}, {}, {
    setCookie(cookie: AuthCookie): void;
    redirectAfterLogin(): void;
    onHelpClick(): Promise<void>;
    submitLogin(): Promise<void>;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, import("vue").EmitsOptions, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{} & {} & {}>, {}>;
export default _default;
