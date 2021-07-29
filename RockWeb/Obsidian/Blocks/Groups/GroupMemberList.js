System.register(["../../Templates/PaneledBlockTemplate", "vue", "../../Store/Index", "../../Controls/Grid", "../../Controls/GridRow", "../../Controls/GridColumn", "../../Controls/GridSelectColumn", "../../Controls/GridProfileLinkColumn", "../../Elements/Alert"], function (exports_1, context_1) {
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
    var PaneledBlockTemplate_1, vue_1, Index_1, Grid_1, GridRow_1, GridColumn_1, GridSelectColumn_1, GridProfileLinkColumn_1, Alert_1;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (PaneledBlockTemplate_1_1) {
                PaneledBlockTemplate_1 = PaneledBlockTemplate_1_1;
            },
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (Index_1_1) {
                Index_1 = Index_1_1;
            },
            function (Grid_1_1) {
                Grid_1 = Grid_1_1;
            },
            function (GridRow_1_1) {
                GridRow_1 = GridRow_1_1;
            },
            function (GridColumn_1_1) {
                GridColumn_1 = GridColumn_1_1;
            },
            function (GridSelectColumn_1_1) {
                GridSelectColumn_1 = GridSelectColumn_1_1;
            },
            function (GridProfileLinkColumn_1_1) {
                GridProfileLinkColumn_1 = GridProfileLinkColumn_1_1;
            },
            function (Alert_1_1) {
                Alert_1 = Alert_1_1;
            }
        ],
        execute: function () {
            exports_1("default", vue_1.defineComponent({
                name: 'Groups.GroupMemberList',
                components: {
                    PaneledBlockTemplate: PaneledBlockTemplate_1.default,
                    Alert: Alert_1.default,
                    Grid: Grid_1.default,
                    GridRow: GridRow_1.default,
                    GridColumn: GridColumn_1.default,
                    GridSelectColumn: GridSelectColumn_1.default,
                    GridProfileLinkColumn: GridProfileLinkColumn_1.default
                },
                setup() {
                    return {
                        invokeBlockAction: vue_1.inject('invokeBlockAction')
                    };
                },
                data() {
                    return {
                        isLoading: false,
                        errorMessage: '',
                        members: [],
                        sortProperty: {
                            direction: Grid_1.SortDirection.Ascending,
                            property: ''
                        }
                    };
                },
                computed: {
                    groupId() {
                        const g = Index_1.default.getters.groupContext;
                        return (Index_1.default.getters.groupContext || {}).id || 0;
                    },
                },
                methods: {
                    fetchGroupMembers() {
                        return __awaiter(this, void 0, void 0, function* () {
                            if (this.isLoading) {
                                return;
                            }
                            this.isLoading = true;
                            this.errorMessage = '';
                            try {
                                const result = yield this.invokeBlockAction('GetGroupMemberList', {
                                    groupId: this.groupId,
                                    filterOptions: {
                                        take: 50,
                                        skip: 0
                                    },
                                    sortProperty: this.sortProperty
                                });
                                if (result.data && result.data.groupMembers) {
                                    this.members = result.data.groupMembers;
                                }
                                else {
                                    this.members = [];
                                }
                            }
                            catch (e) {
                                this.errorMessage = `An exception occurred: ${e}`;
                            }
                            finally {
                                this.isLoading = false;
                            }
                        });
                    },
                    onRowClick(rowContext) {
                        const groupMemberId = rowContext.rowId;
                        location.href = '/GroupMember/' + groupMemberId;
                    }
                },
                watch: {
                    groupId() {
                        return __awaiter(this, void 0, void 0, function* () {
                            if (this.groupId) {
                                yield this.fetchGroupMembers();
                            }
                        });
                    },
                    sortProperty: {
                        deep: true,
                        handler() {
                            return __awaiter(this, void 0, void 0, function* () {
                                yield this.fetchGroupMembers();
                            });
                        }
                    }
                },
                mounted() {
                    return __awaiter(this, void 0, void 0, function* () {
                        if (this.groupId) {
                            yield this.fetchGroupMembers();
                        }
                    });
                },
                template: `
<PaneledBlockTemplate>
    <template #title>
        <i class="fa fa-users"></i>
        Group Members
    </template>
    <template #default>
        <Alert v-if="errorMessage" alertType="danger">
            {{errorMessage}}
        </Alert>
        <div class="grid grid-panel">
            <Grid :gridData="members" rowIdKey="groupMemberId" #default="rowContext" v-model:sortProperty="sortProperty" rowItemText="Group Member">
                <GridRow :rowContext="rowContext" @click:body="onRowClick">
                    <GridSelectColumn />
                    <GridColumn title="Name" property="fullName" sortExpression="person.lastName,person.nickName">
                        <div
                            class="photo-icon photo-round photo-round-xs pull-left margin-r-sm"
                            :style="{
                                backgroundImage: 'url(' + rowContext.rowData.photoUrl + ')',
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat'
                            }"></div>
                        {{rowContext.rowData.fullName}}
                    </GridColumn>
                    <GridColumn title="Role" property="roleName" sortExpression="groupRole.name" />
                    <GridColumn title="Member Status" property="statusName" sortExpression="groupMemberStatus" />
                    <GridProfileLinkColumn property="personId" />
                </GridRow>
            </Grid>
        </div>
    </template>
</PaneledBlockTemplate>`
            }));
        }
    };
});
//# sourceMappingURL=GroupMemberList.js.map