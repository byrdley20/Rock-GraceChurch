import { PropType } from 'vue';
export interface ProgressTrackerItem {
    title: string;
    subtitle: string;
    key: string;
}
declare const ProgressTracker: import("vue").DefineComponent<{
    currentIndex: {
        type: PropType<number>;
        required: true;
    };
    items: {
        type: PropType<ProgressTrackerItem[]>;
        required: true;
    };
}, unknown, {
    guid: string;
    collapsedIndexes: number[];
}, {
    isCollapsed(): (index: number) => boolean;
    doNotCollapseIndexes(): number[];
    lastIndex(): number;
    progressTrackerElementId(): string;
    progressTrackerContainerElementId(): string;
}, {
    expandAndCollapseItemsBecauseOfWidth(): void;
    collapseItemsBecauseOfWidth(): void;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    currentIndex?: unknown;
    items?: unknown;
} & {
    items: ProgressTrackerItem[];
    currentIndex: number;
} & {}>, {}>;
export default ProgressTracker;
