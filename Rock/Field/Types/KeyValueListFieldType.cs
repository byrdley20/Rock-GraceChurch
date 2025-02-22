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
using System.Web;
using System.Web.UI;

using Rock.Web.Cache;
using Rock.Web.UI.Controls;

namespace Rock.Field.Types
{
    /// <summary>
    /// Field used to save and display a key/value list
    /// </summary>
    [Serializable]
    public class KeyValueListFieldType : ValueListFieldType
    {
        private const string VALUES_KEY = "values";

        #region Configuration

        /// <summary>
        /// Returns a list of the configuration keys
        /// </summary>
        /// <returns></returns>
        public override List<string> ConfigurationKeys()
        {
            var configKeys = base.ConfigurationKeys();
            configKeys.Insert(0, "keyprompt" );
            configKeys.Insert( 0, "displayvaluefirst" );
            return configKeys;
        }

        /// <inheritdoc/>
        public override Dictionary<string, string> GetClientConfigurationValues( Dictionary<string, string> configurationValues )
        {
            var clientValues = base.GetClientConfigurationValues( configurationValues );

            // Remove the defined type key if it exists, clients don't need to see this.
            if ( clientValues.ContainsKey( "definedtype" ) )
            {
                clientValues.Remove( "definedtype" );
            }

            // Remove the internal custom values key if it exists, clients don't
            // need to see this.
            if ( clientValues.ContainsKey( "customvalues" ) )
            {
                clientValues.Remove( "customvalues" );
            }

            // Generate the custom values that the clients expect to see.
            clientValues[VALUES_KEY] = GetCustomValues( configurationValues.ToDictionary( k => k.Key, k => new ConfigurationValue( k.Value ) ) )
                .Select( kvp => new
                {
                    value = kvp.Key,
                    text = kvp.Value
                } )
                .ToCamelCaseJson( false, true );

            return clientValues;
        }

        /// <summary>
        /// Creates the HTML controls required to configure this type of field
        /// </summary>
        /// <returns></returns>
        public override List<Control> ConfigurationControls()
        {
            var controls = base.ConfigurationControls();

            var tbKeyPrompt = new RockTextBox();
            controls.Insert(0, tbKeyPrompt );
            tbKeyPrompt.AutoPostBack = true;
            tbKeyPrompt.TextChanged += OnQualifierUpdated;
            tbKeyPrompt.Label = "Key Prompt";
            tbKeyPrompt.Help = "The text to display as a prompt in the key textbox.";

            var cbDisplayValueFirst = new RockCheckBox();
            controls.Insert( 5, cbDisplayValueFirst );
            cbDisplayValueFirst.Label = "Display Value First";
            cbDisplayValueFirst.Help = "Reverses the display order of the key and the value.";

            return controls;
        }

        /// <summary>
        /// Gets the configuration value.
        /// </summary>
        /// <param name="controls">The controls.</param>
        /// <returns></returns>
        public override Dictionary<string, ConfigurationValue> ConfigurationValues( List<Control> controls )
        {
            Dictionary<string, ConfigurationValue> configurationValues = new Dictionary<string, ConfigurationValue>();
            configurationValues.Add( "keyprompt", new ConfigurationValue( "Key Prompt", "The text to display as a prompt in the key textbox.", "" ) );
            configurationValues.Add( "valueprompt", new ConfigurationValue( "Label Prompt", "The text to display as a prompt in the label textbox.", "" ) );
            configurationValues.Add( "definedtype", new ConfigurationValue( "Defined Type", "Optional Defined Type to select values from, otherwise values will be free-form text fields", "" ) );
            configurationValues.Add( "customvalues", new ConfigurationValue( "Custom Values", "Optional list of options to use for the values.  Format is either 'value1,value2,value3,...', or 'value1^text1,value2^text2,value3^text3,...'.", "" ) );
            configurationValues.Add( "allowhtml", new ConfigurationValue( "Allow HTML", "Allow HTML content in values", "" ) );
            configurationValues.Add( "displayvaluefirst", new ConfigurationValue( "Display Value First", "Reverses the display order of the key and the value.", "" ) );

            if ( controls != null )
            {
                if ( controls.Count > 0 && controls[0] != null && controls[0] is RockTextBox   )
                {
                    configurationValues["keyprompt"].Value = ( (RockTextBox)controls[0] ).Text;
                }
                if ( controls.Count > 1 && controls[1] != null && controls[1] is RockTextBox  )
                {
                    configurationValues["valueprompt"].Value = ( (RockTextBox)controls[1] ).Text;
                }
                if ( controls.Count > 2 && controls[2] != null && controls[2] is RockDropDownList  )
                {
                    configurationValues["definedtype"].Value = ( (RockDropDownList)controls[2] ).SelectedValue;
                }
                if ( controls.Count > 3 && controls[3] != null && controls[3] is RockTextBox )
                {
                    configurationValues["customvalues"].Value = ( (RockTextBox)controls[3] ).Text;
                }
                if ( controls.Count > 4 && controls[4] != null && controls[4] is RockCheckBox )
                {
                    configurationValues["allowhtml"].Value = ( ( RockCheckBox ) controls[4] ).Checked.ToString();
                }
                if ( controls.Count > 5 && controls[5] != null && controls[5] is RockCheckBox )
                {
                    configurationValues["displayvaluefirst"].Value = ( (RockCheckBox)controls[5] ).Checked.ToString();
                }
            }


            return configurationValues;
        }

