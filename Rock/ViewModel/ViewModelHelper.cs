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
using System.Collections.Concurrent;
using System.Linq;
using System.Reflection;

using Rock.Attribute;
using Rock.Field;
using Rock.Model;
using Rock.Security;
using Rock.Web.Cache;

namespace Rock.ViewModel
{
    /// <summary>
    /// View Model Helper
    /// </summary>
    public static class ViewModelHelper
    {
        /// <summary>
        /// The cached default helpers for converting models into view models.
        /// </summary>
        internal static ConcurrentDictionary<Type, Type> _defaultHelperTypes = new ConcurrentDictionary<Type, Type>();

        /// <summary>
        /// The field types associated with their unique identifiers. Because we
        /// expect to do these lookups so often, this provides a slight speed
        /// improvement over the cache. It also handles mapping unknown field
        /// types to the default field type.
        /// </summary>
        internal static ConcurrentDictionary<Guid, IFieldType> _fieldTypes = new ConcurrentDictionary<Guid, IFieldType>();

        /// <summary>
        /// Gets the view model.
        /// </summary>
        /// <param name="model">The model.</param>
        /// <param name="currentPerson">The current person.</param>
        /// <param name="loadAttributes">if set to <c>true</c> [load attributes].</param>
        /// <returns></returns>
        public static IViewModel GetDefaultViewModel( object model, Person currentPerson = null, bool loadAttributes = true )
        {
            // Check if it is already a view model.
            if ( model is IViewModel viewModel )
            {
                return viewModel;
            }

            var type = model.GetType();

            if ( type.IsDynamicProxyType() )
            {
                type = type.BaseType;
            }

            var helperType = _defaultHelperTypes.GetOrAdd( type, GetDefaultViewModelHelper );

            if ( helperType == null )
            {
                return null;
            }

            var helper = ( IViewModelHelper ) Activator.CreateInstance( helperType );

            return helper.CreateViewModel( model, currentPerson, loadAttributes );
        }

        /// <summary>
        /// Gets the default view model helper.
        /// </summary>
        /// <param name="type">The model type to be converted into a view model.</param>
        /// <returns>The <see cref="IViewModelHelper"/> type that will handle the conversion.</returns>
        private static Type GetDefaultViewModelHelper( Type type )
        {
            var helperType = Reflection.FindTypes( typeof( IViewModelHelper ) )
                .Select( a => a.Value )
                .Where( a => a.GetCustomAttribute<DefaultViewModelHelperAttribute>()?.Type == type )
                .OrderBy( a => a.Namespace.StartsWith( "Rock." ) )
                .FirstOrDefault();

            if ( helperType != null )
            {
                return helperType;
            }

            var viewModelType = Reflection.FindTypes( typeof( IViewModel ) )
                .Select( a => a.Value )
                .Where( a => a.GetCustomAttribute<DefaultViewModelHelperAttribute>()?.Type == type )
                .OrderBy( a => a.Namespace.StartsWith( "Rock." ) )
                .FirstOrDefault();

            if ( viewModelType == null )
            {
                return null;
            }

            return typeof( ViewModelHelper<,> ).MakeGenericType( type, viewModelType );
        }

        /// <summary>
        /// Converts an Attribute Value to a view model that can be sent to the client.
        /// </summary>
        /// <param name="attributeValue">The attribute value.</param>
        /// <returns>A <see cref="ClientAttributeValueViewModel"/> instance.</returns>
        /// <remarks>Internal until this is moved to a permanent location.</remarks>
        internal static ClientAttributeValueViewModel ToClientAttributeValue( AttributeValueCache attributeValue )
        {
            var attribute = AttributeCache.Get( attributeValue.AttributeId );

            var fieldType = _fieldTypes.GetOrAdd( attribute.FieldType.Guid, GetFieldType );

            return new ClientAttributeValueViewModel
            {
                FieldTypeGuid = attribute.FieldType.Guid,
                AttributeGuid = attribute.Guid,
                Name = attributeValue.AttributeName,
                Categories = attribute.Categories.Select( c => new ClientAttributeValueCategoryViewModel
                {
                    Guid = c.Guid,
                    Name = c.Name,
                    Order = c.Order
                } ).ToList(),
                Order = attribute.Order,
                TextValue = fieldType.GetTextValue( attributeValue.Value, attribute.QualifierValues ),
                Value = fieldType.GetClientValue( attributeValue.Value, attribute.QualifierValues )
            };
        }

