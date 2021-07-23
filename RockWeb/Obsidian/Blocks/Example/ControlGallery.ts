// <copyright>
// Copyright by the Spark Development Network
//
// Licensed under the Rock Community License (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.rockrms.com/license
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
// </copyright>
//

import PaneledBlockTemplate from '../../Templates/PaneledBlockTemplate';
import DefinedTypePicker from '../../Controls/DefinedTypePicker';
import DefinedValuePicker from '../../Controls/DefinedValuePicker';
import CampusPicker from '../../Controls/CampusPicker';
import { defineComponent, PropType } from 'vue';
import store from '../../Store/Index';
import TextBox from '../../Elements/TextBox';
import EmailBox from '../../Elements/EmailBox';
import DefinedValue from '../../ViewModels/CodeGenerated/DefinedValueViewModel';
import Campus from '../../ViewModels/CodeGenerated/CampusViewModel';
import DefinedType from '../../ViewModels/CodeGenerated/DefinedTypeViewModel';
import CurrencyBox from '../../Elements/CurrencyBox';
import PanelWidget from '../../Elements/PanelWidget';
import DatePicker from '../../Elements/DatePicker';
import { RockDateType } from '../../Util/RockDate';
import BirthdayPicker from '../../Elements/BirthdayPicker';
import NumberUpDown from '../../Elements/NumberUpDown';
import AddressControl, { getDefaultAddressControlModel } from '../../Controls/AddressControl';
import Toggle from '../../Elements/Toggle';
import ItemsWithPreAndPostHtml, { ItemWithPreAndPostHtml } from '../../Elements/ItemsWithPreAndPostHtml';
import StaticFormControl from '../../Elements/StaticFormControl';
import ProgressTracker, { ProgressTrackerItem } from '../../Elements/ProgressTracker';
import RockForm from '../../Controls/RockForm';
import RockButton from '../../Elements/RockButton';
import RadioButtonList from '../../Elements/RadioButtonList';
import DropDownList, { DropDownListOption } from '../../Elements/DropDownList';
import Dialog from '../../Controls/Dialog';
import CheckBox from '../../Elements/CheckBox';
import PhoneNumberBox from '../../Elements/PhoneNumberBox';
import HelpBlock from '../../Elements/HelpBlock';
import DatePartsPicker, { DatePartsPickerModel } from '../../Elements/DatePartsPicker';
import ColorPicker from '../../Elements/ColorPicker';
import NumberBox from '../../Elements/NumberBox';
import GenderDropDownList from '../../Elements/GenderDropDownList';
import { toNumber, toNumberOrNull } from '../../Services/Number';

/** An inner component that describes the template used for each of the controls
 *  within this control gallery */
