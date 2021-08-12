System.register(["vue", "../Rules/Index", "./DropDownList"], function (exports_1, context_1) {
    "use strict";
    var vue_1, Index_1, DropDownList_1;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (Index_1_1) {
                Index_1 = Index_1_1;
            },
            function (DropDownList_1_1) {
                DropDownList_1 = DropDownList_1_1;
            }
        ],
        execute: function () {
            exports_1("default", vue_1.defineComponent({
                name: 'GenderDropDownList',
                components: {
                    DropDownList: DropDownList_1.default
                },
                props: {
                    rules: {
                        type: String,
                        default: ''
                    }
                },
                data() {
                    return {
                        blankValue: `${0}`
                    };
                },
                computed: {
                    options() {
                        return [
                            { text: 'Male', value: 1..toString() },
                            { text: 'Female', value: 2..toString() }
                        ];
                    },
                    computedRules() {
                        const rules = Index_1.ruleStringToArray(this.rules);
                        const notEqualRule = `notequal:${0}`;
                        if (rules.indexOf('required') !== -1 && rules.indexOf(notEqualRule) === -1) {
                            rules.push(notEqualRule);
                        }
                        return Index_1.ruleArrayToString(rules);
                    }
                },
                template: `
<DropDownList label="Gender" :options="options" :showBlankItem="true" :blankValue="blankValue" :rules="computedRules" />`
            }));
        }
    };
});
//# sourceMappingURL=GenderDropDownList.js.map