import { GatewayControlModel } from '../../../Controls/GatewayControl';
import { Guid } from '../../../Util/Guid';
import Attribute from '../../../ViewModels/AttributeViewModel';
import { RegistrationEntryBlockSession } from './RegistrationEntryBlockArgs';
export declare enum RegistrationPersonFieldType {
    FirstName = 0,
    LastName = 1,
    Campus = 2,
    Address = 3,
    Email = 4,
    Birthdate = 5,
    Gender = 6,
    MaritalStatus = 7,
    MobilePhone = 8,
    HomePhone = 9,
    WorkPhone = 10,
    Grade = 11,
    ConnectionStatus = 12,
    MiddleName = 13,
    AnniversaryDate = 14
}
export declare enum RegistrationFieldSource {
    PersonField = 0,
    PersonAttribute = 1,
    GroupMemberAttribute = 2,
    RegistrantAttribute = 4
}
export declare enum FilterExpressionType {
    Filter = 0,
    GroupAll = 1,
    GroupAny = 2,
    GroupAllFalse = 3,
    GroupAnyFalse = 4
}
export declare enum ComparisonType {
    EqualTo = 1,
    NotEqualTo = 2,
    StartsWith = 4,
    Contains = 8,
    DoesNotContain = 16,
    IsBlank = 32,
    IsNotBlank = 64,
    GreaterThan = 128,
    GreaterThanOrEqualTo = 256,
    LessThan = 512,
    LessThanOrEqualTo = 1024,
    EndsWith = 2048,
    Between = 4096,
    RegularExpression = 8192
}
export declare enum RegistrarOption {
    PromptForRegistrar = 0,
    PrefillFirstRegistrant = 1,
    UseFirstRegistrant = 2,
    UseLoggedInPerson = 3
}
export declare enum RegistrantsSameFamily {
    No = 0,
    Yes = 1,
    Ask = 2
}
export interface SessionRenewalResult {
    spotsSecured: number;
    expirationDateTime: string;
}
export interface RegistrationEntryBlockViewModel {
    timeoutMinutes: number | null;
    registrantsSameFamily: RegistrantsSameFamily;
    maxRegistrants: number;
    registrationAttributeTitleStart: string;
    registrationAttributeTitleEnd: string;
    instructionsHtml: string;
    registrantTerm: string;
    registrationTerm: string;
    pluralRegistrationTerm: string;
    pluralRegistrantTerm: string;
    pluralFeeTerm: string;
    registrantForms: RegistrationEntryBlockFormViewModel[];
    fees: RegistrationEntryBlockFeeViewModel[];
    familyMembers: RegistrationEntryBlockFamilyMemberViewModel[];
    registrationAttributesStart: Attribute[];
    registrationAttributesEnd: Attribute[];
    forceEmailUpdate: boolean;
    registrarOption: RegistrarOption;
    cost: number;
    gatewayControl: GatewayControlModel;
    isRedirectGateway: boolean;
    spotsRemaining: number | null;
    waitListEnabled: boolean;
    instanceName: string;
    amountDueToday: number | null;
    initialAmountToPay: number | null;
    session: RegistrationEntryBlockSession | null;
    isUnauthorized: boolean;
    hasDiscountsAvailable: boolean;
    redirectGatewayUrl: string;
    loginRequiredToRegister: boolean;
    successViewModel: RegistrationEntryBlockSuccessViewModel | null;
    allowRegistrationUpdates: boolean;
    startAtBeginning: boolean;
    gatewayGuid: Guid | null;
}
export interface RegistrationEntryBlockFamilyMemberViewModel {
    guid: Guid;
    familyGuid: Guid;
    fullName: string;
    fieldValues: Record<Guid, unknown>;
}
export interface RegistrationEntryBlockFeeViewModel {
    name: string;
    guid: Guid;
    allowMultiple: boolean;
    isRequired: boolean;
    items: RegistrationEntryBlockFeeItemViewModel[];
    discountApplies: boolean;
}
export interface RegistrationEntryBlockFeeItemViewModel {
    name: string;
    guid: Guid;
    cost: number;
    countRemaining: number | null;
}
export interface RegistrationEntryBlockFormViewModel {
    fields: RegistrationEntryBlockFormFieldViewModel[];
}
export interface RegistrationEntryBlockFormFieldViewModel {
    fieldSource: RegistrationFieldSource;
    personFieldType: RegistrationPersonFieldType;
    isRequired: boolean;
    isSharedValue: boolean;
    attribute: Attribute;
    visibilityRuleType: FilterExpressionType;
    visibilityRules: RegistrationEntryBlockFormFieldRuleViewModel[];
    preHtml: string;
    postHtml: string;
    showOnWaitList: boolean;
    guid: Guid;
}
export interface RegistrationEntryBlockFormFieldRuleViewModel {
    comparedToRegistrationTemplateFormFieldGuid: Guid;
    comparisonType: ComparisonType;
    comparedToValue: string;
}
export declare type RegistrantInfo = {
    isOnWaitList: boolean;
    familyGuid: Guid;
    personGuid: Guid;
    fieldValues: Record<Guid, unknown>;
    feeItemQuantities: Record<Guid, number>;
    ownFamilyGuid: Guid;
    guid: Guid;
};
export declare type RegistrarInfo = {
    nickName: string;
    lastName: string;
    email: string;
    updateEmail: boolean;
    familyGuid: Guid | null;
    ownFamilyGuid: Guid;
};
export declare type RegistrationEntryBlockSuccessViewModel = {
    titleHtml: string;
    messageHtml: string;
    transactionCode: string;
    gatewayPersonIdentifier: string;
};
