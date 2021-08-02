System.register(["@Obsidian/Services/String", "vue", "./RockField"], function (exports_1, context_1) {
    "use strict";
    var String_1, vue_1, RockField_1;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (String_1_1) {
                String_1 = String_1_1;
            },
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (RockField_1_1) {
                RockField_1 = RockField_1_1;
            }
        ],
        execute: function () {
            exports_1("default", vue_1.defineComponent({
                name: 'AttributeValuesContainer',
                components: {
                    RockField: RockField_1.default
                },
                props: {
                    isEditMode: {
                        type: Boolean,
                        default: false
                    },
                    attributeValues: {
                        type: Array,
                        required: true
                    },
                    showEmptyValues: {
                        type: Boolean,
                        default: true
                    },
                    showAbbreviatedName: {
                        type: Boolean,
                        default: false
                    }
                },
                methods: {
                    getAttributeLabel(attributeValue) {
                        var _a, _b;
                        if (this.showAbbreviatedName && ((_a = attributeValue.attribute) === null || _a === void 0 ? void 0 : _a.abbreviatedName)) {
                            return attributeValue.attribute.abbreviatedName;
                        }
                        return ((_b = attributeValue.attribute) === null || _b === void 0 ? void 0 : _b.name) || '';
                    }
                },
                computed: {
                    validAttributeValues() {
                        return this.attributeValues.filter(av => av.attribute);
                    },
                    valuesToShow() {
                        if (this.showEmptyValues) {
                            return this.validAttributeValues;
                        }
                        return this.validAttributeValues.filter(av => !String_1.isNullOrWhitespace(av.value));
                    }
                },
                template: `
<div v-if="!isEditMode" v-for="a in valuesToShow" class="form-group static-control">
    <template v-if="a.value">
        <label class="control-label">
            {{ getAttributeLabel(a) }}
        </label>
        <div class="control-wrapper">
            <div class="form-control-static">
                <RockField :fieldTypeGuid="a.attribute.fieldTypeGuid" v-model="a.value" :configurationValues="a.attribute.qualifierValues" />
            </div>
        </div>
    </template>
</div>
<template v-else>
    <template v-for="a in validAttributeValues">
        <RockField
            isEditMode
            :fieldTypeGuid="a.attribute.fieldTypeGuid"
            v-model="a.value"
            :label="getAttributeLabel(a)"
            :help="a.attribute.description"
            :rules="a.attribute.isRequired ? 'required' : ''"
            :configurationValues="a.attribute.qualifierValues"  />
    </template>
</template>`
            }));
        }
    };
});
//# sourceMappingURL=AttributeValuesContainer.js.map