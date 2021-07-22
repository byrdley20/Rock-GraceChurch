declare const StarkDetailOptions: import("vue").DefineComponent<{}, {
    configurationValues: {
        Message: string;
    };
    invokeBlockAction: import("../../Controls/RockBlock").InvokeBlockActionFunc;
}, {
    configMessage: string;
    blockActionMessage: string;
}, {}, {
    loadBlockActionMessage(): Promise<void>;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, import("vue").EmitsOptions, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{} & {} & {}>, {}>;
export default StarkDetailOptions;
