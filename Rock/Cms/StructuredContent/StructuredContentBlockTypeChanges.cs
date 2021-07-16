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
using Rock.Data;

namespace Rock.Cms.StructuredContent
{
    /// <summary>
    /// Provides the standard functionality for a plugin to add a new structured
    /// content block type to the system so it can be rendered out by Rock. This
    /// also allows for detecting and processing changes made.
    /// </summary>
    /// <remarks>
    /// Subclass this class rather than trying to implement <see cref="IStructuredContentBlockType"/> directly.
    /// </remarks>
    /// <typeparam name="TData">The type of the block data.</typeparam>
    /// <seealso cref="IStructuredContentBlockTypeChanges" />
    public abstract class StructuredContentBlockTypeChanges<TData> : StructuredContentBlockType<TData>, IStructuredContentBlockTypeChanges
        where TData : class
    {
        /// <inheritdoc/>
        void IStructuredContentBlockTypeChanges.DetectChanges( dynamic newData, dynamic oldData, StructuredContentChanges changes )
        {
        }

        /// <inheritdoc cref="IStructuredContentBlockTypeChanges.DetectChanges(dynamic, dynamic, StructuredContentChanges)"/>
        protected virtual void DetectBlockChanges( TData newData, TData oldData, StructuredContentChanges changes )
        {
        }

        /// <inheritdoc/>
        public virtual bool ApplyDatabaseChanges( StructuredContentHelper helper, StructuredContentChanges changes, RockContext rockContext )
        {
            return false;
        }
    }
}
