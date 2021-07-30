import { PropType } from 'vue';
import { AttributeValue } from '@Obsidian/ViewModels';
declare const _default: import("vue").DefineComponent<{
    isEditMode: {
        type: PropType<boolean>;
        default: boolean;
    };
    attributeValues: {
        type: PropType<AttributeValue[]>;
        required: true;
    };
    showEmptyValues: {
        type: PropType<boolean>;
        default: boolean;
    };
    showAbbreviatedName: {
        type: PropType<boolean>;
        default: boolean;
    };
}, unknown, unknown, {
    validAttributeValues(): AttributeValue[];
    valuesToShow(): AttributeValue[];
}, {
    getAttributeLabel(attributeValue: AttributeValue): string;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    isEditMode?: unknown;
    attributeValues?: unknown;
    showEmptyValues?: unknown;
    showAbbreviatedName?: unknown;
} & {
    isEditMode: boolean;
    attributeValues: AttributeValue[];
    showEmptyValues: boolean;
    showAbbreviatedName: boolean;
} & {}>, {
    isEditMode: boolean;
    showEmptyValues: boolean;
    showAbbreviatedName: boolean;
}>;
export default _default;
