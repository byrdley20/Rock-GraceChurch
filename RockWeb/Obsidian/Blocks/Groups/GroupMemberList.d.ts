import { RowContext, SortProperty } from '../../Controls/Grid';
import { InvokeBlockActionFunc } from '../../Controls/RockBlock';
declare type GroupMemberViewModel = {
    fullName: string;
    groupMemberId: number;
    personId: number;
    photoUrl: string;
    roleName: string;
    statusName: string;
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
    onRowClick(rowContext: RowContext): void;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, import("vue").EmitsOptions, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{} & {} & {}>, {}>;
export default _default;
