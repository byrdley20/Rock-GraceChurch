import { PropType } from 'vue';
import { RegistrationEntryBlockFormFieldViewModel } from './RegistrationEntryBlockViewModel';
declare const _default: import("vue").DefineComponent<{
    field: {
        type: PropType<RegistrationEntryBlockFormFieldViewModel>;
        required: true;
    };
    fieldValues: {
        type: PropType<Record<string, unknown>>;
        required: true;
    };
    isKnownFamilyMember: {
        type: PropType<boolean>;
        required: true;
    };
}, unknown, unknown, {
    componentUrl(): string;
    fieldControlComponentProps(): Record<string, unknown>;
}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    field?: unknown;
    fieldValues?: unknown;
    isKnownFamilyMember?: unknown;
} & {
    fieldValues: Record<string, unknown>;
    field: RegistrationEntryBlockFormFieldViewModel;
    isKnownFamilyMember: boolean;
} & {}>, {}>;
export default _default;
