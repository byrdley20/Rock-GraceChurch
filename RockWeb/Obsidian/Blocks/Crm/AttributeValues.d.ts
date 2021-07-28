import { InvokeBlockActionFunc } from '../../Controls/RockBlock';
import { ConfigurationValues } from '../../Index';
import { Guid } from '../../Util/Guid';
import Person from '../../ViewModels/PersonViewModel';
import AttributeValue from '../../ViewModels/AttributeValueViewModel';
declare const _default: import("vue").DefineComponent<{}, {
    invokeBlockAction: InvokeBlockActionFunc;
    configurationValues: ConfigurationValues;
}, {
    isLoading: boolean;
    isEditMode: boolean;
}, {
    person(): Person | null;
    personGuid(): Guid | null;
    categoryGuids(): Guid[];
    useAbbreviatedNames(): boolean;
    attributeValues(): AttributeValue[];
}, {
    goToViewMode(): void;
    goToEditMode(): void;
    doSave(): Promise<void>;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, import("vue").EmitsOptions, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{} & {} & {}>, {}>;
export default _default;
