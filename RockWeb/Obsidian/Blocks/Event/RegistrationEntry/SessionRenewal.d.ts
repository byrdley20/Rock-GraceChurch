import { PropType } from 'vue';
import { InvokeBlockActionFunc } from '../../../Controls/RockBlock';
import { pluralConditional } from '../../../Services/String';
import { RegistrationEntryState } from '../RegistrationEntry';
declare const _default: import("vue").DefineComponent<{
    isSessionExpired: {
        type: PropType<boolean>;
        required: true;
    };
}, {
    registrationEntryState: RegistrationEntryState;
    invokeBlockAction: InvokeBlockActionFunc;
}, {
    spotsSecured: number | null;
    isLoading: boolean;
    isModalVisible: boolean;
}, {
    hasWaitlist(): boolean;
    allRegistrantCount(): number;
    waitlistRegistrantCount(): number;
    waitlistRegistrantCountWord(): string;
    nonWaitlistRegistrantCount(): number;
    nonWaitlistRegistrantCountWord(): string;
}, {
    pluralConditional: typeof pluralConditional;
    restart(): void;
    close(): void;
    requestRenewal(): Promise<void>;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    isSessionExpired?: unknown;
} & {
    isSessionExpired: boolean;
} & {}>, {}>;
export default _default;
