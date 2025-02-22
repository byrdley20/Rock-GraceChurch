//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by the Rock.CodeGeneration project
//     Changes to this file will be lost when the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------
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

using System;
using System.Linq;

using Rock.Attribute;
using Rock.Data;
using Rock.ViewModel;
using Rock.Web.Cache;

namespace Rock.Model
{
    /// <summary>
    /// ConnectionType Service class
    /// </summary>
    public partial class ConnectionTypeService : Service<ConnectionType>
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ConnectionTypeService"/> class
        /// </summary>
        /// <param name="context">The context.</param>
        public ConnectionTypeService(RockContext context) : base(context)
        {
        }

        /// <summary>
        /// Determines whether this instance can delete the specified item.
        /// </summary>
        /// <param name="item">The item.</param>
        /// <param name="errorMessage">The error message.</param>
        /// <returns>
        ///   <c>true</c> if this instance can delete the specified item; otherwise, <c>false</c>.
        /// </returns>
        public bool CanDelete( ConnectionType item, out string errorMessage )
        {
            errorMessage = string.Empty;

            if ( new Service<ConnectionOpportunity>( Context ).Queryable().Any( a => a.ConnectionTypeId == item.Id ) )
            {
                errorMessage = string.Format( "This {0} is assigned to a {1}.", ConnectionType.FriendlyTypeName, ConnectionOpportunity.FriendlyTypeName );
                return false;
            }
            return true;
        }
    }

    /// <summary>
    /// ConnectionType View Model Helper
    /// </summary>
    [DefaultViewModelHelper( typeof( ConnectionType ) )]
    public partial class ConnectionTypeViewModelHelper : ViewModelHelper<ConnectionType, Rock.ViewModel.ConnectionTypeViewModel>
    {
        /// <summary>
        /// Converts the model to a view model.
        /// </summary>
        /// <param name="model">The entity.</param>
        /// <param name="currentPerson">The current person.</param>
        /// <param name="loadAttributes">if set to <c>true</c> [load attributes].</param>
        /// <returns></returns>
        public override Rock.ViewModel.ConnectionTypeViewModel CreateViewModel( ConnectionType model, Person currentPerson = null, bool loadAttributes = true )
        {
            if ( model == null )
            {
                return default;
            }

            var viewModel = new Rock.ViewModel.ConnectionTypeViewModel
            {
                Id = model.Id,
                Guid = model.Guid,
                ConnectionRequestDetailPageId = model.ConnectionRequestDetailPageId,
                ConnectionRequestDetailPageRouteId = model.ConnectionRequestDetailPageRouteId,
                DaysUntilRequestIdle = model.DaysUntilRequestIdle,
                DefaultView = ( int ) model.DefaultView,
                Description = model.Description,
                EnableFullActivityList = model.EnableFullActivityList,
                EnableFutureFollowup = model.EnableFutureFollowup,
                EnableRequestSecurity = model.EnableRequestSecurity,
                IconCssClass = model.IconCssClass,
                IsActive = model.IsActive,
                Name = model.Name,
                Order = model.Order,
                OwnerPersonAliasId = model.OwnerPersonAliasId,
                RequestBadgeLava = model.RequestBadgeLava,
                RequestHeaderLava = model.RequestHeaderLava,
                RequiresPlacementGroupToConnect = model.RequiresPlacementGroupToConnect,
                CreatedDateTime = model.CreatedDateTime,
                ModifiedDateTime = model.ModifiedDateTime,
                CreatedByPersonAliasId = model.CreatedByPersonAliasId,
                ModifiedByPersonAliasId = model.ModifiedByPersonAliasId,
            };

            AddAttributesToViewModel( model, viewModel, currentPerson, loadAttributes );
            ApplyAdditionalPropertiesAndSecurityToViewModel( model, viewModel, currentPerson, loadAttributes );
            return viewModel;
        }
    }


    /// <summary>
    /// Generated Extension Methods
    /// </summary>
    public static partial class ConnectionTypeExtensionMethods
    {
        /// <summary>
        /// Clones this ConnectionType object to a new ConnectionType object
        /// </summary>
        /// <param name="source">The source.</param>
        /// <param name="deepCopy">if set to <c>true</c> a deep copy is made. If false, only the basic entity properties are copied.</param>
        /// <returns></returns>
        public static ConnectionType Clone( this ConnectionType source, bool deepCopy )
        {
            if (deepCopy)
            {
                return source.Clone() as ConnectionType;
            }
            else
            {
                var target = new ConnectionType();
                target.CopyPropertiesFrom( source );
                return target;
            }
        }

        /// <summary>
        /// Clones this ConnectionType object to a new ConnectionType object with default values for the properties in the Entity and Model base classes.
        /// </summary>
        /// <param name="source">The source.</param>
        /// <returns></returns>
        public static ConnectionType CloneWithoutIdentity( this ConnectionType source )
        {
            var target = new ConnectionType();
            target.CopyPropertiesFrom( source );

            target.Id = 0;
            target.Guid = Guid.NewGuid();
            target.ForeignKey = null;
            target.ForeignId = null;
            target.ForeignGuid = null;
            target.CreatedByPersonAliasId = null;
            target.CreatedDateTime = RockDateTime.Now;
            target.ModifiedByPersonAliasId = null;
            target.ModifiedDateTime = RockDateTime.Now;

            return target;
        }

        /// <summary>
        /// Copies the properties from another ConnectionType object to this ConnectionType object
        /// </summary>
        /// <param name="target">The target.</param>
        /// <param name="source">The source.</param>
        public static void CopyPropertiesFrom( this ConnectionType target, ConnectionType source )
        {
            target.Id = source.Id;
            target.ConnectionRequestDetailPageId = source.ConnectionRequestDetailPageId;
            target.ConnectionRequestDetailPageRouteId = source.ConnectionRequestDetailPageRouteId;
            target.DaysUntilRequestIdle = source.DaysUntilRequestIdle;
            target.DefaultView = source.DefaultView;
            target.Description = source.Description;
            target.EnableFullActivityList = source.EnableFullActivityList;
            target.EnableFutureFollowup = source.EnableFutureFollowup;
            target.EnableRequestSecurity = source.EnableRequestSecurity;
            target.ForeignGuid = source.ForeignGuid;
            target.ForeignKey = source.ForeignKey;
            target.IconCssClass = source.IconCssClass;
            target.IsActive = source.IsActive;
            target.Name = source.Name;
            target.Order = source.Order;
            target.OwnerPersonAliasId = source.OwnerPersonAliasId;
            target.RequestBadgeLava = source.RequestBadgeLava;
            target.RequestHeaderLava = source.RequestHeaderLava;
            target.RequiresPlacementGroupToConnect = source.RequiresPlacementGroupToConnect;
            target.CreatedDateTime = source.CreatedDateTime;
            target.ModifiedDateTime = source.ModifiedDateTime;
            target.CreatedByPersonAliasId = source.CreatedByPersonAliasId;
            target.ModifiedByPersonAliasId = source.ModifiedByPersonAliasId;
            target.Guid = source.Guid;
            target.ForeignId = source.ForeignId;

        }

        /// <summary>
        /// Creates a view model from this entity
        /// </summary>
        /// <param name="model">The entity.</param>
        /// <param name="currentPerson" >The currentPerson.</param>
        /// <param name="loadAttributes" >Load attributes?</param>
        public static Rock.ViewModel.ConnectionTypeViewModel ToViewModel( this ConnectionType model, Person currentPerson = null, bool loadAttributes = false )
        {
            var helper = new ConnectionTypeViewModelHelper();
            var viewModel = helper.CreateViewModel( model, currentPerson, loadAttributes );
            return viewModel;
        }

    }

}
