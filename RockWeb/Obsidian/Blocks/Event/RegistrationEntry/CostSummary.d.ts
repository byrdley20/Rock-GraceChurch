import { InvokeBlockActionFunc } from '../../../Controls/RockBlock';
import { RegistrationEntryState } from '../RegistrationEntry';
import { RegistrationEntryBlockArgs } from './RegistrationEntryBlockArgs';
declare enum RegistrationCostSummaryType {
    Cost = 0,
    Fee = 1,
    Discount = 2,
    Total = 3
}
interface LineItem {
    type: RegistrationCostSummaryType;
    description: string;
    cost: number;
    discountedCost: number;
    minPayment: number;
    defaultPayment: number | null;
}
interface AugmentedLineItem extends LineItem {
    isFee: boolean;
    discountHelp: string;
    discountedAmountFormatted: string;
    amountFormatted: string;
}
declare const _default: import("vue").DefineComponent<{}, {
    getRegistrationEntryBlockArgs: () => RegistrationEntryBlockArgs;
    invokeBlockAction: InvokeBlockActionFunc;
    registrationEntryState: RegistrationEntryState;
}, {
    isLoading: boolean;
    lineItems: LineItem[];
}, {
    augmentedLineItems(): AugmentedLineItem[];
    hasDiscount(): boolean;
    total(): number;
    totalFormatted(): string;
    defaultPaymentAmount(): number;
    discountedTotal(): number;
    discountedTotalFormatted(): string;
    amountDueToday(): number;
    amountDueTodayFormatted(): string;
    showAmountDueToday(): boolean;
    amountPreviouslyPaid(): number;
    amountPreviouslyPaidFormatted(): string;
    maxAmountCanBePaid(): number;
    maxAmountCanBePaidFormatted(): string;
    amountRemaining(): number;
    amountRemainingFormatted(): string;
    amountToPayTodayRules(): string;
}, {
    fetchData(): Promise<void>;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, import("vue").EmitsOptions, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{} & {} & {}>, {}>;
export default _default;
