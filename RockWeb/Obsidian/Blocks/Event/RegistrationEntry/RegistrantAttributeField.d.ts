import { PropType } from 'vue';
import { Attribute } from '@Obsidian/ViewModels';
import { RegistrationEntryBlockFormFieldRuleViewModel, RegistrationEntryBlockFormFieldViewModel } from './RegistrationEntryBlockViewModel';
declare const _default: import("vue").DefineComponent<{
    field: {
        type: PropType<RegistrationEntryBlockFormFieldViewModel>;
        required: true;
    };
    fieldValues: {
        type: PropType<Record<string, unknown>>;
        required: true;
    };
}, unknown, {
    fieldControlComponent: unknown;
    fieldControlComponentProps: {};
}, {
    isVisible(): boolean;
    attribute(): Attribute | null;
    fieldProps(): Record<string, unknown>;
}, {
    isRuleMet(rule: RegistrationEntryBlockFormFieldRuleViewModel): boolean;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    field?: unknown;
    fieldValues?: unknown;
} & {
    fieldValues: Record<string, unknown>;
    field: RegistrationEntryBlockFormFieldViewModel;
} & {}>, {}>;
export default _default;
