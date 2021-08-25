System.register(["vue", "../../Templates/paneledBlockTemplate", "../../Controls/loading", "../../Store/index", "../../Util/block", "../../Elements/javaScriptAnchor", "../../Controls/rockForm", "../../Elements/textBox", "../../Elements/rockButton", "../../Controls/attributeValuesContainer"], function (exports_1, context_1) {
    "use strict";
    var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var vue_1, paneledBlockTemplate_1, loading_1, index_1, block_1, javaScriptAnchor_1, rockForm_1, textBox_1, rockButton_1, attributeValuesContainer_1;
    var __moduleName = context_1 && context_1.id;
    function sortedAttributeValues(attributeValues) {
        const sortedValues = [...attributeValues];
        sortedValues.sort((a, b) => {
            if (a.order === b.order) {
                if (a.name > b.name) {
                    return 1;
                }
                if (a.name < b.name) {
                    return -1;
                }
            }
            return a.order - b.order;
        });
        return sortedValues;
    }
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (paneledBlockTemplate_1_1) {
                paneledBlockTemplate_1 = paneledBlockTemplate_1_1;
            },
            function (loading_1_1) {
                loading_1 = loading_1_1;
            },
            function (index_1_1) {
                index_1 = index_1_1;
            },
            function (block_1_1) {
                block_1 = block_1_1;
            },
            function (javaScriptAnchor_1_1) {
                javaScriptAnchor_1 = javaScriptAnchor_1_1;
            },
            function (rockForm_1_1) {
                rockForm_1 = rockForm_1_1;
            },
            function (textBox_1_1) {
                textBox_1 = textBox_1_1;
            },
            function (rockButton_1_1) {
                rockButton_1 = rockButton_1_1;
            },
            function (attributeValuesContainer_1_1) {
                attributeValuesContainer_1 = attributeValuesContainer_1_1;
            }
        ],
        execute: function () {
            exports_1("default", vue_1.defineComponent({
                name: 'Crm.AttributeValues',
                components: {
                    PaneledBlockTemplate: paneledBlockTemplate_1.default,
                    Loading: loading_1.default,
                    JavaScriptAnchor: javaScriptAnchor_1.default,
                    RockForm: rockForm_1.default,
                    TextBox: textBox_1.default,
                    RockButton: rockButton_1.default,
                    AttributeValuesContainer: attributeValuesContainer_1.default
                },
                setup() {
                    const configurationValues = block_1.useConfigurationValues();
                    const invokeBlockAction = block_1.useInvokeBlockAction();
                    const attributeValues = vue_1.ref(sortedAttributeValues(configurationValues.attributes));
                    const personGuid = vue_1.computed(() => { var _a; return ((_a = index_1.default.getters.personContext) === null || _a === void 0 ? void 0 : _a.guid) || null; });
                    const isLoading = vue_1.ref(false);
                    const isEditMode = vue_1.ref(false);
                    const goToViewMode = () => isEditMode.value = false;
                    const goToEditMode = () => __awaiter(this, void 0, void 0, function* () {
                        var _a;
                        const result = yield invokeBlockAction('GetAttributeValuesForEdit');
                        if (result.isSuccess) {
                            attributeValues.value = sortedAttributeValues((_a = result.data) !== null && _a !== void 0 ? _a : []);
                            isEditMode.value = true;
                        }
                    });
                    const doSave = () => __awaiter(this, void 0, void 0, function* () {
                        var _b;
                        isLoading.value = true;
                        const keyValueMap = {};
                        for (const a of attributeValues.value) {
                            keyValueMap[a.key] = a.value || '';
                        }
                        const result = yield invokeBlockAction('SaveAttributeValues', {
                            personGuid: personGuid.value,
                            keyValueMap
                        });
                        if (result.isSuccess) {
                            attributeValues.value = sortedAttributeValues((_b = result.data) !== null && _b !== void 0 ? _b : []);
                        }
                        goToViewMode();
                        isLoading.value = false;
                    });
                    return {
                        blockTitle: vue_1.computed(() => configurationValues.blockTitle),
                        blockIconCssClass: vue_1.computed(() => configurationValues.blockIconCssClass),
                        isLoading,
                        isEditMode,
                        goToViewMode,
                        goToEditMode,
                        doSave,
                        useAbbreviatedNames: configurationValues.useAbbreviatedNames,
                        attributeValues
                    };
                },
                template: `
<PaneledBlockTemplate class="panel-persondetails">
    <template v-slot:title>
        <i :class="blockIconCssClass"></i>
        {{ blockTitle }}
    </template>
    <template v-slot:titleAside>
        <div class="actions rollover-item pull-right">
            <JavaScriptAnchor title="Order Attributes" class="btn-link edit">
                <i class="fa fa-bars"></i>
            </JavaScriptAnchor>
            <JavaScriptAnchor title="Edit Attributes" class="btn-link edit" @click="goToEditMode">
                <i class="fa fa-pencil"></i>
            </JavaScriptAnchor>
        </div>
    </template>
    <template v-slot:default>
        <Loading :isLoading="isLoading">
            <AttributeValuesContainer v-if="!isEditMode" :attributeValues="attributeValues" :showEmptyValues="false" />
            <RockForm v-else @submit="doSave">
                <AttributeValuesContainer :attributeValues="attributeValues" isEditMode :showAbbreviatedName="useAbbreviatedNames" />
                <div class="actions">
                    <RockButton btnType="primary" btnSize="xs" type="submit">Save</RockButton>
                    <RockButton btnType="link" btnSize="xs" @click="goToViewMode">Cancel</RockButton>
                </div>
            </RockForm>
        </Loading>
    </template>
</PaneledBlockTemplate>`
            }));
        }
    };
});
//# sourceMappingURL=attributeValues.js.map