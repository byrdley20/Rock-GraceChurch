import { PropType } from 'vue';
import { RowContext } from './Grid';
declare const _default: import("vue").DefineComponent<{
    rowContext: {
        type: PropType<RowContext>;
        required: true;
    };
}, unknown, unknown, {}, {
    onRowClick(): void;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    rowContext?: unknown;
} & {
    rowContext: RowContext;
} & {}>, {}>;
export default _default;
