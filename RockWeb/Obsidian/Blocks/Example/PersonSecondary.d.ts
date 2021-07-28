import Person from '../../ViewModels/PersonViewModel';
declare const _default: import("vue").DefineComponent<{}, {}, {
    messageToPublish: string;
    receivedMessage: string;
}, {
    currentPerson(): Person | null;
    currentPersonName(): string;
    imageUrl(): string;
    photoElementStyle(): string;
}, {
    receiveMessage(message: string): void;
    doPublish(): void;
    doThrowError(): void;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, import("vue").EmitsOptions, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{} & {} & {}>, {}>;
export default _default;
