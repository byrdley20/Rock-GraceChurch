System.register(["vue", "./Index", "../Elements/RockFormField", "@Obsidian/Services/Boolean"], function (exports_1, context_1) {
    "use strict";
    var vue_1, Index_1, RockFormField_1, Boolean_1, EditComponent;
    var __moduleName = context_1 && context_1.id;
    function parseModelValue(modelValue) {
        var _a;
        try {
            const clientValue = JSON.parse(modelValue !== null && modelValue !== void 0 ? modelValue : '');
            const splitValue = ((_a = clientValue.value) !== null && _a !== void 0 ? _a : '').split(',');
            if (splitValue.length === 1) {
                return [splitValue[0], ''];
            }
            return splitValue;
        }
        catch (_b) {
            return ['', ''];
        }
    }
    function firstOrDefault(values, predicate) {
        const filtered = values.filter(predicate);
        return filtered.length >= 1 ? filtered[0] : undefined;
    }
    function getClientValue(lowerValue, upperValue, valueOptions, showDescription) {
        const lv = firstOrDefault(valueOptions, v => v.value === lowerValue);
        const uv = firstOrDefault(valueOptions, v => v.value === upperValue);
        if (!lv || !uv) {
            return {
                value: (lowerValue === '' && upperValue === '') ? '' : `${lowerValue},${upperValue}`,
                text: '',
                description: ''
            };
        }
        return {
            value: `${lv.value},${uv.value}`,
            text: `${lv.text} to ${uv.text}`,
            description: showDescription ? `${lv.description} to ${uv.description}` : ''
        };
    }
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (Index_1_1) {
                Index_1 = Index_1_1;
            },
            function (RockFormField_1_1) {
                RockFormField_1 = RockFormField_1_1;
            },
            function (Boolean_1_1) {
                Boolean_1 = Boolean_1_1;
            }
        ],
        execute: function () {
            exports_1("EditComponent", EditComponent = vue_1.defineComponent({
                name: 'DefinedValueRangeField',
                components: {
                    RockFormField: RockFormField_1.default
                },
                props: Index_1.getFieldEditorProps(),
                setup(props, { emit }) {
                    const internalValues = parseModelValue(props.modelValue);
                    const internalValue = vue_1.ref(props.modelValue);
                    const lowerValue = vue_1.ref(internalValues[0]);
                    const upperValue = vue_1.ref(internalValues[1]);
                    const valueOptions = vue_1.computed(() => {
                        var _a;
                        try {
                            return JSON.parse((_a = props.configurationValues["values"]) !== null && _a !== void 0 ? _a : '[]');
                        }
                        catch (_b) {
                            return [];
                        }
                    });
                    const showDescription = vue_1.computed(() => {
                        return Boolean_1.asBoolean(props.configurationValues["displaydescription"]);
                    });
                    const options = vue_1.computed(() => {
                        const providedOptions = valueOptions.value.map(v => {
                            return {
                                text: showDescription.value ? v.description : v.text,
                                value: v.value
                            };
                        });
                        return providedOptions;
                    });
                    vue_1.watch(() => props.modelValue, () => {
                        const internalValues = parseModelValue(props.modelValue);
                        lowerValue.value = internalValues[0];
                        upperValue.value = internalValues[1];
                    });
                    vue_1.watch(() => [lowerValue.value, upperValue.value], () => {
                        const clientValue = getClientValue(lowerValue.value, upperValue.value, valueOptions.value, showDescription.value);
                        emit('update:modelValue', JSON.stringify(clientValue));
                    });
                    return {
                        internalValue,
                        lowerValue,
                        upperValue,
                        isRequired: vue_1.inject('isRequired'),
                        options,
                        getKeyForOption(option) {
                            return option.value;
                        },
                        getTextForOption(option) {
                            return option.text;
                        }
                    };
                },
                template: `
<RockFormField
    v-model="internalValue"
    formGroupClasses="rock-defined-value-range"
    name="definedvaluerange"
    #default="{uniqueId}"
    :rules="computedRules">
    <div :id="uniqueId" class="form-control-group">
        <select class="input-width-md form-control" v-model="lowerValue">
            <option v-if="isRequired" value=""></option>
            <option v-for="o in options" :key="o.value" :value="o.value">{{o.text}}</option>
        </select>
        <span class="to"> to </span>
        <select class="input-width-md form-control" v-model="upperValue">
            <option v-if="isRequired" value=""></option>
            <option v-for="o in options" :key="o.value" :value="o.value">{{o.text}}</option>
        </select>
    </div>
</RockFormField>
`
            }));
        }
    };
});
//# sourceMappingURL=DefinedValueRangeFieldComponents.js.map