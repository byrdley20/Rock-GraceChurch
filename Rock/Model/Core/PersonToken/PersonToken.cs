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
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;
using System.Runtime.Serialization;
using Rock.Data;

namespace Rock.Model
{
    /// <summary>
    /// 
    /// </summary>
    [RockDomain( "Core" )]
    [Table( "PersonToken" )]
    [DataContract]
    public partial class PersonToken : Entity<PersonToken>
    {
        #region Entity Properties

        /// <summary>
        /// Gets or sets the person alias identifier.
        /// </summary>
        /// <value>
        /// The person alias identifier.
        /// </value>
        [DataMember]
        public int PersonAliasId { get; set; }

        /// <summary>
        /// Gets or sets the unique token. Use PersonToken
        /// </summary>
        /// <value>
        /// The token.
        /// </value>
        [MaxLength( 32 )]
        [HideFromReporting]
        [Index( IsUnique = true )]
        public string Token { get; private set; }

        // NOTE: Intentionally do not include [DataMember] on Token so that is isn't accessible to REST api or Lava

        /// <summary>
        /// Gets or sets the expire date time.
        /// </summary>
        /// <value>
        /// The expire date time.
        /// </value>
        [DataMember]
        public DateTime? ExpireDateTime { get; set; }

        /// <summary>
        /// Gets or sets the times used.
        /// </summary>
        /// <value>
        /// The times used.
        /// </value>
        [DataMember]
        public int TimesUsed { get; set; }

        /// <summary>
        /// Gets or sets the usage limit.
        /// </summary>
        /// <value>
        /// The usage limit.
        /// </value>
        [DataMember]
        public int? UsageLimit { get; set; }

        /// <summary>
        /// Gets or sets the last used date time.
        /// </summary>
        /// <value>
        /// The last used date time.
        /// </value>
        [DataMember]
        public DateTime? LastUsedDateTime { get; set; }

        /// <summary>
        /// Gets or sets the page identifier.
        /// </summary>
        /// <value>
        /// The page identifier.
        /// </value>
        [DataMember]
        public int? PageId { get; set; }

        #endregion

        #region Navigation Properties

        /// <summary>
        /// Gets or sets the person alias.
        /// </summary>
        /// <value>
        /// The person alias.
        /// </value>
        public virtual PersonAlias PersonAlias { get; set; }

        /// <summary>
        /// Gets or sets the page.
        /// </summary>
        /// <value>
        /// The page.
        /// </value>
        public virtual Page Page { get; set; }

        #endregion
    }

    #region Entity Configuration

    /// <summary>
    /// 
    /// </summary>
    public partial class PersonTokenConfiguration : EntityTypeConfiguration<PersonToken>
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="PersonTokenConfiguration"/> class.
        /// </summary>
        public PersonTokenConfiguration()
        {
            this.HasRequired( r => r.PersonAlias ).WithMany().HasForeignKey( r => r.PersonAliasId ).WillCascadeOnDelete( true );
            this.HasOptional( r => r.Page ).WithMany().HasForeignKey( r => r.PageId ).WillCascadeOnDelete( true );
        }
    }

    #endregion
}
