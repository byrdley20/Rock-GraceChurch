import { PropType } from 'vue';
import { DropDownListOption } from '../../../Elements/DropDownList';
import Person from '../../../ViewModels/PersonViewModel';
import { RegistrationEntryState } from '../RegistrationEntry';
import { RegistrantInfo, RegistrationEntryBlockFamilyMemberViewModel, RegistrationEntryBlockFormFieldViewModel, RegistrationEntryBlockFormViewModel, RegistrationEntryBlockViewModel, RegistrationFieldSource } from './RegistrationEntryBlockViewModel';
import { ItemWithPreAndPostHtml } from '../../../Elements/ItemsWithPreAndPostHtml';
declare const _default: import("vue").DefineComponent<{
    currentRegistrant: {
        type: PropType<RegistrantInfo>;
        required: true;
    };
    isWaitList: {
        type: PropType<boolean>;
        required: true;
    };
}, {
    registrationEntryState: RegistrationEntryState;
}, {
    fieldSources: {
        personField: RegistrationFieldSource;
        personAttribute: RegistrationFieldSource;
        groupMemberAttribute: RegistrationFieldSource;
        registrantAttribute: RegistrationFieldSource;
    };
}, {
    showPrevious(): boolean;
    viewModel(): RegistrationEntryBlockViewModel;
    currentFormIndex(): number;
    currentForm(): RegistrationEntryBlockFormViewModel | null;
    isLastForm(): boolean;
    formsToShow(): RegistrationEntryBlockFormViewModel[];
    currentFormFields(): RegistrationEntryBlockFormFieldViewModel[];
    prePostHtmlItems(): ItemWithPreAndPostHtml[];
    currentPerson(): Person | null;
    pluralFeeTerm(): string;
    familyOptions(): DropDownListOption[];
    familyMemberOptions(): DropDownListOption[];
    uppercaseRegistrantTerm(): string;
    firstName(): string;
    familyMember(): RegistrationEntryBlockFamilyMemberViewModel | null;
}, {
    onPrevious(): void;
    onNext(): void;
    copyValuesFromFamilyMember(): void;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    currentRegistrant?: unknown;
    isWaitList?: unknown;
} & {
    currentRegistrant: RegistrantInfo;
    isWaitList: boolean;
} & {}>, {}>;
export default _default;