        /// <summary>
        /// Converts an Attribute Value to a view model that can be sent to the client.
        /// </summary>
        /// <param name="attributeValue">The attribute value.</param>
        /// <returns>A <see cref="ClientEditableAttributeValueViewModel"/> instance.</returns>
        /// <remarks>Internal until this is moved to a permanent location.</remarks>
        internal static ClientEditableAttributeValueViewModel ToClientEditableAttributeValue( AttributeValueCache attributeValue )
        {
            var attribute = AttributeCache.Get( attributeValue.AttributeId );

            return ToClientEditableAttributeValue( attribute, attributeValue.Value );
        }

        /// <summary>
        /// Converts an Attribute and the specified value to a view model that can be
        /// sent to the client.
        /// </summary>
        /// <param name="attribute">The attribute.</param>
        /// <param name="value">The value to be encoded.</param>
        /// <returns>A <see cref="ClientEditableAttributeValueViewModel"/> instance.</returns>
        /// <remarks>Internal until this is moved to a permanent location.</remarks>
        internal static ClientEditableAttributeValueViewModel ToClientEditableAttributeValue( AttributeCache attribute, string value )
        {
            var fieldType = _fieldTypes.GetOrAdd( attribute.FieldType.Guid, GetFieldType );

            return new ClientEditableAttributeValueViewModel
            {
                FieldTypeGuid = attribute.FieldType.Guid,
                AttributeGuid = attribute.Guid,
                Name = attribute.Name,
                Categories = attribute.Categories.Select( c => new ClientAttributeValueCategoryViewModel
                {
                    Guid = c.Guid,
                    Name = c.Name,
                    Order = c.Order
                } ).ToList(),
                Order = attribute.Order,
                TextValue = fieldType.GetTextValue( value, attribute.QualifierValues ),
                Value = fieldType.GetClientValue( value, attribute.QualifierValues ),
                Key = attribute.Key,
                IsRequired = attribute.IsRequired,
                Description = attribute.Description,
                ConfigurationValues = fieldType.GetClientConfigurationValues( attribute.QualifierValues )
            };
        }

        /// <summary>
        /// Converts a client provided value into one that can be stored in
        /// the database.
        /// </summary>
        /// <param name="clientValue">The value provided by the client.</param>
        /// <param name="attribute">The attribute being set.</param>
        /// <returns>A string value.</returns>
        /// <remarks>Internal until this is moved to a permanent location.</remarks>
        internal static string ToDatabaseAttributeValue( string clientValue, AttributeCache attribute )
        {
            var fieldType = _fieldTypes.GetOrAdd( attribute.FieldType.Guid, GetFieldType );

            return fieldType.GetValueFromClient( clientValue, attribute.QualifierValues );
        }

        /// <summary>
        /// Converts a database value into one that can be sent to a client.
        /// </summary>
        /// <param name="databaseValue">The value that came from the database.</param>
        /// <param name="attribute">The attribute being set.</param>
        /// <returns>A string value.</returns>
        /// <remarks>Internal until this is moved to a permanent location.</remarks>
        internal static string FromDatabaseAttributeValue( string databaseValue, AttributeCache attribute )
        {
            var fieldType = _fieldTypes.GetOrAdd( attribute.FieldType.Guid, GetFieldType );

            return fieldType.GetClientValue( databaseValue, attribute.QualifierValues );
        }

        /// <summary>
        /// Gets the <see cref="IFieldType"/> that handles the specified
        /// unique identifier.
        /// </summary>
        /// <param name="guid">The unique identifier.</param>
        /// <returns>A <see cref="IFieldType"/> instance.</returns>
        private static IFieldType GetFieldType( Guid guid )
        {
            return FieldTypeCache.Get( guid )?.Field ?? new Field.Types.TextFieldType();
        }
    }

