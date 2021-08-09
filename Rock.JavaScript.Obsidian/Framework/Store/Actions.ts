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

import { ActionContext, ActionTree } from 'vuex';
import { commonEntities } from './CommonEntities';
import { Mutations, MutationType } from './Mutations';
import { State } from './State';
import { PageConfig } from '../Index';

export enum ActionType {
    Initialize = 'initialize',

    RedirectToLogin = 'redirectToLogin'
}

type ActionAugments = Omit<ActionContext<State, State>, 'commit'> & {
    commit<K extends keyof Mutations>(
        key: K,
        payload: Parameters<Mutations[K]>[1]
    ): ReturnType<Mutations[K]>
}

export type Actions = {
    [ActionType.Initialize](context: ActionAugments, value: { pageConfig: PageConfig }): void;

    [ActionType.RedirectToLogin](context: ActionAugments): void;
}

export const actions: ActionTree<State, State> & Actions = {
    [ActionType.Initialize](context, value) {
        context.commit(MutationType.SetPageInitializationData, { pageConfig: value.pageConfig });

        // Initialize each common entity module
        for (const commonEntity of commonEntities) {
            context.dispatch(`${commonEntity.namespace}/initialize`);
        }
    },

    [ActionType.RedirectToLogin](context) {
        if (context.state.loginUrlWithReturnUrl) {
            window.location.href = context.state.loginUrlWithReturnUrl;
        }
    }
};
