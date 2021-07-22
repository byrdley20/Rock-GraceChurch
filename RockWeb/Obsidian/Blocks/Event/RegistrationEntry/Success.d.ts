import { Guid } from '../../../Util/Guid';
import { RegistrationEntryState } from '../RegistrationEntry';
declare const _default: import("vue").DefineComponent<{}, {
    registrationEntryState: RegistrationEntryState;
}, {}, {
    registrationTerm(): string;
    messageHtml(): string;
    gatewayGuid(): Guid | null;
    transactionCode(): string;
    gatewayPersonIdentifier(): string;
}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, import("vue").EmitsOptions, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{} & {} & {}>, {}>;
export default _default;
