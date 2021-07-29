System.register(["vue", "../../../Elements/Alert", "../../../Elements/NumberUpDown", "../../../Elements/RockButton", "../../../Services/String", "../../../Util/Guid", "../RegistrationEntry"], function (exports_1, context_1) {
    "use strict";
    var vue_1, Alert_1, NumberUpDown_1, RockButton_1, String_1, Guid_1, RegistrationEntry_1;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (Alert_1_1) {
                Alert_1 = Alert_1_1;
            },
            function (NumberUpDown_1_1) {
                NumberUpDown_1 = NumberUpDown_1_1;
            },
            function (RockButton_1_1) {
                RockButton_1 = RockButton_1_1;
            },
            function (String_1_1) {
                String_1 = String_1_1;
            },
            function (Guid_1_1) {
                Guid_1 = Guid_1_1;
            },
            function (RegistrationEntry_1_1) {
                RegistrationEntry_1 = RegistrationEntry_1_1;
            }
        ],
        execute: function () {
            exports_1("default", vue_1.defineComponent({
                name: 'Event.RegistrationEntry.Intro',
                components: {
                    NumberUpDown: NumberUpDown_1.default,
                    RockButton: RockButton_1.default,
                    Alert: Alert_1.default
                },
                data() {
                    const registrationEntryState = vue_1.inject('registrationEntryState');
                    return {
                        numberOfRegistrants: registrationEntryState.registrants.length,
                        registrationEntryState,
                        showRemainingCapacity: false
                    };
                },
                computed: {
                    currentPerson() {
                        return this.$store.state.currentPerson;
                    },
                    viewModel() {
                        return this.registrationEntryState.viewModel;
                    },
                    numberToAddToWaitlist() {
                        if (this.viewModel.spotsRemaining === null || !this.viewModel.waitListEnabled) {
                            return 0;
                        }
                        if (this.viewModel.spotsRemaining >= this.numberOfRegistrants) {
                            return 0;
                        }
                        return this.numberOfRegistrants - this.viewModel.spotsRemaining;
                    },
                    remainingCapacityPhrase() {
                        const spots = this.viewModel.spotsRemaining;
                        if (spots === null) {
                            return '';
                        }
                        return String_1.pluralConditional(spots, `1 more ${this.registrantTerm}`, `${spots} more ${this.registrantTermPlural}`);
                    },
                    isFull() {
                        if (this.viewModel.spotsRemaining === null) {
                            return false;
                        }
                        return this.viewModel.spotsRemaining < 1;
                    },
                    registrantTerm() {
                        this.viewModel.instanceName;
                        return (this.viewModel.registrantTerm || 'registrant').toLowerCase();
                    },
                    registrantTermPlural() {
                        return (this.viewModel.pluralRegistrantTerm || 'registrants').toLowerCase();
                    },
                    registrationTerm() {
                        return (this.viewModel.registrationTerm || 'registration').toLowerCase();
                    },
                    registrationTermPlural() {
                        return (this.viewModel.pluralRegistrationTerm || 'registrations').toLowerCase();
                    },
                    registrationTermTitleCase() {
                        return String_1.toTitleCase(this.registrationTerm);
                    }
                },
                methods: {
                    pluralConditional: String_1.pluralConditional,
                    onNext() {
                        const forcedFamilyGuid = RegistrationEntry_1.getForcedFamilyGuid(this.currentPerson, this.viewModel);
                        const usedFamilyMemberGuids = this.registrationEntryState.registrants
                            .filter(r => r.personGuid)
                            .map(r => r.personGuid);
                        const availableFamilyMembers = this.viewModel.familyMembers
                            .filter(fm => Guid_1.areEqual(fm.familyGuid, forcedFamilyGuid) &&
                            !usedFamilyMemberGuids.includes(fm.guid));
                        while (this.numberOfRegistrants > this.registrationEntryState.registrants.length) {
                            const registrant = RegistrationEntry_1.getDefaultRegistrantInfo(this.currentPerson, this.viewModel, forcedFamilyGuid);
                            this.registrationEntryState.registrants.push(registrant);
                        }
                        this.registrationEntryState.registrants.length = this.numberOfRegistrants;
                        const firstWaitListIndex = this.numberOfRegistrants - this.numberToAddToWaitlist;
                        for (let i = firstWaitListIndex; i < this.numberOfRegistrants; i++) {
                            this.registrationEntryState.registrants[i].isOnWaitList = true;
                        }
                        if (availableFamilyMembers.length && this.registrationEntryState.registrants.length) {
                            const familyMember = availableFamilyMembers[0];
                            const registrant = this.registrationEntryState.registrants[0];
                            registrant.personGuid = familyMember.guid;
                        }
                        this.$emit('next');
                    },
                },
                watch: {
                    numberOfRegistrants() {
                        if (!this.viewModel.waitListEnabled && this.viewModel.spotsRemaining !== null && this.viewModel.spotsRemaining < this.numberOfRegistrants) {
                            this.showRemainingCapacity = true;
                            const spotsRemaining = this.viewModel.spotsRemaining;
                            this.$nextTick(() => this.numberOfRegistrants = spotsRemaining);
                        }
                    }
                },
                template: `
<div class="registrationentry-intro">
    <Alert v-if="isFull && numberToAddToWaitlist !== numberOfRegistrants" class="text-left" alertType="warning">
        <strong>{{registrationTermTitleCase}} Full</strong>
        <p>
            There are not any more {{registrationTermPlural}} available for {{viewModel.instanceName}}. 
        </p>
    </Alert>
    <Alert v-if="showRemainingCapacity" class="text-left" alertType="warning">
        <strong>{{registrationTermTitleCase}} Full</strong>
        <p>
            This {{registrationTerm}} only has capacity for {{remainingCapacityPhrase}}.
        </p>
    </Alert>
    <div class="text-left" v-html="viewModel.instructionsHtml">
    </div>
    <div v-if="viewModel.maxRegistrants > 1" class="registrationentry-intro">
        <h1>How many {{viewModel.pluralRegistrantTerm}} will you be registering?</h1>
        <NumberUpDown v-model="numberOfRegistrants" class="margin-t-sm" numberIncrementClasses="input-lg" :max="viewModel.maxRegistrants" />
    </div>
    <Alert v-if="viewModel.timeoutMinutes" alertType="info" class="text-left">
        Due to a high-volume of expected interest, your {{registrationTerm}} session will expire after
        {{pluralConditional(viewModel.timeoutMinutes, 'a minute', viewModel.timeoutMinutes + ' minutes')}}
        of inactivity.
    </Alert>
    <Alert v-if="numberToAddToWaitlist === numberOfRegistrants" class="text-left" alertType="warning">
        This {{registrationTerm}} has reached its capacity. Complete the registration to be added to the waitlist.
    </Alert>
    <Alert v-else-if="numberToAddToWaitlist" class="text-left" alertType="warning">
        This {{registrationTerm}} only has capacity for {{remainingCapacityPhrase}}.
        The first {{pluralConditional(viewModel.spotsRemaining, registrantTerm, viewModel.spotsRemaining + ' ' + registrantTermPlural)}} you add will be registered for {{viewModel.instanceName}}.
        The remaining {{pluralConditional(numberToAddToWaitlist, registrantTerm, numberToAddToWaitlist + ' ' + registrantTermPlural)}} will be added to the waitlist. 
    </Alert>
    <div class="actions text-right">
        <RockButton btnType="primary" @click="onNext">
            Next
        </RockButton>
    </div>
</div>`
            }));
        }
    };
});
//# sourceMappingURL=Intro.js.map