        /// <summary>
        /// Sets the configuration value.
        /// </summary>
        /// <param name="controls"></param>
        /// <param name="configurationValues"></param>
        public override void SetConfigurationValues( List<Control> controls, Dictionary<string, ConfigurationValue> configurationValues )
        {
            if ( controls != null && configurationValues != null )
            {
                if ( controls.Count > 0 && controls[0] != null && controls[0] is RockTextBox && configurationValues.ContainsKey( "keyprompt" ) )
                {
                    ( (RockTextBox)controls[0] ).Text = configurationValues["keyprompt"].Value;
                }
                if ( controls.Count > 1 && controls[1] != null && controls[1] is RockTextBox && configurationValues.ContainsKey( "valueprompt" ) )
                {
                    ( (RockTextBox)controls[1] ).Text = configurationValues["valueprompt"].Value;
                }
                if ( controls.Count > 2 && controls[2] != null && controls[2] is RockDropDownList && configurationValues.ContainsKey( "definedtype" ) )
                {
                    ( (RockDropDownList)controls[2] ).SelectedValue = configurationValues["definedtype"].Value;
                }
                if ( controls.Count > 3 && controls[3] != null && controls[3] is RockTextBox && configurationValues.ContainsKey( "customvalues" ) )
                {
                   ( (RockTextBox)controls[3] ).Text = configurationValues["customvalues"].Value;
                }
                if ( controls.Count > 4 && controls[4] != null && controls[4] is RockCheckBox && configurationValues.ContainsKey( "allowhtml" ) )
                {
                    ( ( RockCheckBox ) controls[4] ).Checked = configurationValues["allowhtml"].Value.AsBoolean();
                }
                if ( controls.Count > 5 && controls[5] != null && controls[5] is RockCheckBox && configurationValues.ContainsKey( "displayvaluefirst" ) )
                {
                    ( (RockCheckBox)controls[5] ).Checked = configurationValues["displayvaluefirst"].Value.AsBoolean();
                }
            }
        }

        /// <summary>
        /// Gets the custom values that have been defined. These reflect either the
        /// defined type values or the custom options entered into the custom values
        /// text box.
        /// </summary>
        /// <param name="configurationValues"></param>
        /// <returns></returns>
        private Dictionary<string, string> GetCustomValues( Dictionary<string, ConfigurationValue> configurationValues )
        {
            var definedTypeId = configurationValues.GetConfigurationValueAsString( "definedtype" ).AsIntegerOrNull();

            if ( definedTypeId.HasValue )
            {
                var definedType = DefinedTypeCache.Get( definedTypeId.Value );

                if ( definedType != null )
                {
                    return definedType.DefinedValues
                        .ToDictionary( v => v.Id.ToString(), v => v.Value );
                }
            }

            return Helper.GetConfiguredValues( configurationValues, "customvalues" );
        }

        #endregion

        #region Formatting

