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
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Rock.Lava;
using Rock.Lava.Fluid;
using Rock.Lava.RockLiquid;
using Rock.Tests.Shared;

namespace Rock.Tests.Integration.Lava
{
    /// <summary>
    /// Test for shortcodes that are defined and implemented as code components rather than as parameterized Lava templates.
    /// </summary>
    [TestClass]
    public class ShortcodeCodeTests : LavaIntegrationTestBase
    {
        [TestMethod]
        public void Shortcode_WithMergeFieldAsParameter_CorrectlyResolvesParameters()
        {
            var shortcodeTemplate = @"
Font Name: {{ fontname }}
Font Size: {{ fontsize }}
Font Bold: {{ fontbold }}
";

            // Create a new test shortcode.
            var shortcodeDefinition = new DynamicShortcodeDefinition();

            shortcodeDefinition.ElementType = LavaShortcodeTypeSpecifier.Block;
            shortcodeDefinition.TemplateMarkup = shortcodeTemplate;
            shortcodeDefinition.Name = "shortcodetest";

            var input = @"
{[ shortcodetest fontname:'Arial' fontsize:'{{ fontsize }}' fontbold:'true' ]}
{[ endshortcodetest ]}
";

            var expectedOutput = @"
Font Name: Arial
Font Size: 99
Font Bold: true
";

            expectedOutput = expectedOutput.Replace( "``", @"""" );

            var context = new LavaDataDictionary() { { "fontsize", 99 } };

            var options = new LavaTestRenderOptions { MergeFields = context };

            TestHelper.ExecuteForActiveEngines( ( engine ) =>
            {
                // RockLiquid uses a different mechanism for registering shortcodes that cannot be tested here.
                if ( engine.GetType() == typeof( RockLiquidEngine ) )
                {
                    return;
                }

                engine.RegisterShortcode( shortcodeDefinition.Name, ( shortcodeName ) => { return shortcodeDefinition; } );

                TestHelper.AssertTemplateOutput( engine, expectedOutput, input, options );
            } );
        }

        #region Bootstrap Alert

        /// <summary>
        /// Using the BootstrapAlert shortcode produces the expected output.
        /// </summary>
        [DataTestMethod]
        [DataRow( "{[ bootstrapalert type='info' ]}This is an information message.{[ endbootstrapalert ]}", "<div class='alert alert-info'>This is an information message.</div>" )]

        public void BootstrapAlertShortcode_VariousTypes_ProducesCorrectHtml( string input, string expectedResult )
        {

            TestHelper.AssertTemplateOutput( expectedResult,
                                          input );
        }

        #endregion

        #region ScheduledContent

        [TestMethod]
        public void ScheduledContentShortcode_Basic_EmitsCorrectHtml()
        {
            var input = @"
{[ scheduledcontent scheduleid:'1' asatdate:'2020-10-17 16:35' ]}
Schedule Name: {{ Schedule.Name }}
<br>
Schedule Live: {{ IsLive }}
<br>
{[ endscheduledcontent ]}
";

            var expectedOutput = @"
ScheduleName:Saturday4:30pm<br>ScheduleLive:true<br>
";

            TestHelper.AssertTemplateOutput( expectedOutput, input );
        }

        [TestMethod]
        public void ScheduledContentShortcode_ContainedInCaptureBlock_EmitsCorrectOutput()
        {
            var input = @"
{% capture isScheduleActive %}{[ scheduledcontent scheduleid:'6' ]}true{[ endscheduledcontent ]}
{% endcapture %}
Schedule Active = {{isScheduleActive}}
";
            var expectedOutput = @"Schedule Active = true";

            TestHelper.AssertTemplateOutput( expectedOutput, input );
        }

        #endregion

        #region Scripturize

        /// <summary>
        /// Using the Scripturize shortcode produces the expected output.
        /// </summary>
        [DataTestMethod]
        [DataRow( "John 3:16", "<a href=\"https://www.bible.com/bible/116/JHN.3.16.NLT\"  class=\"scripture\" title=\"YouVersion\">John 3:16</a>" )]
        [DataRow( "Jn 3:16", "<a href=\"https://www.bible.com/bible/116/JHN.3.16.NLT\"  class=\"scripture\" title=\"YouVersion\">Jn 3:16</a>" )]
        [DataRow( "John 3", "<a href=\"https://www.bible.com/bible/116/JHN.3..NLT\"  class=\"scripture\" title=\"YouVersion\">John 3</a>" )]

        public void ScripturizeShortcode_YouVersion_ProducesCorrectHtml( string input, string expectedResult )
        {
            TestHelper.AssertTemplateOutput( expectedResult,
                                          "{[ scripturize defaulttranslation:'NLT' landingsite:'YouVersion' cssclass:'scripture' ]}" + input + "{[ endscripturize ]}" );
        }

        #endregion

        /// <summary>
        /// Verify that an invalid shortcode name correctly throws a shortcode parsing error when embedded in an if/endif block.
        /// </summary>
        [TestMethod]
        public void ShortcodeParsing_UndefinedShortcodeTag_ThrowsUnknownShortcodeParsingError()
        {
            // Create a template containing an undefined shortcode "testshortcode1".

            var input = @"
<p>Document start.</p>
{[ testshortcode1 ]}
<p>Document end.</p>
";

            TestHelper.ExecuteForActiveEngines( ( engine ) =>
            {
                var result = engine.RenderTemplate( input, new LavaRenderParameters { ExceptionHandlingStrategy = ExceptionHandlingStrategySpecifier.Ignore } );

                var error = result.Error;

                // Verify that the result is the expected parse error.
                if ( !( result.Error is LavaParseException ) )
                {
                    throw new Exception( "Parse exception expected but not encountered." );
                }

                if ( engine.GetType() == typeof( FluidEngine ) )
                {
                    Assert.That.IsTrue( result.Error.Message.Contains( "Unknown shortcode 'testshortcode1'" ), "Unexpected Lava error message." );
                }
            } );

        }

        /// <summary>
        /// Verify that an invalid shortcode name correctly throws a shortcode parsing error when embedded in an if/endif block.
        /// </summary>
        [TestMethod]
        public void ShortcodeParsing_UndefinedShortcodeEmbeddedInIfBlock_ThrowsCorrectParsingError()
        {
            // Create a template containing an undefined shortcode "testshortcode1".

            var input = @"
{% if 1 == 1 %}
    {[ invalidshortcode ]}
{% endif %}
";

            TestHelper.ExecuteForActiveEngines( ( engine ) =>
            {
                var result = engine.RenderTemplate( input, new LavaRenderParameters { ExceptionHandlingStrategy = ExceptionHandlingStrategySpecifier.Ignore } );

                var error = result.Error;

                // Verify that the result is the expected parse error.
                if ( !( result.Error is LavaParseException ) )
                {
                    throw new Exception( "Parse exception expected but not encountered." );
                }

                // In Fluid, parse error should correctly identify the invalid shortcode.
                if ( engine.GetType() == typeof( FluidEngine ) )
                {
                    if ( !result.Error.Message.Contains( "Unknown shortcode 'invalidshortcode'" ) )
                    {
                        throw result.Error;
                    }
                }

            } );

        }

        /// <summary>
        /// Verify that a shortcode tag is parsed correctly when embedded in an if/endif block.
        /// </summary>
        /// <remarks>This test is necessary to verify custom changes to the Fluid parser.</remarks>
        [TestMethod]
        public void ShortcodeParsing_ShortcodeEmbeddedInIfBlock_IsParsedCorrectly()
        {
            var input = @"
{% if 1 == 1 %}
{[ sparkline type:'line' data:'5,6,7,9,9,5,3,2,2,4,6,7' ]}
{% endif %}
";

            var expectedResult = @"
<script src='~/Scripts/sparkline/jquery-sparkline.min.js' type='text/javascript'></script>
<span class=""sparkline sparkline-id-<guid>"">Loading...</span><script>
  $("".sparkline-id-<guid>"").sparkline([5,6,7,9,9,5,3,2,2,4,6,7], {
      type: 'line'
      , width: 'auto'
      , height: 'auto'
      , lineColor: '#ee7625'
      , fillColor: '#f7c09b'
      , lineWidth: 1
      , spotColor: '#f80'
      , minSpotColor: '#f80'
      , maxSpotColor: '#f80'
      , highlightSpotColor: ''
      , highlightLineColor: ''
      , spotRadius: 1.5
      , chartRangeMin: undefined
      , chartRangeMax: undefined
      , chartRangeMinX: undefined
      , chartRangeMaxX: undefined
      , normalRangeMin: undefined
      , normalRangeMax: undefined
      , normalRangeColor: '#ccc'
    });
  </script>
";

            TestHelper.AssertTemplateOutput( expectedResult, input, new LavaTestRenderOptions { Wildcards= new List<string> { "<guid>" } } );
        }

        /// <summary>
        /// Verify that an invalid shortcode name correctly throws a shortcode parsing error when embedded in an if/endif block.
        /// </summary>
        [TestMethod]
        public void ShortcodeParsing_ShortcodeEmbeddedInOuterShortcode_IsParsedCorrectly()
        {
            var input = @"
{[ accordion ]}
    [[ item title:'Line Chart' ]]
        {[ sparkline type:'line' data:'5,6,7,9,9,5,3,2,2,4,6,7' ]}
    [[ enditem ]]
{[ endaccordion ]}
";

            var expectedResult = @"
<div class=""panel-group"" id=""accordion-id-<guid1>"" role=""tablist"" aria-multiselectable=""true"">
    <div class=""panel panel-default"">
        <div class=""panel-heading"" role=""tab"" id=""heading1-id-<guid1>"">
          <h4 class=""panel-title"">
            <a role=""button"" data-toggle=""collapse"" data-parent=""#accordion-id-<guid1>"" href=""#collapse1-id-<guid1>"" aria-expanded=""true"" aria-controls=""collapse1"">
              Line Chart
            </a>
          </h4>
        </div>
        <div id=""collapse1-id-<guid1>"" class=""panel-collapse collapse in"" role=""tabpanel"" aria-labelledby=""heading1-id-<guid1>"">
          <div class=""panel-body"">
            <script src='~/Scripts/sparkline/jquery-sparkline.min.js' type='text/javascript'></script>
            <span class=""sparkline sparkline-id-<guid2>"">Loading...</span>
            <script>
              $("".sparkline-id-<guid2>"").sparkline([5,6,7,9,9,5,3,2,2,4,6,7], {
                  type: 'line'
                  , width: 'auto'
                  , height: 'auto'
                  , lineColor: '#ee7625'
                  , fillColor: '#f7c09b'
                  , lineWidth: 1
                  , spotColor: '#f80'
                  , minSpotColor: '#f80'
                  , maxSpotColor: '#f80'
                  , highlightSpotColor: ''
                  , highlightLineColor: ''
                  , spotRadius: 1.5
                  , chartRangeMin: undefined
                  , chartRangeMax: undefined
                  , chartRangeMinX: undefined
                  , chartRangeMaxX: undefined
                  , normalRangeMin: undefined
                  , normalRangeMax: undefined
                  , normalRangeColor: '#ccc'
                });
            </script>
          </div>
        </div>
    </div>
</div>
";

            TestHelper.AssertTemplateOutput( expectedResult, input, new LavaTestRenderOptions { Wildcards = new List<string> { "<guid1>", "<guid2>" } } );
        }
    }
}
