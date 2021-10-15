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

using Rock.Attribute;
using Rock.Data;
using Rock.Model;
using Rock.Security;
using Rock.ViewModel.Client;
using Rock.ViewModel.NonEntities;
using Rock.Web.Cache;

using ClientAttributeValueViewModel = Rock.ViewModel.NonEntities.ClientAttributeValueViewModel;
using ClientEditableAttributeValueViewModel = Rock.ViewModel.NonEntities.ClientEditableAttributeValueViewModel;

namespace Rock.Blocks.Types.Mobile.Connection
{
    /// <summary>
    /// Displays the details of the given connection request for editing state, status, etc.
    /// </summary>
    /// <seealso cref="Rock.Blocks.RockMobileBlockType" />

    [DisplayName( "Connection Request Detail" )]
    [Category( "Mobile > Connection" )]
    [Description( "Displays the details of the given connection request for editing state, status, etc." )]
    [IconCssClass( "fa fa-id-card" )]

    #region Block Attributes

    [CodeEditorField( "Header Template",
        Description = "Lava template used to render the header above the connection request.",
        IsRequired = false,
        EditorMode = Rock.Web.UI.Controls.CodeEditorMode.Xml,
        Key = AttributeKey.HeaderTemplate,
        Order = 0 )]

    [CodeEditorField( "Activity Template",
        Description = "Lava template used to render the activity history for the connection request.",
        IsRequired = true,
        EditorMode = Rock.Web.UI.Controls.CodeEditorMode.Xml,
        Key = AttributeKey.ActivityTemplate,
        Order = 1 )]

    [LinkedPage(
        "Person Profile Page",
        Description = "Page to link to when user taps on the profile button. PersonGuid is passed in the query string.",
        IsRequired = false,
        Key = AttributeKey.PersonProfilePage,
        Order = 2 )]

    [LinkedPage(
        "Group Detail Page",
        Description = "Page to link to when user taps on the group. GroupGuid is passed in the query string.",
        IsRequired = false,
        Key = AttributeKey.GroupDetailPage,
        Order = 3 )]

    [LinkedPage(
        "Workflow Page",
        Description = "Page to link to when user launches a workflow that requires interaction. WorkflowTypeGuid is passed in the query string.",
        IsRequired = false,
        Key = AttributeKey.WorkflowPage,
        Order = 4 )]

    #endregion

    public class ConnectionRequestDetail : RockMobileBlockType
    {
        #region Block Attributes

        /// <summary>
        /// The block setting attribute keys for the <see cref="ConnectionRequestDetail"/> block.
        /// </summary>
        private static class AttributeKey
        {
            public const string HeaderTemplate = "HeaderTemplate";

            public const string ActivityTemplate = "ActivityTemplate";

            public const string PersonProfilePage = "PersonProfilePage";

            public const string GroupDetailPage = "GroupDetailPage";

            public const string WorkflowPage = "WorkflowPage";
        }

        /// <summary>
        /// Gets the header template.
        /// </summary>
        /// <value>
        /// The header template.
        /// </value>
        protected string HeaderTemplate => GetAttributeValue( AttributeKey.HeaderTemplate );

        /// <summary>
        /// Gets the activity template.
        /// </summary>
        /// <value>
        /// The activity template.
        /// </value>
        //protected string ActivityTemplate => Rock.Field.Types.BlockTemplateFieldType.GetTemplateContent( GetAttributeValue( AttributeKey.ActivityTemplate ) );
        protected string ActivityTemplate => GetAttributeValue( AttributeKey.ActivityTemplate );

        /// <summary>
        /// Gets the person profile page unique identifier.
        /// </summary>
        /// <value>
        /// The person profile page unique identifier.
        /// </value>
        protected Guid? PersonProfilePageGuid => GetAttributeValue( AttributeKey.PersonProfilePage ).AsGuidOrNull();

        /// <summary>
        /// Gets the group detail page unique identifier.
        /// </summary>
        /// <value>
        /// The group detail page unique identifier.
        /// </value>
        protected Guid? GroupDetailPageGuid => GetAttributeValue( AttributeKey.GroupDetailPage ).AsGuidOrNull();

        /// <summary>
        /// Gets the workflow page unique identifier.
        /// </summary>
        /// <value>
        /// The workflow page unique identifier.
        /// </value>
        protected Guid? WorkflowPageGuid => GetAttributeValue( AttributeKey.WorkflowPage ).AsGuidOrNull();

        #endregion

        #region IRockMobileBlockType Implementation

        /// <inheritdoc/>
        public override int RequiredMobileAbiVersion => 3;

        /// <inheritdoc/>
        public override string MobileBlockType => "Rock.Mobile.Blocks.Connection.ConnectionRequestDetail";

