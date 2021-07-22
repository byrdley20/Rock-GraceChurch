import { DropDownListOption } from '../../../Elements/DropDownList';
import Person from '../../../ViewModels/CodeGenerated/PersonViewModel';
import { RegistrantBasicInfo, RegistrationEntryState } from '../RegistrationEntry';
import { RegistrationEntryBlockArgs } from './RegistrationEntryBlockArgs';
import { RegistrantInfo, RegistrarInfo, RegistrationEntryBlockViewModel } from './RegistrationEntryBlockViewModel';
declare const _default: import("vue").DefineComponent<{}, {
    getRegistrationEntryBlockArgs: () => RegistrationEntryBlockArgs;
    registrationEntryState: RegistrationEntryState;
}, {
    isRegistrarPanelShown: boolean;
}, {
    useLoggedInPersonForRegistrar(): boolean;
    currentPerson(): Person | null;
    registrar(): RegistrarInfo;
    firstRegistrant(): RegistrantInfo;
    viewModel(): RegistrationEntryBlockViewModel;
    doShowUpdateEmailOption(): boolean;
    registrantInfos(): RegistrantBasicInfo[];
    registrantTerm(): string;
    instanceName(): string;
    familyOptions(): DropDownListOption[];
}, {
    prefillRegistrar(): void;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, import("vue").EmitsOptions, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{} & {} & {}>, {}>;
export default _default;
