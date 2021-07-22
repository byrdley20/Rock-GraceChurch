import { PropType } from 'vue';
import { RowData, SortProperty } from './Grid';
import { InvokeBlockActionFunc } from './RockBlock';
declare const _default: import("vue").DefineComponent<{
    blockActionName: {
        type: PropType<string>;
        required: true;
    };
    rowIdKey: {
        type: PropType<string>;
        required: true;
    };
}, {
    invokeBlockAction: InvokeBlockActionFunc;
}, {
    pageSize: number;
    totalRowCount: number;
    currentPageIndex: number;
    isLoading: boolean;
    errorMessage: string;
    sortProperty: SortProperty;
    currentPageData: RowData[];
}, {
    sortString(): string;
}, {
    fetchData(): Promise<void>;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    blockActionName?: unknown;
    rowIdKey?: unknown;
} & {
    rowIdKey: string;
    blockActionName: string;
} & {}>, {}>;
export default _default;