        /// <inheritdoc/>
        public override object GetMobileConfigurationValues()
        {
            return new
            {
                PersonProfilePageGuid,
                GroupDetailPageGuid,
                WorkflowPageGuid
            };
        }

        #endregion

        #region Methods

        /// <summary>
        /// Determines whether the connection request is critical.
        /// </summary>
        /// <param name="request">The request.</param>
        /// <returns>
        ///   <c>true</c> if the connection request is critical; otherwise, <c>false</c>.
        /// </returns>
        private static bool IsRequestCritical( ConnectionRequest request )
        {
            // Only a connection request with a status of type critical can be
            // considered critical.
            if ( !request.ConnectionStatus.IsCritical )
            {
                return false;
            }

            // Past due means it is a future follow-up state with a date on or
            // before today.
            var isPastDue = request.ConnectionState == ConnectionState.FutureFollowUp
                && request.FollowupDate.HasValue
                && request.FollowupDate.Value < RockDateTime.Today.AddDays( 1 );

            // If the status is critical and the state is either active or
            // past due then the request is critical.
            return request.ConnectionState == ConnectionState.Active || isPastDue;
        }

        /// <summary>
        /// Determines whether the connection request is considered to be idle.
        /// </summary>
        /// <param name="request">The request.</param>
        /// <returns>
        ///   <c>true</c> if the connection request is considered to be idle; otherwise, <c>false</c>.
        /// </returns>
        private static bool IsRequestIdle( ConnectionRequest request )
        {
            var daysUntilIdle = request.ConnectionOpportunity.ConnectionType.DaysUntilRequestIdle;
            var idleDate = RockDateTime.Now.AddDays( -daysUntilIdle );

            // Past due means it is a future follow-up state with a date on or
            // before today.
            var isPastDue = request.ConnectionState == ConnectionState.FutureFollowUp
                && request.FollowupDate.HasValue
                && request.FollowupDate.Value < RockDateTime.Today.AddDays( 1 );

            // A request can only be idle if it is the active state or a
            // past due follow up state.
            if ( request.ConnectionState == ConnectionState.Active || isPastDue )
            {
                var mostRecentActivityDateTime = request.ConnectionRequestActivities
                    .Where( ra => ra.CreatedDateTime.HasValue )
                    .Max( ra => ( DateTime? ) ra.CreatedDateTime.Value );

                // If we have an activity with a created date then use the most
                // recent one to check if it older than the idle date. Otherwise
                // try to use the date when the request was created.
                if ( mostRecentActivityDateTime.HasValue )
                {
                    return mostRecentActivityDateTime.Value < idleDate;
                }
                else if ( request.CreatedDateTime.HasValue )
                {
                    return request.CreatedDateTime.Value < idleDate;
                }
            }

            return false;
        }

        /// <summary>
        /// Gets the manually triggered workflows that should be used with the
        /// connection opportunity.
        /// </summary>
        /// <param name="connectionOpportunity">The connection opportunity.</param>
        /// <param name="currentPerson">The current person for security checks.</param>
        /// <returns>An enumeration of all manually triggered workflow types.</returns>
        private static IEnumerable<WorkflowType> GetConnectionOpportunityManualWorkflowTypes( ConnectionOpportunity connectionOpportunity, Person currentPerson )
        {
            return connectionOpportunity.ConnectionWorkflows
                .Union( connectionOpportunity.ConnectionType.ConnectionWorkflows )
                .Where( w => w.TriggerType == ConnectionWorkflowTriggerType.Manual
                    && w.WorkflowType != null
                    && ( w.WorkflowType.IsActive ?? true ) )
                .Select( w => w.WorkflowType )
                .OrderBy( w => w.Name )
                .Distinct()
                .Where( w => w.IsAuthorized( Authorization.VIEW, currentPerson ) );
        }

