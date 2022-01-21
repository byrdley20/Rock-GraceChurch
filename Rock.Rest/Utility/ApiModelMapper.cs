using System;
using System.Linq;
using System.Reflection;

namespace Rock.Rest.Utility
{
    /// <summary>
    /// Interface IMappedApiModel
    /// </summary>
    public interface IMappedApiModel { }

    /// <summary>
    /// Class ApiModelMapper.
    /// </summary>
    public static class ApiModelMapper
    {

        /// <summary>
        /// Maps to target instance type.
        /// </summary>
        /// <typeparam name="TTarget">The type of the t target.</typeparam>
        /// <param name="sourceType">Type of the source.</param>
        /// <param name="targetType">Type of the target.</param>
        /// <returns>TTarget.</returns>
        public static TTarget MapTo<TTarget>( this IMappedApiModel sourceType, TTarget targetType ) 
        {
            const BindingFlags flags =
                BindingFlags.Public |
                BindingFlags.IgnoreCase |
                BindingFlags.Instance;

            // Copy properties
            var sourceProperties = sourceType.GetType().GetProperties( flags )
                                     .Where( v => v.CanRead )
                                     .Select( v => new
                                     {
                                         Name = v.Name,
                                         Type = Nullable.GetUnderlyingType( v.PropertyType ) ?? v.PropertyType
                                     } ).ToList();

            var targetProperties = targetType.GetType().GetProperties( flags )
                                     .Where( v => v.CanRead )
                                     .Select( v => new
                                     {
                                         Name = v.Name,
                                         Type = Nullable.GetUnderlyingType( v.PropertyType ) ?? v.PropertyType
                                     } ).ToList();

            var inCommonProperties = sourceProperties.Intersect( targetProperties ).ToList();

            foreach ( var property in inCommonProperties )
            {
                var value = sourceType.GetType().GetProperty( property.Name ).GetValue( sourceType, null );
                PropertyInfo targetProperty = targetType.GetType().GetProperty( property.Name );

                if ( targetProperty.CanWrite )
                {
                    targetProperty.SetValue( targetType, value, null );
                }
            }
            return targetType;
        }

        /// <summary>
        /// Creates the mapped type.
        /// </summary>
        /// <typeparam name="TTarget">The type of the t target.</typeparam>
        /// <param name="apiModel">The API model.</param>
        /// <returns>TTarget.</returns>
        public static TTarget CreateMapped<TTarget>( this IMappedApiModel apiModel )
            where TTarget : new()
        {
            return apiModel.MapTo( new TTarget() );
        }
    }
}
