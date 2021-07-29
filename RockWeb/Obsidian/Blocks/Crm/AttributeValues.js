System.register(["vue", "../../Templates/PaneledBlockTemplate", "../../Controls/Loading", "../../Store/Index", "../../Util/Guid", "../../Elements/JavaScriptAnchor", "../../Controls/RockForm", "../../Elements/TextBox", "../../Elements/RockButton", "../../Controls/AttributeValuesContainer"], function (exports_1, context_1) {
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
    var vue_1, PaneledBlockTemplate_1, Loading_1, Index_1, Guid_1, JavaScriptAnchor_1, RockForm_1, TextBox_1, RockButton_1, AttributeValuesContainer_1;
    var __moduleName = context_1 && context_1.id;
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
            function (Guid_1_1) {
                Guid_1 = Guid_1_1;
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
                    return {
                        invokeBlockAction: vue_1.inject('invokeBlockAction'),
                        configurationValues: vue_1.inject('configurationValues')
                    };
                },
                data() {
                    return {
                        isLoading: false,
                        isEditMode: false
                    };
                },
                computed: {
                    person() {
                        return (Index_1.default.getters.personContext || null);
                    },
                    personGuid() {
                        var _a;
                        return ((_a = this.person) === null || _a === void 0 ? void 0 : _a.guid) || null;
                    },
                    categoryGuids() {
                        return this.configurationValues.categoryGuids || [];
                    },
                    useAbbreviatedNames() {
                        return this.configurationValues.useAbbreviatedNames;
                    },
                    attributeValues() {
                        var _a;
                        const attributes = ((_a = this.person) === null || _a === void 0 ? void 0 : _a.attributes) || {};
                        const attributeValues = [];
                        for (const key in attributes) {
                            const attributeValue = attributes[key];
                            const attribute = attributeValue.attribute;
                            if (this.categoryGuids.length > 0 && !attribute) {
                                continue;
                            }
                            if (this.categoryGuids.length > 0 && !(attribute === null || attribute === void 0 ? void 0 : attribute.categoryGuids.some(g1 => this.categoryGuids.some(g2 => Guid_1.areEqual(g1, g2))))) {
                                continue;
                            }
                            attributeValues.push(attributeValue);
                        }
                        attributeValues.sort((a, b) => {
                            var _a, _b, _c, _d;
                            const aOrder = ((_a = a.attribute) === null || _a === void 0 ? void 0 : _a.order) || 0;
                            const bOrder = ((_b = b.attribute) === null || _b === void 0 ? void 0 : _b.order) || 0;
                            if (aOrder === bOrder) {
                                const aName = ((_c = a.attribute) === null || _c === void 0 ? void 0 : _c.name) || '';
                                const bName = ((_d = b.attribute) === null || _d === void 0 ? void 0 : _d.name) || '';
                                if (aName > bName) {
                                    return 1;
                                }
                                if (aName < bName) {
                                    return -1;
                                }
                            }
                            return aOrder - bOrder;
                        });
                        return attributeValues;
                    }
                },
                methods: {
                    goToViewMode() {
                        this.isEditMode = false;
                    },
                    goToEditMode() {
                        this.isEditMode = true;
                    },
                    doSave() {
                        return __awaiter(this, void 0, void 0, function* () {
                            this.isLoading = true;
                            const keyValueMap = {};
                            for (const a of this.attributeValues) {
                                if (a.attribute) {
                                    keyValueMap[a.attribute.key] = a.value;
                                }
                            }
                            yield this.invokeBlockAction('SaveAttributeValues', {
                                personGuid: this.personGuid,
                                keyValueMap
                            });
                            this.goToViewMode();
                            this.isLoading = false;
                        });
                    }
                },
                template: `
<PaneledBlockTemplate class="panel-persondetails">
    <template v-slot:title>
        <i :class="configurationValues.BlockIconCssClass"></i>
        {{ configurationValues.BlockTitle }}
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