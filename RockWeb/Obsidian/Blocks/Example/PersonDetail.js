System.register(["../../Util/Bus", "../../Templates/PaneledBlockTemplate", "../../Elements/RockButton", "../../Elements/TextBox", "vue", "../../Store/Index", "../../Elements/EmailBox", "../../Controls/RockValidation", "../../Controls/RockForm", "../../Controls/CampusPicker", "../../Controls/Loading", "../../Controls/PrimaryBlock", "../../Services/Date", "../../Util/RockDate", "../../Elements/DatePicker", "../../Controls/AddressControl"], function (exports_1, context_1) {
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
    var Bus_1, PaneledBlockTemplate_1, RockButton_1, TextBox_1, vue_1, Index_1, EmailBox_1, RockValidation_1, RockForm_1, CampusPicker_1, Loading_1, PrimaryBlock_1, Date_1, RockDate_1, DatePicker_1, AddressControl_1;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (Bus_1_1) {
                Bus_1 = Bus_1_1;
            },
            function (PaneledBlockTemplate_1_1) {
                PaneledBlockTemplate_1 = PaneledBlockTemplate_1_1;
            },
            function (RockButton_1_1) {
                RockButton_1 = RockButton_1_1;
            },
            function (TextBox_1_1) {
                TextBox_1 = TextBox_1_1;
            },
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (Index_1_1) {
                Index_1 = Index_1_1;
            },
            function (EmailBox_1_1) {
                EmailBox_1 = EmailBox_1_1;
            },
            function (RockValidation_1_1) {
                RockValidation_1 = RockValidation_1_1;
            },
            function (RockForm_1_1) {
                RockForm_1 = RockForm_1_1;
            },
            function (CampusPicker_1_1) {
                CampusPicker_1 = CampusPicker_1_1;
            },
            function (Loading_1_1) {
                Loading_1 = Loading_1_1;
            },
            function (PrimaryBlock_1_1) {
                PrimaryBlock_1 = PrimaryBlock_1_1;
            },
            function (Date_1_1) {
                Date_1 = Date_1_1;
            },
            function (RockDate_1_1) {
                RockDate_1 = RockDate_1_1;
            },
            function (DatePicker_1_1) {
                DatePicker_1 = DatePicker_1_1;
            },
            function (AddressControl_1_1) {
                AddressControl_1 = AddressControl_1_1;
            }
        ],
        execute: function () {
            exports_1("default", vue_1.defineComponent({
                name: 'Example.PersonDetail',
                components: {
                    PaneledBlockTemplate: PaneledBlockTemplate_1.default,
                    RockButton: RockButton_1.default,
                    TextBox: TextBox_1.default,
                    EmailBox: EmailBox_1.default,
                    RockValidation: RockValidation_1.default,
                    RockForm: RockForm_1.default,
                    CampusPicker: CampusPicker_1.default,
                    Loading: Loading_1.default,
                    PrimaryBlock: PrimaryBlock_1.default,
                    DatePicker: DatePicker_1.default,
                    AddressControl: AddressControl_1.default
                },
                setup() {
                    return {
                        invokeBlockAction: vue_1.inject('invokeBlockAction')
                    };
                },
                data() {
                    return {
                        person: null,
                        personForEditing: null,
                        isEditMode: false,
                        messageToPublish: '',
                        receivedMessage: '',
                        isLoading: false,
                        campusGuid: '',
                        birthdate: null,
                        address: AddressControl_1.getDefaultAddressControlModel()
                    };
                },
                methods: {
                    setIsEditMode(isEditMode) {
                        this.isEditMode = isEditMode;
                    },
                    doEdit() {
                        var _a;
                        this.personForEditing = this.person ? Object.assign({}, this.person) : null;
                        this.campusGuid = ((_a = this.campus) === null || _a === void 0 ? void 0 : _a.guid) || '';
                        this.birthdate = this.birthdateOrNull ? RockDate_1.toRockDate(this.birthdateOrNull) : null;
                        this.setIsEditMode(true);
                    },
                    doCancel() {
                        this.setIsEditMode(false);
                    },
                    doSave() {
                        var _a;
                        return __awaiter(this, void 0, void 0, function* () {
                            if (this.personForEditing) {
                                this.person = Object.assign(Object.assign({}, this.personForEditing), { BirthDay: RockDate_1.default.getDay(this.birthdate), BirthMonth: RockDate_1.default.getMonth(this.birthdate), BirthYear: RockDate_1.default.getYear(this.birthdate), PrimaryCampusId: ((_a = Index_1.default.getters['campuses/getByGuid'](this.campusGuid)) === null || _a === void 0 ? void 0 : _a.Id) || null });
                                this.isLoading = true;
                                yield this.invokeBlockAction('EditPerson', {
                                    personArgs: this.person
                                });
                                this.isLoading = false;
                            }
                            this.setIsEditMode(false);
                        });
                    },
                    doPublish() {
                        Bus_1.default.publish('PersonDetail:Message', this.messageToPublish);
                        this.messageToPublish = '';
                    },
                    receiveMessage(message) {
                        this.receivedMessage = message;
                    }
                },
                computed: {
                    birthdateOrNull() {
                        var _a;
                        if (!((_a = this.person) === null || _a === void 0 ? void 0 : _a.BirthDay) || !this.person.BirthMonth || !this.person.BirthYear) {
                            return null;
                        }
                        return new Date(`${this.person.BirthYear}-${this.person.BirthMonth}-${this.person.BirthDay}`);
                    },
                    birthdateFormatted() {
                        if (!this.birthdateOrNull) {
                            return 'Not Completed';
                        }
                        return Date_1.asDateString(this.birthdateOrNull);
                    },
                    campus() {
                        if (this.person) {
                            return Index_1.default.getters['campuses/getById'](this.person.PrimaryCampusId) || null;
                        }
                        return null;
                    },
                    campusName() {
                        var _a;
                        return ((_a = this.campus) === null || _a === void 0 ? void 0 : _a.name) || '';
                    },
                    blockTitle() {
                        return this.person ?
                            `: ${this.person.NickName || this.person.FirstName} ${this.person.LastName}` :
                            '';
                    },
                    currentPerson() {
                        return Index_1.default.state.currentPerson;
                    },
                    currentPersonGuid() {
                        return this.currentPerson ? this.currentPerson.guid : null;
                    }
                },
                watch: {
                    currentPersonGuid: {
                        immediate: true,
                        handler() {
                            return __awaiter(this, void 0, void 0, function* () {
                                if (!this.currentPersonGuid) {
                                    this.person = null;
                                    return;
                                }
                                if (this.person && this.person.Guid === this.currentPersonGuid) {
                                    return;
                                }
                                this.isLoading = true;
                                this.person = (yield this.invokeBlockAction('GetPersonViewModel')).data;
                                this.isLoading = false;
                            });
                        }
                    }
                },
                created() {
                    Bus_1.default.subscribe('PersonSecondary:Message', this.receiveMessage);
                },
                template: `
<PrimaryBlock :hideSecondaryBlocks="isEditMode">
    <PaneledBlockTemplate>
        <template v-slot:title>
            <i class="fa fa-flask"></i>
            Edit Yourself{{blockTitle}}
        </template>
        <template v-slot:default>
            <Loading :isLoading="isLoading">
                <p v-if="!person">
                    There is no person loaded.
                </p>
                <RockForm v-else-if="isEditMode" @submit="doSave">
                    <div class="row">
                        <div class="col-sm-6">
                            <TextBox label="First Name" v-model="personForEditing.FirstName" rules="required" />
                            <TextBox label="Nick Name" v-model="personForEditing.NickName" />
                            <TextBox label="Last Name" v-model="personForEditing.LastName" rules="required" />
                        </div>
                        <div class="col-sm-6">
                            <EmailBox v-model="personForEditing.Email" />
                            <CampusPicker v-model="campusGuid" />
                            <DatePicker label="Birthdate" v-model="birthdate" rules="required" />
                        </div>
                        <div class="col-sm-12">
                            <AddressControl v-model="address" />
                        </div>
                    </div>
                    <div class="actions">
                        <RockButton btnType="primary" type="submit">Save</RockButton>
                        <RockButton btnType="link" @click="doCancel">Cancel</RockButton>
                    </div>
                </RockForm>
                <template v-else>
                    <div class="row">
                        <div class="col-sm-6">
                            <dl>
                                <dt>First Name</dt>
                                <dd>{{person.FirstName}}</dd>
                                <dt>Last Name</dt>
                                <dd>{{person.LastName}}</dd>
                                <dt>Email</dt>
                                <dd>{{person.Email}}</dd>
                                <dt>Campus</dt>
                                <dd>{{campusName || 'None'}}</dd>
                                <dt>Birthdate</dt>
                                <dd>{{birthdateFormatted}}</dd>
                            </dl>
                        </div>
                        <div class="col-sm-6">
                            <div class="well">
                                <TextBox label="Message" v-model="messageToPublish" />
                                <RockButton btnType="primary" btnSize="sm" @click="doPublish">Publish</RockButton>
                            </div>
                            <p>
                                <strong>Secondary block says:</strong>
                                {{receivedMessage}}
                            </p>
                        </div>
                    </div>
                    <div class="actions">
                        <RockButton btnType="primary" @click="doEdit">Edit</RockButton>
                    </div>
                </template>
            </Loading>
        </template>
    </PaneledBlockTemplate>
</PrimaryBlock>`
            }));
        }
    };
});
//# sourceMappingURL=PersonDetail.js.map