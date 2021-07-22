import { PropType } from 'vue';
export declare type FilterOptions = {
    Take: number;
    Skip: number;
};
export declare enum SortDirection {
    Ascending = 0,
    Descending = 1
}
export declare type SortProperty = {
    Property: string;
    Direction: SortDirection;
};
export declare type GridContext = {
    selectedRowIds: Record<string, boolean>;
    selectAllRows: boolean;
    sortProperty: SortProperty | null;
};
export declare type RowData = Record<string, unknown>;
export declare type RowId = string;
export declare type RowContext = {
    rowData: RowData;
    isHeader: boolean;
    rowId: RowId;
};
export declare function getRowId(rowData: RowData, rowIdKey: string): RowId;
declare const _default: import("vue").DefineComponent<{
    gridData: {
        type: PropType<RowData[]>;
        required: true;
    };
    rowIdKey: {
        type: PropType<string>;
        required: true;
    };
    sortProperty: {
        type: PropType<SortProperty | null>;
        default: null;
    };
    pageSize: {
        type: PropType<number>;
        default: number;
    };
    currentPageIndex: {
        type: PropType<number>;
        default: number;
    };
    rowItemText: {
        type: PropType<string>;
        default: string;
    };
    rowCountOverride: {
        type: PropType<number>;
        default: number;
    };
}, unknown, {
    gridContext: GridContext;
}, {
    rowCount(): number;
    pageCount(): number;
    currentPageSet(): number[];
}, {
    getRowId: typeof getRowId;
    getRowContext(rowData: RowData, isHeader: boolean): RowContext;
    setPageSize(pageSize: number): void;
    setPageIndex(pageIndex: number): void;
    goToPreviousPageSet(): void;
    goToNextPageSet(): void;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    gridData?: unknown;
    rowIdKey?: unknown;
    sortProperty?: unknown;
    pageSize?: unknown;
    currentPageIndex?: unknown;
    rowItemText?: unknown;
    rowCountOverride?: unknown;
} & {
    gridData: RowData[];
    rowIdKey: string;
    sortProperty: SortProperty | null;
    pageSize: number;
    currentPageIndex: number;
    rowItemText: string;
    rowCountOverride: number;
} & {}>, {
    sortProperty: SortProperty | null;
    pageSize: number;
    currentPageIndex: number;
    rowItemText: string;
    rowCountOverride: number;
}>;
export default _default;
