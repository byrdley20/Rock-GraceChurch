import { PropType } from 'vue';
import { GridContext, RowContext, SortProperty } from './Grid';
declare const _default: import("vue").DefineComponent<{
    title: {
        type: PropType<string>;
        default: string;
    };
    property: {
        type: PropType<string>;
        default: string;
    };
    sortExpression: {
        type: PropType<string>;
        default: string;
    };
}, {
    gridContext: GridContext;
    rowContext: RowContext;
}, unknown, {
    mySortExpression(): string;
    canSort(): boolean;
    sortProperty(): SortProperty | null;
    isCurrentlySorted(): boolean;
    isCurrentlySortedDesc(): boolean;
    isCurrentlySortedAsc(): boolean;
}, {
    onHeaderClick(): void;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    title?: unknown;
    property?: unknown;
    sortExpression?: unknown;
} & {
    property: string;
    title: string;
    sortExpression: string;
} & {}>, {
    property: string;
    title: string;
    sortExpression: string;
}>;
export default _default;
