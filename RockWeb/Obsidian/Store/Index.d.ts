import { DebugTimingViewModel } from '../Controls/PageDebugTimings';
import { Guid } from '../Util/Guid';
import { Store } from 'vuex';
import Person from '../ViewModels/CodeGenerated/PersonViewModel';
import Entity from '../ViewModels/Entity';
export interface RootState {
    areSecondaryBlocksShown: boolean;
    currentPerson: Person | null;
    pageParameters: Record<string, unknown>;
    contextEntities: Record<string, Entity>;
    pageId: number;
    pageGuid: Guid;
    executionStartTime: Date;
    debugTimings: DebugTimingViewModel[];
    loginUrlWithReturnUrl: string;
}
declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $store: Store<RootState>;
    }
}
export declare type ReportDebugTimingArgs = {
    Title: string;
    Subtitle: string;
    StartTimeMs: number;
    FinishTimeMs: number;
};
declare const _default: Store<RootState>;
export default _default;
