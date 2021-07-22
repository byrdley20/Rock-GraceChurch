import { InvokeBlockActionFunc } from '../../../Controls/RockBlock';
import { RegistrationEntryState } from '../RegistrationEntry';
import { RegistrationEntryBlockViewModel } from './RegistrationEntryBlockViewModel';
declare const _default: import("vue").DefineComponent<{}, {
    invokeBlockAction: InvokeBlockActionFunc;
    registrationEntryState: RegistrationEntryState;
}, {
    loading: boolean;
    discountCodeInput: string;
    discountCodeWarningMessage: string;
}, {
    discountCodeSuccessMessage(): string;
    isDiscountPanelVisible(): boolean;
    viewModel(): RegistrationEntryBlockViewModel;
}, {
    tryDiscountCode(): Promise<void>;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, import("vue").EmitsOptions, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{} & {} & {}>, {}>;
export default _default;