        /// <summary>
        /// Gets the request view model that represents the request in a way the
        /// client can properly display.
        /// </summary>
        /// <param name="request">The request.</param>
        /// <returns>The view model that represents the request.</returns>
        private RequestViewModel GetRequestViewModel( ConnectionRequest request )
        {
            var baseUrl = GlobalAttributesCache.Value( "PublicApplicationRoot" );

            var mergeFields = RequestContext.GetCommonMergeFields();
            mergeFields.Add( "ConnectionRequest", request );

            // Generate the content that will be displayed above the connection request.
            var headerContent = HeaderTemplate.ResolveMergeFields( mergeFields );

            // Generate the content that will be used to display the activities.
            mergeFields.Add( "Activities", request.ConnectionRequestActivities );
            var activityContent = ActivityTemplate.ResolveMergeFields( mergeFields );

            // Get all the workflows that can be manually triggered by the person.
            var connectionWorkflows = GetConnectionOpportunityManualWorkflowTypes( request.ConnectionOpportunity, RequestContext.CurrentPerson )
                .Select( w => new WorkflowTypeItemViewModel
                {
                    Guid = w.Guid,
                    Name = w.Name,
                    IconClass = w.IconCssClass
                } )
                .ToList();

            var viewModel = new RequestViewModel
            {
                ActivityContent = activityContent,
                Attributes = request.GetClientAttributeValues( RequestContext.CurrentPerson ),
                CampusGuid = request.Campus?.Guid,
                CampusName = request.Campus?.Name,
                Comments = request.Comments,
                ConnectorGuid = request.ConnectorPersonAlias?.Person.Guid,
                ConnectorFullName = request.ConnectorPersonAlias?.Person.FullName,
                HeaderContent = headerContent,
                IsEditable = request.IsAuthorized( Authorization.EDIT, RequestContext.CurrentPerson ),
                IsCritical = IsRequestCritical( request ),
                IsIdle = IsRequestIdle( request ),
                OpportunityName = request.ConnectionOpportunity.Name,
                PersonGuid = request.PersonAlias.Person.Guid,
                PersonFullName = request.PersonAlias.Person.FullName,
                PersonEmail = request.PersonAlias.Person.Email,
                PersonMobileNumber = request.PersonAlias.Person.GetPhoneNumber( Rock.SystemGuid.DefinedValue.PERSON_PHONE_TYPE_MOBILE.AsGuid() )?.NumberFormatted,
                PersonConnectionStatusName = request.PersonAlias.Person.ConnectionStatusValue?.Value,
                PersonProfilePhotoUrl = request.PersonAlias.Person.PhotoId != null ? $"{baseUrl}{request.PersonAlias.Person.PhotoUrl}" : null,
                PlacementGroupGuid = request.AssignedGroup?.Guid,
                PlacementGroupName = request.AssignedGroup?.Name,
                RequestDate = request.CreatedDateTime?.ToRockDateTimeOffset(),
                State = request.ConnectionState,
                StatusGuid = request.ConnectionStatus.Guid,
                StatusName = request.ConnectionStatus.Name,
                WorkflowTypes = connectionWorkflows
            };

            return viewModel;
        }

        /// <summary>
        /// Gets the request edit view model that represents the request in a way
        /// the client can use to display an edit interface.
        /// </summary>
        /// <param name="request">The request.</param>
        /// <param name="rockContext">The context to use when needing to load any data.</param>
        /// <returns>The edit view model that represents the request.</returns>
        private RequestEditViewModel GetRequestEditViewModel( ConnectionRequest request, RockContext rockContext )
        {
            var baseUrl = GlobalAttributesCache.Value( "PublicApplicationRoot" );
            var clientHelper = new ClientHelper( rockContext, RequestContext.CurrentPerson );

            // Get the workflow types that can be triggered manually by the
            // user in a format that can be used by the client.
            var connectionWorkflows = GetConnectionOpportunityManualWorkflowTypes( request.ConnectionOpportunity, RequestContext.CurrentPerson )
                .Select( w => new WorkflowTypeItemViewModel
                {
                    Guid = w.Guid,
                    Name = w.Name,
                    IconClass = w.IconCssClass
                } )
                .ToList();

            // Get the list of connectors that are available to pick from
            // for the client to use.
            var additionalConnectorAliasIds = new List<int>();
            if ( request.ConnectorPersonAliasId.HasValue )
            {
                additionalConnectorAliasIds.Add( request.ConnectorPersonAliasId.Value );
            }
            if ( RequestContext.CurrentPerson != null )
            {
                additionalConnectorAliasIds.Add( RequestContext.CurrentPerson.PrimaryAliasId.Value );
            }
            var connectors = GetConnectionOpportunityConnectors( request.ConnectionOpportunityId, additionalConnectorAliasIds, rockContext );

            var viewModel = new RequestEditViewModel
            {
                Attributes = request.GetClientEditableAttributeValues( RequestContext.CurrentPerson ),
                CampusGuid = request.Campus?.Guid,
                Comments = request.Comments,
                ConnectorGuid = request.ConnectorPersonAlias?.Person.Guid,
                PlacementGroupGuid = request.AssignedGroup?.Guid,
                State = request.ConnectionState,
                StatusGuid = request.ConnectionStatus.Guid,
                Connectors = connectors,
                Campuses = clientHelper.GetCampusesAsListItems(),
                PlacementGroups = GetRequestPlacementGroups( request ),
                Statuses = GetOpportunityStatusListItems( request.ConnectionOpportunity.ConnectionType )
            };

            return viewModel;
        }

