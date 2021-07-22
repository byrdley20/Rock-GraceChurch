import { PropType } from 'vue';
import { DropDownListOption } from './DropDownList';
export declare enum Gender {
    Unknown = 0,
    Male = 1,
    Female = 2
}
declare const _default: import("vue").DefineComponent<{
    rules: {
        type: PropType<string>;
        default: string;
    };
}, unknown, {
    blankValue: string;
}, {
    options(): DropDownListOption[];
    computedRules(): string;
}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    rules?: unknown;
} & {
    rules: string;
} & {}>, {
    rules: string;
}>;
export default _default;
