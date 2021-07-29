System.register(["vue", "../../../Controls/AttributeValuesContainer", "../../../Controls/RockForm", "../../../Elements/RockButton"], function (exports_1, context_1) {
    "use strict";
    var vue_1, AttributeValuesContainer_1, RockForm_1, RockButton_1;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (AttributeValuesContainer_1_1) {
                AttributeValuesContainer_1 = AttributeValuesContainer_1_1;
            },
            function (RockForm_1_1) {
                RockForm_1 = RockForm_1_1;
            },
            function (RockButton_1_1) {
                RockButton_1 = RockButton_1_1;
            }
        ],
        execute: function () {
            exports_1("default", vue_1.defineComponent({
                name: 'Event.RegistrationEntry.RegistrationStart',
                components: {
                    RockButton: RockButton_1.default,
                    AttributeValuesContainer: AttributeValuesContainer_1.default,
                    RockForm: RockForm_1.default
                },
                setup() {
                    return {
                        registrationEntryState: vue_1.inject('registrationEntryState')
                    };
                },
                data() {
                    return {
                        attributeValues: []
                    };
                },
                computed: {
                    showPrevious() {
                        return this.registrationEntryState.firstStep === this.registrationEntryState.steps.intro;
                    }
                },
                methods: {
                    onPrevious() {
                        this.$emit('previous');
                    },
                    onNext() {
                        this.$emit('next');
                    }
                },
                watch: {
                    viewModel: {
                        immediate: true,
                        handler() {
                            this.attributeValues = this.registrationEntryState.viewModel.registrationAttributesStart.map(a => {
                                const currentValue = this.registrationEntryState.registrationFieldValues[a.guid] || '';
                                return {
                                    attribute: a,
                                    attributeId: a.id,
                                    value: currentValue
                                };
                            });
                        }
                    },
                    attributeValues: {
                        immediate: true,
                        deep: true,
                        handler() {
                            for (const attributeValue of this.attributeValues) {
                                const attribute = attributeValue.attribute;
                                if (attribute) {
                                    this.registrationEntryState.registrationFieldValues[attribute.guid] = attributeValue.value;
                                }
                            }
                        }
                    }
                },
                template: `
<div class="registrationentry-registration-attributes">
    <RockForm @submit="onNext">
        <AttributeValuesContainer :attributeValues="attributeValues" isEditMode />

        <div class="actions row">
            <div class="col-xs-6">
                <RockButton v-if="showPrevious" btnType="default" @click="onPrevious">
                    Previous
                </RockButton>
            </div>
            <div class="col-xs-6 text-right">
                <RockButton btnType="primary" type="submit">
                    Next
                </RockButton>
            </div>
        </div>
    </RockForm>
</div>`
            }));
        }
    };
});
//# sourceMappingURL=RegistrationStart.js.map