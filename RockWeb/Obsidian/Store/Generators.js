System.register(["vue", "../Elements/DropDownList", "../Util/Cache", "../Util/Http", "../Services/String"], function (exports_1, context_1) {
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
    var vue_1, DropDownList_1, Cache_1, Http_1, String_1;
    var __moduleName = context_1 && context_1.id;
    function createCommonEntityPicker(entityName, getOptionsFunc) {
        const entityNameForDisplay = String_1.splitCamelCase(entityName);
        return vue_1.defineComponent({
            name: `${entityName}Picker`,
            components: {
                DropDownList: DropDownList_1.default
            },
            props: {
                modelValue: {
                    type: String,
                    required: true
                },
                label: {
                    type: String,
                    default: entityNameForDisplay
                }
            },
            data() {
                return {
                    providedOptions: getOptionsFunc(),
                    selectedGuid: '',
                    isLoading: false
                };
            },
            computed: {
                options() {
                    return getOptionsFunc().map(o => ({
                        key: o.guid,
                        text: o.text,
                        value: o.guid
                    }));
                }
            },
            watch: {
                modelValue: {
                    immediate: true,
                    handler() {
                        this.selectedGuid = this.modelValue;
                    }
                },
                selectedGuid: {
                    immediate: true,
                    handler() {
                        this.$emit('update:modelValue', this.selectedGuid);
                    }
                }
            },
            template: `
<DropDownList v-model="selectedGuid" :disabled="isLoading" :label="label" :options="options" />`
        });
    }
    exports_1("createCommonEntityPicker", createCommonEntityPicker);
    function generateCommonEntityModule(commonEntity) {
        return {
            namespaced: true,
            state: {
                items: []
            },
            mutations: {
                setItems(state, { items }) {
                    state.items = items;
                }
            },
            getters: {
                all(state) {
                    return state.items;
                },
                getByGuid(state) {
                    return (guid) => {
                        return state.items.find(i => i.guid === guid) || null;
                    };
                },
                getById(state) {
                    return (id) => {
                        return state.items.find(i => i.id === id) || null;
                    };
                }
            },
            actions: {
                initialize(context) {
                    return __awaiter(this, void 0, void 0, function* () {
                        const cacheKey = `common-entity-${commonEntity.namespace}`;
                        let items = Cache_1.default.get(cacheKey) || [];
                        if (!items || !items.length) {
                            const response = yield Http_1.default.get(commonEntity.apiUrl);
                            items = response.data || [];
                            Cache_1.default.set(cacheKey, items);
                        }
                        context.commit('setItems', { items });
                    });
                }
            }
        };
    }
    exports_1("generateCommonEntityModule", generateCommonEntityModule);
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (DropDownList_1_1) {
                DropDownList_1 = DropDownList_1_1;
            },
            function (Cache_1_1) {
                Cache_1 = Cache_1_1;
            },
            function (Http_1_1) {
                Http_1 = Http_1_1;
            },
            function (String_1_1) {
                String_1 = String_1_1;
            }
        ],
        execute: function () {
        }
    };
});
//# sourceMappingURL=Generators.js.map