        /// <summary>
        /// Gets a list of connectors
        /// </summary>
        /// <param name="connectionOpportunityId">The connection opportunity identifier.</param>
        /// <param name="additionalPersonAliasIds">The additional person alias ids.</param>
        /// <param name="rockContext">The rock database context.</param>
        /// <returns></returns>
        private static List<ConnectorItemViewModel> GetConnectionOpportunityConnectors( int connectionOpportunityId, List<int> additionalPersonAliasIds, RockContext rockContext )
        {
            var connectorGroupService = new ConnectionOpportunityConnectorGroupService( rockContext );
            var personAliasService = new PersonAliasService( rockContext );

            // Get the primary list of connectors for this connection opportunity.
            // Include all the currently active members of the groups and then
            // build the connector view model
            var connectorList = connectorGroupService.Queryable()
                .Where( a => a.ConnectionOpportunityId == connectionOpportunityId )
                .SelectMany( g => g.ConnectorGroup.Members )
                .Where( m => m.GroupMemberStatus == GroupMemberStatus.Active )
                .Select( m => new ConnectorItemViewModel
                {
                    Guid = m.Person.Guid,
                    FirstName = m.Person.NickName,
                    LastName = m.Person.LastName,
                    CampusGuid = m.Group.Campus.Guid
                } )
                .ToList();

            // If they specified any additional people to load then execute
            // a query to find just those people.
            if ( additionalPersonAliasIds != null && additionalPersonAliasIds.Any() )
            {
                var additionalPeople = personAliasService.Queryable()
                    .Where( pa => additionalPersonAliasIds.Contains( pa.Id ) )
                    .Select( pa => new ConnectorItemViewModel
                    {
                        Guid = pa.Person.Guid,
                        FirstName = pa.Person.NickName,
                        LastName = pa.Person.LastName,
                        CampusGuid = null
                    } )
                    .ToList();

                connectorList.AddRange( additionalPeople );
            }
             
            // Distinct by both the person Guid and the CampusGuid. We could
            // still have duplicate people, but that will be up to the client
            // to sort out. Then apply final sorting.
            return connectorList.GroupBy( c => new { c.Guid, c.CampusGuid } )
                .Select( g => g.First() )
                .OrderBy( c => c.LastName )
                .ThenBy( c => c.FirstName )
                .ToList();
        }

        /// <summary>
        /// Gets the opportunity status list items for the given connection type.
        /// </summary>
        /// <param name="connectionType">Connection type to query.</param>
        /// <returns>A list of list items that can be displayed.</returns>
        private static List<ListItemViewModel> GetOpportunityStatusListItems( ConnectionType connectionType )
        {
            return connectionType.ConnectionStatuses
                .OrderBy( s => s.Order )
                .Select( s => new ListItemViewModel
                {
                    Value = s.Guid.ToString(),
                    Text = s.Name
                } )
                .ToList();
        }

        /// <summary>
        /// Gets a query of all groups that are possible placement groups for
        /// the connection request.
        /// </summary>
        /// <param name="connectionOpportunityId">The connection opportunity identifier.</param>
        /// <param name="additionalGroupId">An optional additional group to include, such as the currently assigned group for a request.</param>
        /// <param name="rockContext">The rock database context.</param>
        /// <returns>A queryable of all the Group objects that can be used with the request.</returns>
        private static IQueryable<Group> GetPlacementGroupsQuery( int connectionOpportunityId, int? additionalGroupId, RockContext rockContext )
        {
            var opportunityService = new ConnectionOpportunityService( rockContext );
            var groupService = new GroupService( rockContext );

            // First add any groups specifically configured for the opportunity
            var specificConfigQuery = opportunityService.Queryable()
                .AsNoTracking()
                .Where( o => o.Id == connectionOpportunityId )
                .SelectMany( o => o.ConnectionOpportunityGroups )
                .Select( cog => cog.Group );

            // Then get any groups that are configured with 'all groups of type'
            var allGroupsOfTypeQuery = opportunityService.Queryable()
                .AsNoTracking()
                .Where( o => o.Id == connectionOpportunityId )
                .SelectMany( o => o.ConnectionOpportunityGroupConfigs )
                .Where( gc => gc.UseAllGroupsOfType )
                .Select( gc => gc.GroupType )
                .SelectMany( gt => gt.Groups );

            var allGroupsQuery = specificConfigQuery.Union( allGroupsOfTypeQuery );

            // Add the currently assigned group.
            if ( additionalGroupId.HasValue )
            {
                var additionalGroupQuery = groupService.Queryable()
                    .AsNoTracking()
                    .Where( g => g.Id == additionalGroupId );

                allGroupsQuery = allGroupsQuery.Union( additionalGroupQuery );
            }

            return allGroupsQuery
                .Where( g => g.IsActive && !g.IsArchived )
                .Distinct();
        }

