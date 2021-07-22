import { PropType } from 'vue';
import { RowContext } from './Grid';
declare const _default: import("vue").DefineComponent<{
    property: {
        type: PropType<string>;
        default: string;
    };
    urlTemplate: {
        type: PropType<string>;
        default: string;
    };
}, {
    rowContext: RowContext;
}, unknown, {
    personId(): number | null;
    url(): string;
}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    property?: unknown;
    urlTemplate?: unknown;
} & {
    property: string;
    urlTemplate: string;
} & {}>, {
    property: string;
    urlTemplate: string;
}>;
export default _default;
