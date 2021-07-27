System.register(["../Elements/JavaScriptAnchor", "vue", "./Grid"], function (exports_1, context_1) {
    "use strict";
    var JavaScriptAnchor_1, vue_1, Grid_1;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (JavaScriptAnchor_1_1) {
                JavaScriptAnchor_1 = JavaScriptAnchor_1_1;
            },
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (Grid_1_1) {
                Grid_1 = Grid_1_1;
            }
        ],
        execute: function () {
            exports_1("default", vue_1.defineComponent({
                name: 'GridColumn',
                components: {
                    JavaScriptAnchor: JavaScriptAnchor_1.default
                },
                props: {
                    title: {
                        type: String,
                        default: ''
                    },
                    property: {
                        type: String,
                        default: ''
                    },
                    sortExpression: {
                        type: String,
                        default: ''
                    }
                },
                setup() {
                    return {
                        gridContext: vue_1.inject('gridContext'),
                        rowContext: vue_1.inject('rowContext')
                    };
                },
                computed: {
                    mySortExpression() {
                        return this.sortExpression || this.property;
                    },
                    canSort() {
                        return !!this.sortProperty;
                    },
                    sortProperty() {
                        return this.gridContext.sortProperty;
                    },
                    isCurrentlySorted() {
                        var _a;
                        return !!this.mySortExpression && ((_a = this.sortProperty) === null || _a === void 0 ? void 0 : _a.property) === this.mySortExpression;
                    },
                    isCurrentlySortedDesc() {
                        var _a;
                        return this.isCurrentlySorted && ((_a = this.sortProperty) === null || _a === void 0 ? void 0 : _a.direction) === Grid_1.SortDirection.Descending;
                    },
                    isCurrentlySortedAsc() {
                        var _a;
                        return this.isCurrentlySorted && ((_a = this.sortProperty) === null || _a === void 0 ? void 0 : _a.direction) === Grid_1.SortDirection.Ascending;
                    }
                },
                methods: {
                    onHeaderClick() {
                        this.$emit('click:header', this.property);
                        if (this.mySortExpression && this.sortProperty) {
                            if (this.isCurrentlySortedAsc) {
                                this.sortProperty.direction = Grid_1.SortDirection.Descending;
                            }
                            else {
                                this.sortProperty.property = this.mySortExpression;
                                this.sortProperty.direction = Grid_1.SortDirection.Ascending;
                            }
                        }
                    },
                },
                template: `
<th
    v-if="rowContext.isHeader"
    scope="col"
    @click="onHeaderClick"
    :class="isCurrentlySortedAsc ? 'ascending' : isCurrentlySortedDesc ? 'descending' : ''">
    <JavaScriptAnchor v-if="mySortExpression && canSort">
        <slot name="header">
            {{title}}
        </slot>
    </JavaScriptAnchor>
    <template v-else>
        <slot name="header">
            {{title}}
        </slot>
    </template>
</th>
<td v-else class="grid-select-cell">
    <slot>
        {{rowContext.rowData[property]}}
    </slot>
</td>`
            }));
        }
    };
});
//# sourceMappingURL=GridColumn.js.map