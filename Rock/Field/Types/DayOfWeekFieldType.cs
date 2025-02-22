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
using System.Linq;
using System.Web.UI;
using System.Web.UI.WebControls;

using Rock.Reporting;
using Rock.Web.UI.Controls;

namespace Rock.Field.Types
{
    /// <summary>
    /// Field Type to select a Day of the Week
    /// stored as int value that can be cast to System.DayOfWeek (where Sunday = 0)
    /// </summary>
    public class DayOfWeekFieldType : FieldType
    {

        #region Formatting

        /// <inheritdoc/>
        public override string GetTextValue( string value, Dictionary<string, string> configurationValues )
        {
            var intValue = value.AsIntegerOrNull();

            if ( !intValue.HasValue )
            {
                return string.Empty;
            }

            System.DayOfWeek dayOfWeek = ( System.DayOfWeek ) intValue.Value;
            return dayOfWeek.ConvertToString();
        }

        /// <summary>
        /// Returns the field's current value(s)
        /// </summary>
        /// <param name="parentControl">The parent control.</param>
        /// <param name="value">Information about the value</param>
        /// <param name="configurationValues">The configuration values.</param>
        /// <param name="condensed">Flag indicating if the value should be condensed (i.e. for use in a grid column)</param>
        /// <returns></returns>
        public override string FormatValue( System.Web.UI.Control parentControl, string value, Dictionary<string, ConfigurationValue> configurationValues, bool condensed )
        {
            return !condensed
                ? GetTextValue( value, configurationValues.ToDictionary(k => k.Key, k => k.Value.Value ) )
                : GetCondensedTextValue( value, configurationValues.ToDictionary(k => k.Key, k => k.Value.Value ) );
        }

        /// <summary>
        /// Returns the value that should be used for sorting, using the most appropriate datatype
        /// </summary>
        /// <param name="parentControl">The parent control.</param>
        /// <param name="value">The value.</param>
        /// <param name="configurationValues">The configuration values.</param>
        /// <returns></returns>
        public override object SortValue( Control parentControl, string value, Dictionary<string, ConfigurationValue> configurationValues )
        {
            int? intValue = value.AsIntegerOrNull();
            if ( intValue.HasValue )
            {
                System.DayOfWeek dayOfWeek = (System.DayOfWeek)intValue.Value;
                return dayOfWeek;
            }

            return (System.DayOfWeek)0;
        }

        #endregion

        #region Edit Control

        /// <summary>
        /// Creates the control(s) necessary for prompting user for a new value
        /// </summary>
        /// <param name="configurationValues">The configuration values.</param>
        /// <param name="id"></param>
        /// <returns>
        /// The control
        /// </returns>
        public override System.Web.UI.Control EditControl( Dictionary<string, ConfigurationValue> configurationValues, string id )
        {
            return new DayOfWeekPicker { ID = id }; 
        }

        /// <summary>
        /// Reads new values entered by the user for the field
        /// </summary>
        /// <param name="control">Parent control that controls were added to in the CreateEditControl() method</param>
        /// <param name="configurationValues">The configuration values.</param>
        /// <returns></returns>
        public override string GetEditValue( System.Web.UI.Control control, Dictionary<string, ConfigurationValue> configurationValues )
        {
            List<string> values = new List<string>();

            DayOfWeekPicker dayOfWeekPicker = control as DayOfWeekPicker;

            if ( dayOfWeekPicker != null )
            {
                var selectedDay = dayOfWeekPicker.SelectedDayOfWeek;
                if ( selectedDay != null)
                {
                    return selectedDay.ConvertToInt().ToString();
                }
                else
                {
                    return string.Empty;
                }
            }

            return null;
        }

        /// <summary>
        /// Sets the value.
        /// </summary>
        /// <param name="control">The control.</param>
        /// <param name="configurationValues">The configuration values.</param>
        /// <param name="value">The value.</param>
        public override void SetEditValue( System.Web.UI.Control control, Dictionary<string, ConfigurationValue> configurationValues, string value )
        {
            DayOfWeek? dayOfWeek = null;

            if ( !string.IsNullOrWhiteSpace(value) )
            {
                dayOfWeek = (DayOfWeek)( value.AsInteger() );
            }

            DayOfWeekPicker dayOfWeekPicker = control as DayOfWeekPicker;
            dayOfWeekPicker.SelectedDayOfWeek = dayOfWeek;
        }

        #endregion

        #region Filter Control

        /// <summary>
        /// Gets the filter compare control.
        /// </summary>
        /// <param name="configurationValues">The configuration values.</param>
        /// <param name="id">The identifier.</param>
        /// <param name="required">if set to <c>true</c> [required].</param>
        /// <param name="filterMode">The filter mode.</param>
        /// <returns></returns>
        public override Control FilterCompareControl( Dictionary<string, ConfigurationValue> configurationValues, string id, bool required, FilterMode filterMode )
        {
            var lbl = new Label();
            lbl.ID = string.Format( "{0}_lIs", id );
            lbl.AddCssClass( "data-view-filter-label" );
            lbl.Text = "Is";

            // hide the compare control when in SimpleFilter mode
            lbl.Visible = filterMode != FilterMode.SimpleFilter;
            
            return lbl;
        }


        /// <summary>
        /// Gets the filter compare value.
        /// </summary>
        /// <param name="control">The control.</param>
        /// <param name="filterMode">The filter mode.</param>
        /// <returns></returns>
        public override string GetFilterCompareValue( Control control, FilterMode filterMode )
        {
            return GetEqualToCompareValue();
        }

        /// <summary>
        /// Converts the type of the value to property.
        /// </summary>
        /// <param name="value">The value.</param>
        /// <param name="propertyType">Type of the property.</param>
        /// <param name="isNullableType">if set to <c>true</c> [is nullable type].</param>
        /// <returns></returns>
        public override object ConvertValueToPropertyType( string value, Type propertyType, bool isNullableType )
        {
            int? intValue = value.AsIntegerOrNull();
            if ( intValue.HasValue )
            {
                return (System.DayOfWeek)intValue.Value;
            }
            return null;
        }

        #endregion

    }
}