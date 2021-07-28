export declare type FormState = {
    submitCount: number;
};
declare const _default: import("vue").DefineComponent<{}, {
    formState: FormState;
}, {
    errorsToDisplay: never[];
}, {}, {
    onInternalSubmit(handleSubmit: Function, $event: Event): any;
    emitSubmit(payload: any): void;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, import("vue").EmitsOptions, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{} & {} & {}>, {}>;
export default _default;