        /// <summary>
        /// Gets the request placement group view models.
        /// </summary>
        /// <param name="request">The connection request.</param>
        /// <returns>A list of group placement view models.</returns>
        private static List<PlacementGroupItemViewModel> GetRequestPlacementGroups( ConnectionRequest request )
        {
            using ( var rockContext = new RockContext() )
            {
                var availablePlacementGroups = GetPlacementGroupsQuery( request.ConnectionOpportunityId, request.AssignedGroupId, rockContext )
                    .Where( g => g.IsActive && !g.IsArchived )
                    .Select( g => new
                    {
                        g.Guid,
                        g.Name,
                        CampusGuid = ( Guid? ) g.Campus.Guid,
                        CampusName = g.Campus.Name
                    } )
                    .ToList()
                    .Select( g => new PlacementGroupItemViewModel
                    {
                        Guid = g.Guid,
                        Name = $"{g.Name} ({( g.CampusName.IsNotNullOrWhiteSpace() ? g.CampusName : "No Campus" )})",
                        CampusGuid = g.CampusGuid
                    } )
                    .ToList();

                return availablePlacementGroups;
            }
        }

        #endregion

        #region Action Methods

        /// <summary>
        /// Gets the request details that should be displayed to the user.
        /// </summary>
        /// <param name="connectionRequestGuid">The connection request unique identifier.</param>
        /// <returns>A model that contains the connection request details.</returns>
        [BlockAction]
        public BlockActionResult GetRequestDetails( Guid connectionRequestGuid )
        {
            using ( var rockContext = new RockContext() )
            {
                var connectionRequestService = new ConnectionRequestService( rockContext );

                // Load the connection request and include the opportunity and type
                // to speed up the security check.
                var request = connectionRequestService.Queryable()
                    .Include( r => r.ConnectionOpportunity.ConnectionType )
                    .Include( r => r.Campus )
                    .Include( r => r.ConnectorPersonAlias.Person )
                    .Include( r => r.ConnectionStatus )
                    .AsNoTracking()
                    .Where( r => r.Guid == connectionRequestGuid )
                    .FirstOrDefault();

                if ( request == null )
                {
                    return ActionNotFound();
                }
                else if ( !request.IsAuthorized( Authorization.VIEW, RequestContext.CurrentPerson ) )
                {
                    return ActionUnauthorized();
                }

                request.LoadAttributes( rockContext );

                return ActionOk( GetRequestViewModel( request ) );
            }
        }

        /// <summary>
        /// Gets the details that describe an edit operation for the connection request.
        /// </summary>
        /// <param name="connectionRequestGuid">The connection request unique identifier.</param>
        /// <returns>The edit view model for the connection request.</returns>
        [BlockAction]
        public BlockActionResult GetRequestEditDetails( Guid connectionRequestGuid )
        {
            using ( var rockContext = new RockContext() )
            {
                var connectionRequestService = new ConnectionRequestService( rockContext );

                // Load the connection request and include the opportunity and type
                // to speed up the security check.
                var request = connectionRequestService.Queryable()
                    .Include( r => r.ConnectionOpportunity.ConnectionType )
                    .Include( r => r.Campus )
                    .Include( r => r.ConnectorPersonAlias.Person )
                    .Include( r => r.ConnectionStatus )
                    .AsNoTracking()
                    .Where( r => r.Guid == connectionRequestGuid )
                    .FirstOrDefault();

                if ( request == null )
                {
                    return ActionNotFound();
                }
                else if ( !request.IsAuthorized( Authorization.EDIT, RequestContext.CurrentPerson ) )
                {
                    return ActionUnauthorized();
                }

                request.LoadAttributes( rockContext );

                return ActionOk( GetRequestEditViewModel( request, rockContext ) );
            }
        }

        [BlockAction]
        public BlockActionResult UpdateRequest( Guid connectionRequestGuid, RequestSaveViewModel requestDetails )
        {
            return ActionInternalServerError();
        }

