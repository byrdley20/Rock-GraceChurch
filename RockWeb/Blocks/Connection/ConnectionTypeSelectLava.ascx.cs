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
using Rock.Model.Connection.ConnectionType.Options;
using Rock.Security;
using Rock.Web;
using Rock.Web.Cache;
using Rock.Web.UI;
using Rock.Web.UI.Controls;
using Attribute = Rock.Model.Attribute;

namespace RockWeb.Blocks.Connection
{
    [DisplayName( "Connection Type Select Lava" )]
    [Category( "Connection" )]
    [Description( "Displays the connection types in a lava formatted block." )]

    #region Block Attributes
    [LinkedPage("Connection Opportunity Select Page", Description = "Page used to display the connection opportunity select lava.",
        Order = 0,
        Key = AttributeKey.ConnectionOpportunitySelectPage
         )]
    [CodeEditorField( "Lava Template",
        Key = AttributeKey.LavaTemplate,
        Description = @"This Lava template will be used to display the Connection Types.
                         <i>(Note: The Lava will include the following merge fields:
                            <p><strong>ConnectionTypes, CurrentPerson, Context, PageParameter, Campuses</strong>)</p>
                         </i>",
        EditorMode = CodeEditorMode.Lava,
        EditorTheme = CodeEditorTheme.Rock,
        EditorHeight = 400,
        IsRequired = true,
        DefaultValue = Lava.ConnectionTypes,
        Order = 1 )]
    #endregion
    public partial class ConnectionTypeSelectLava : RockBlock
    {
        #region Lava
        private static class Lava
        {
            public const string ConnectionTypes = @"
{% comment %}
This is the default lava template for the ConnectionOpportunitySelect block

Available Lava Fields:
{% endcomment %}
<h1>Test</h1>";
        }
        #endregion Lava

        #region Attribute Keys
        private static class AttributeKey
        {
            public const string LavaTemplate = "LavaTemplate";
            public const string ConnectionOpportunitySelectPage = "ConnectionOpportunitySelectPage";
        }
        #endregion

        #region Base Control Events
        protected override void OnInit( EventArgs e )
        {
            base.OnInit( e );
        }

        protected override void OnLoad( EventArgs e )
        {
            base.OnLoad( e );

            LoadLava();
        }
        #endregion Base Control Events

        #region Methods
        private void LoadLava()
        {
            var connectionService = new ConnectionTypeService( new RockContext() );
            var connectionTypes = connectionService.GetConnectionTypesQuery()?.ToList();
            string template = GetAttributeValue( AttributeKey.LavaTemplate );
            var mergeFields = Rock.Lava.LavaHelper.GetCommonMergeFields( this.RockPage, this.CurrentPerson );

            mergeFields.Add( "ConnectionTypes", connectionTypes );

            lContent.Text = template.ResolveMergeFields( mergeFields ).ResolveClientIds( upConnectionSelectLava.ClientID );
        }
        #endregion Methods
    }
}