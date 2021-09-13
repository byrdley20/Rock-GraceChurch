System.register(["vue", "./index", "../Elements/dropDownList"], function (exports_1, context_1) {
    "use strict";
    var vue_1, index_1, dropDownList_1, EditComponent;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (index_1_1) {
                index_1 = index_1_1;
            },
            function (dropDownList_1_1) {
                dropDownList_1 = dropDownList_1_1;
            }
        ],
        execute: function () {
            exports_1("EditComponent", EditComponent = vue_1.defineComponent({
                name: "GenderField.Edit",
                components: {
                    DropDownList: dropDownList_1.default
                },
                props: index_1.getFieldEditorProps(),
                data() {
                    return {
                        internalValue: ""
                    };
                },
                computed: {
                    dropDownListOptions() {
                        return [
                            { text: "Unknown", value: "0" },
                            { text: "Male", value: "1" },
                            { text: "Female", value: "2" }
                        ];
                    }
                },
                watch: {
                    internalValue() {
                        this.$emit("update:modelValue", this.internalValue);
                    },
                    modelValue: {
                        immediate: true,
                        handler() {
                            this.internalValue = this.modelValue || "";
                        }
                    }
                },
                template: `
<DropDownList v-model="internalValue" :options="dropDownListOptions" formControlClasses="input-width-md" />
`
            }));
        }
    };
});
//# sourceMappingURL=genderFieldComponents.js.map