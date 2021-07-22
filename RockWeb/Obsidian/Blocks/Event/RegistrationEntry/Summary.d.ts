import { GatewayControlModel } from '../../../Controls/GatewayControl';
import { InvokeBlockActionFunc } from '../../../Controls/RockBlock';
import { RegistrantBasicInfo, RegistrationEntryState } from '../RegistrationEntry';
import { RegistrationEntryBlockArgs } from './RegistrationEntryBlockArgs';
import { RegistrationEntryBlockViewModel } from './RegistrationEntryBlockViewModel';
declare const _default: import("vue").DefineComponent<{}, {
    getRegistrationEntryBlockArgs: () => RegistrationEntryBlockArgs;
    invokeBlockAction: InvokeBlockActionFunc;
    registrationEntryState: RegistrationEntryState;
}, {
    loading: boolean;
    doGatewayControlSubmit: boolean;
    gatewayErrorMessage: string;
    gatewayValidationFields: Record<string, string>;
    submitErrorMessage: string;
}, {
    gatewayControlModel(): GatewayControlModel;
    viewModel(): RegistrationEntryBlockViewModel;
    registrantInfos(): RegistrantBasicInfo[];
    registrantTerm(): string;
    instanceName(): string;
    finishButtonText(): string;
}, {
    onPrevious(): void;
    onNext(): Promise<void>;
    onGatewayControlSuccess(token: string): Promise<void>;
    onGatewayControlReset(): Promise<void>;
    onGatewayControlError(message: string): void;
    onGatewayControlValidation(invalidFields: Record<string, string>): void;
    submit(): Promise<boolean>;
    getPaymentRedirect(): Promise<string>;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, import("vue").EmitsOptions, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{} & {} & {}>, {}>;
export default _default;
