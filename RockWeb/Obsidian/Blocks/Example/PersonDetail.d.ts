import { Guid } from '../../Util/Guid';
import { InvokeBlockActionFunc } from '../../Controls/RockBlock';
import Campus from '../../ViewModels/CodeGenerated/CampusViewModel';
import Person from '../../ViewModels/CodeGenerated/PersonViewModel';
declare type PersonViewModel = {
    Id: number;
    Guid: Guid;
    FirstName: string;
    NickName: string;
    LastName: string;
    Email: string;
    PrimaryCampusId: number | null;
    BirthDay: number | null;
    BirthMonth: number | null;
    BirthYear: number | null;
};
declare const _default: import("vue").DefineComponent<{}, {
    invokeBlockAction: InvokeBlockActionFunc;
}, {
    person: PersonViewModel | null;
    personForEditing: PersonViewModel | null;
    isEditMode: boolean;
    messageToPublish: string;
    receivedMessage: string;
    isLoading: boolean;
    campusGuid: string;
    birthdate: string | null;
    address: import("../../Controls/AddressControl").AddressControlModel;
}, {
    birthdateOrNull(): Date | null;
    birthdateFormatted(): string;
    campus(): Campus | null;
    campusName(): string;
    blockTitle(): string;
    currentPerson(): Person | null;
    currentPersonGuid(): Guid | null;
}, {
    setIsEditMode(isEditMode: boolean): void;
    doEdit(): void;
    doCancel(): void;
    doSave(): Promise<void>;
    doPublish(): void;
    receiveMessage(message: string): void;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, import("vue").EmitsOptions, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{} & {} & {}>, {}>;
export default _default;
