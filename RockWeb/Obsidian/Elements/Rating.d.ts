import { PropType } from 'vue';
declare const _default: import("vue").DefineComponent<{
    modelValue: {
        type: PropType<number>;
        default: number;
    };
    maxRating: {
        type: PropType<number>;
        default: number;
    };
}, unknown, {
    internalValue: number;
    hoverValue: number | null;
}, {}, {
    setRating(value: number): void;
    onClear(e: Event): boolean;
    classForRating(position: number): string;
    setHover(position: number): void;
    clearHover(): void;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    modelValue?: unknown;
    maxRating?: unknown;
} & {
    modelValue: number;
    maxRating: number;
} & {}>, {
    modelValue: number;
    maxRating: number;
}>;
export default _default;
