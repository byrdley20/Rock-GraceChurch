import { RegistrationEntryState } from '../RegistrationEntry';
import { RegistrantInfo } from './RegistrationEntryBlockViewModel';
declare const _default: import("vue").DefineComponent<{}, {
    registrationEntryState: RegistrationEntryState;
    persistSession: () => Promise<void>;
}, {
    hasCopiedCommonValues: boolean;
}, {
    hasWaitlist(): boolean;
    isOnWaitlist(): boolean;
    registrantTerm(): string;
    registrants(): RegistrantInfo[];
    currentRegistrantIndex(): number;
}, {
    onPrevious(): Promise<void>;
    onNext(): Promise<void>;
    copyCommonValuesFromFirstRegistrant(): void;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, import("vue").EmitsOptions, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{} & {} & {}>, {}>;
export default _default;
