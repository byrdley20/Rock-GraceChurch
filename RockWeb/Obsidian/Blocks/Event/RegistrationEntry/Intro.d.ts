import { pluralConditional } from '../../../Services/String';
import { Person } from '@Obsidian/ViewModels';
import { RegistrationEntryState } from '../RegistrationEntry';
import { RegistrationEntryBlockViewModel } from './RegistrationEntryBlockViewModel';
declare const _default: import("vue").DefineComponent<{}, {}, {
    numberOfRegistrants: number;
    registrationEntryState: RegistrationEntryState;
    showRemainingCapacity: boolean;
}, {
    currentPerson(): Person | null;
    viewModel(): RegistrationEntryBlockViewModel;
    numberToAddToWaitlist(): number;
    remainingCapacityPhrase(): string;
    isFull(): boolean;
    registrantTerm(): string;
    registrantTermPlural(): string;
    registrationTerm(): string;
    registrationTermPlural(): string;
    registrationTermTitleCase(): string;
}, {
    pluralConditional: typeof pluralConditional;
    onNext(): void;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, import("vue").EmitsOptions, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{} & {} & {}>, {}>;
export default _default;
