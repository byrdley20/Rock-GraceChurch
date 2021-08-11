System.register(["../../Templates/PaneledBlockTemplate", "vue", "../../Elements/PanelWidget", "../../Controls/AttributeValuesContainer", "../../Elements/TextBox"], function (exports_1, context_1) {
    "use strict";
    var PaneledBlockTemplate_1, vue_1, PanelWidget_1, AttributeValuesContainer_1, TextBox_1, GetAttributeValueData, GalleryAndResult, GetFieldTypeGalleryComponent;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (PaneledBlockTemplate_1_1) {
                PaneledBlockTemplate_1 = PaneledBlockTemplate_1_1;
            },
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (PanelWidget_1_1) {
                PanelWidget_1 = PanelWidget_1_1;
            },
            function (AttributeValuesContainer_1_1) {
                AttributeValuesContainer_1 = AttributeValuesContainer_1_1;
            },
            function (TextBox_1_1) {
                TextBox_1 = TextBox_1_1;
            }
        ],
        execute: function () {
            GetAttributeValueData = (name, initialValue, fieldTypeGuid, configValues) => {
                const configurationValues = configValues;
                return [vue_1.reactive({
                        fieldTypeGuid: fieldTypeGuid,
                        name: `${name} 1`,
                        key: name,
                        description: `This is the description of the ${name} without an initial value`,
                        configurationValues,
                        isRequired: false,
                        textValue: '',
                        value: '',
                        attributeGuid: '',
                        order: 0,
                        categories: []
                    }),
                    vue_1.reactive({
                        fieldTypeGuid: fieldTypeGuid,
                        name: `${name} 2`,
                        key: name,
                        description: `This is the description of the ${name} with an initial value`,
                        configurationValues,
                        isRequired: false,
                        textValue: initialValue,
                        value: initialValue,
                        attributeGuid: '',
                        order: 0,
                        categories: []
                    })
                ];
            };
            GalleryAndResult = vue_1.defineComponent({
                name: 'GalleryAndResult',
                components: {
                    PanelWidget: PanelWidget_1.default,
                    AttributeValuesContainer: AttributeValuesContainer_1.default
                },
                props: {
                    title: {
                        type: String,
                        required: true
                    },
                    attributeValues: {
                        type: Array,
                        required: true
                    }
                },
                computed: {
                    value1Json() {
                        var _a;
                        return (_a = this.attributeValues[0].value) !== null && _a !== void 0 ? _a : '';
                    },
                    value2Json() {
                        var _a;
                        return (_a = this.attributeValues[1].value) !== null && _a !== void 0 ? _a : '';
                    }
                },
                template: `
<PanelWidget>
    <template #header>{{title}}</template>
    <div class="row">
        <div class="col-md-6">
            <h4>Qualifier Values</h4>
            <slot />
            <hr />
            <h4>Attribute Values Container (edit)</h4>
            <AttributeValuesContainer :attributeValues="attributeValues" :isEditMode="true" />
        </div>
        <div class="col-md-6">
            <h4>Attribute Values Container (view)</h4>
            <AttributeValuesContainer :attributeValues="attributeValues" :isEditMode="false" />
            <hr />
            <h4>Values</h4>
            <p>
                <strong>Value 1</strong>
                <pre>{{value1Json}}</pre>
            </p>
            <p>
                <strong>Value 2</strong>
                <pre>{{value2Json}}</pre>
            </p>
        </div>
    </div>
</PanelWidget>`
            });
            GetFieldTypeGalleryComponent = (name, initialValue, fieldTypeGuid, initialConfigValues) => {
                return vue_1.defineComponent({
                    name: `${name}Gallery`,
                    components: {
                        GalleryAndResult,
                        TextBox: TextBox_1.default
                    },
                    data() {
                        return {
                            name,
                            configValues: Object.assign({}, initialConfigValues),
                            attributeValues: GetAttributeValueData(name, initialValue, fieldTypeGuid, initialConfigValues)
                        };
                    },
                    computed: {
                        configKeys() {
                            const keys = [];
                            for (const attributeValue of this.attributeValues) {
                                for (const key in attributeValue.configurationValues) {
                                    if (keys.indexOf(key) === -1) {
                                        keys.push(key);
                                    }
                                }
                            }
                            return keys;
                        }
                    },
                    watch: {
                        configValues: {
                            deep: true,
                            handler() {
                                for (const attributeValue of this.attributeValues) {
                                    for (const key in attributeValue.configurationValues) {
                                        const value = this.configValues[key] || '';
                                        attributeValue.configurationValues[key] = value;
                                    }
                                }
                            }
                        }
                    },
                    template: `
<GalleryAndResult :title="name" :attributeValues="attributeValues">
    <TextBox v-for="configKey in configKeys" :key="configKey" :label="configKey" v-model="configValues[configKey]" />
</GalleryAndResult>`
                });
            };
            exports_1("default", vue_1.defineComponent({
                name: 'Example.FieldTypeGallery',
                components: {
                    PaneledBlockTemplate: PaneledBlockTemplate_1.default,
                    BooleanGallery: GetFieldTypeGalleryComponent('Boolean', 't', '1EDAFDED-DFE6-4334-B019-6EECBA89E05A', {
                        truetext: 'This is true',
                        falsetext: 'This is false',
                        BooleanControlType: '2'
                    }),
                    ColorGallery: GetFieldTypeGalleryComponent('Color', '#ee7725', 'D747E6AE-C383-4E22-8846-71518E3DD06F', {
                        selectiontype: 'Color Picker'
                    }),
                    CurrencyGallery: GetFieldTypeGalleryComponent('Currency', '4.70', '3EE69CBC-35CE-4496-88CC-8327A447603F', {}),
                    DateGallery: GetFieldTypeGalleryComponent('Date', '2009-02-11', '6B6AA175-4758-453F-8D83-FCD8044B5F36', {
                        format: 'MMM yyyy',
                        displayDiff: 'true',
                        displayCurrentOption: 'true',
                        datePickerControlType: 'Date Parts Picker',
                        futureYearCount: '2'
                    }),
                    DateTimeGallery: GetFieldTypeGalleryComponent('DateTime', '2009-02-11T14:23:00', 'FE95430C-322D-4B67-9C77-DFD1D4408725', {
                        format: 'MMM dd, yyyy h:mm tt',
                        displayDiff: 'false',
                        displayCurrentOption: 'true',
                    }),
                    DayOfWeekGallery: GetFieldTypeGalleryComponent('DayOfWeek', '2', '7EDFA2DE-FDD3-4AC1-B356-1F5BFC231DAE', {}),
                    DaysOfWeekGallery: GetFieldTypeGalleryComponent('DaysOfWeek', '2,5', '08943FF9-F2A8-4DB4-A72A-31938B200C8C', {}),
                    DecimalGallery: GetFieldTypeGalleryComponent('Decimal', '18.283', 'C757A554-3009-4214-B05D-CEA2B2EA6B8F', {}),
                    DecimalRangeGallery: GetFieldTypeGalleryComponent('DecimalRange', '18.283,100', '758D9648-573E-4800-B5AF-7CC29F4BE170', {}),
                    DefinedValueGallery: GetFieldTypeGalleryComponent('DefinedValue (WIP)', 'af28af43-8461-41ac-a2c5-85122712be96', '59D5A94C-94A0-4630-B80A-BB25697D74C7', {
                        definedtype: '92',
                        allowmultiple: '',
                        displaydescription: 'true',
                        enhancedselection: '',
                        includeInactive: '',
                        AllowAddingNewValues: '',
                        RepeatColumns: ''
                    }),
                    EmailGallery: GetFieldTypeGalleryComponent('Email', 'ted@rocksolidchurchdemo.com', '3D045CAE-EA72-4A04-B7BE-7FD1D6214217', {}),
                    GenderGallery: GetFieldTypeGalleryComponent('Gender', '2', '2E28779B-4C76-4142-AE8D-49EA31DDB503', {}),
                    IntegerGallery: GetFieldTypeGalleryComponent('Integer', '20', 'A75DFC58-7A1B-4799-BF31-451B2BBE38FF', {}),
                    IntegerRangeGallery: GetFieldTypeGalleryComponent('IntegerRange', '0,100', '9D5F21E0-DEA0-4E8E-BA42-71151F6A8ED4', {}),
                    MemoGallery: GetFieldTypeGalleryComponent('Memo', 'This is a memo', 'C28C7BF3-A552-4D77-9408-DEDCF760CED0', {
                        numberofrows: '10',
                        maxcharacters: '100',
                        showcountdown: 'true',
                        allowhtml: 'true'
                    }),
                    MonthDayGallery: GetFieldTypeGalleryComponent('MonthDay', '7/4', '8BED8DD8-8167-4052-B807-A1E72C133611', {}),
                    PhoneNumberGallery: GetFieldTypeGalleryComponent('PhoneNumber', '(321) 456-7890', '6B1908EC-12A2-463A-A7BD-970CE0FAF097', {}),
                    RatingGallery: GetFieldTypeGalleryComponent('Rating', '{"value":3,"maxValue":5}', '24BC2DD2-5745-4A97-A0F9-C1EC0E6E1862', {
                        max: '5'
                    }),
                    SingleSelectGallery: GetFieldTypeGalleryComponent('SingleSelect', 'pizza', '7525C4CB-EE6B-41D4-9B64-A08048D5A5C0', {
                        repeatColumns: '4',
                        fieldtype: 'rb',
                        values: '[{"value": "pizza", "text": "Pizza"}, {"value": "sub", "text": "Sub"}]'
                    }),
                    TextGallery: GetFieldTypeGalleryComponent('Text', 'Hello', '9C204CD0-1233-41C5-818A-C5DA439445AA', {
                        ispassword: 'false',
                        maxcharacters: '10',
                        showcountdown: 'true'
                    }),
                    TimeGallery: GetFieldTypeGalleryComponent('Time', '13:15:00', '2F8F5EC4-57FA-4F6C-AB15-9D6616994580', {}),
                },
                template: `
<PaneledBlockTemplate>
    <template v-slot:title>
        <i class="fa fa-flask"></i>
        Obsidian Field Type Gallery
    </template>
    <template v-slot:default>
        <BooleanGallery />
        <ColorGallery />
        <CurrencyGallery />
        <DateGallery />
        <DateTimeGallery />
        <DayOfWeekGallery />
        <DaysOfWeekGallery />
        <DecimalGallery />
        <DecimalRangeGallery />
        <DefinedValueGallery />
        <EmailGallery />
        <GenderGallery />
        <IntegerGallery />
        <IntegerRangeGallery />
        <MemoGallery />
        <MonthDayGallery />
        <PhoneNumberGallery />
        <RatingGallery />
        <SingleSelectGallery />
        <TextGallery />
        <TimeGallery />
    </template>
</PaneledBlockTemplate>`
            }));
        }
    };
});
//# sourceMappingURL=FieldTypeGallery.js.map