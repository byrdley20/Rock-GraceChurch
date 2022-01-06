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
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data.Entity;
using System.Linq;
using System.Reflection;
using System.Web.UI;
using System.Web.UI.WebControls;

using Newtonsoft.Json;

using Rock;
using Rock.Attribute;
using Rock.ClientService.Connection.ConnectionOpportunity;
using Rock.Constants;
using Rock.Data;
using Rock.Model;
using Rock.Model.Connection.ConnectionOpportunity.Options;
using Rock.Security;
using Rock.Web;
using Rock.Web.Cache;
using Rock.Web.UI;
using Rock.Web.UI.Controls;
using Attribute = Rock.Model.Attribute;

namespace RockWeb.Blocks.Connection
{
    [DisplayName( "Connection Opportunity List" )]
    [Category( "Connection > WebView" )]
    [Description( "Displays the list of connection opportunities for a single connection type." )]
    [IconCssClass( "fa fa-list" )]

    #region Block Attributes
    [CodeEditorField( "Opportunity Template",
        Key = AttributeKey.OpportunityTemplate,
        Description = @"This Lava template will be used to display the Connection Types.
                         <i>(Note: The Lava will include the following merge fields:
                            <p><strong>ConnectionTypes, DetailPage, ConnectionRequestCounts, CurrentPerson, Context, PageParameter, Campuses</strong>)</p>
                         </i>",
        EditorMode = CodeEditorMode.Lava,
        EditorTheme = CodeEditorTheme.Rock,
        EditorHeight = 400,
        IsRequired = true,
        DefaultValue = Lava.ConnectionOpportunities,
        Order = 1 )]
    #endregion

    public partial class WebConnectionOpportunityListLava : RockBlock
    {
        #region Default Lava
        private static class Lava
        {
            public const string ConnectionOpportunities = @"
{% comment %}
   This is the default lava template for the ConnectionOpportunitySelect block

   Available Lava Fields:
       ConnectionOpportunities
       DetailPage (Detail Page GUID)
       ConnectionRequestCounts
       CurrentPerson
       Context
       PageParameter
       Campuses
{% endcomment %}
<style>
    .card:hover {
      transform: scale(1.05);
      box-shadow: 0 10px 20px rgba(0,0,0,.12), 0 4px 8px rgba(0,0,0,.06);
    }
</style>
{% for connectionOpportunity in ConnectionOpportunities %}
    <a href='{{ DetailPage | Default:'0' | PageRoute }}?ConnectionOpportunityGuid={{ connectionOpportunity.Guid }}' stretched-link>
        <div class='card mb-2' style='height:120px;'>
            <div class='card-body'>
                <div class='row'>
                    <div class='col-xs-1 pt-4 pl-1 pr-1' style='width:30px;'>
                        <i class='{{ connectionOpportunity.IconCssClass }} text-gray-600' style=';font-size:26px;'></i>
                    </div>
                    <div class='col-xs-10 pr-0'>
                        <span class='text-black'><strong>{{ connectionOpportunity.Name }}</strong></span>
                        </br>
                        <span class='text-gray-600'><small>{{ connectionOpportunity.Description | Truncate:100,'...' }}</small></span>
                    </div>
                    <div class='col-xs-1 pt-4 pl-0' style='width:10px;'>
                        <span class='badge badge-pill badge-primary bg-blue-500'><small>{{ ConnectionRequestCounts[connectionOpportunity.Id] | Map: 'Value' }}</small></span>
                    </div>
                </div>
            </div>
        </div>
       </a>
{% endfor %}
";
        }
        #endregion Lava

        #region Attribute Keys
        private static class AttributeKey
        {
            public const string OpportunityTemplate = "OpportunityTemplate";

            public const string DetailPage = "DetailPage";
        }
        #endregion

        #region Page PageParameterKeys
        private static class PageParameterKey
        {
            public const string ConnectionTypeGuid = "ConnectionTypeGuid";
        }

        #endregion Page PageParameterKeys
        #region Properties
        /// <summary>
        /// Gets the opportunity template.
        /// </summary>
        /// <value>
        /// The opportunity template.
        /// </value>
        protected string OpportunityTemplate =>  GetAttributeValue( AttributeKey.OpportunityTemplate );

        /// <summary>
        /// Gets the detail page unique identifier.
        /// </summary>
        /// <value>
        /// The detail page unique identifier.
        /// </value>
        protected Guid? DetailPageGuid => GetAttributeValue( AttributeKey.DetailPage ).AsGuidOrNull();
        #endregion

        #region Base Control Events
        protected override void OnInit( EventArgs e )
        {
            base.OnInit( e );
        }

        protected override void OnLoad( EventArgs e )
        {
            base.OnLoad( e );
            var detailsPageGuid = PageParameter( PageParameterKey.ConnectionTypeGuid ).AsGuid();
            if ( !Page.IsPostBack )
            {
                lTitle.Text = $"<h2>{GetConnectionTypeTitle( detailsPageGuid )}</h2>";
            }
            GetConnectionOpportunities( detailsPageGuid );
        }
        #endregion Base Control Events

        #region Methods
        private  string GetConnectionTypeTitle(Guid connectionTypeGuid )
        {
            var connectionType = new ConnectionTypeService( new RockContext() ).GetNoTracking( connectionTypeGuid );
            return connectionType?.Name;
        }
        /// <summary>
        /// Gets the connection types view model that can be sent to the client.
        /// </summary>
        private void GetConnectionOpportunities( Guid connectionTypeGuid)
        {
            using ( var rockContext = new RockContext() )
            {
                var opportunityService = new ConnectionOpportunityService( rockContext );
                var opportunityClientService = new ConnectionOpportunityClientService( rockContext, CurrentPerson );
                var connectionType = new ConnectionTypeService( rockContext ).GetNoTracking( connectionTypeGuid );

                var filterOptions = new ConnectionOpportunityQueryOptions
                {
                    ConnectionTypeGuids = new List<Guid> { connectionTypeGuid },
                    IncludeInactive = true
                };

                // Put all the opportunities in memory so we can check security.
                var connectionOpportunityQuery = opportunityService.GetConnectionOpportunitiesQuery( filterOptions );
                var opportunities = connectionOpportunityQuery.ToList()
                    .Where( o => o.IsAuthorized( Authorization.VIEW, CurrentPerson ) );

                // Get the various counts to make available to the Lava template.
                // The conversion of the value to a dictionary is a temporary work-around
                // until we have a way to mark external types as lava safe.
                var opportunityIds = opportunities.Select( o => o.Id ).ToList();
                var requestCounts = opportunityClientService.GetOpportunityRequestCounts( opportunityIds )
                    .ToDictionary( k => k.Key, k => k.Value
                        .GetType()
                        .GetProperties( BindingFlags.Instance | BindingFlags.Public )
                        .ToDictionary( prop => prop.Name, prop => prop.GetValue( k.Value, null ) ) );

                var mergeFields = Rock.Lava.LavaHelper.GetCommonMergeFields( this.RockPage, this.CurrentPerson );

                mergeFields.AddOrReplace( "ConnectionOpportunities", opportunities );
                mergeFields.AddOrReplace( "DetailPage", DetailPageGuid );
                mergeFields.AddOrReplace( "ConnectionRequestCounts", requestCounts );

                var content = OpportunityTemplate
                    .ResolveMergeFields( mergeFields )
                    .ResolveClientIds( upConnectionSelectLava.ClientID );

                lContent.Text = content;
            }
        }
        #endregion Methods

        protected void mdOptions_SaveClick( object sender, EventArgs e )
        {

        }
    }
}