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
using System.ComponentModel;
using System.Data.Entity;
using System.Linq;
using System.Web.UI;
using System.Web.UI.WebControls;

using Newtonsoft.Json;

using Rock;
using Rock.Attribute;
using Rock.Constants;
using Rock.Data;
using Rock.Model;
using Rock.Security;
using Rock.Web;
using Rock.Web.Cache;
using Rock.Web.UI;
using Rock.Web.UI.Controls;
using Attribute = Rock.Model.Attribute;

namespace RockWeb.Blocks.Connection
{
    [DisplayName( "Connection Request List" )]
    [Category( "Connection > WebView" )]
    [Description( "Displays the connection request in a lava formatted block." )]

    #region Block Attributes
    [CodeEditorField( "Lava Template",
        Key = AttributeKey.LavaTemplate,
        Description = "This Lava template will be used to display the Connection Types. (Note the Lava will include the following merge fields: <X>, <Y>, <Z>.",
        EditorMode = CodeEditorMode.Lava,
        EditorTheme = CodeEditorTheme.Rock,
        EditorHeight = 400,
        IsRequired = true,
        DefaultValue = "{% include '~~/Assets/Lava/Connections/ConnectionOpportunitySelect.lava' %}",
        Order = 1 )]
    #endregion Block Attributes

    public partial class WebConnectionRequestListLava : RockBlock
    {
        #region Attribute Keys
        private static class AttributeKey
        {
            public const string LavaTemplate = "LavaTemplate";
        }
        #endregion Attribute Keys

        #region Base Control Events
        protected override void OnInit( EventArgs e )
        {
            base.OnInit( e );
        }

        protected override void OnLoad( EventArgs e )
        {
            base.OnLoad( e );
        }
        #endregion Base Control Events

        #region Methods
        #endregion Methods
    }
}