        /// <summary>
        /// Gets the activity types available for the connection request.
        /// </summary>
        /// <param name="connectionRequestGuid">The connection request unique identifier.</param>
        /// <returns>The activity types available.</returns>
        [BlockAction]
        public BlockActionResult GetActivityTypes( Guid connectionRequestGuid )
        {
            using ( var rockContext = new RockContext() )
            {
                var connectionRequestService = new ConnectionRequestService( rockContext );
                var connectionActivityTypeService = new ConnectionActivityTypeService( rockContext );

                // Load the connection request and include the opportunity and type
                // to speed up the security check.
                var request = connectionRequestService.Queryable()
                    .Include( r => r.ConnectionOpportunity.ConnectionType )
                    .AsNoTracking()
                    .Where( r => r.Guid == connectionRequestGuid )
                    .FirstOrDefault();

                if ( request == null )
                {
                    return ActionNotFound();
                }
                else if ( !request.IsAuthorized( Authorization.EDIT, RequestContext.CurrentPerson ) )
                {
                    // Require edit access in order to see the available activity types
                    // since they are only required when editing.
                    return ActionUnauthorized();
                }

                // Load up the activity types for this connection request and pull
                // in the Guid an Name to send to the client.
                var activityTypes = connectionActivityTypeService.Queryable()
                    .Where( a => a.ConnectionTypeId == request.ConnectionOpportunity.ConnectionTypeId )
                    .Select( a => new ListItemViewModel
                    {
                        Value = a.Guid.ToString(),
                        Text = a.Name
                    } )
                    .ToList();

                return ActionOk( activityTypes );
            }
        }

        /// <summary>
        /// Adds a new activity to the connection request.
        /// </summary>
        /// <param name="connectionRequestGuid">The connection request unique identifier.</param>
        /// <param name="activity">The activity details.</param>
        /// <returns>The view model data that should be displayed.</returns>
        [BlockAction]
        public BlockActionResult AddActivity( Guid connectionRequestGuid, AddActivityViewModel activity )
        {
            using ( var rockContext = new RockContext() )
            {
                var connectionRequestService = new ConnectionRequestService( rockContext );
                var connectionRequestActivityService = new ConnectionRequestActivityService( rockContext );
                var connectionActivityTypeService = new ConnectionActivityTypeService( rockContext );

                // Load the connection request. Include the connection opportunity
                // and type for security check.
                var request = connectionRequestService.Queryable()
                    .Where( r => r.Guid == connectionRequestGuid )
                    .Include( r => r.ConnectionOpportunity.ConnectionType )
                    .FirstOrDefault();

                // Validate the request exists and the current person has permission
                // to make changes to it.
                if ( request == null )
                {
                    return ActionNotFound();
                }
                else if ( !request.IsAuthorized( Authorization.EDIT, RequestContext.CurrentPerson ) )
                {
                    return ActionUnauthorized();
                }

                // Load the activity identifier from the database, making sure
                // the Guid they gave us is actually for the correct connection type.
                var activityTypeId = connectionActivityTypeService.Queryable()
                    .Where( a => a.Guid == activity.Guid
                        && a.ConnectionTypeId == request.ConnectionOpportunity.ConnectionTypeId )
                    .Select( a => a.Id )
                    .FirstOrDefault();

                if ( activityTypeId == 0 )
                {
                    return ActionBadRequest( "Invalid activity type specified." );
                }

                // Load attributes since we need them to generate the view model
                // later.
                request.LoadAttributes( rockContext );

                // Create the new activity via the Create() method so that lazy
                // loading will work after it has been saved.
                var requestActivity = rockContext.ConnectionRequestActivities.Create();
                requestActivity.ConnectionOpportunityId = request.ConnectionOpportunityId;
                requestActivity.ConnectionActivityTypeId = activityTypeId;
                requestActivity.ConnectorPersonAliasId = RequestContext.CurrentPerson?.PrimaryAliasId;
                requestActivity.Note = activity.Note;

                request.ConnectionRequestActivities.Add( requestActivity );
                connectionRequestActivityService.Add( requestActivity );
                //requestActivity.LoadAttributes();
                //avcActivityAttributes.GetEditValues( requestActivity );

                rockContext.SaveChanges();
                //requestActivity.SaveAttributeValues( rockContext );

                return ActionOk( GetRequestViewModel( request ) );
            }
        }

        #endregion

        #region Action Classes

        /// <summary>
        /// Common details about a connection request.
        /// </summary>
        public abstract class RequestViewModelBase
        {
            /// <summary>
            /// Gets or sets the connector unique identifier.
            /// </summary>
            /// <value>
            /// The connector unique identifier.
            /// </value>
            public Guid? ConnectorGuid { get; set; }

            /// <summary>
            /// Gets or sets the comments.
            /// </summary>
            /// <value>
            /// The comments.
            /// </value>
            public string Comments { get; set; }

            /// <summary>
            /// Gets or sets the campus unique identifier.
            /// </summary>
            /// <value>
            /// The campus unique identifier.
            /// </value>
            public Guid? CampusGuid { get; set; }