const GalleryAndResult = defineComponent({
    name: 'GalleryAndResult',
    components: {
        PanelWidget
    },
    props: {
        splitWidth: {
            type: Boolean as PropType<boolean>,
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
} );

/** Demonstrates a phone number box */
const PhoneNumberBoxGallery = defineComponent( {
    name: 'PhoneNumberBoxGallery',
    components: {
        GalleryAndResult,
        PhoneNumberBox
    },
    data ()
    {
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
} );

/** Demonstrates a help block */
const HelpBlockGallery = defineComponent( {
    name: 'HelpBlockGallery',
    components: {
        GalleryAndResult,
        HelpBlock
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
} );

/** Demonstrates a drop down list */
const DropDownListGallery = defineComponent( {
    name: 'DropDownListGallery',
    components: {
        GalleryAndResult,
        DropDownList
    },
    data ()
    {
        return {
            value: 'a',
            options: [
                { key: 'a', text: 'A Text', value: 'a' },
                { key: 'b', text: 'B Text', value: 'b' },
                { key: 'c', text: 'C Text', value: 'c' },
                { key: 'd', text: 'D Text', value: 'd' }
            ] as DropDownListOption[]
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
} );

/** Demonstrates a radio button list */
const RadioButtonListGallery = defineComponent( {
    name: 'RadioButtonListGallery',
    components: {
        GalleryAndResult,
        RadioButtonList,
        Toggle,
        NumberUpDown
    },
    data ()
    {
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
            ] as DropDownListOption[]
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
} );

/** Demonstrates a checkbox */
const CheckBoxGallery = defineComponent( {
    name: 'CheckBoxGallery',
    components: {
        GalleryAndResult,
        CheckBox,
        Toggle
    },
    data ()
    {
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
} );

/** Demonstrates a modal / dialog / pop-up */
const DialogGallery = defineComponent( {
    name: 'DialogGallery',
    components: {
        GalleryAndResult,
        RockButton,
        Dialog,
        CheckBox
    },
    data ()
    {
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
} );

/** Demonstrates how rock forms work with rules to produce validation messages */
const FormRulesGallery = defineComponent( {
    name: 'FormRulesGallery',
    components: {
        GalleryAndResult,
        RockForm,
        TextBox,
        CurrencyBox,
        RockButton
    },
    data ()
    {
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
} );

/** Demonstrates date pickers */
const DatePickerGallery = defineComponent( {
    name: 'DatePickerGallery',
    components: {
        GalleryAndResult,
        DatePicker
    },
    data ()
    {
        return {
            date: null as RockDateType | null,
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
} );

/** Demonstrates date part pickers */
const DatePartsPickerGallery = defineComponent( {
    name: 'DatePartsPickerGallery',
    components: {
        GalleryAndResult,
        Toggle,
        BirthdayPicker,
        DatePartsPicker
    },
    data ()
    {
        return {
            showYear: true,
            datePartsModel: {
                month: 1,
                day: 1,
                year: 2020
            } as DatePartsPickerModel
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
} );

/** Demonstrates a textbox */
const TextBoxGallery = defineComponent( {
    name: 'TextBoxGallery',
    components: {
        GalleryAndResult,
        TextBox
    },
    data ()
    {
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
} );

/** Demonstrates a defined type and defined value picker */
const DefinedTypeAndValueGallery = defineComponent( {
    name: 'DefinedTypeAndValueGallery',
    components: {
        GalleryAndResult,
        DefinedTypePicker,
        DefinedValuePicker,
        Toggle
    },
    data ()
    {
        return {
            displayDescriptions: false,
            definedTypeGuid: '',
            definedValueGuid: '',
            definedValue: null as DefinedValue | null
        };
    },
    computed: {
        definedTypeName (): string
        {
            const definedType = store.getters[ 'definedTypes/getByGuid' ]( this.definedTypeGuid ) as DefinedType;
            return definedType?.name || '';
        },
        definedValueName (): string
        {
            return this.definedValue?.value || '';
        }
    },
    methods: {
        onDefinedValueChange ( definedValue: DefinedValue | null )
        {
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
} );

/** Demonstrates a color picker */
const ColorPickerGallery = defineComponent({
    name: 'ColorPickerGallery',
    components: {
        GalleryAndResult,
        ColorPicker
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

/** Demonstrates a color picker */
const NumberBoxGallery = defineComponent({
    name: 'NumberBoxGallery',
    components: {
        GalleryAndResult,
        RockForm,
        RockButton,
        TextBox,
        NumberBox
    },
    data() {
        return {
            minimumValue: '0',
            maximumValue: '100',
            value: 42,
        };
    },
    computed: {
        numericMinimumValue(): number {
            return toNumber(this.minimumValue);
        },
        numericMaximumValue(): number {
            return toNumber(this.maximumValue);
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

/** Demonstrates a color picker */
const GenderDropDownListGallery = defineComponent({
    name: 'GenderDropDownListGallery',
    components: {
        GalleryAndResult,
        RockForm,
        RockButton,
        TextBox,
        GenderDropDownList
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

export default defineComponent({
    name: 'Example.ControlGallery',
    components: {
        PaneledBlockTemplate,
        CampusPicker,
        GalleryAndResult,
        TextBox,
        TextBoxGallery,
        CurrencyBox,
        EmailBox,
        DatePickerGallery,
        DatePartsPickerGallery,
        NumberUpDown,
        AddressControl,
        Toggle,
        ItemsWithPreAndPostHtml,
        StaticFormControl,
        ProgressTracker,
        RockForm,
        RockButton,
        RadioButtonListGallery,
        DialogGallery,
        CheckBoxGallery,
        PhoneNumberBoxGallery,
        DropDownListGallery,
        HelpBlockGallery,
        FormRulesGallery,
        DefinedTypeAndValueGallery,
        ColorPickerGallery,
        NumberBoxGallery,
        GenderDropDownListGallery
    },
    data() {
        return {
            
            campusGuid: '',
            currency: 1.234,
            email: 'joe@joes.co',
            numberUpDown: 1,
            address: getDefaultAddressControlModel(),
            toggle: false,
            prePostHtmlItems: [
                { preHtml: '<div class="row"><div class="col-sm-6">', postHtml: '</div>', slotName: 'item1' },
                { preHtml: '<div class="col-sm-6">', postHtml: '</div></div>', slotName: 'item2' }
            ] as ItemWithPreAndPostHtml[],
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
            ] as ProgressTrackerItem[]
        };
    },
    computed: {
        campus(): Campus | null {
            return store.getters['campuses/getByGuid'](this.campusGuid) || null;
        },
        campusName(): string {
            return this.campus?.name || '';
        },
        campusId(): number | null {
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
        <PhoneNumberBoxGallery />
        <DropDownListGallery />
        <HelpBlockGallery />
        <ColorPickerGallery />
        <NumberBoxGallery />
        <GenderDropDownListGallery />
    </template>
</PaneledBlockTemplate>`
});
