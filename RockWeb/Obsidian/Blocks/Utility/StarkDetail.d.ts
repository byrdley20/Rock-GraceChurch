declare const StarkDetailOptions: import("vue").DefineComponent<{}, {
    configurationValues: Record<string, any>;
    invokeBlockAction: import("../../Controls/RockBlock").InvokeBlockActionFunc;
}, {
    configMessage: string;
    blockActionMessage: string;
}, {}, {
    loadBlockActionMessage(): Promise<void>;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, import("vue").EmitsOptions, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{} & {} & {}>, {}>;
export default StarkDetailOptions;
