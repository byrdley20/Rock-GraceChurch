import { Component, PropType } from 'vue';
import { Guid } from '../Util/Guid';
export interface ConfigurationValue {
    Name: string;
    Description: string;
    Value: string;
}
export declare type ConfigurationValues = Record<string, ConfigurationValue>;
export declare function getConfigurationValue(key: string | null, configurationValues: ConfigurationValues | null): string;
export declare type FieldTypeModule = {
    fieldTypeGuid: Guid;
    component: Component;
};
export declare function getFieldTypeProps(): {
    modelValue: {
        type: PropType<string>;
        required: boolean;
    };
    isEditMode: {
        type: PropType<boolean>;
        default: boolean;
    };
    configurationValues: {
        type: PropType<ConfigurationValues>;
        default: () => {};
    };
};
export declare function registerFieldType(fieldTypeGuid: Guid, component: Component): FieldTypeModule;
export declare function getFieldTypeComponent(fieldTypeGuid: Guid): Component | null;
