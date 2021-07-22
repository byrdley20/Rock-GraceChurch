import { SortProperty } from '../../Controls/Grid';
import { InvokeBlockActionFunc } from '../../Controls/RockBlock';
declare type GroupMemberViewModel = {
    FullName: string;
    GroupMemberId: number;
    PersonId: number;
    PhotoUrl: string;
    RoleName: string;
    StatusName: string;
};
declare const _default: import("vue").DefineComponent<{}, {
    invokeBlockAction: InvokeBlockActionFunc;
}, {
    isLoading: boolean;
    errorMessage: string;
    members: GroupMemberViewModel[];
    sortProperty: SortProperty;
}, {
    groupId(): number;
}, {
    fetchGroupMembers(): Promise<void>;
    onRowClick(rowContext: any): void;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, import("vue").EmitsOptions, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{} & {} & {}>, {}>;
export default _default;
