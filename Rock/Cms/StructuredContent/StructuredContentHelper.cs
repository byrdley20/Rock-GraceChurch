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
using System.IO;
using System.Linq;
using System.Text;

namespace Rock.Cms.StructuredContent
{
    /// <summary>
    /// Various helper methods when working with structured content. Automates
    /// many of the tasks you might otherwise have to code by hand.
    /// </summary>
    public class StructuredContentHelper
    {
        #region Fields

        /// <summary>
        /// The custom block types that have been found.
        /// </summary>
        private static List<IStructuredContentBlockType> _customBlockTypes;

        /// <summary>
        /// The standard block types that have been found.
        /// </summary>
        private static List<IStructuredContentBlockType> _standardBlockTypes;

        /// <summary>
        /// The block types that will be used during standard render operations.
        /// </summary>
        private static Dictionary<string, IStructuredContentBlockType> _blockTypes;

        #endregion

        #region Properties

        /// <summary>
        /// Gets the structured content JSON string.
        /// </summary>
        /// <value>
        /// The structured content JSON string.
        /// </value>
        public string Content { get; }

        #endregion

        #region Constructors

        /// <summary>
        /// Initializes a new instance of the <see cref="StructuredContentHelper"/> class.
        /// </summary>
        /// <param name="content">The structured content JSON string.</param>
        public StructuredContentHelper( string content )
        {
            Content = content;
        }

        #endregion

        #region Method

        /// <summary>
        /// Gets the custom block types registered in the system.
        /// </summary>
        /// <returns>An enumeration of <see cref="IStructuredContentBlockType"/> instances.</returns>
        public virtual IEnumerable<IStructuredContentBlockType> GetCustomBlockTypes()
        {
            if ( _customBlockTypes == null )
            {
                var blockTypeTypes = Reflection.FindTypes( typeof( IStructuredContentBlockType ) )
                    .Where( a => a.Value.Assembly != typeof( BlockType.Paragraph ).Assembly )
                    .Select( a => a.Value );

                var blockTypes = new List<IStructuredContentBlockType>();

                foreach ( var type in blockTypeTypes )
                {
                    try
                    {
                        var blockType = ( IStructuredContentBlockType ) Activator.CreateInstance( type );
                        blockTypes.Add( blockType );
                    }
                    catch
                    {
                        /* Exception intentionally ignored. */
                    }
                }

                _customBlockTypes = blockTypes;
            }

            return _customBlockTypes;
        }

        /// <summary>
        /// Gets the standard block types registered in the system.
        /// </summary>
        /// <returns>An enumeration of <see cref="IStructuredContentBlockType"/> instances.</returns>
        public virtual IEnumerable<IStructuredContentBlockType> GetStandardBlockTypes()
        {
            if ( _standardBlockTypes == null )
            {
                var blockTypeTypes = Reflection.FindTypes( typeof( IStructuredContentBlockType ) )
                    .Where( a => a.Value.Assembly == typeof( BlockType.Paragraph ).Assembly )
                    .Select( a => a.Value );

                var blockTypes = new List<IStructuredContentBlockType>();

                foreach ( var type in blockTypeTypes )
                {
                    try
                    {
                        var blockType = ( IStructuredContentBlockType ) Activator.CreateInstance( type );
                        blockTypes.Add( blockType );
                    }
                    catch
                    {
                        /* Exception intentionally ignored. */
                    }
                }

                _standardBlockTypes = blockTypes;
            }

            return _standardBlockTypes;
        }

        /// <summary>
        /// Gets the block types used for standard rendering operations.
        /// </summary>
        /// <returns>A dictionary of <see cref="IStructuredContentBlockType"/> instances.</returns>
        public virtual IReadOnlyDictionary<string, IStructuredContentBlockType> GetBlockTypes()
        {
            if ( _blockTypes == null )
            {
                var blockTypes = GetStandardBlockTypes().ToDictionary( b => b.BlockType, b => b );

                foreach ( var blockType in GetCustomBlockTypes() )
                {
                    blockTypes.AddOrIgnore( blockType.BlockType, blockType );
                }
            }

            return _blockTypes;
        }

        /// <summary>
        /// Renders the content and returns the string representation.
        /// </summary>
        /// <returns>A string that contains the rendered contents.</returns>
        public string Render()
        {
            var sb = new StringBuilder();

            using ( var writer = new StringWriter() )
            {
                Render( writer );
            }

            return sb.ToString();
        }

        /// <summary>
        /// Renders the block contents.
        /// </summary>
        /// <param name="writer">The writer to use when rendering blocks.</param>
        public void Render( TextWriter writer )
        {
            Render( writer, GetBlockTypes() );
        }

        /// <summary>
        /// Renders the block contents using the specified block types.
        /// </summary>
        /// <param name="writer">The writer to use when rendering blocks.</param>
        /// <param name="blockTypes">The block types used to render</param>
        public void Render( TextWriter writer, IReadOnlyDictionary<string, IStructuredContentBlockType> blockTypes )
        {
            var contentData = Content?.FromJsonOrNull<StructuredContentData>() ?? new StructuredContentData();

            foreach ( var block in contentData.Blocks )
            {
                if ( blockTypes.TryGetValue( block.Type, out var blockType ) )
                {
                    blockType.Render( writer, block.Data );
                }
            }
        }

        #endregion
    }
}
