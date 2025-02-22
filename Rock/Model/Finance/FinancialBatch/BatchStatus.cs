﻿// <copyright>
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

namespace Rock.Model
{
    /// <summary>
    /// The status of a batch
    /// </summary>
    public enum BatchStatus
    {
        /// <summary>
        /// Pending
        /// In the process of scanning the checks to it
        /// </summary>
        Pending = 0,

        /// <summary>
        /// Open
        /// Transactions are all entered and are ready to be matched
        /// </summary>
        Open = 1,

        /// <summary>
        /// Closed
        /// All is well and good
        /// </summary>
        Closed = 2
    }
}