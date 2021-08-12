System.register(["vue", "../../../Controls/AddressControl", "../../../Elements/TextBox", "../../../Elements/EmailBox", "../../../Elements/DropDownList", "../../../Elements/GenderDropDownList", "../../../Elements/BirthdayPicker", "../../../Controls/ComponentFromUrl", "../../../Elements/Alert", "../../../Elements/DatePartsPicker", "./RegistrationEntryBlockViewModel"], function (exports_1, context_1) {
    "use strict";
    var vue_1, AddressControl_1, TextBox_1, EmailBox_1, DropDownList_1, GenderDropDownList_1, BirthdayPicker_1, ComponentFromUrl_1, Alert_1, DatePartsPicker_1, RegistrationEntryBlockViewModel_1;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (AddressControl_1_1) {
                AddressControl_1 = AddressControl_1_1;
            },
            function (TextBox_1_1) {
                TextBox_1 = TextBox_1_1;
            },
            function (EmailBox_1_1) {
                EmailBox_1 = EmailBox_1_1;
            },
            function (DropDownList_1_1) {
                DropDownList_1 = DropDownList_1_1;
            },
            function (GenderDropDownList_1_1) {
                GenderDropDownList_1 = GenderDropDownList_1_1;
            },
            function (BirthdayPicker_1_1) {
                BirthdayPicker_1 = BirthdayPicker_1_1;
            },
            function (ComponentFromUrl_1_1) {
                ComponentFromUrl_1 = ComponentFromUrl_1_1;
            },
            function (Alert_1_1) {
                Alert_1 = Alert_1_1;
            },
            function (DatePartsPicker_1_1) {
                DatePartsPicker_1 = DatePartsPicker_1_1;
            },
            function (RegistrationEntryBlockViewModel_1_1) {
                RegistrationEntryBlockViewModel_1 = RegistrationEntryBlockViewModel_1_1;
            }
        ],
        execute: function () {
            exports_1("default", vue_1.defineComponent({
                name: 'Event.RegistrationEntry.RegistrantPersonField',
                components: {
                    Alert: Alert_1.default,
                    ComponentFromUrl: ComponentFromUrl_1.default
                },
                props: {
                    field: {
                        type: Object,
                        required: true
                    },
                    fieldValues: {
                        type: Object,
                        required: true
                    },
                    isKnownFamilyMember: {
                        type: Boolean,
                        required: true
                    }
                },
                setup(props) {
                    const registrationEntryState = vue_1.inject('registrationEntryState');
                    const component = vue_1.computed(() => {
                        switch (props.field.personFieldType) {
                            case RegistrationEntryBlockViewModel_1.RegistrationPersonFieldType.FirstName:
                                return TextBox_1.default;
                            case RegistrationEntryBlockViewModel_1.RegistrationPersonFieldType.LastName:
                                return TextBox_1.default;
                            case RegistrationEntryBlockViewModel_1.RegistrationPersonFieldType.MiddleName:
                                return TextBox_1.default;
                            case RegistrationEntryBlockViewModel_1.RegistrationPersonFieldType.Campus:
                                return DropDownList_1.default;
                            case RegistrationEntryBlockViewModel_1.RegistrationPersonFieldType.Email:
                                return EmailBox_1.default;
                            case RegistrationEntryBlockViewModel_1.RegistrationPersonFieldType.Gender:
                                return GenderDropDownList_1.default;
                            case RegistrationEntryBlockViewModel_1.RegistrationPersonFieldType.Birthdate:
                                return BirthdayPicker_1.default;
                            case RegistrationEntryBlockViewModel_1.RegistrationPersonFieldType.Address:
                                return AddressControl_1.default;
                        }
                        return null;
                    });
                    const fieldControlComponentProps = vue_1.computed(() => {
                        const componentProps = {
                            rules: props.field.isRequired ? 'required' : ''
                        };
                        switch (props.field.personFieldType) {
                            case RegistrationEntryBlockViewModel_1.RegistrationPersonFieldType.FirstName:
                                componentProps.label = 'First Name';
                                componentProps.disabled = props.isKnownFamilyMember;
                                break;
                            case RegistrationEntryBlockViewModel_1.RegistrationPersonFieldType.LastName:
                                componentProps.label = 'Last Name';
                                componentProps.disabled = props.isKnownFamilyMember;
                                break;
                            case RegistrationEntryBlockViewModel_1.RegistrationPersonFieldType.MiddleName:
                                componentProps.label = 'Middle Name';
                                break;
                            case RegistrationEntryBlockViewModel_1.RegistrationPersonFieldType.Campus:
                                componentProps.label = 'Campus';
                                componentProps.options = [...registrationEntryState.viewModel.campuses];
                                break;
                            case RegistrationEntryBlockViewModel_1.RegistrationPersonFieldType.Email:
                                componentProps.label = 'Email';
                                break;
                            case RegistrationEntryBlockViewModel_1.RegistrationPersonFieldType.Gender:
                                break;
                            case RegistrationEntryBlockViewModel_1.RegistrationPersonFieldType.Birthdate:
                                componentProps.label = 'Birthday';
                                break;
                            case RegistrationEntryBlockViewModel_1.RegistrationPersonFieldType.Address:
                                break;
                        }
                        return componentProps;
                    });
                    if (!(props.field.guid in props.fieldValues)) {
                        let defaultValue = '';
                        switch (props.field.personFieldType) {
                            case RegistrationEntryBlockViewModel_1.RegistrationPersonFieldType.Birthdate:
                                defaultValue = DatePartsPicker_1.getDefaultDatePartsPickerModel();
                                break;
                            case RegistrationEntryBlockViewModel_1.RegistrationPersonFieldType.Address:
                                defaultValue = AddressControl_1.getDefaultAddressControlModel();
                                break;
                        }
                        props.fieldValues[props.field.guid] = defaultValue;
                    }
                    return {
                        component,
                        fieldControlComponentProps,
                        fieldValues: props.fieldValues,
                        fieldType: props.field.personFieldType
                    };
                },
                template: `
<component v-if="component" :is="component" v-bind="fieldControlComponentProps" v-model="fieldValues[field.guid]" />
<Alert v-else alertType="danger">Could not load the control for person field {{ fieldType }}.</Alert>
`
            }));
        }
    };
});
//# sourceMappingURL=RegistrantPersonField.js.map