import { PropType } from 'vue';
export declare type ItemWithPreAndPostHtml = {
    SlotName: string;
    PreHtml: string;
    PostHtml: string;
};
declare const _default: import("vue").DefineComponent<{
    items: {
        type: PropType<ItemWithPreAndPostHtml[]>;
        required: true;
    };
}, unknown, unknown, {
    augmentedItems(): Record<string, string>[];
    innerTemplate(): string;
    innerComponent(): Record<string, unknown>;
}, {
    onDismiss: () => void;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    items?: unknown;
} & {
    items: ItemWithPreAndPostHtml[];
} & {}>, {}>;
export default _default;
