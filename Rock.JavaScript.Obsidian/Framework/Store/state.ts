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

import { Entity, Person } from "@Obsidian/ViewModels";
import { DebugTimingViewModel } from "../Controls/pageDebugTimings";
import { Guid } from "../Util/guid";

export type State = {
    areSecondaryBlocksShown: boolean;
    currentPerson: Person | null;
    pageParameters: Record<string, unknown>;
    contextEntities: Record<string, Entity>;
    pageId: number;
    pageGuid: Guid;
    executionStartTime: Date;
    debugTimings: DebugTimingViewModel[],
    loginUrlWithReturnUrl: string
};

export const state: State = {
    areSecondaryBlocksShown: true,
    currentPerson: null,
    pageParameters: {},
    contextEntities: {},
    pageId: 0,
    pageGuid: "" as Guid,
    executionStartTime: new Date(),
    debugTimings: [],
    loginUrlWithReturnUrl: ""
};
