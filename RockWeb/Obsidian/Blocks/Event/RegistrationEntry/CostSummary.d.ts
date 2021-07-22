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
    Type: RegistrationCostSummaryType;
    Description: string;
    Cost: number;
    DiscountedCost: number;
    MinPayment: number;
    DefaultPayment: number | null;
}
interface AugmentedLineItem extends LineItem {
    IsFee: boolean;
    DiscountHelp: string;
    DiscountedAmountFormatted: string;
    AmountFormatted: string;
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