    /// <summary>
    /// View Model Helper
    /// </summary>
    public class ViewModelHelper<TModel, TViewModel> : IViewModelHelper
        where TViewModel : IViewModel, new()
    {
        /// <inheritdoc/>
        IViewModel IViewModelHelper.CreateViewModel( object model, Person currentPerson, bool loadAttributes )
        {
            if ( model is TModel tModel )
            {
                return CreateViewModel( tModel, currentPerson, loadAttributes );
            }

            return null;
        }

        /// <summary>
        /// Converts the model to the view model.
        /// </summary>
        /// <param name="model">The entity.</param>
        /// <param name="currentPerson">The current person.</param>
        /// <param name="loadAttributes">if set to <c>true</c> [load attributes].</param>
        /// <returns></returns>
        public virtual TViewModel CreateViewModel( TModel model, Person currentPerson = null, bool loadAttributes = true )
        {
            if ( model == null )
            {
                return default;
            }

            var viewModel = Activator.CreateInstance<TViewModel>();
            CopyProperties( model, viewModel );

            AddAttributesToViewModel( model, viewModel, currentPerson, loadAttributes );
            ApplyAdditionalPropertiesAndSecurityToViewModel( model, viewModel, currentPerson, loadAttributes );

            return viewModel;
        }

        /// <summary>
        /// Adds the attributes to view model.
        /// </summary>
        /// <param name="model">The model.</param>
        /// <param name="viewModel">The view model.</param>
        /// <param name="currentPerson">The current person.</param>
        /// <param name="loadAttributes">if set to <c>true</c> [load attributes].</param>
        public virtual void AddAttributesToViewModel( TModel model, TViewModel viewModel, Person currentPerson = null, bool loadAttributes = true )
        {
            if ( loadAttributes && model is IHasAttributes modelWithAttributes && viewModel is IViewModelWithAttributes viewModelWithAttributes )
            {
                if ( modelWithAttributes.Attributes == null )
                {
                    modelWithAttributes.LoadAttributes();
                }

                viewModelWithAttributes.Attributes = modelWithAttributes.AttributeValues
                    .Where( av =>
                    {
                        var attribute = AttributeCache.Get( av.Value.AttributeId );
                        return attribute?.IsAuthorized( Authorization.VIEW, currentPerson ) ?? false;
                    } )
                    .ToDictionary( kvp => kvp.Key, kvp => ViewModelHelper.ToClientAttributeValue( kvp.Value ) );
            }
        }

        /// <summary>
        /// Applies the additional properties and security to view model.
        /// </summary>
        /// <param name="model">The model.</param>
        /// <param name="viewModel">The view model.</param>
        /// <param name="currentPerson">The current person.</param>
        /// <param name="loadAttributes">if set to <c>true</c> [load attributes].</param>
        public virtual void ApplyAdditionalPropertiesAndSecurityToViewModel( TModel model, TViewModel viewModel, Person currentPerson = null, bool loadAttributes = true )
        {
            return;
        }

        /// <summary>
        /// Copies the properties to the destination.
        /// https://stackoverflow.com/a/28814556/13215483
        /// </summary>
        /// <param name="source">The source object to copy properties from.</param>
        /// <param name="destination">The destination object to copy properties to.</param>
        public static void CopyProperties( object source, object destination )
        {
            if ( source == null || destination == null )
            {
                return;
            }

            var sourceProps = source.GetType().GetProperties().Where( x => x.CanRead ).ToList();
            var destProps = destination.GetType().GetProperties().Where( x => x.CanWrite ).ToList();

            foreach ( var sourceProp in sourceProps )
            {
                if ( destProps.Any( x => x.Name == sourceProp.Name ) )
                {
                    var destType = destProps.First( x => x.Name == sourceProp.Name );

                    if ( destType.CanWrite && destType.PropertyType.IsAssignableFrom( sourceProp.PropertyType ) )
                    {
                        // check if the property can be set or no.
                        destType.SetValue( destination, sourceProp.GetValue( source, null ), null );
                    }
                }
            }
        }
    }
}
