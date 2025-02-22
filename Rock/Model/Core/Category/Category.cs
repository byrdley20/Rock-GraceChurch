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
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;
using System.Runtime.Serialization;

using Rock.Data;
using Rock.Web.Cache;
using Rock.Lava;

namespace Rock.Model
{
    /// <summary>
    /// Represents a category or group of entity objects in Rock. A category can be used to group entity instances of <see cref="Rock.Model.EntityType">EntityTypes</see>. 
    /// For an EntityType to be categorizable the EntityType will need to implement the <see cref="Rock.Data.ICategorized"/> interface.
    /// </summary>
    [RockDomain( "Core" )]
    [Table( "Category" )]
    [DataContract]
    public partial class Category : Model<Category>, IOrdered, ICacheable
    {
        #region Entity Properties

        /// <summary>
        /// Gets or sets a flag indicating if this Category is part of the Rock core system/framework.
        /// </summary>
        /// <value>
        /// A <see cref="System.Boolean"/> value that is <c>true</c> if the Category is part of the Rock core system/framework; otherwise <c>false</c>.
        /// </value>
        [Required]
        [DataMember( IsRequired = true )]
        public bool IsSystem { get; set; }

        /// <summary>
        /// Gets or sets the CategoryId of the parent Category. 
        /// </summary>
        /// <value>
        /// A <see cref="System.Int32"/> representing the CategoryId of the parent Category.
        /// </value>
        [DataMember]
        public int? ParentCategoryId { get; set; }

        /// <summary>
        /// Gets or sets the EntityTypeId of the <see cref="Rock.Model.EntityType"/> that this Category belongs to.
        /// </summary>
        /// <value>
        /// A <see cref="System.Int32"/> representing the EntityTypeId of the <see cref="Rock.Model.EntityType"/> that this Category belongs to.
        /// </value>
        [Required]
        [DataMember( IsRequired = true )]
        public int EntityTypeId { get; set; }

        /// <summary>
        /// Gets or sets the entity type qualifier column that contains the value (see <see cref="EntityTypeQualifierValue"/>) that is used to narrow the scope of the Category.
        /// </summary>
        /// <value>
        /// A <see cref="System.String"/> representing the name of the Qualifier Column/Property that contains the <see cref="EntityTypeQualifierValue"/> that is used to 
        /// narrow the scope of the Category.
        /// </value>
        [MaxLength( 50 )]
        [DataMember]
        public string EntityTypeQualifierColumn { get; set; }

        /// <summary>
        /// Gets or sets the entity type qualifier value that is used to narrow the scope of the Category to a subset or specific instance of an EntityType.
        /// </summary>
        /// <value>
        /// A <see cref="System.String"/> that represents the value that is used to narrow the scope of the Category.
        /// </value>
        [MaxLength( 200 )]
        [DataMember]
        public string EntityTypeQualifierValue { get; set; }

        /// <summary>
        /// Gets or sets the order.
        /// </summary>
        /// <value>
        /// The order.
        /// </value>
        [Required]
        [DataMember( IsRequired = true )]
        public int Order { get; set; }
        
        /// <summary>
        /// Gets or sets the Name of the Category
        /// </summary>
        /// <value>
        /// A <see cref="System.String"/> that represents the Name of the Category.
        /// </value>
        [Required( ErrorMessage = "Name is required" )]
        [MaxLength( 100 )]
        [DataMember( IsRequired = true )]
        public string Name { get; set; }

        /// <summary>
        /// Gets or sets the description.
        /// </summary>
        /// <value>
        /// The description.
        /// </value>
        [DataMember]
        public string Description { get; set; }
        
        /// <summary>
        /// Gets or sets the name of the icon CSS class. This property is only used for CSS based icons.
        /// </summary>
        /// <value>
        /// A <see cref="System.String"/> representing the name of the icon CSS class. This property will be null if a file based icon is being used.
        /// </value>
        [MaxLength( 100 )]
        [DataMember]
        public string IconCssClass { get; set; }

        /// <summary>
        /// Gets or sets the color of the highlight.
        /// </summary>
        /// <value>
        /// The color of the highlight.
        /// </value>
        [MaxLength( 50 )]
        [DataMember]
        public string HighlightColor { get; set; }

        #endregion

        #region Navigation Properties

        /// <summary>
        /// Gets or sets the parent category.
        /// </summary>
        /// <value>
        /// The parent category
        /// </value>
        [LavaVisible]
        public virtual Category ParentCategory { get; set; }

        /// <summary>
        /// Gets or sets a collection of Categories that are children of the current Category.
        /// </summary>
        /// <value>
        /// The Categories that are children of the current Category.
        /// </value>
        [DataMember]
        public virtual ICollection<Category> ChildCategories { get; set; }

        /// <summary>
        /// Gets or sets the <see cref="Rock.Model.EntityType" /> that can use this Category.
        /// </summary>
        /// <value>
        /// The <see cref="Rock.Model.EntityType"/> that can use this Category.
        /// </value>
        [DataMember]
        public virtual EntityType EntityType { get; set; }

        #endregion

        #region Public Methods

        /// <summary>
        /// Returns a <see cref="System.String" /> that represents this instance.
        /// </summary>
        /// <returns>
        /// A <see cref="System.String" /> that represents this instance.
        /// </returns>
        public override string ToString()
        {
            return this.Name;
        }

        #endregion
    }

    #region Entity Configuration

    /// <summary>
    /// Category Configuration class.
    /// </summary>
    public partial class CategoryConfiguration : EntityTypeConfiguration<Category>
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="CategoryConfiguration" /> class.
        /// </summary>
        public CategoryConfiguration()
        {
            this.HasOptional( p => p.ParentCategory ).WithMany( p => p.ChildCategories ).HasForeignKey( p => p.ParentCategoryId ).WillCascadeOnDelete( false );
            this.HasRequired( p => p.EntityType ).WithMany().HasForeignKey( p => p.EntityTypeId ).WillCascadeOnDelete( false );
        }
    }

    #endregion

}
