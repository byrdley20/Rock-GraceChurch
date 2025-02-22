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
    /// ServiceJob Service class
    /// </summary>
    public partial class ServiceJobService : Service<ServiceJob>
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ServiceJobService"/> class
        /// </summary>
        /// <param name="context">The context.</param>
        public ServiceJobService(RockContext context) : base(context)
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
        public bool CanDelete( ServiceJob item, out string errorMessage )
        {
            errorMessage = string.Empty;
            return true;
        }
    }

    /// <summary>
    /// ServiceJob View Model Helper
    /// </summary>
    [DefaultViewModelHelper( typeof( ServiceJob ) )]
    public partial class ServiceJobViewModelHelper : ViewModelHelper<ServiceJob, Rock.ViewModel.ServiceJobViewModel>
    {
        /// <summary>
        /// Converts the model to a view model.
        /// </summary>
        /// <param name="model">The entity.</param>
        /// <param name="currentPerson">The current person.</param>
        /// <param name="loadAttributes">if set to <c>true</c> [load attributes].</param>
        /// <returns></returns>
        public override Rock.ViewModel.ServiceJobViewModel CreateViewModel( ServiceJob model, Person currentPerson = null, bool loadAttributes = true )
        {
            if ( model == null )
            {
                return default;
            }

            var viewModel = new Rock.ViewModel.ServiceJobViewModel
            {
                Id = model.Id,
                Guid = model.Guid,
                Assembly = model.Assembly,
                Class = model.Class,
                CronExpression = model.CronExpression,
                Description = model.Description,
                EnableHistory = model.EnableHistory,
                HistoryCount = model.HistoryCount,
                IsActive = model.IsActive,
                IsSystem = model.IsSystem,
                LastRunDateTime = model.LastRunDateTime,
                LastRunDurationSeconds = model.LastRunDurationSeconds,
                LastRunSchedulerName = model.LastRunSchedulerName,
                LastStatus = model.LastStatus,
                LastStatusMessage = model.LastStatusMessage,
                LastSuccessfulRunDateTime = model.LastSuccessfulRunDateTime,
                Name = model.Name,
                NotificationEmails = model.NotificationEmails,
                NotificationStatus = ( int ) model.NotificationStatus,
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
    public static partial class ServiceJobExtensionMethods
    {
        /// <summary>
        /// Clones this ServiceJob object to a new ServiceJob object
        /// </summary>
        /// <param name="source">The source.</param>
        /// <param name="deepCopy">if set to <c>true</c> a deep copy is made. If false, only the basic entity properties are copied.</param>
        /// <returns></returns>
        public static ServiceJob Clone( this ServiceJob source, bool deepCopy )
        {
            if (deepCopy)
            {
                return source.Clone() as ServiceJob;
            }
            else
            {
                var target = new ServiceJob();
                target.CopyPropertiesFrom( source );
                return target;
            }
        }

        /// <summary>
        /// Clones this ServiceJob object to a new ServiceJob object with default values for the properties in the Entity and Model base classes.
        /// </summary>
        /// <param name="source">The source.</param>
        /// <returns></returns>
        public static ServiceJob CloneWithoutIdentity( this ServiceJob source )
        {
            var target = new ServiceJob();
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
        /// Copies the properties from another ServiceJob object to this ServiceJob object
        /// </summary>
        /// <param name="target">The target.</param>
        /// <param name="source">The source.</param>
        public static void CopyPropertiesFrom( this ServiceJob target, ServiceJob source )
        {
            target.Id = source.Id;
            target.Assembly = source.Assembly;
            target.Class = source.Class;
            target.CronExpression = source.CronExpression;
            target.Description = source.Description;
            target.EnableHistory = source.EnableHistory;
            target.ForeignGuid = source.ForeignGuid;
            target.ForeignKey = source.ForeignKey;
            target.HistoryCount = source.HistoryCount;
            target.IsActive = source.IsActive;
            target.IsSystem = source.IsSystem;
            target.LastRunDateTime = source.LastRunDateTime;
            target.LastRunDurationSeconds = source.LastRunDurationSeconds;
            target.LastRunSchedulerName = source.LastRunSchedulerName;
            target.LastStatus = source.LastStatus;
            target.LastStatusMessage = source.LastStatusMessage;
            target.LastSuccessfulRunDateTime = source.LastSuccessfulRunDateTime;
            target.Name = source.Name;
            target.NotificationEmails = source.NotificationEmails;
            target.NotificationStatus = source.NotificationStatus;
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
        public static Rock.ViewModel.ServiceJobViewModel ToViewModel( this ServiceJob model, Person currentPerson = null, bool loadAttributes = false )
        {
            var helper = new ServiceJobViewModelHelper();
            var viewModel = helper.CreateViewModel( model, currentPerson, loadAttributes );
            return viewModel;
        }

    }

}
