import { App } from 'vue';
import { Guid } from './Util/Guid';
import './Rules/Index';
import Person from './ViewModels/CodeGenerated/PersonViewModel';
import Entity from './ViewModels/Entity';
import { DebugTimingViewModel } from './Controls/PageDebugTimings';
export declare type ConfigurationValues = Record<string, unknown>;
export declare type BlockConfig = {
    blockFileUrl: string;
    rootElement: Element;
    blockGuid: Guid;
    configurationValues: ConfigurationValues;
};
export declare type PageConfig = {
    executionStartTime: Date;
    pageId: number;
    pageGuid: Guid;
    pageParameters: Record<string, unknown>;
    currentPerson: Person | null;
    contextEntities: Record<string, Entity>;
    loginUrlWithReturnUrl: string;
};
declare type DebugTimingConfig = {
    elementId: string;
    debugTimingViewModels: DebugTimingViewModel[];
};
export declare function initializeBlock(config: BlockConfig): Promise<App>;
export declare function initializePage(pageConfig: PageConfig): Promise<void>;
export declare function initializePageTimings(config: DebugTimingConfig): void;
export {};