        /// <inheritdoc/>
        public override string GetTextValue( string value, Dictionary<string, string> configurationValues )
        {
            bool isDefinedType = configurationValues != null && configurationValues.ContainsKey( "definedtype" ) && configurationValues["definedtype"].AsIntegerOrNull().HasValue;

            var values = new List<string>();
            string[] nameValues = value?.Split( new char[] { '|' }, StringSplitOptions.RemoveEmptyEntries ) ?? new string[0];

            foreach ( string nameValue in nameValues )
            {
                string[] nameAndValue = nameValue.Split( new char[] { '^' } );

                // url decode array items just in case they were UrlEncoded (in the KeyValueList controls)
                nameAndValue = nameAndValue.Select( s => HttpUtility.UrlDecode( s ) ).ToArray();

                if ( nameAndValue.Length == 2 )
                {
                    if ( isDefinedType )
                    {
                        var definedValue = DefinedValueCache.Get( nameAndValue[1].AsInteger() );
                        if ( definedValue != null )
                        {
                            nameAndValue[1] = definedValue.Value;
                        }
                    }
                    values.Add( string.Format( "{0}: {1}", nameAndValue[0], nameAndValue[1] ) );
                }
                else
                {
                    values.Add( nameValue );
                }
            }

            return values.AsDelimited( ", " );
        }

        /// <summary>
        /// Returns the field's current value(s)
        /// </summary>
        /// <param name="parentControl">The parent control.</param>
        /// <param name="value">Information about the value</param>
        /// <param name="configurationValues"></param>
        /// <param name="condensed">Flag indicating if the value should be condensed (i.e. for use in a grid column)</param>
        /// <returns></returns>
        public override string FormatValue( Control parentControl, string value, Dictionary<string, ConfigurationValue> configurationValues, bool condensed )
        {
            return GetTextValue( value, configurationValues.ToDictionary( k => k.Key, k => k.Value.Value ) );
        }

        #endregion

        #region Edit Control

        /// <inheritdoc/>
        public override string GetClientValue( string value, Dictionary<string, string> configurationValues )
        {
            var nameValues = value?.Split( new char[] { '|' }, StringSplitOptions.RemoveEmptyEntries ) ?? new string[0];

            return nameValues
                .Select( nv => nv.Split( new char[] { '^' } ) )
                .Where( nv => nv.Length == 2 )
                .Select( nv => new ClientValue
                {
                    Key = HttpUtility.UrlDecode( nv[0] ),
                    Value = HttpUtility.UrlDecode( nv[1] )
                } )
                .ToCamelCaseJson( false, true );
        }

        /// <inheritdoc/>
        public override string GetValueFromClient( string clientValue, Dictionary<string, string> configurationValues )
        {
            var values = clientValue.FromJsonOrNull<List<ClientValue>>();

            if ( values == null )
            {
                return string.Empty;
            }

            var customValues = GetCustomValues( configurationValues.ToDictionary( k => k.Key, k => new ConfigurationValue( k.Value ) ) );

            // If there are any custom values, then ensure that all values we
            // got from the client are valid. If not, ignore them.
            if ( customValues.Any() )
            {
                values = values
                    .Where( v => customValues.ContainsKey( v.Value ) )
                    .ToList();
            }

            return values.Select( v => $"{HttpUtility.UrlEncode( v.Key )}^{HttpUtility.UrlEncode( v.Value )}" )
                .JoinStrings( "|" );
        }

        /// <summary>
        /// Edits the control.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns></returns>
        public override ValueList EditControl( string id )
        {
            return new KeyValueList { ID = id };
        }

        /// <summary>
        /// Creates the control(s) necessary for prompting user for a new value
        /// </summary>
        /// <param name="configurationValues">The configuration values.</param>
        /// <param name="id"></param>
        /// <returns>
        /// The control
        /// </returns>
        public override Control EditControl( Dictionary<string, ConfigurationValue> configurationValues, string id )
        {
            var control = base.EditControl( configurationValues, id ) as KeyValueList;

            if ( configurationValues != null )
            {
                if ( configurationValues.ContainsKey( "keyprompt" ) )
                {
                    control.KeyPrompt = configurationValues["keyprompt"].Value;
                }

                if ( configurationValues.ContainsKey( "displayvaluefirst" ) )
                {
                    control.DisplayValueFirst = configurationValues["displayvaluefirst"].Value.AsBoolean();
                }
            }

            return control;
        }

