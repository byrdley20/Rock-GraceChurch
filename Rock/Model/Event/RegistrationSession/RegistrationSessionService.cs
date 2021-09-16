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

using Rock.Data;

namespace Rock.Model
{
    public partial class RegistrationSessionService
    {
        /// <summary>
        /// Tries to renew the registration session. This method uses the
        /// database context this instance was created with to lock the tables
        /// during processing and will call SaveChanges() before it returns.
        /// </summary>
        /// <param name="sessionGuid">The session unique identifier.</param>
        /// <returns></returns>
        public RegistrationSession TryToRenewSession( Guid sessionGuid )
        {
            var rockContext = Context as RockContext;
            var registrationSessionService = new RegistrationSessionService( rockContext );
            var registrationService = new RegistrationService( rockContext );

            // Try to find the session to renew, if we can't find it then
            // return a failure indication.
            var registrationSession = registrationSessionService.Get( sessionGuid );

            if ( registrationSession is null )
            {
                return null;
            }

            // Attempt to get the context that describes the registration
            // and the number of available slots.
            var context = registrationService.GetRegistrationContext( registrationSession.RegistrationInstanceId, out var errorMessage );

            if ( errorMessage.IsNotNullOrWhiteSpace() )
            {
                return null;
            }

            // Check if the session has expired already before we set the new
            // expiration window.
            var wasExpired = registrationSession.ExpirationDateTime < RockDateTime.Now;

            // Set the new expiration
            registrationSession.ExpirationDateTime = context.RegistrationSettings.TimeoutMinutes.HasValue
                ? RockDateTime.Now.AddMinutes( context.RegistrationSettings.TimeoutMinutes.Value )
                : RockDateTime.Now.AddDays( 1 );

            // If the session was expired then the number of reserved spots
            // might no longer be valid. Check if there are fewer spots
            // actually available and update the count.
            if ( wasExpired && context.SpotsRemaining.HasValue )
            {
                if ( context.SpotsRemaining.Value < registrationSession.RegistrationCount )
                {
                    registrationSession.RegistrationCount = context.SpotsRemaining.Value;
                }
            }

            // Persist the new session information to the database.
            rockContext.SaveChanges();

            return registrationSession;
        }

        /// <summary>
        /// Creates or update a registration session. This method ensures that
        /// the table is properly locked to prevent collision between multiple
        /// session renewals at the same time.
        /// </summary>
        /// <param name="sessionGuid">The session unique identifier.</param>
        /// <param name="createSession">The method to call to get a new <see cref="RegistrationSession"/> object that will be persisted to the database.</param>
        /// <param name="updateSession">The method to call to update an existing <see cref="RegistrationSession"/> object with any new information.</param>
        /// <param name="errorMessage">The error message.</param>
        /// <returns>The <see cref="RegistrationSession"/> that was created or updated; or <c>null</c> if an error occurred.</returns>
        public RegistrationSession CreateOrUpdateSession( Guid sessionGuid, Func<RegistrationSession> createSession, Action<RegistrationSession> updateSession, out string errorMessage )
        {
            var rockContext = Context as RockContext;
            var registrationService = new RegistrationService( rockContext );

            // Load the registration session and determine if it was expired already.
            var registrationSession = Get( sessionGuid );
            var wasExpired = registrationSession != null && registrationSession.ExpirationDateTime < RockDateTime.Now;
            var oldRegistrationCount = registrationSession?.RegistrationCount ?? 0;

            // If the session didn't exist then create a new one, otherwise
            // update the existing one.
            if ( registrationSession == null )
            {
                registrationSession = createSession();

                Add( registrationSession );
            }
            else
            {
                updateSession( registrationSession );
            }

            // Get the context information about the registration, specifically
            // the timeout and spots available.
            var context = registrationService.GetRegistrationContext( registrationSession.RegistrationInstanceId, out errorMessage );

            if ( errorMessage.IsNotNullOrWhiteSpace() )
            {
                return null;
            }

            // Set the new expiration date.
            registrationSession.ExpirationDateTime = context.RegistrationSettings.TimeoutMinutes.HasValue ?
                    RockDateTime.Now.AddMinutes( context.RegistrationSettings.TimeoutMinutes.Value ) :
                    RockDateTime.Now.AddDays( 1 );

            // Determine the number of registrants. If the registration was
            // expired then we need all spots requested again. Otherwise we
            // just need to be able to reserve the number of new spots since
            // the last session save.
            var newRegistrantCount = wasExpired
                ? registrationSession.RegistrationCount
                : ( registrationSession.RegistrationCount - oldRegistrationCount );

            // Handle the possibility that there is a change in the number of
            // registrants in the session.
            if ( context.SpotsRemaining.HasValue && context.SpotsRemaining.Value < newRegistrantCount )
            {
                errorMessage = "There is not enough capacity remaining for this many registrants.";
                return null;
            }

            errorMessage = string.Empty;

            return registrationSession;
        }
    }
}
