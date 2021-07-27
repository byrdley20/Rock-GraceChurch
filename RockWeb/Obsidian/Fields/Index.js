System.register(["../Util/Guid"], function (exports_1, context_1) {
    "use strict";
    var Guid_1, fieldTypeComponentPaths;
    var __moduleName = context_1 && context_1.id;
    function getConfigurationValue(key, configurationValues) {
        key = (key || '').toLowerCase().trim();
        if (!configurationValues || !key) {
            return '';
        }
        const objectKey = Object.keys(configurationValues).find(k => k.toLowerCase().trim() === key);
        if (!objectKey) {
            return '';
        }
        const configObject = configurationValues[objectKey];
        return (configObject === null || configObject === void 0 ? void 0 : configObject.Value) || '';
    }
    exports_1("getConfigurationValue", getConfigurationValue);
    function getFieldTypeProps() {
        return {
            modelValue: {
                type: String,
                required: true
            },
            isEditMode: {
                type: Boolean,
                default: false
            },
            configurationValues: {
                type: Object,
                default: () => ({})
            }
        };
    }
    exports_1("getFieldTypeProps", getFieldTypeProps);
    function registerFieldType(fieldTypeGuid, component) {
        const normalizedGuid = Guid_1.normalize(fieldTypeGuid);
        const dataToExport = {
            fieldTypeGuid: normalizedGuid,
            component: component
        };
        if (fieldTypeComponentPaths[normalizedGuid]) {
            console.error(`Field type "${fieldTypeGuid}" is already registered`);
        }
        else {
            fieldTypeComponentPaths[normalizedGuid] = component;
        }
        return dataToExport;
    }
    exports_1("registerFieldType", registerFieldType);
    function getFieldTypeComponent(fieldTypeGuid) {
        const field = fieldTypeComponentPaths[Guid_1.normalize(fieldTypeGuid)];
        if (field) {
            return field;
        }
        console.error(`Field type "${fieldTypeGuid}" was not found`);
        return null;
    }
    exports_1("getFieldTypeComponent", getFieldTypeComponent);
    return {
        setters: [
            function (Guid_1_1) {
                Guid_1 = Guid_1_1;
            }
        ],
        execute: function () {
            fieldTypeComponentPaths = {};
        }
    };
});
//# sourceMappingURL=Index.js.map