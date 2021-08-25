// <copyright>
// Copyright by the Spark Development Network
//
// Licensed under the Rock Community License (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.rockrms.com/license
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
// </copyright>
//

import { MutationTree } from 'vuex';
import { PageConfig } from '../index';
import { State } from './state';

export type PageDebugTiming = {
    title: string;
    subtitle: string;
    startTimeMs: number;
    finishTimeMs: number;
};

/**
 * The types of mutations that can be performed in the commit functions.
 */
export const enum MutationType {
    SetAreSecondaryBlocksShown = 'setAreSecondaryBlocksShown',

    SetPageInitializationData = 'setPageInitializationData',

    AddPageDebugTiming = 'addPageDebugTiming'
}

/**
 * The definition of the mutation (commit) functions and their parameters.
 */
export type Mutations = {
    [MutationType.SetAreSecondaryBlocksShown](state: State, value: { areSecondaryBlocksShown: boolean }): void;

    [MutationType.SetPageInitializationData](state: State, value: { pageConfig: PageConfig }): void;

    [MutationType.AddPageDebugTiming](state: State, value: PageDebugTiming): void;
}

/**
 * The implementation of the various mutations that can be performed.
 */
export const mutations: MutationTree<State> & Mutations = {
    [MutationType.SetAreSecondaryBlocksShown](state, value) {
        state.areSecondaryBlocksShown = value.areSecondaryBlocksShown;
    },

    [MutationType.SetPageInitializationData](state, value) {
        state.currentPerson = value.pageConfig.currentPerson || null;
        state.pageParameters = value.pageConfig.pageParameters || {};
        state.contextEntities = value.pageConfig.contextEntities || {};
        state.pageId = value.pageConfig.pageId || 0;
        state.pageGuid = value.pageConfig.pageGuid || '';
        state.executionStartTime = value.pageConfig.executionStartTime;
        state.loginUrlWithReturnUrl = value.pageConfig.loginUrlWithReturnUrl;
    },

    [MutationType.AddPageDebugTiming](state, value) {
        const pageStartTime = state.executionStartTime.getTime();
        const timestampMs = value.startTimeMs - pageStartTime;
        const durationMs = value.finishTimeMs - value.startTimeMs;

        state.debugTimings.push({
            TimestampMs: timestampMs,
            DurationMs: durationMs,
            IndentLevel: 1,
            IsTitleBold: false,
            SubTitle: value.subtitle,
            Title: value.title
        });
    }
};
