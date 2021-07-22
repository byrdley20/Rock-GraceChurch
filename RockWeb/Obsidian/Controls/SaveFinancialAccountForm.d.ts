import { PropType } from "vue";
import Person from "../ViewModels/CodeGenerated/PersonViewModel";
import { BlockHttp } from "./RockBlock";
declare const SaveFinancialAccountForm: import("vue").DefineComponent<{
    gatewayGuid: {
        type: PropType<string>;
        required: true;
    };
    transactionCode: {
        type: PropType<string>;
        required: true;
    };
    gatewayPersonIdentifier: {
        type: PropType<string>;
        required: true;
    };
}, {
    http: BlockHttp;
}, {
    doSave: boolean;
    username: string;
    password: string;
    confirmPassword: string;
    savedAccountName: string;
    isLoading: boolean;
    successTitle: string;
    successMessage: string;
    errorTitle: string;
    errorMessage: string;
}, {
    currentPerson(): Person | null;
    isLoginCreationNeeded(): boolean;
}, {
    onSubmit(): Promise<void>;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    gatewayGuid?: unknown;
    transactionCode?: unknown;
    gatewayPersonIdentifier?: unknown;
} & {
    gatewayGuid: string;
    transactionCode: string;
    gatewayPersonIdentifier: string;
} & {}>, {}>;
export default SaveFinancialAccountForm;
