import Campus from '../../ViewModels/CodeGenerated/CampusViewModel';
import { ItemWithPreAndPostHtml } from '../../Elements/ItemsWithPreAndPostHtml';
import { ProgressTrackerItem } from '../../Elements/ProgressTracker';
declare const _default: import("vue").DefineComponent<{}, {}, {
    campusGuid: string;
    currency: number;
    email: string;
    numberUpDown: number;
    address: import("../../Controls/AddressControl").AddressControlModel;
    toggle: boolean;
    prePostHtmlItems: ItemWithPreAndPostHtml[];
    progressTrackerIndex: number;
    progressTrackerItems: ProgressTrackerItem[];
}, {
    campus(): Campus | null;
    campusName(): string;
    campusId(): number | null;
}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, import("vue").EmitsOptions, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{} & {} & {}>, {}>;
export default _default;
