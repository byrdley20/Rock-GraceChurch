System.register(["vue", "../../../Elements/CheckBox", "../../../Elements/EmailBox", "../../../Elements/RadioButtonList", "../../../Elements/StaticFormControl", "../../../Elements/TextBox", "../RegistrationEntry", "./RegistrationEntryBlockViewModel"], function (exports_1, context_1) {
    "use strict";
    var vue_1, CheckBox_1, EmailBox_1, RadioButtonList_1, StaticFormControl_1, TextBox_1, RegistrationEntry_1, RegistrationEntryBlockViewModel_1;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (CheckBox_1_1) {
                CheckBox_1 = CheckBox_1_1;
            },
            function (EmailBox_1_1) {
                EmailBox_1 = EmailBox_1_1;
            },
            function (RadioButtonList_1_1) {
                RadioButtonList_1 = RadioButtonList_1_1;
            },
            function (StaticFormControl_1_1) {
                StaticFormControl_1 = StaticFormControl_1_1;
            },
            function (TextBox_1_1) {
                TextBox_1 = TextBox_1_1;
            },
            function (RegistrationEntry_1_1) {
                RegistrationEntry_1 = RegistrationEntry_1_1;
            },
            function (RegistrationEntryBlockViewModel_1_1) {
                RegistrationEntryBlockViewModel_1 = RegistrationEntryBlockViewModel_1_1;
            }
        ],
        execute: function () {
            exports_1("default", vue_1.defineComponent({
                name: 'Event.RegistrationEntry.Registrar',
                components: {
                    TextBox: TextBox_1.default,
                    CheckBox: CheckBox_1.default,
                    EmailBox: EmailBox_1.default,
                    StaticFormControl: StaticFormControl_1.default,
                    RadioButtonList: RadioButtonList_1.default
                },
                setup() {
                    return {
                        getRegistrationEntryBlockArgs: vue_1.inject('getRegistrationEntryBlockArgs'),
                        registrationEntryState: vue_1.inject('registrationEntryState')
                    };
                },
                data() {
                    return {
                        isRegistrarPanelShown: true
                    };
                },
                computed: {
                    useLoggedInPersonForRegistrar() {
                        return (!!this.currentPerson) && this.viewModel.registrarOption === RegistrationEntryBlockViewModel_1.RegistrarOption.UseLoggedInPerson;
                    },
                    currentPerson() {
                        return this.$store.state.currentPerson;
                    },
                    registrar() {
                        return this.registrationEntryState.Registrar;
                    },
                    firstRegistrant() {
                        return this.registrationEntryState.Registrants[0];
                    },
                    viewModel() {
                        return this.registrationEntryState.ViewModel;
                    },
                    doShowUpdateEmailOption() {
                        var _a;
                        return !this.viewModel.forceEmailUpdate && !!((_a = this.currentPerson) === null || _a === void 0 ? void 0 : _a.email);
                    },
                    registrantInfos() {
                        return this.registrationEntryState.Registrants.map(r => RegistrationEntry_1.getRegistrantBasicInfo(r, this.viewModel.registrantForms));
                    },
                    registrantTerm() {
                        return this.registrantInfos.length === 1 ? this.viewModel.registrantTerm : this.viewModel.pluralRegistrantTerm;
                    },
                    instanceName() {
                        return this.viewModel.instanceName;
                    },
                    familyOptions() {
                        var _a;
                        const options = [];
                        const usedFamilyGuids = {};
                        if (this.viewModel.registrantsSameFamily !== RegistrationEntryBlockViewModel_1.RegistrantsSameFamily.Ask) {
                            return options;
                        }
                        for (let i = 0; i < this.registrationEntryState.Registrants.length; i++) {
                            const registrant = this.registrationEntryState.Registrants[i];
                            const info = RegistrationEntry_1.getRegistrantBasicInfo(registrant, this.viewModel.registrantForms);
                            if (!usedFamilyGuids[registrant.FamilyGuid] && (info === null || info === void 0 ? void 0 : info.FirstName) && (info === null || info === void 0 ? void 0 : info.LastName)) {
                                options.push({
                                    key: registrant.FamilyGuid,
                                    text: `${info.FirstName} ${info.LastName}`,
                                    value: registrant.FamilyGuid
                                });
                                usedFamilyGuids[registrant.FamilyGuid] = true;
                            }
                        }
                        if (((_a = this.currentPerson) === null || _a === void 0 ? void 0 : _a.primaryFamilyGuid) && this.currentPerson.fullName && !usedFamilyGuids[this.currentPerson.primaryFamilyGuid]) {
                            options.push({
                                key: this.currentPerson.primaryFamilyGuid,
                                text: this.currentPerson.fullName,
                                value: this.currentPerson.primaryFamilyGuid
                            });
                        }
                        options.push({
                            key: this.registrar.OwnFamilyGuid,
                            text: 'None of the above',
                            value: this.registrar.OwnFamilyGuid
                        });
                        return options;
                    },
                },
                methods: {
                    prefillRegistrar() {
                        this.isRegistrarPanelShown = true;
                        if (this.currentPerson &&
                            (this.viewModel.registrarOption === RegistrationEntryBlockViewModel_1.RegistrarOption.UseLoggedInPerson || this.viewModel.registrarOption === RegistrationEntryBlockViewModel_1.RegistrarOption.PromptForRegistrar)) {
                            this.registrar.NickName = this.currentPerson.nickName || this.currentPerson.firstName || '';
                            this.registrar.LastName = this.currentPerson.lastName || '';
                            this.registrar.Email = this.currentPerson.email || '';
                            this.registrar.FamilyGuid = this.currentPerson.primaryFamilyGuid;
                            return;
                        }
                        if (this.viewModel.registrarOption === RegistrationEntryBlockViewModel_1.RegistrarOption.PromptForRegistrar) {
                            return;
                        }
                        if (this.viewModel.registrarOption === RegistrationEntryBlockViewModel_1.RegistrarOption.PrefillFirstRegistrant || this.viewModel.registrarOption === RegistrationEntryBlockViewModel_1.RegistrarOption.UseFirstRegistrant) {
                            const firstRegistrantInfo = RegistrationEntry_1.getRegistrantBasicInfo(this.firstRegistrant, this.viewModel.registrantForms);
                            this.registrar.NickName = firstRegistrantInfo.FirstName;
                            this.registrar.LastName = firstRegistrantInfo.LastName;
                            this.registrar.Email = firstRegistrantInfo.Email;
                            this.registrar.FamilyGuid = this.firstRegistrant.FamilyGuid;
                            const hasAllInfo = (!!this.registrar.NickName) && (!!this.registrar.LastName) && (!!this.registrar.Email);
                            if (hasAllInfo && this.viewModel.registrarOption === RegistrationEntryBlockViewModel_1.RegistrarOption.UseFirstRegistrant) {
                                this.isRegistrarPanelShown = false;
                            }
                            return;
                        }
                    }
                },
                watch: {
                    currentPerson: {
                        immediate: true,
                        handler() {
                            this.prefillRegistrar();
                        }
                    }
                },
                template: `
<div v-if="isRegistrarPanelShown" class="well">
    <h4>This Registration Was Completed By</h4>
    <template v-if="useLoggedInPersonForRegistrar">
        <div class="row">
            <div class="col-md-6">
                <StaticFormControl label="First Name" v-model="registrar.NickName" />
                <StaticFormControl label="Email" v-model="registrar.Email" />
            </div>
            <div class="col-md-6">
                <StaticFormControl label="Last Name" v-model="registrar.LastName" />
            </div>
        </div>
    </template>
    <template v-else>
        <div class="row">
            <div class="col-md-6">
                <TextBox label="First Name" rules="required" v-model="registrar.NickName" tabIndex="1" />
                <EmailBox label="Send Confirmation Emails To" rules="required" v-model="registrar.Email" tabIndex="3" />
                <CheckBox v-if="doShowUpdateEmailOption" label="Should Your Account Be Updated To Use This Email Address?" v-model="registrar.UpdateEmail" />
            </div>
            <div class="col-md-6">
                <TextBox label="Last Name" rules="required" v-model="registrar.LastName" tabIndex="2" />
                <RadioButtonList
                    v-if="familyOptions.length"
                    :label="(registrar.NickName || 'Person') + ' is in the same immediate family as'"
                    rules='required:{"allowEmptyString": true}'
                    v-model="registrar.FamilyGuid"
                    :options="familyOptions"
                    validationTitle="Family" />
            </div>
        </div>
    </template>
</div>`
            }));
        }
    };
});
//# sourceMappingURL=Registrar.js.map