            /// <summary>
            /// Gets or sets the placement group unique identifier.
            /// </summary>
            /// <value>
            /// The placement group unique identifier.
            /// </value>
            public Guid? PlacementGroupGuid { get; set; }

            /// <summary>
            /// Gets or sets the state.
            /// </summary>
            /// <value>
            /// The state.
            /// </value>
            public ConnectionState State { get; set; }

            /// <summary>
            /// Gets or sets the status unique identifier.
            /// </summary>
            /// <value>
            /// The status unique identifier.
            /// </value>
            public Guid StatusGuid { get; set; }
        }

        /// <summary>
        /// Contains all the detail information required to display a connection request.
        /// </summary>
        /// <seealso cref="RequestViewModelBase" />
        public class RequestViewModel : RequestViewModelBase
        {
            /// <summary>
            /// Gets or sets the content of the header.
            /// </summary>
            /// <value>
            /// The content of the header.
            /// </value>
            public string HeaderContent { get; set; }

            /// <summary>
            /// Gets or sets the person unique identifier this connection request is for.
            /// </summary>
            /// <value>
            /// The person unique identifier this connection request is for.
            /// </value>
            public Guid PersonGuid { get; set; }

            /// <summary>
            /// Gets or sets the full name of the person this connection request is for.
            /// </summary>
            /// <value>
            /// The full name of the person this connection request is for.
            /// </value>
            public string PersonFullName { get; set; }

            /// <summary>
            /// Gets or sets the person profile photo URL.
            /// </summary>
            /// <value>
            /// The person profile photo URL.
            /// </value>
            public string PersonProfilePhotoUrl { get; set; }

            /// <summary>
            /// Gets or sets the name of person connection status.
            /// </summary>
            /// <value>
            /// The name of person connection status.
            /// </value>
            public string PersonConnectionStatusName { get; set; }

            /// <summary>
            /// Gets or sets the person mobile number.
            /// </summary>
            /// <value>
            /// The person mobile number.
            /// </value>
            public string PersonMobileNumber { get; set; }

            /// <summary>
            /// Gets or sets the person email.
            /// </summary>
            /// <value>
            /// The person email.
            /// </value>
            public string PersonEmail { get; set; }

            /// <summary>
            /// Gets or sets the full name of the connector.
            /// </summary>
            /// <value>
            /// The full name of the connector.
            /// </value>
            public string ConnectorFullName { get; set; }

            /// <summary>
            /// Gets or sets the name of the opportunity.
            /// </summary>
            /// <value>
            /// The name of the opportunity.
            /// </value>
            public string OpportunityName { get; set; }

            /// <summary>
            /// Gets or sets a value indicating whether this instance is critical.
            /// </summary>
            /// <value>
            ///   <c>true</c> if this instance is critical; otherwise, <c>false</c>.
            /// </value>
            public bool IsCritical { get; set; }

            /// <summary>
            /// Gets or sets a value indicating whether this instance is idle.
            /// </summary>
            /// <value>
            ///   <c>true</c> if this instance is idle; otherwise, <c>false</c>.
            /// </value>
            public bool IsIdle { get; set; }

            /// <summary>
            /// Gets or sets a value indicating whether this instance is editable.
            /// </summary>
            /// <value>
            ///   <c>true</c> if this instance is editable; otherwise, <c>false</c>.
            /// </value>
            public bool IsEditable { get; set; }

            /// <summary>
            /// Gets or sets the name of the campus.
            /// </summary>
            /// <value>
            /// The name of the campus.
            /// </value>
            public string CampusName { get; set; }

            /// <summary>
            /// Gets or sets the name of the placement group.
            /// </summary>
            /// <value>
            /// The name of the placement group.
            /// </value>
            public string PlacementGroupName { get; set; }

            /// <summary>
            /// Gets or sets the name of the status.
            /// </summary>
            /// <value>
            /// The name of the status.
            /// </value>
            public string StatusName { get; set; }

            /// <summary>
            /// Gets or sets the request date.
            /// </summary>
            /// <value>
            /// The request date.
            /// </value>
            public DateTimeOffset? RequestDate { get; set; }

            /// <summary>
            /// Gets or sets the attributes.
            /// </summary>
            /// <value>
            /// The attributes.
            /// </value>
            public List<ClientAttributeValueViewModel> Attributes { get; set; }

            /// <summary>
            /// Gets or sets the workflow types.
            /// </summary>
            /// <value>
            /// The workflow types.
            /// </value>
            public List<WorkflowTypeItemViewModel> WorkflowTypes { get; set; }

            /// <summary>
            /// Gets or sets the content of the activity.
            /// </summary>
            /// <value>
            /// The content of the activity.
            /// </value>
            public string ActivityContent { get; set; }
        }

