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
import { createStore, Store as VuexStore } from 'vuex';
//import { commonEntityModules } from './CommonEntities';
import { State, state } from './State';
import { mutations } from './Mutations';
import { actions } from './Actions';
import { Getters, getters } from './Getters';

export { MutationType, PageDebugTiming } from './Mutations';
export { ActionType } from './Actions';


declare module '@vue/runtime-core' {
    // provide typings for `this.$store`
    interface ComponentCustomProperties {
        $store: Store
    }
}


// Declare the Vuex store
export const store: Store = createStore<State>({
    state,
    getters,
    mutations,
    actions,
    modules: {
        //...commonEntityModules
    }
});

export default store;

export function useStore(): Store {
    return store as Store;
}

export type Store = Omit<
    VuexStore<State>,
    'getters' // | 'commit' | 'dispatch'
> & {
    getters: {
        [K in keyof Getters]: ReturnType<Getters[K]>
    } & {
        [index: string]: unknown
    }
}
// The following sets hard typescript bindings for what keys can be passed
// to commit and dispatch. For now leave out until we decide if this is safe.
//> & {
//    commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
//        key: K,
//        payload: P,
//        options?: CommitOptions
//    ): ReturnType<Mutations[K]>
//} & {
//    dispatch<K extends keyof Actions>(
//        key: K,
//        payload?: Parameters<Actions[K]>[1],
//        options?: DispatchOptions
//    ): ReturnType<Actions[K]>
//}
