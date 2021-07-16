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
using System.Runtime.Serialization;

namespace Rock.Cms.StructuredContent.BlockType
{
    /// <summary>
    /// The data used by the <see cref="Paragraph"/> block type.
    /// </summary>
    [DataContract]
    public class ParagraphData
    {
        /// <summary>
        /// Gets or sets the text.
        /// </summary>
        /// <value>
        /// The text.
        /// </value>
        [DataMember( Name = "text" )]
        public string Text { get; set; }
    }

    /// <summary>
    /// The data used by the <see cref="Header"/> block type.
    /// </summary>
    [DataContract]
    public class HeaderData
    {
        /// <summary>
        /// Gets or sets the header level.
        /// </summary>
        /// <value>
        /// The header level.
        /// </value>
        [DataMember( Name = "level" )]
        public int Level { get; set; }

        /// <summary>
        /// Gets or sets the text.
        /// </summary>
        /// <value>
        /// The text.
        /// </value>
        [DataMember( Name = "text" )]
        public string Text { get; set; }
    }

    /// <summary>
    /// The data used by the <see cref="Image"/> block.
    /// </summary>
    [DataContract]
    public class ImageData
    {
        /// <summary>
        /// Gets or sets the caption to be displayed with the image.
        /// </summary>
        /// <value>
        /// The caption to be displayed with the image.
        /// </value>
        [DataMember( Name = "caption" )]
        public string Caption { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether this image is stretched.
        /// </summary>
        /// <value>
        ///   <c>true</c> if stretched; otherwise, <c>false</c>.
        /// </value>
        [DataMember( Name = "stretched" )]
        public bool Stretched { get; set; }

        /// <summary>
        /// Gets or sets the file data.
        /// </summary>
        /// <value>
        /// The file data.
        /// </value>
        [DataMember( Name = "file" )]
        public StructuredContentImageDataFile File { get; set; }

        /// <summary>
        /// Gets or sets the legacy URL. If this instance contains a valid <see cref="File"/>
        /// value then it should be used instead.
        /// </summary>
        /// <value>
        /// The legacy URL.
        /// </value>
        [DataMember( Name = "url" )]
        public string Url { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether a border should be displayed
        /// around the image.
        /// </summary>
        /// <value>
        ///   <c>true</c> if a border should be displayed; otherwise, <c>false</c>.
        /// </value>
        [Obsolete( "This value is not used by Rock." )]
        [DataMember( Name = "withBorder" )]
        public bool WithBorder { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether a background should be
        /// displayed behind the image.
        /// </summary>
        /// <value>
        ///   <c>true</c> if a background should be displayed; otherwise, <c>false</c>.
        /// </value>
        [Obsolete( "This value is not used by Rock." )]
        [DataMember( Name = "withBackground" )]
        public bool WithBackground { get; set; }
    }

    /// <summary>
    /// The file data to be used when displaying the image.
    /// </summary>
    [DataContract]
    public class StructuredContentImageDataFile
    {
        /// <summary>
        /// Gets or sets the URL. This may be either a relative URL or absolute
        /// URL value.
        /// </summary>
        /// <value>
        /// The URL.
        /// </value>
        [DataMember( Name = "url" )]
        public string Url { get; set; }

        /// <summary>
        /// Gets or sets the binary file identifier. This will be null if the
        /// URL does not specify a file stored in Rock.
        /// </summary>
        /// <value>
        /// The binary file identifier.
        /// </value>
        [DataMember( Name = "fileId" )]
        public int? FileId { get; set; }
    }

    /// <summary>
    /// The data used by the <see cref="Checklist"/> block type.
    /// </summary>
    [DataContract]
    public class ChecklistData
    {
        /// <summary>
        /// Gets or sets the items.
        /// </summary>
        /// <value>
        /// The items.
        /// </value>
        [DataMember( Name = "items" )]
        public List<ChecklistDataItem> Items { get; set; }
    }

    /// <summary>
    /// A single item in the <see cref="Checklist"/> block.
    /// </summary>
    [DataContract]
    public class ChecklistDataItem
    {
        /// <summary>
        /// Gets or sets the text.
        /// </summary>
        /// <value>
        /// The text.
        /// </value>
        [DataMember( Name = "text" )]
        public string Text { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether this <see cref="ChecklistDataItem"/> is checked.
        /// </summary>
        /// <value>
        ///   <c>true</c> if checked; otherwise, <c>false</c>.
        /// </value>
        [DataMember( Name = "checked" )]
        public bool Checked { get; set; }
    }

    /// <summary>
    /// The data used by the <see cref="ListData"/> block type.
    /// </summary>
    [DataContract]
    public class ListData
    {
        /// <summary>
        /// The ordered <see cref="Style"/> value.
        /// </summary>
        public static string OrderedStyle = "ordered";

        /// <summary>
        /// The unordered <see cref="Style"/> value.
        /// </summary>
        public static string UnorderedStyle = "unordered";

        /// <summary>
        /// Gets or sets the text.
        /// </summary>
        /// <value>
        /// The text.
        /// </value>
        [DataMember( Name = "style" )]
        public string Style { get; set; }

        /// <summary>
        /// Gets or sets the items.
        /// </summary>
        /// <value>
        /// The items.
        /// </value>
        [DataMember( Name = "items" )]
        public List<ListDataItem> Items { get; set; }
    }

    /// <summary>
    /// A single item in the <see cref="ListData"/> block type.
    /// </summary>
    [DataContract]
    public class ListDataItem
    {
        /// <summary>
        /// Gets or sets the content.
        /// </summary>
        /// <value>
        /// The content.
        /// </value>
        [DataMember( Name = "content" )]
        public string Content { get; set; }

        /// <summary>
        /// Gets or sets the items.
        /// </summary>
        /// <value>
        /// The items.
        /// </value>
        [DataMember( Name = "items" )]
        public List<ListDataItem> Items { get; set; }
    }

    /// <summary>
    /// The data used by the <see cref="Quote"/> block type.
    /// </summary>
    [DataContract]
    public class QuoteData
    {
        /// <summary>
        /// The center <see cref="Alignment"/> value.
        /// </summary>
        public static string CenterAlignment = "center";

        /// <summary>
        /// The left <see cref="Alignment"/> value.
        /// </summary>
        public static string LeftAlignment = "left";

        /// <summary>
        /// Gets or sets the text.
        /// </summary>
        /// <value>
        /// The text.
        /// </value>
        [DataMember( Name = "text" )]
        public string Text { get; set; }

        /// <summary>
        /// Gets or sets the caption.
        /// </summary>
        /// <value>
        /// The caption.
        /// </value>
        [DataMember( Name = "caption" )]
        public string Caption { get; set; }

        /// <summary>
        /// Gets or sets the alignment.
        /// </summary>
        /// <value>
        /// The alignment.
        /// </value>
        [DataMember( Name = "alignment" )]
        public string Alignment { get; set; }
    }

    /// <summary>
    /// The data used by the <see cref="Warning"/> block type.
    /// </summary>
    [DataContract]
    public class WarningData
    {
        /// <summary>
        /// Gets or sets the title.
        /// </summary>
        /// <value>
        /// The title.
        /// </value>
        [DataMember( Name = "title" )]
        public string Title { get; set; }

        /// <summary>
        /// Gets or sets the message.
        /// </summary>
        /// <value>
        /// The message.
        /// </value>
        [DataMember( Name = "message" )]
        public string Message { get; set; }
    }

    /// <summary>
    /// The data used by the <see cref="Code"/> block type.
    /// </summary>
    [DataContract]
    public class CodeData
    {
        /// <summary>
        /// Gets or sets the code.
        /// </summary>
        /// <value>
        /// The code.
        /// </value>
        [DataMember( Name = "code" )]
        public string Code { get; set; }

        /// <summary>
        /// Gets or sets the language.
        /// </summary>
        /// <value>
        /// The language.
        /// </value>
        [DataMember( Name = "lang" )]
        public string Lang { get; set; }
    }

    /// <summary>
    /// The data used by the <see cref="Note"/> block type.
    /// </summary>
    [DataContract]
    public class NoteData
    {
        /// <summary>
        /// Gets or sets the note.
        /// </summary>
        /// <value>
        /// The note.
        /// </value>
        [DataMember( Name = "note" )]
        public string Note { get; set; }
    }

    /// <summary>
    /// The data used by the <see cref="Delimiter"/> block type.
    /// </summary>
    [DataContract]
    public class DelimiterData
    {
    }

    /// <summary>
    /// The data used by the <see cref="Table"/> block type.
    /// </summary>
    [DataContract]
    public class TableData
    {
        /// <summary>
        /// Gets or sets the content as a collection of rows, each with a
        /// collection of column values.
        /// </summary>
        /// <value>
        /// The content.
        /// </value>
        [DataMember( Name = "content" )]
        public List<List<string>> Content { get; set; }

        /// <summary>
        /// Gets or sets the value the specifies if the first row is a heading row.
        /// </summary>
        /// <value>
        /// The value the specifies if the first row is a heading row.
        /// </value>
        [DataMember( Name = "withHeadings" )]
        public string WithHeadings { get; set; }
    }

}
