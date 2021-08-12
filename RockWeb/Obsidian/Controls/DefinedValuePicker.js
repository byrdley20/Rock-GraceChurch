System.register(["vue", "../Elements/DropDownList"], function (exports_1, context_1) {
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
    var vue_1, DropDownList_1;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (DropDownList_1_1) {
                DropDownList_1 = DropDownList_1_1;
            }
        ],
        execute: function () {
            exports_1("default", vue_1.defineComponent({
                name: 'DefinedValuePicker',
                components: {
                    DropDownList: DropDownList_1.default
                },
                props: {
                    modelValue: {
                        type: String,
                        required: true
                    },
                    definedTypeGuid: {
                        type: String,
                        default: ''
                    },
                    displayDescriptions: {
                        type: Boolean,
                        default: false
                    }
                },
                setup() {
                    return {
                        http: vue_1.inject('http')
                    };
                },
                emits: [
                    'update:modelValue',
                    'update:model',
                    'receivedDefinedValues'
                ],
                data() {
                    return {
                        internalValue: this.modelValue,
                        definedValues: [],
                        isLoading: false
                    };
                },
                computed: {
                    isEnabled() {
                        return !!this.definedTypeGuid && !this.isLoading;
                    },
                    options() {
                        return this.definedValues.map(dv => ({
                            value: dv.guid,
                            text: this.displayDescriptions ? dv.description : dv.value
                        }));
                    }
                },
                watch: {
                    modelValue: function () {
                        this.internalValue = this.modelValue;
                    },
                    definedTypeGuid: {
                        immediate: true,
                        handler: function () {
                            return __awaiter(this, void 0, void 0, function* () {
                                if (!this.definedTypeGuid) {
                                    this.definedValues = [];
                                }
                                else {
                                    this.isLoading = true;
                                    const result = yield this.http.get(`/api/v2/controls/definedvaluepickers/${this.definedTypeGuid}`);
                                    if (result && result.data) {
                                        this.definedValues = result.data;
                                        this.$emit('receivedDefinedValues', this.definedValues);
                                    }
                                    this.isLoading = false;
                                }
                            });
                        }
                    },
                    internalValue() {
                        this.$emit('update:modelValue', this.internalValue);
                        const definedValue = this.definedValues.find(dv => dv.guid === this.internalValue) || null;
                        this.$emit('update:model', definedValue);
                    }
                },
                template: `
<DropDownList v-model="internalValue" :disabled="!isEnabled" :options="options" />`
            }));
        }
    };
});
//# sourceMappingURL=DefinedValuePicker.js.map