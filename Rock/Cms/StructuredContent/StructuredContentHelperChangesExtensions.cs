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
using System;
using System.Collections.Generic;
using System.Linq;

using Newtonsoft.Json.Linq;

using Rock.Data;
using Rock.Model;

using StandardBlockTypes = Rock.Cms.StructuredContentHelper.StandardBlockTypes;

namespace Rock.Cms.StructuredContent
{
    /// <summary>
    /// Extension methods for <see cref="StructuredContentHelper"/> that provides
    /// additional methods related to changes (and require database access).
    /// </summary>
    public static class StructuredContentHelperChangesExtensions
    {
        /// <summary>
        /// Detects the changes that need to be applied to the database by
        /// looking at the old content and the current content.
        /// </summary>
        /// <param name="helper">The content helper.</param>
        /// <param name="oldContent">The old structured content before the save.</param>
        /// <returns>
        /// The changes that were detected.
        /// </returns>
        public static StructuredContentChanges DetectChanges( this StructuredContentHelper helper, string oldContent = "" )
        {
            var changes = new StructuredContentChanges();
            var oldBinaryFileIds = new List<int>();
            var newBinaryFileIds = new List<int>();
            var newData = helper.Content?.FromJsonOrNull<StructuredContentData>() ?? new StructuredContentData();
            var oldData = oldContent?.FromJsonOrNull<StructuredContentData>() ?? new StructuredContentData();

            // Find all image blocks in the new data that have a binary file
            // identifier and store it.
            foreach ( var block in newData.Blocks )
            {
                if ( block.Type == StandardBlockTypes.Image )
                {
                    var data = ( ( JToken ) block.Data ).ToObject<StructuredContentImageData>();

                    if ( data.File?.FileId != null )
                    {
                        newBinaryFileIds.Add( data.File.FileId.Value );
                    }
                }
            }

            // Find all image blocks in the old data that have a binary file
            // identifier and store it.
            foreach ( var block in oldData.Blocks )
            {
                if ( block.Type == StandardBlockTypes.Image )
                {
                    var data = ( ( JToken ) block.Data ).ToObject<StructuredContentImageData>();

                    if ( data.File?.FileId != null )
                    {
                        oldBinaryFileIds.Add( data.File.FileId.Value );
                    }
                }
            }

            // Determine if we have any added or removed binary file identifiers.
            changes.AddedBinaryFileIds = newBinaryFileIds.Except( oldBinaryFileIds ).ToList();
            changes.RemovedBinaryFileIds = oldBinaryFileIds.Except( newBinaryFileIds ).ToList();

            // Let all custom block types partake in the change detection.
            foreach ( var blockType in helper.GetCustomBlockTypes() )
            {
                if ( !( blockType is IStructuredContentBlockTypeChanges blockTypeChanges ) )
                {
                    continue;
                }

                // Walk all the blocks that already existed and still exist or
                // are new in the data.
                foreach ( var newBlock in newData.Blocks )
                {
                    if ( newBlock.Type == blockTypeChanges.BlockType )
                    {
                        var oldBlock = oldData.Blocks.FirstOrDefault( b => b.Id == newBlock.Id );

                        blockTypeChanges.DetectChanges( newBlock.Data, oldBlock?.Data, changes );
                    }
                }

                // Walk all the old blocks that no longer exist.
                var newBlockIds = newData.Blocks.Select( b => b.Id ).ToList();
                foreach ( var removedBlock in oldData.Blocks.Where( b => !newBlockIds.Contains( b.Id ) ) )
                {
                    if ( removedBlock.Type == blockTypeChanges.BlockType )
                    {
                        blockTypeChanges.DetectChanges( null, removedBlock.Data, changes );
                    }
                }
            }

            return changes;
        }

        /// <summary>
        /// Updates the binary files referenced by the content. This will mark newly
        /// uploaded files as permanent and mark removed files as temporary so they
        /// get cleaned up later. This method will call SaveChanges() so you may
        /// want to call this inside a transaction to ensure everything either works
        /// or is rolled back.
        /// </summary>
        /// <param name="helper">The content helper.</param>
        /// <param name="changes">The changes that were returned by a previous call to DetectChanges()." />.</param>
        /// <param name="rockContext">The rock database context to use when saving changes.</param>
        public static void SaveDatabaseChanges( this StructuredContentHelper helper, StructuredContentChanges changes, RockContext rockContext )
        {
            if ( changes == null )
            {
                throw new ArgumentNullException( nameof( changes ) );
            }

            if ( rockContext == null )
            {
                throw new ArgumentNullException( nameof( rockContext ) );
            }

            bool needSave = false;
            var binaryFileService = new BinaryFileService( rockContext );

            // If there are any newly added binary files then mark them as
            // permanent so they will persist in the database.
            if ( changes.AddedBinaryFileIds != null && changes.AddedBinaryFileIds.Count > 0 )
            {
                var filesToAdd = binaryFileService.Queryable()
                    .Where( b => changes.AddedBinaryFileIds.Contains( b.Id ) )
                    .ToList();

                filesToAdd.ForEach( b => b.IsTemporary = false );
                needSave = true;
            }

            // If there are any removed binary files then mark them as temporary
            // so they will be later removed by the cleanup job.
            if ( changes.RemovedBinaryFileIds != null && changes.RemovedBinaryFileIds.Count > 0 )
            {
                var filesToRemove = binaryFileService.Queryable()
                    .Where( b => changes.RemovedBinaryFileIds.Contains( b.Id ) )
                    .ToList();

                filesToRemove.ForEach( b => b.IsTemporary = true );
                needSave = true;
            }

            // Let all custom block types partake in the change detection.
            foreach ( var blockType in helper.GetCustomBlockTypes() )
            {
                if ( !( blockType is IStructuredContentBlockTypeChanges blockTypeChanges ) )
                {
                    continue;
                }

                if ( blockTypeChanges.ApplyDatabaseChanges( helper, changes, rockContext ) )
                {
                    needSave = true;
                }
            }

            if ( needSave )
            {
                rockContext.SaveChanges();
            }
        }
    }
}
