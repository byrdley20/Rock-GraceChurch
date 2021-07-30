import { Module } from 'vuex';
import { RootState } from './Index';
import { Entity } from '@Obsidian/ViewModels';
export declare type CommonEntity = {
    namespace: string;
    apiUrl: string;
};
export declare const commonEntities: CommonEntity[];
export declare const commonEntityModules: Record<string, Module<{
    items: Entity[];
}, RootState>>;
