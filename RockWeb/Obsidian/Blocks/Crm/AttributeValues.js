System.register(["vue", "../../Templates/PaneledBlockTemplate", "../../Controls/Loading", "../../Store/Index", "../../Util/Block", "../../Elements/JavaScriptAnchor", "../../Controls/RockForm", "../../Elements/TextBox", "../../Elements/RockButton", "../../Controls/AttributeValuesContainer"], function (exports_1, context_1) {
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
    var vue_1, PaneledBlockTemplate_1, Loading_1, Index_1, Block_1, JavaScriptAnchor_1, RockForm_1, TextBox_1, RockButton_1, AttributeValuesContainer_1;
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
            function (PaneledBlockTemplate_1_1) {
                PaneledBlockTemplate_1 = PaneledBlockTemplate_1_1;
            },
            function (Loading_1_1) {
                Loading_1 = Loading_1_1;
            },
            function (Index_1_1) {
                Index_1 = Index_1_1;
            },
            function (Block_1_1) {
                Block_1 = Block_1_1;
            },
            function (JavaScriptAnchor_1_1) {
                JavaScriptAnchor_1 = JavaScriptAnchor_1_1;
            },
            function (RockForm_1_1) {
                RockForm_1 = RockForm_1_1;
            },
            function (TextBox_1_1) {
                TextBox_1 = TextBox_1_1;
            },
            function (RockButton_1_1) {
                RockButton_1 = RockButton_1_1;
            },
            function (AttributeValuesContainer_1_1) {
                AttributeValuesContainer_1 = AttributeValuesContainer_1_1;
            }
        ],
        execute: function () {
            exports_1("default", vue_1.defineComponent({
                name: 'Crm.AttributeValues',
                components: {
                    PaneledBlockTemplate: PaneledBlockTemplate_1.default,
                    Loading: Loading_1.default,
                    JavaScriptAnchor: JavaScriptAnchor_1.default,
                    RockForm: RockForm_1.default,
                    TextBox: TextBox_1.default,
                    RockButton: RockButton_1.default,
                    AttributeValuesContainer: AttributeValuesContainer_1.default
                },
                setup() {
                    const configurationValues = Block_1.useConfigurationValues();
                    const invokeBlockAction = Block_1.useInvokeBlockAction();
                    const attributeValues = vue_1.ref(sortedAttributeValues(configurationValues.attributes));
                    const personGuid = vue_1.computed(() => { var _a; return ((_a = Index_1.default.getters.personContext) === null || _a === void 0 ? void 0 : _a.guid) || null; });
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
//# sourceMappingURL=AttributeValues.js.map