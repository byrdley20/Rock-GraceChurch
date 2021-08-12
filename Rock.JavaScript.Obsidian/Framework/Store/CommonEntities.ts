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
//import { generateCommonEntityModule } from './Generators';
//import { Module } from 'vuex';
//import { State } from './State';
//import { Entity } from '@Obsidian/ViewModels';

// **********************
// TODO: Common entities should probably be retired before release.
// It was a good idea to simplify things, but after further discussion it
// was decided it opens up too many security holes moving forward. Giving
// the client API access to all campuses and defined values is a bit too
// concerning.
// **********************


//export type CommonEntity = {
//    namespace: string;
//    apiUrl: string;
//};

//// The common entity configs that will be used with generateCommonEntityModule to create store modules
//export const commonEntities: CommonEntity[] = [
//];
//export const commonEntityModules: Record<string, Module<{ items: Entity[] }, State>> = {};

//// Generate a module for each config
//for (const commonEntity of commonEntities) {
//    commonEntityModules[commonEntity.namespace] = generateCommonEntityModule(commonEntity);
//}
