import { DebugTimingViewModel } from '../Controls/PageDebugTimings';
import { Guid } from '../Util/Guid';
import { Store } from 'vuex';
import { Person, Entity } from '@Obsidian/ViewModels';
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
    title: string;
    subtitle: string;
    startTimeMs: number;
    finishTimeMs: number;
};
declare const _default: Store<RootState>;
export default _default;
