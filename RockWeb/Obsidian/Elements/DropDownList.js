System.register(["vue", "../Util/Guid.js", "./RockFormField.js"], function (exports_1, context_1) {
    "use strict";
    var vue_1, Guid_js_1, RockFormField_js_1;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (Guid_js_1_1) {
                Guid_js_1 = Guid_js_1_1;
            },
            function (RockFormField_js_1_1) {
                RockFormField_js_1 = RockFormField_js_1_1;
            }
        ],
        execute: function () {
            exports_1("default", vue_1.defineComponent({
                name: 'DropDownList',
                components: {
                    RockFormField: RockFormField_js_1.default
                },
                props: {
                    modelValue: {
                        type: String,
                        required: true
                    },
                    options: {
                        type: Array,
                        required: true
                    },
                    showBlankItem: {
                        type: Boolean,
                        default: true
                    },
                    blankValue: {
                        type: String,
                        default: ''
                    },
                    formControlClasses: {
                        type: String,
                        default: ''
                    },
                    enhanceForLongLists: {
                        type: Boolean,
                        default: false
                    }
                },
                data: function () {
                    return {
                        uniqueId: `rock-dropdownlist-${Guid_js_1.newGuid()}`,
                        internalValue: this.blankValue,
                        isMounted: false
                    };
                },
                computed: {
                    compiledFormControlClasses() {
                        if (this.enhanceForLongLists) {
                            return this.formControlClasses + ' chosen-select';
                        }
                        return this.formControlClasses;
                    }
                },
                methods: {
                    getChosenJqueryEl() {
                        const jquery = window['$'];
                        let $chosenDropDown = jquery(this.$refs['theSelect']);
                        if (!$chosenDropDown || !$chosenDropDown.length) {
                            $chosenDropDown = jquery(`#${this.uniqueId}`);
                        }
                        return $chosenDropDown;
                    },
                    createOrDestroyChosen() {
                        if (!this.isMounted) {
                            return;
                        }
                        const $chosenDropDown = this.getChosenJqueryEl();
                        if (this.enhanceForLongLists) {
                            $chosenDropDown
                                .chosen({
                                width: '100%',
                                allow_single_deselect: true,
                                placeholder_text_multiple: ' ',
                                placeholder_text_single: ' '
                            })
                                .change((ev) => {
                                console.log(ev.target);
                                this.internalValue = ev.target.value;
                            });
                        }
                        else {
                            $chosenDropDown.chosen('destroy');
                        }
                    },
                    syncValue() {
                        var _a;
                        this.internalValue = this.modelValue;
                        const selectedOption = this.options.find(o => o.value === this.internalValue) || null;
                        if (!selectedOption) {
                            this.internalValue = this.showBlankItem ?
                                this.blankValue :
                                (((_a = this.options[0]) === null || _a === void 0 ? void 0 : _a.value) || this.blankValue);
                        }
                        if (this.enhanceForLongLists) {
                            this.$nextTick(() => {
                                const $chosenDropDown = this.getChosenJqueryEl();
                                $chosenDropDown.trigger('chosen:updated');
                            });
                        }
                    }
                },
                watch: {
                    modelValue: {
                        immediate: true,
                        handler() {
                            this.syncValue();
                        }
                    },
                    options: {
                        immediate: true,
                        handler() {
                            this.syncValue();
                        }
                    },
                    internalValue() {
                        this.$emit('update:modelValue', this.internalValue);
                    },
                    enhanceForLongLists() {
                        this.createOrDestroyChosen();
                    }
                },
                mounted() {
                    this.isMounted = true;
                    this.createOrDestroyChosen();
                },
                template: `
<RockFormField
    :modelValue="internalValue"
    formGroupClasses="rock-drop-down-list"
    name="dropdownlist">
    <template #default="{uniqueId, field, errors, disabled}">
        <div class="control-wrapper">
            <select :id="uniqueId" class="form-control" :class="compiledFormControlClasses" :disabled="disabled" v-bind="field" v-model="internalValue" ref="theSelect">
                <option v-if="showBlankItem" :value="blankValue"></option>
                <option v-for="o in options" :key="o.value" :value="o.value">{{o.text}}</option>
            </select>
        </div>
    </template>
</RockFormField>`
            }));
        }
    };
});
//# sourceMappingURL=DropDownList.js.map