        /// <summary>
        /// A workflow type item to be displayed on the connection request.
        /// </summary>
        public class WorkflowTypeItemViewModel
        {
            /// <summary>
            /// Gets or sets the unique identifier.
            /// </summary>
            /// <value>
            /// The unique identifier.
            /// </value>
            public Guid Guid { get; set; }

            /// <summary>
            /// Gets or sets the icon class.
            /// </summary>
            /// <value>
            /// The icon class.
            /// </value>
            public string IconClass { get; set; }

            /// <summary>
            /// Gets or sets the name.
            /// </summary>
            /// <value>
            /// The name.
            /// </value>
            public string Name { get; set; }
        }

        /// <summary>
        /// Additional details about the connection request that will be used
        /// when going into edit mode.
        /// </summary>
        /// <seealso cref="RequestViewModelBase" />
        public class RequestEditViewModel : RequestViewModelBase
        {
            /// <summary>
            /// Gets or sets the connectors available.
            /// </summary>
            /// <value>
            /// The connectors available.
            /// </value>
            public List<ConnectorItemViewModel> Connectors { get; set; }

            /// <summary>
            /// Gets or sets the campuses available to pick from.
            /// </summary>
            /// <value>
            /// The campuses available to pick from.
            /// </value>
            public List<ListItemViewModel> Campuses { get; set; }

            /// <summary>
            /// Gets or sets the placement groups available to pick from.
            /// </summary>
            /// <value>
            /// The placement groups available to pick from.
            /// </value>
            public List<PlacementGroupItemViewModel> PlacementGroups { get; set; }

            /// <summary>
            /// Gets or sets the statuses available to pick from.
            /// </summary>
            /// <value>
            /// The statuses available to pick from.
            /// </value>
            public List<ListItemViewModel> Statuses { get; set; }

            /// <summary>
            /// Gets or sets the attributes that can be edited.
            /// </summary>
            /// <value>
            /// The attributes that can be edited.
            /// </value>
            public List<ClientEditableAttributeValueViewModel> Attributes { get; set; }
        }

        /// <summary>
        /// The object that contains all the information to be updated during
        /// a save operation.
        /// </summary>
        /// <seealso cref="RequestViewModelBase" />
        public class RequestSaveViewModel : RequestViewModelBase
        {
            /// <summary>
            /// Gets or sets the attribute values to be saved.
            /// </summary>
            /// <value>
            /// The attribute values to be saved.
            /// </value>
            public Dictionary<string, string> AttributeValues { get; set; }
        }

        /// <summary>
        /// The data used when adding a new activity to a connection request.
        /// </summary>
        public class AddActivityViewModel
        {
            /// <summary>
            /// Gets or sets the activity type unique identifier.
            /// </summary>
            /// <value>
            /// The activity type unique identifier.
            /// </value>
            public Guid Guid { get; set; }

            /// <summary>
            /// Gets or sets the note to save with the activity.
            /// </summary>
            /// <value>
            /// The note to save with the activity.
            /// </value>
            public string Note { get; set; }
        }

        /// <summary>
        /// Contains details about a placement group will be made available
        /// to the user to select.
        /// </summary>
        public class PlacementGroupItemViewModel
        {
            /// <summary>
            /// Gets or sets the group unique identifier.
            /// </summary>
            /// <value>
            /// The group unique identifier.
            /// </value>
            public Guid Guid { get; set; }

            /// <summary>
            /// Gets or sets the display name of the group.
            /// </summary>
            /// <value>
            /// The display name of the group.
            /// </value>
            public string Name { get; set; }

            /// <summary>
            /// Gets or sets the campus unique identifier to limit this group to.
            /// </summary>
            /// <value>
            /// The campus unique identifier to limit this group to.
            /// </value>
            public Guid? CampusGuid { get; set; }
        }

        /// <summary>
        /// Contains the details about a connector person.
        /// </summary>
        public class ConnectorItemViewModel
        {
            /// <summary>
            /// Gets or sets the person unique identifier.
            /// </summary>
            /// <value>
            /// The person unique identifier.
            /// </value>
            public Guid Guid { get; set; }

            /// <summary>
            /// Gets or sets the first name.
            /// </summary>
            /// <value>
            /// The first name.
            /// </value>
            public string FirstName { get; set; }

            /// <summary>
            /// Gets or sets the last name.
            /// </summary>
            /// <value>
            /// The last name.
            /// </value>
            public string LastName { get; set; }

            /// <summary>
            /// Gets or sets the campus unique identifier to limit this connector to.
            /// </summary>
            /// <value>
            /// The campus unique identifier to limit this connector to.
            /// </value>
            public Guid? CampusGuid { get; set; }
        }

        #endregion
    }
}
