System.register(["vue", "../Elements/DropDownList", "../Elements/RockLabel", "../Elements/TextBox", "../Rules/Index", "../Util/Guid"], function (exports_1, context_1) {
    "use strict";
    var vue_1, DropDownList_1, RockLabel_1, TextBox_1, Index_1, Guid_1;
    var __moduleName = context_1 && context_1.id;
    function getDefaultAddressControlModel() {
        return {
            street1: '',
            street2: '',
            city: '',
            state: 'AZ',
            postalCode: '',
            country: 'US'
        };
    }
    exports_1("getDefaultAddressControlModel", getDefaultAddressControlModel);
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (DropDownList_1_1) {
                DropDownList_1 = DropDownList_1_1;
            },
            function (RockLabel_1_1) {
                RockLabel_1 = RockLabel_1_1;
            },
            function (TextBox_1_1) {
                TextBox_1 = TextBox_1_1;
            },
            function (Index_1_1) {
                Index_1 = Index_1_1;
            },
            function (Guid_1_1) {
                Guid_1 = Guid_1_1;
            }
        ],
        execute: function () {
            exports_1("default", vue_1.defineComponent({
                name: 'AddressControl',
                components: {
                    TextBox: TextBox_1.default,
                    RockLabel: RockLabel_1.default,
                    DropDownList: DropDownList_1.default
                },
                props: {
                    modelValue: {
                        type: Object,
                        required: true
                    },
                    label: {
                        type: String,
                        default: 'Address'
                    },
                    help: {
                        type: String,
                        default: ''
                    },
                    rules: {
                        type: String,
                        default: ''
                    }
                },
                data() {
                    return {
                        state: '',
                        uniqueId: `rock-addresscontrol-${Guid_1.newGuid()}`,
                        stateOptions: [
                            { value: 'AL', text: 'AL' },
                            { value: 'AK', text: 'AK' },
                            { value: 'AS', text: 'AS' },
                            { value: 'AZ', text: 'AZ' },
                            { value: 'AR', text: 'AR' },
                            { value: 'CA', text: 'CA' },
                            { value: 'CO', text: 'CO' },
                            { value: 'CT', text: 'CT' },
                            { value: 'DE', text: 'DE' },
                            { value: 'DC', text: 'DC' },
                            { value: 'FM', text: 'FM' },
                            { value: 'FL', text: 'FL' },
                            { value: 'GA', text: 'GA' },
                            { value: 'GU', text: 'GU' },
                            { value: 'HI', text: 'HI' },
                            { value: 'ID', text: 'ID' },
                            { value: 'IL', text: 'IL' },
                            { value: 'IN', text: 'IN' },
                            { value: 'IA', text: 'IA' },
                            { value: 'KS', text: 'KS' },
                            { value: 'KY', text: 'KY' },
                            { value: 'LA', text: 'LA' },
                            { value: 'ME', text: 'ME' },
                            { value: 'MH', text: 'MH' },
                            { value: 'MD', text: 'MD' },
                            { value: 'MA', text: 'MA' },
                            { value: 'MI', text: 'MI' },
                            { value: 'MN', text: 'MN' },
                            { value: 'MS', text: 'MS' },
                            { value: 'MO', text: 'MO' },
                            { value: 'MT', text: 'MT' },
                            { value: 'NE', text: 'NE' },
                            { value: 'NV', text: 'NV' },
                            { value: 'NH', text: 'NH' },
                            { value: 'NJ', text: 'NJ' },
                            { value: 'NM', text: 'NM' },
                            { value: 'NY', text: 'NY' },
                            { value: 'NC', text: 'NC' },
                            { value: 'ND', text: 'ND' },
                            { value: 'MP', text: 'MP' },
                            { value: 'OH', text: 'OH' },
                            { value: 'OK', text: 'OK' },
                            { value: 'OR', text: 'OR' },
                            { value: 'PW', text: 'PW' },
                            { value: 'PA', text: 'PA' },
                            { value: 'PR', text: 'PR' },
                            { value: 'RI', text: 'RI' },
                            { value: 'SC', text: 'SC' },
                            { value: 'SD', text: 'SD' },
                            { value: 'TN', text: 'TN' },
                            { value: 'TX', text: 'TX' },
                            { value: 'UT', text: 'UT' },
                            { value: 'VT', text: 'VT' },
                            { value: 'VI', text: 'VI' },
                            { value: 'VA', text: 'VA' },
                            { value: 'WA', text: 'WA' },
                            { value: 'WV', text: 'WV' },
                            { value: 'WI', text: 'WI' },
                            { value: 'WY', text: 'WY' }
                        ]
                    };
                },
                computed: {
                    isRequired() {
                        const rules = Index_1.ruleStringToArray(this.rules);
                        return rules.indexOf('required') !== -1;
                    }
                },
                template: `
<div class="form-group address-control" :class="isRequired ? 'required' : ''">
    <RockLabel v-if="label || help" :for="uniqueId" :help="help">
        {{label}}
    </RockLabel>
    <div class="control-wrapper">
        <TextBox placeholder="Address Line 1" :rules="rules" v-model="modelValue.street1" validationTitle="Address Line 1" />
        <TextBox placeholder="Address Line 2" v-model="modelValue.street2" validationTitle="Address Line 2" />
        <div class="form-row">
            <TextBox placeholder="City" :rules="rules" v-model="modelValue.city" class="col-sm-6" validationTitle="City" />
            <DropDownList :showBlankItem="false" v-model="modelValue.state" class="col-sm-3" :options="stateOptions" />
            <TextBox placeholder="Zip" :rules="rules" v-model="modelValue.postalCode" class="col-sm-3" validationTitle="Zip" />
        </div>
    </div>
</div>`
            }));
        }
    };
});
//# sourceMappingURL=AddressControl.js.map