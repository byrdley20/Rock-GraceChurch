import { PropType } from 'vue';
import { DropDownListOption } from '../Elements/DropDownList';
import { Module } from 'vuex';
import { RootState } from './Index';
import { CommonEntity } from './CommonEntities';
import { Guid } from '../Util/Guid';
import { Entity } from '@Obsidian/ViewModels';
export declare type CommonEntityOption = {
    guid: Guid;
    id: number;
    text: string;
};
export declare function createCommonEntityPicker(entityName: string, getOptionsFunc: () => CommonEntityOption[]): import("vue").DefineComponent<{
    modelValue: {
        type: PropType<string>;
        required: true;
    };
    label: {
        type: PropType<string>;
        default: unknown;
    };
}, unknown, {
    providedOptions: CommonEntityOption[];
    selectedGuid: string;
    isLoading: boolean;
}, {
    options(): DropDownListOption[];
}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    modelValue?: unknown;
    label?: unknown;
} & {
    label: string;
    modelValue: string;
} & {}>, {
    label: string;
}>;
export declare function generateCommonEntityModule<TEntity extends Entity>(commonEntity: CommonEntity): Module<{
    items: TEntity[];
}, RootState>;
