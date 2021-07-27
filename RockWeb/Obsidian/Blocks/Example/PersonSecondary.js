System.register(["../../Util/Bus", "../../Templates/PaneledBlockTemplate", "../../Controls/SecondaryBlock", "../../Elements/RockButton", "../../Elements/TextBox", "vue", "../../Store/Index"], function (exports_1, context_1) {
    "use strict";
    var Bus_1, PaneledBlockTemplate_1, SecondaryBlock_1, RockButton_1, TextBox_1, vue_1, Index_1;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (Bus_1_1) {
                Bus_1 = Bus_1_1;
            },
            function (PaneledBlockTemplate_1_1) {
                PaneledBlockTemplate_1 = PaneledBlockTemplate_1_1;
            },
            function (SecondaryBlock_1_1) {
                SecondaryBlock_1 = SecondaryBlock_1_1;
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
            }
        ],
        execute: function () {
            exports_1("default", vue_1.defineComponent({
                name: 'Example.PersonSecondary',
                components: {
                    PaneledBlockTemplate: PaneledBlockTemplate_1.default,
                    SecondaryBlock: SecondaryBlock_1.default,
                    TextBox: TextBox_1.default,
                    RockButton: RockButton_1.default
                },
                data() {
                    return {
                        messageToPublish: '',
                        receivedMessage: ''
                    };
                },
                methods: {
                    receiveMessage(message) {
                        this.receivedMessage = message;
                    },
                    doPublish() {
                        Bus_1.default.publish('PersonSecondary:Message', this.messageToPublish);
                        this.messageToPublish = '';
                    },
                    doThrowError() {
                        throw new Error('This is an uncaught error');
                    }
                },
                computed: {
                    currentPerson() {
                        return Index_1.default.state.currentPerson;
                    },
                    currentPersonName() {
                        var _a;
                        return ((_a = this.currentPerson) === null || _a === void 0 ? void 0 : _a.fullName) || 'anonymous';
                    },
                    imageUrl() {
                        var _a;
                        return ((_a = this.currentPerson) === null || _a === void 0 ? void 0 : _a.photoUrl) || '/Assets/Images/person-no-photo-unknown.svg';
                    },
                    photoElementStyle() {
                        return `background-image: url("${this.imageUrl}"); background-size: cover; background-repeat: no-repeat;`;
                    }
                },
                created() {
                    Bus_1.default.subscribe('PersonDetail:Message', this.receiveMessage);
                },
                template: `<SecondaryBlock>
    <PaneledBlockTemplate>
        <template v-slot:title>
            <i class="fa fa-flask"></i>
            Secondary Block
        </template>
        <template v-slot:default>
            <div class="row">
                <div class="col-sm-6">
                    <p>
                        Hi, {{currentPersonName}}!
                        <div class="photo-icon photo-round photo-round-sm" :style="photoElementStyle"></div>
                    </p>
                    <p>This is a secondary block. It respects the store's value indicating if secondary blocks are visible.</p>
                    <RockButton btnType="danger" btnSize="sm" @click="doThrowError">Throw Error</RockButton>
                </div>
                <div class="col-sm-6">
                    <div class="well">
                        <TextBox label="Message" v-model="messageToPublish" />
                        <RockButton btnType="primary" btnSize="sm" @click="doPublish">Publish</RockButton>
                    </div>
                    <p>
                        <strong>Detail block says:</strong>
                        {{receivedMessage}}
                    </p>
                </div>
            </div>
        </template>
    </PaneledBlockTemplate>
</SecondaryBlock>`
            }));
        }
    };
});
//# sourceMappingURL=PersonSecondary.js.map