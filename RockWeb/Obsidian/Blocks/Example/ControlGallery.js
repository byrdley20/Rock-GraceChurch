System.register(["../../Templates/PaneledBlockTemplate", "../../Controls/DefinedTypePicker", "../../Controls/DefinedValuePicker", "../../Controls/CampusPicker", "vue", "../../Store/Index", "../../Elements/TextBox", "../../Elements/EmailBox", "../../Elements/CurrencyBox", "../../Elements/PanelWidget", "../../Elements/DatePicker", "../../Elements/DateTimePicker", "../../Elements/BirthdayPicker", "../../Elements/NumberUpDown", "../../Controls/AddressControl", "../../Elements/Toggle", "../../Elements/ItemsWithPreAndPostHtml", "../../Elements/StaticFormControl", "../../Elements/ProgressTracker", "../../Controls/RockForm", "../../Elements/RockButton", "../../Elements/RadioButtonList", "../../Elements/DropDownList", "../../Controls/Dialog", "../../Elements/CheckBox", "../../Elements/PhoneNumberBox", "../../Elements/HelpBlock", "../../Elements/DatePartsPicker", "../../Elements/ColorPicker", "../../Elements/NumberBox", "../../Elements/NumberRangeBox", "../../Elements/GenderDropDownList", "../../Elements/SocialSecurityNumberBox", "../../Elements/TimePicker", "../../Elements/CheckBoxList", "../../Elements/Rating", "../../Services/Number"], function (exports_1, context_1) {
    "use strict";
    var PaneledBlockTemplate_1, DefinedTypePicker_1, DefinedValuePicker_1, CampusPicker_1, vue_1, Index_1, TextBox_1, EmailBox_1, CurrencyBox_1, PanelWidget_1, DatePicker_1, DateTimePicker_1, BirthdayPicker_1, NumberUpDown_1, AddressControl_1, Toggle_1, ItemsWithPreAndPostHtml_1, StaticFormControl_1, ProgressTracker_1, RockForm_1, RockButton_1, RadioButtonList_1, DropDownList_1, Dialog_1, CheckBox_1, PhoneNumberBox_1, HelpBlock_1, DatePartsPicker_1, ColorPicker_1, NumberBox_1, NumberRangeBox_1, GenderDropDownList_1, SocialSecurityNumberBox_1, TimePicker_1, CheckBoxList_1, Rating_1, Number_1, GalleryAndResult, PhoneNumberBoxGallery, HelpBlockGallery, DropDownListGallery, RadioButtonListGallery, CheckBoxGallery, DialogGallery, FormRulesGallery, CheckBoxListGallery, DatePickerGallery, DateTimePickerGallery, DatePartsPickerGallery, TextBoxGallery, DefinedTypeAndValueGallery, ColorPickerGallery, NumberBoxGallery, NumberRangeBoxGallery, GenderDropDownListGallery, SocialSecurityNumberBoxGallery, TimePickerGallery, RatingGallery;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (PaneledBlockTemplate_1_1) {
                PaneledBlockTemplate_1 = PaneledBlockTemplate_1_1;
            },
            function (DefinedTypePicker_1_1) {
                DefinedTypePicker_1 = DefinedTypePicker_1_1;
            },
            function (DefinedValuePicker_1_1) {
                DefinedValuePicker_1 = DefinedValuePicker_1_1;
            },
            function (CampusPicker_1_1) {
                CampusPicker_1 = CampusPicker_1_1;
            },
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (Index_1_1) {
                Index_1 = Index_1_1;
            },
            function (TextBox_1_1) {
                TextBox_1 = TextBox_1_1;
            },
            function (EmailBox_1_1) {
                EmailBox_1 = EmailBox_1_1;
            },
            function (CurrencyBox_1_1) {
                CurrencyBox_1 = CurrencyBox_1_1;
            },
            function (PanelWidget_1_1) {
                PanelWidget_1 = PanelWidget_1_1;
            },
            function (DatePicker_1_1) {
                DatePicker_1 = DatePicker_1_1;
            },
            function (DateTimePicker_1_1) {
                DateTimePicker_1 = DateTimePicker_1_1;
            },
            function (BirthdayPicker_1_1) {
                BirthdayPicker_1 = BirthdayPicker_1_1;
            },
            function (NumberUpDown_1_1) {
                NumberUpDown_1 = NumberUpDown_1_1;
            },
            function (AddressControl_1_1) {
                AddressControl_1 = AddressControl_1_1;
            },
            function (Toggle_1_1) {
                Toggle_1 = Toggle_1_1;
            },
            function (ItemsWithPreAndPostHtml_1_1) {
                ItemsWithPreAndPostHtml_1 = ItemsWithPreAndPostHtml_1_1;
            },
            function (StaticFormControl_1_1) {
                StaticFormControl_1 = StaticFormControl_1_1;
            },
            function (ProgressTracker_1_1) {
                ProgressTracker_1 = ProgressTracker_1_1;
            },
            function (RockForm_1_1) {
                RockForm_1 = RockForm_1_1;
            },
            function (RockButton_1_1) {
                RockButton_1 = RockButton_1_1;
            },
            function (RadioButtonList_1_1) {
                RadioButtonList_1 = RadioButtonList_1_1;
            },
            function (DropDownList_1_1) {
                DropDownList_1 = DropDownList_1_1;
            },
            function (Dialog_1_1) {
                Dialog_1 = Dialog_1_1;
            },
            function (CheckBox_1_1) {
                CheckBox_1 = CheckBox_1_1;
            },
            function (PhoneNumberBox_1_1) {
                PhoneNumberBox_1 = PhoneNumberBox_1_1;
            },
            function (HelpBlock_1_1) {
                HelpBlock_1 = HelpBlock_1_1;
            },
            function (DatePartsPicker_1_1) {
                DatePartsPicker_1 = DatePartsPicker_1_1;
            },
            function (ColorPicker_1_1) {
                ColorPicker_1 = ColorPicker_1_1;
            },
            function (NumberBox_1_1) {
                NumberBox_1 = NumberBox_1_1;
            },
            function (NumberRangeBox_1_1) {
                NumberRangeBox_1 = NumberRangeBox_1_1;
            },
            function (GenderDropDownList_1_1) {
                GenderDropDownList_1 = GenderDropDownList_1_1;
            },
            function (SocialSecurityNumberBox_1_1) {
                SocialSecurityNumberBox_1 = SocialSecurityNumberBox_1_1;
            },
            function (TimePicker_1_1) {
                TimePicker_1 = TimePicker_1_1;
            },
            function (CheckBoxList_1_1) {
                CheckBoxList_1 = CheckBoxList_1_1;
            },
            function (Rating_1_1) {
                Rating_1 = Rating_1_1;
            },
            function (Number_1_1) {
                Number_1 = Number_1_1;
            }
        ],
        execute: function () {
            GalleryAndResult = vue_1.defineComponent({
                name: 'GalleryAndResult',
                components: {
                    PanelWidget: PanelWidget_1.default
                },
                props: {
                    splitWidth: {
                        type: Boolean,
                        default: true
                    }
                },
                template: `
<PanelWidget>
    <template #header><slot name="header" /></template>
    <div v-if="splitWidth" class="row">
        <div class="col-md-6">
            <slot name="gallery" />
        </div>
        <div class="col-md-6">
            <slot name="result" />
        </div>
    </div>
    <template v-else>
        <div>
            <slot name="gallery" />
        </div>
        <div>
            <slot name="result" />
        </div>
    </template>
</PanelWidget>`
            });
            PhoneNumberBoxGallery = vue_1.defineComponent({
                name: 'PhoneNumberBoxGallery',
                components: {
                    GalleryAndResult,
                    PhoneNumberBox: PhoneNumberBox_1.default
                },
                data() {
                    return {
                        phoneNumber: ''
                    };
                },
                template: `
<GalleryAndResult>
    <template #header>
        PhoneNumberBox
    </template>
    <template #gallery>
        <PhoneNumberBox label="Phone 1" v-model="phoneNumber" />
        <PhoneNumberBox label="Phone 2" v-model="phoneNumber" />
    </template>
    <template #result>
        {{phoneNumber}}
    </template>
</GalleryAndResult>`
            });
            HelpBlockGallery = vue_1.defineComponent({
                name: 'HelpBlockGallery',
                components: {
                    GalleryAndResult,
                    HelpBlock: HelpBlock_1.default
                },
                template: `
<GalleryAndResult>
    <template #header>
        HelpBlock
    </template>
    <template #gallery>
        <HelpBlock text="This is some helpful text that explains something." />
    </template>
</GalleryAndResult>`
            });
            DropDownListGallery = vue_1.defineComponent({
                name: 'DropDownListGallery',
                components: {
                    GalleryAndResult,
                    DropDownList: DropDownList_1.default
                },
                data() {
                    return {
                        value: 'a',
                        options: [
                            { key: 'a', text: 'A Text', value: 'a' },
                            { key: 'b', text: 'B Text', value: 'b' },
                            { key: 'c', text: 'C Text', value: 'c' },
                            { key: 'd', text: 'D Text', value: 'd' }
                        ]
                    };
                },
                template: `
<GalleryAndResult>
    <template #header>
        DropDownList
    </template>
    <template #gallery>
        <DropDownList label="Select 1" v-model="value" :options="options" />
        <DropDownList label="Select 2" v-model="value" :options="options" />
        <DropDownList label="Enhanced Select 1" v-model="value" :options="options" enhanceForLongLists />
        <DropDownList label="Enhanced Select 2" v-model="value" :options="options" enhanceForLongLists />
    </template>
    <template #result>
        {{value}}
    </template>
</GalleryAndResult>`
            });
            RadioButtonListGallery = vue_1.defineComponent({
                name: 'RadioButtonListGallery',
                components: {
                    GalleryAndResult,
                    RadioButtonList: RadioButtonList_1.default,
                    Toggle: Toggle_1.default,
                    NumberUpDown: NumberUpDown_1.default
                },
                data() {
                    return {
                        value: 'a',
                        isHorizontal: true,
                        repeatColumns: 0,
                        options: [
                            { key: 'a', text: 'A Text', value: 'a' },
                            { key: 'b', text: 'B Text', value: 'b' },
                            { key: 'c', text: 'C Text', value: 'c' },
                            { key: 'd', text: 'D Text', value: 'd' },
                            { key: 'e', text: 'E Text', value: 'e' },
                            { key: 'f', text: 'F Text', value: 'f' },
                            { key: 'g', text: 'G Text', value: 'g' }
                        ]
                    };
                },
                template: `
<GalleryAndResult :splitWidth="false">
    <template #header>
        RadioButtonList
    </template>
    <template #gallery>
        <NumberUpDown label="Horizontal Columns" v-model="repeatColumns" :min="0" />
        <Toggle label="Horizontal" v-model="isHorizontal" />
        <RadioButtonList label="Radio List 1" v-model="value" :options="options" :horizontal="isHorizontal" :repeatColumns="repeatColumns" />
        <RadioButtonList label="Radio List 2" v-model="value" :options="options" />
    </template>
    <template #result>
        Value: {{value}}
    </template>
</GalleryAndResult>`
            });
            CheckBoxGallery = vue_1.defineComponent({
                name: 'CheckBoxGallery',
                components: {
                    GalleryAndResult,
                    CheckBox: CheckBox_1.default,
                    Toggle: Toggle_1.default
                },
                data() {
                    return {
                        isChecked: false,
                        inline: true
                    };
                },
                template: `
<GalleryAndResult>
    <template #header>
        CheckBox
    </template>
    <template #gallery>
        <Toggle label="Inline" v-model="inline" />
        <CheckBox label="Check 1" v-model="isChecked" :inline="inline" />
        <CheckBox label="Check 2" v-model="isChecked" :inline="inline" />
    </template>
    <template #result>
        {{isChecked}}
    </template>
</GalleryAndResult>`
            });
            DialogGallery = vue_1.defineComponent({
                name: 'DialogGallery',
                components: {
                    GalleryAndResult,
                    RockButton: RockButton_1.default,
                    Dialog: Dialog_1.default,
                    CheckBox: CheckBox_1.default
                },
                data() {
                    return {
                        isDialogVisible: false,
                        isDismissible: false
                    };
                },
                template: `
<GalleryAndResult>
    <template #header>
        Dialog
    </template>
    <template #gallery>
        <RockButton @click="isDialogVisible = true">Show</RockButton>
        <CheckBox label="Dismissible" v-model="isDismissible" />
    </template>
    <template #result>
        <Dialog v-model="isDialogVisible" :dismissible="isDismissible">
            <template #header>
                <h4>Romans 11:33-36</h4>
            </template>
            <template #default>
                <p>
                    Oh, the depth of the riches<br />
                    and the wisdom and the knowledge of God!<br />
                    How unsearchable his judgments<br />
                    and untraceable his ways!<br />
                    For who has known the mind of the Lord?<br />
                    Or who has been his counselor?<br />
                    And who has ever given to God,<br />
                    that he should be repaid?<br />
                    For from him and through him<br />
                    and to him are all things.<br />
                    To him be the glory forever. Amen.
                </p>
            </template>
            <template #footer>
                <RockButton @click="isDialogVisible = false" btnType="primary">OK</RockButton>
                <RockButton @click="isDialogVisible = false" btnType="default">Cancel</RockButton>
            </template>
        </Dialog>
    </template>
</GalleryAndResult>`
            });
            FormRulesGallery = vue_1.defineComponent({
                name: 'FormRulesGallery',
                components: {
                    GalleryAndResult,
                    RockForm: RockForm_1.default,
                    TextBox: TextBox_1.default,
                    CurrencyBox: CurrencyBox_1.default,
                    RockButton: RockButton_1.default
                },
                data() {
                    return {
                        ruleTestCurrency: 1,
                        ruleTestText: '',
                        rules: 'required'
                    };
                },
                template: `
<GalleryAndResult :splitWidth="false">
    <template #header>
        Rules
    </template>
    <template #gallery>
        <TextBox label="Rules" v-model="rules" help="Try 'required', 'gte:1', 'lt:2', and others. Combine rules like this: 'required|lt:7|gt:6'" />
        <hr />
        <RockForm>
            <TextBox label="Text" v-model="ruleTestText" :rules="rules" />
            <CurrencyBox label="Currency" v-model="ruleTestCurrency" :rules="rules" />
            <RockButton btnType="primary" type="submit">Test</RockButton>
        </RockForm>
    </template>
</GalleryAndResult>`
            });
            CheckBoxListGallery = vue_1.defineComponent({
                name: 'CheckBoxListGallery',
                components: {
                    GalleryAndResult,
                    CheckBoxList: CheckBoxList_1.default
                },
                data() {
                    return {
                        options: [
                            { value: "red", text: "Red" },
                            { value: "green", text: "Green" },
                            { value: "blue", text: "Blue" }
                        ],
                        items: ["green"]
                    };
                },
                template: `
<GalleryAndResult>
    <template #header>
        CheckBoxList
    </template>
    <template #gallery>
        <CheckBoxList label="CheckBoxList 1" v-model="items" :options="options" />
        <CheckBoxList label="CheckBoxList 2" v-model="items" :options="options" />
    </template>
    <template #result>
        Items: {{JSON.stringify(items, null, 2)}}
    </template>
</GalleryAndResult>`
            });
            DatePickerGallery = vue_1.defineComponent({
                name: 'DatePickerGallery',
                components: {
                    GalleryAndResult,
                    DatePicker: DatePicker_1.default
                },
                data() {
                    return {
                        date: null,
                        currentDate: 'CURRENT:1'
                    };
                },
                template: `
<GalleryAndResult>
    <template #header>
        DatePicker
    </template>
    <template #gallery>
        <DatePicker label="Date 1" v-model="date" />
        <DatePicker label="Date 2" v-model="date" />
        <DatePicker label="Current Date 1" v-model="currentDate" displayCurrentOption isCurrentDateOffset />
        <DatePicker label="Current Date 2" v-model="currentDate" displayCurrentOption isCurrentDateOffset />
    </template>
    <template #result>
        Date: {{JSON.stringify(date, null, 2)}}
        <br />
        Current Date: {{JSON.stringify(currentDate, null, 2)}}
    </template>
</GalleryAndResult>`
            });
            DateTimePickerGallery = vue_1.defineComponent({
                name: 'DatePickerGallery',
                components: {
                    GalleryAndResult,
                    DateTimePicker: DateTimePicker_1.default
                },
                data() {
                    return {
                        date: null
                    };
                },
                template: `
<GalleryAndResult>
    <template #header>
        DateTimePicker
    </template>
    <template #gallery>
        <DateTimePicker label="Date 1" v-model="date" />
        <DateTimePicker label="Date 2" v-model="date" />
    </template>
    <template #result>
        Date: {{JSON.stringify(date, null, 2)}}
    </template>
</GalleryAndResult>`
            });
            DatePartsPickerGallery = vue_1.defineComponent({
                name: 'DatePartsPickerGallery',
                components: {
                    GalleryAndResult,
                    Toggle: Toggle_1.default,
                    BirthdayPicker: BirthdayPicker_1.default,
                    DatePartsPicker: DatePartsPicker_1.default
                },
                data() {
                    return {
                        showYear: true,
                        datePartsModel: {
                            month: 1,
                            day: 1,
                            year: 2020
                        }
                    };
                },
                template: `
<GalleryAndResult>
    <template #header>
        DatePartsPicker
    </template>
    <template #gallery>
        <Toggle label="Show Year" v-model="showYear" />
        <DatePartsPicker label="DatePartsPicker 1" v-model="datePartsModel" :showYear="showYear" />
        <DatePartsPicker label="DatePartsPicker 2" v-model="datePartsModel" :showYear="showYear" />
    </template>
    <template #result>
        <span>{{datePartsModel.month}} / {{datePartsModel.day}}</span><span v-if="showYear"> / {{datePartsModel.year}}</span>
    </template>
</GalleryAndResult>`
            });
            TextBoxGallery = vue_1.defineComponent({
                name: 'TextBoxGallery',
                components: {
                    GalleryAndResult,
                    TextBox: TextBox_1.default
                },
                data() {
                    return {
                        text: 'Some two-way bound text',
                    };
                },
                template: `
<GalleryAndResult>
    <template #header>
        TextBox
    </template>
    <template #gallery>
        <TextBox label="Text 1" v-model="text" :maxLength="10" showCountDown />
        <TextBox label="Text 2" v-model="text" />
        <TextBox label="Memo" v-model="text" textMode="MultiLine" :rows="10" :maxLength="100" showCountDown />
    </template>
    <template #result>
        {{text}}
    </template>
</GalleryAndResult>`
            });
            DefinedTypeAndValueGallery = vue_1.defineComponent({
                name: 'DefinedTypeAndValueGallery',
                components: {
                    GalleryAndResult,
                    DefinedTypePicker: DefinedTypePicker_1.default,
                    DefinedValuePicker: DefinedValuePicker_1.default,
                    Toggle: Toggle_1.default
                },
                data() {
                    return {
                        displayDescriptions: false,
                        definedTypeGuid: '',
                        definedValueGuid: '',
                        definedValue: null
                    };
                },
                computed: {
                    definedTypeName() {
                        const definedType = Index_1.default.getters['definedTypes/getByGuid'](this.definedTypeGuid);
                        return (definedType === null || definedType === void 0 ? void 0 : definedType.name) || '';
                    },
                    definedValueName() {
                        var _a;
                        return ((_a = this.definedValue) === null || _a === void 0 ? void 0 : _a.value) || '';
                    }
                },
                methods: {
                    onDefinedValueChange(definedValue) {
                        this.definedValue = definedValue;
                    }
                },
                template: `
<GalleryAndResult>
    <template #header>
        DefinedTypePicker and DefinedValuePicker
    </template>
    <template #gallery>
        <Toggle label="Use Descriptions" v-model="displayDescriptions" />
        <DefinedTypePicker v-model="definedTypeGuid" />
        <DefinedTypePicker v-model="definedTypeGuid" />
        <DefinedValuePicker v-model="definedValueGuid" :definedTypeGuid="definedTypeGuid" :displayDescriptions="displayDescriptions" />
        <DefinedValuePicker v-model="definedValueGuid" @update:model="onDefinedValueChange" :definedTypeGuid="definedTypeGuid" />
    </template>
    <template #result>
        <p>
            <strong>Defined Type Guid</strong>
            {{definedTypeGuid}}
            <span v-if="definedTypeName">({{definedTypeName}})</span>
        </p>
        <p>
            <strong>Defined Value Guid</strong>
            {{definedValueGuid}}
            <span v-if="definedValueName">({{definedValueName}})</span>
        </p>
    </template>
</GalleryAndResult>`
            });
            ColorPickerGallery = vue_1.defineComponent({
                name: 'ColorPickerGallery',
                components: {
                    GalleryAndResult,
                    ColorPicker: ColorPicker_1.default
                },
                data() {
                    return {
                        value: '#ee7725',
                    };
                },
                template: `
<GalleryAndResult>
    <template #header>
        ColorPicker
    </template>
    <template #gallery>
        <ColorPicker label="Color" v-model="value" />
    </template>
    <template #result>
        {{value}}
    </template>
</GalleryAndResult>`
            });
            NumberBoxGallery = vue_1.defineComponent({
                name: 'NumberBoxGallery',
                components: {
                    GalleryAndResult,
                    RockForm: RockForm_1.default,
                    RockButton: RockButton_1.default,
                    TextBox: TextBox_1.default,
                    NumberBox: NumberBox_1.default
                },
                data() {
                    return {
                        minimumValue: '0',
                        maximumValue: '100',
                        value: 42,
                    };
                },
                computed: {
                    numericMinimumValue() {
                        return Number_1.toNumber(this.minimumValue);
                    },
                    numericMaximumValue() {
                        return Number_1.toNumber(this.maximumValue);
                    }
                },
                template: `
<GalleryAndResult>
    <template #header>
        NumberBox
    </template>
    <template #gallery>
        <TextBox label="Minimum Value" v-model="minimumValue" />
        <TextBox label="Maximum Value" v-model="maximumValue" />
        <RockForm>
            <NumberBox label="Number" v-model="value" :minimumValue="numericMinimumValue" :maximumValue="numericMaximumValue" />
            <RockButton btnType="primary" type="submit">Test</RockButton>
        </RockForm>
    </template>
    <template #result>
        {{value}}
    </template>
</GalleryAndResult>`
            });
            NumberRangeBoxGallery = vue_1.defineComponent({
                name: 'NumberRangeBoxGallery',
                components: {
                    GalleryAndResult,
                    RockForm: RockForm_1.default,
                    RockButton: RockButton_1.default,
                    TextBox: TextBox_1.default,
                    NumberRangeBox: NumberRangeBox_1.default
                },
                data() {
                    return {
                        value: { lower: 0, upper: 100 },
                    };
                },
                template: `
<GalleryAndResult>
    <template #header>
        NumberRangeBox
    </template>
    <template #gallery>
        <RockForm>
            <NumberRangeBox label="Number Range" v-model="value" />
            <RockButton btnType="primary" type="submit">Test</RockButton>
        </RockForm>
    </template>
    <template #result>
        {{value.lower}} to {{value.upper}}
    </template>
</GalleryAndResult>`
            });
            GenderDropDownListGallery = vue_1.defineComponent({
                name: 'GenderDropDownListGallery',
                components: {
                    GalleryAndResult,
                    RockForm: RockForm_1.default,
                    RockButton: RockButton_1.default,
                    TextBox: TextBox_1.default,
                    GenderDropDownList: GenderDropDownList_1.default
                },
                data() {
                    return {
                        value: '1',
                    };
                },
                template: `
<GalleryAndResult>
    <template #header>
        GenderDropDownList
    </template>
    <template #gallery>
        <RockForm>
            <GenderDropDownList label="Your Gender" v-model="value" />
            <RockButton btnType="primary" type="submit">Test</RockButton>
        </RockForm>
    </template>
    <template #result>
        {{value}}
    </template>
</GalleryAndResult>`
            });
            SocialSecurityNumberBoxGallery = vue_1.defineComponent({
                name: 'SocialSecurityNumberBoxGallery',
                components: {
                    GalleryAndResult,
                    RockForm: RockForm_1.default,
                    RockButton: RockButton_1.default,
                    TextBox: TextBox_1.default,
                    SocialSecurityNumberBox: SocialSecurityNumberBox_1.default
                },
                data() {
                    return {
                        value: '123-45-6789',
                    };
                },
                template: `
<GalleryAndResult>
    <template #header>
        SocialSecurityNumberBox
    </template>
    <template #gallery>
        <RockForm>
            <SocialSecurityNumberBox label="SSN" v-model="value" />
            <RockButton btnType="primary" type="submit">Test</RockButton>
        </RockForm>
    </template>
    <template #result>
        {{value}}
    </template>
</GalleryAndResult>`
            });
            TimePickerGallery = vue_1.defineComponent({
                name: 'TimePickerGallery',
                components: {
                    GalleryAndResult,
                    RockForm: RockForm_1.default,
                    RockButton: RockButton_1.default,
                    TextBox: TextBox_1.default,
                    TimePicker: TimePicker_1.default
                },
                data() {
                    return {
                        value: { hour: 14, minute: 15 },
                    };
                },
                template: `
<GalleryAndResult>
    <template #header>
        TimePicker
    </template>
    <template #gallery>
        <RockForm>
            <TimePicker label="Time" v-model="value" />
            <RockButton btnType="primary" type="submit">Test</RockButton>
        </RockForm>
    </template>
    <template #result>
        {{value.hour}}:{{value.minute}}
    </template>
</GalleryAndResult>`
            });
            RatingGallery = vue_1.defineComponent({
                name: 'RatingGallery',
                components: {
                    GalleryAndResult,
                    RockForm: RockForm_1.default,
                    NumberBox: NumberBox_1.default,
                    Rating: Rating_1.default
                },
                data() {
                    return {
                        value: 3,
                        maximumValue: 5
                    };
                },
                template: `
<GalleryAndResult>
    <template #header>
        Rating
    </template>
    <template #gallery>
        <NumberBox label="Maximum Rating" v-model="maximumValue" />
        <RockForm>
            <Rating label="Time" v-model="value" :maxRating="maximumValue || 5" />
        </RockForm>
    </template>
    <template #result>
        {{value}}
    </template>
</GalleryAndResult>`
            });
            exports_1("default", vue_1.defineComponent({
                name: 'Example.ControlGallery',
                components: {
                    PaneledBlockTemplate: PaneledBlockTemplate_1.default,
                    CampusPicker: CampusPicker_1.default,
                    GalleryAndResult,
                    TextBox: TextBox_1.default,
                    TextBoxGallery,
                    CurrencyBox: CurrencyBox_1.default,
                    EmailBox: EmailBox_1.default,
                    DatePickerGallery,
                    DateTimePickerGallery,
                    DatePartsPickerGallery,
                    NumberUpDown: NumberUpDown_1.default,
                    AddressControl: AddressControl_1.default,
                    Toggle: Toggle_1.default,
                    ItemsWithPreAndPostHtml: ItemsWithPreAndPostHtml_1.default,
                    StaticFormControl: StaticFormControl_1.default,
                    ProgressTracker: ProgressTracker_1.default,
                    RockForm: RockForm_1.default,
                    RockButton: RockButton_1.default,
                    RadioButtonListGallery,
                    DialogGallery,
                    CheckBoxGallery,
                    CheckBoxListGallery,
                    PhoneNumberBoxGallery,
                    DropDownListGallery,
                    HelpBlockGallery,
                    FormRulesGallery,
                    DefinedTypeAndValueGallery,
                    ColorPickerGallery,
                    NumberBoxGallery,
                    NumberRangeBoxGallery,
                    GenderDropDownListGallery,
                    SocialSecurityNumberBoxGallery,
                    TimePickerGallery,
                    RatingGallery
                },
                data() {
                    return {
                        campusGuid: '',
                        currency: 1.234,
                        email: 'joe@joes.co',
                        numberUpDown: 1,
                        address: AddressControl_1.getDefaultAddressControlModel(),
                        toggle: false,
                        prePostHtmlItems: [
                            { preHtml: '<div class="row"><div class="col-sm-6">', postHtml: '</div>', slotName: 'item1' },
                            { preHtml: '<div class="col-sm-6">', postHtml: '</div></div>', slotName: 'item2' }
                        ],
                        progressTrackerIndex: 0,
                        progressTrackerItems: [
                            { key: 'S', title: 'Start', subtitle: 'The beginning' },
                            { key: '1', title: 'Step 1', subtitle: 'The first step' },
                            { key: '2', title: 'Step 2', subtitle: 'The second step' },
                            { key: '3', title: 'Step 3', subtitle: 'The third step' },
                            { key: '4', title: 'Step 4', subtitle: 'The fourth step' },
                            { key: '5', title: 'Step 5', subtitle: 'The fifth step' },
                            { key: '6', title: 'Step 6', subtitle: 'The sixth step' },
                            { key: '7', title: 'Step 7', subtitle: 'The seventh step' },
                            { key: '8', title: 'Step 8', subtitle: 'The eighth step' },
                            { key: 'F', title: 'Finish', subtitle: 'The finish' }
                        ]
                    };
                },
                computed: {
                    campus() {
                        return Index_1.default.getters['campuses/getByGuid'](this.campusGuid) || null;
                    },
                    campusName() {
                        var _a;
                        return ((_a = this.campus) === null || _a === void 0 ? void 0 : _a.name) || '';
                    },
                    campusId() {
                        return this.campus ? this.campus.id : null;
                    }
                },
                template: `
<PaneledBlockTemplate>
    <template v-slot:title>
        <i class="fa fa-flask"></i>
        Obsidian Control Gallery
    </template>
    <template v-slot:default>
        <TextBoxGallery />
        <DatePickerGallery />
        <DateTimePickerGallery />
        <GalleryAndResult>
            <template #header>
                CurrencyBox
            </template>
            <template #gallery>
                <CurrencyBox label="Currency 1" v-model="currency" />
                <CurrencyBox label="Currency 2" v-model="currency" />
            </template>
            <template #result>
                {{currency}}
            </template>
        </GalleryAndResult>
        <GalleryAndResult>
            <template #header>
                EmailBox
            </template>
            <template #gallery>
                <EmailBox label="EmailBox 1" v-model="email" />
                <EmailBox label="EmailBox 2" v-model="email" />
            </template>
            <template #result>
                {{email}}
            </template>
        </GalleryAndResult>
        <DatePartsPickerGallery />
        <DefinedTypeAndValueGallery />
        <GalleryAndResult>
            <template #header>
                CampusPicker
            </template>
            <template #gallery>
                <CampusPicker v-model="campusGuid" />
                <CampusPicker v-model="campusGuid" label="Campus 2" />
            </template>
            <template #result>
                <p>
                    <strong>Campus Guid</strong>
                    {{campusGuid}}
                    <span v-if="campusName">({{campusName}})</span>
                </p>
                <p>
                    <strong>Campus Id</strong>
                    {{campusId}}
                </p>
            </template>
        </GalleryAndResult>
        <GalleryAndResult>
            <template #header>
                NumberUpDown
            </template>
            <template #gallery>
                <NumberUpDown label="NumberUpDown 1" v-model="numberUpDown" />
                <NumberUpDown label="NumberUpDown 2" v-model="numberUpDown" />
            </template>
            <template #result>
                {{numberUpDown}}
            </template>
        </GalleryAndResult>
        <GalleryAndResult>
            <template #header>
                StaticFormControl
            </template>
            <template #gallery>
                <StaticFormControl label="StaticFormControl 1" v-model="numberUpDown" />
                <StaticFormControl label="StaticFormControl 2" v-model="numberUpDown" />
            </template>
            <template #result>
                {{numberUpDown}}
            </template>
        </GalleryAndResult>
        <GalleryAndResult>
            <template #header>
                AddressControl
            </template>
            <template #gallery>
                <AddressControl v-model="address" />
                <AddressControl label="Address 2" v-model="address" />
            </template>
            <template #result>
                <pre>{{JSON.stringify(address, null, 2)}}</pre>
            </template>
        </GalleryAndResult>
        <GalleryAndResult>
            <template #header>
                Toggle
            </template>
            <template #gallery>
                <Toggle label="Toggle 1" v-model="toggle" />
                <Toggle label="Toggle 2" v-model="toggle" />
            </template>
            <template #result>
                {{toggle}}
            </template>
        </GalleryAndResult>
        <GalleryAndResult>
            <template #header>
                ItemsWithPreAndPostHtml
            </template>
            <template #gallery>
                <TextBox label="Item 1 - Pre Html" v-model="prePostHtmlItems[0].preHtml" />
                <TextBox label="Item 1 - Post Html" v-model="prePostHtmlItems[0].postHtml" />
                <TextBox label="Item 2 - Pre Html" v-model="prePostHtmlItems[1].preHtml" />
                <TextBox label="Item 2 - Post Html" v-model="prePostHtmlItems[1].postHtml" />
            </template>
            <template #result>
                <ItemsWithPreAndPostHtml :items="prePostHtmlItems">
                    <template #item1>
                        <div style="background-color: #fcc; padding: 5px;">This is item 1</div>
                    </template>
                    <template #item2>
                        <div style="background-color: #ccf; padding: 5px;">This is item 2</div>
                    </template>
                </ItemsWithPreAndPostHtml>
            </template>
        </GalleryAndResult>
        <GalleryAndResult :splitWidth="false">
            <template #header>
                ProgressTracker
            </template>
            <template #gallery>
                <NumberUpDown label="Index" v-model="progressTrackerIndex" :min="-100" :max="100" />
            </template>
            <template #result>
                <ProgressTracker :items="progressTrackerItems" :currentIndex="progressTrackerIndex" />
            </template>
        </GalleryAndResult>
        <FormRulesGallery />
        <RadioButtonListGallery />
        <DialogGallery />
        <CheckBoxGallery />
        <CheckBoxListGallery />
        <PhoneNumberBoxGallery />
        <DropDownListGallery />
        <HelpBlockGallery />
        <ColorPickerGallery />
        <NumberBoxGallery />
        <NumberRangeBoxGallery />
        <GenderDropDownListGallery />
        <SocialSecurityNumberBoxGallery />
        <TimePickerGallery />
        <RatingGallery />
    </template>
</PaneledBlockTemplate>`
            }));
        }
    };
});
//# sourceMappingURL=ControlGallery.js.map