        /// <summary>
        /// Reads new values entered by the user for the field
        /// </summary>
        /// <param name="control">Parent control that controls were added to in the CreateEditControl() method</param>
        /// <param name="configurationValues"></param>
        /// <returns></returns>
        public override string GetEditValue( Control control, Dictionary<string, ConfigurationValue> configurationValues )
        {
            var picker = control as KeyValueList;
            if ( picker != null )
            {
                return picker.Value;
            }

            return null;
        }

        /// <summary>
        /// Sets the value.
        /// </summary>
        /// <param name="control">The control.</param>
        /// <param name="configurationValues"></param>
        /// <param name="value">The value.</param>
        public override void SetEditValue( Control control, Dictionary<string, ConfigurationValue> configurationValues, string value )
        {
            var picker = control as KeyValueList;
            if ( picker != null )
            {
                picker.Value = value;
            }
        }

        #endregion

        #region Filter Control

        /// <summary>
        /// Creates the control needed to filter (query) values using this field type.
        /// </summary>
        /// <param name="configurationValues">The configuration values.</param>
        /// <param name="id">The identifier.</param>
        /// <param name="required">if set to <c>true</c> [required].</param>
        /// <param name="filterMode">The filter mode.</param>
        /// <returns></returns>
        public override System.Web.UI.Control FilterControl( System.Collections.Generic.Dictionary<string, ConfigurationValue> configurationValues, string id, bool required, Rock.Reporting.FilterMode filterMode )
        {
            // This field type does not support filtering
            return null;
        }

        /// <summary>
        /// Determines whether this filter has a filter control
        /// </summary>
        /// <returns></returns>
        public override bool HasFilterControl()
        {
            return false;
        }

        #endregion

        /// <summary>
        /// Gets the values from string.
        /// </summary>
        /// <param name="parentControl">The parent control.</param>
        /// <param name="value">The value.</param>
        /// <param name="configurationValues">The configuration values.</param>
        /// <param name="condensed">if set to <c>true</c> [condensed].</param>
        /// <returns></returns>
        public List<KeyValuePair<string, object>> GetValuesFromString( Control parentControl, string value, Dictionary<string, ConfigurationValue> configurationValues, bool condensed )
        {
            List<KeyValuePair<string, object>> values = new List<KeyValuePair<string, object>>();

            bool isDefinedType = configurationValues != null && configurationValues.ContainsKey( "definedtype" ) && configurationValues["definedtype"].Value.AsIntegerOrNull().HasValue;

            string[] nameValues = value.Split( new char[] { '|' }, StringSplitOptions.RemoveEmptyEntries );

            // url decode array items just in case they were UrlEncoded (in the KeyValueList controls)
            nameValues = nameValues.Select( s => HttpUtility.UrlDecode( s ) ).ToArray();

            foreach ( string nameValue in nameValues )
            {
                string[] nameAndValue = nameValue.Split( new char[] { '^' } );
                if ( nameAndValue.Length == 2 )
                {
                    if ( isDefinedType )
                    {
                        var definedValue = DefinedValueCache.Get( nameAndValue[1].AsInteger() );
                        if ( definedValue != null )
                        {
                            values.Add( new KeyValuePair<string, object>( nameAndValue[0], definedValue ) );
                        }
                        else
                        {
                            values.Add( new KeyValuePair<string, object>( nameAndValue[0], nameAndValue[1] ) );
                        }
                    }
                    else
                    {
                        values.Add( new KeyValuePair<string, object>( nameAndValue[0], nameAndValue[1] ) );
                    }
                }
                else
                {
                    values.Add( new KeyValuePair<string, object>( nameAndValue[0], null ) );
                } 
            }

            return values;
        }

        /// <summary>
        /// Represents a single element value (presented as a row when editing)
        /// formatted in a way the clients will understand.
        /// </summary>
        private class ClientValue
        {
            /// <summary>
            /// Gets or sets the key.
            /// </summary>
            /// <value>
            /// The key.
            /// </value>
            public string Key { get; set; }

            /// <summary>
            /// Gets or sets the value.
            /// </summary>
            /// <value>
            /// The value.
            /// </value>
            public string Value { get; set; }
        }
    }
}