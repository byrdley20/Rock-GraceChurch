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
using System.Text;
using System.Text.RegularExpressions;
using System.Web;

using HtmlAgilityPack;

namespace Rock
{
    /// <summary>
    /// String extensions for HTML things
    /// </summary>
    public static partial class ExtensionMethods
    {
        /// <summary>
        /// Converts string to a HTML title "<span class='first-word'>first-word</span> rest of string".
        /// </summary>
        /// <param name="str">The STR.</param>
        /// <returns></returns>
        public static string FormatAsHtmlTitle( this string str )
        {
            if ( !string.IsNullOrWhiteSpace( str ) )
            {
                // Remove any HTML
                return HttpUtility.HtmlEncode( str );
            }

            return string.Empty;
        }

        /// <summary>
        /// Converts line endings ( CRLF or just LF ) to non-encoded html breaks &lt;br&gt;
        /// </summary>
        /// <param name="str">a string that contains CR LF</param>
        /// <returns>a string with CRLF replaced with html <code>br</code></returns>
        public static string ConvertCrLfToHtmlBr( this string str )
        {
            if ( str == null )
            {
                return string.Empty;
            }

            // normalize line breaks so this works with either CRLF or LF lind endings
            var result = str.Replace( "\r\n", "\n" );

            return result.Replace( "\n", "<br>" );
        }

        /// <summary>
        /// Converts the HTML br to cr lf.
        /// </summary>
        /// <param name="str">The string.</param>
        /// <returns></returns>
        public static string ConvertBrToCrLf( this string str )
        {
            if ( str == null )
            {
                return string.Empty;
            }

            return str.Replace( "<br/>", Environment.NewLine ).Replace( "<br>", Environment.NewLine );
        }

        /// <summary>
        /// HTML Encodes the string.
        /// </summary>
        /// <param name="str">The string.</param>
        /// <returns></returns>
        public static string EncodeHtml( this string str )
        {
            return HttpUtility.HtmlEncode( str );
        }

        /// <summary>
        /// URLs the encode.
        /// </summary>
        /// <param name="str">The string.</param>
        /// <returns></returns>
        public static string UrlEncode( this string str )
        {
            return Uri.EscapeDataString( str );
        }

        /// <summary>
        /// Sanitizes the HTML by removing tags.  If strict is true, all html tags will be removed, if false, only a blacklist of specific XSS dangerous tags and attribute values are removed.
        /// NOTE: This method will do things like strip the less-than symbol from strings like <![CDATA['in math 6 < 7.']]>
        /// </summary>
        /// <param name="html">The HTML.</param>
        /// <param name="strict">if set to <c>true</c> [strict].</param>
        /// <returns></returns>
        public static string SanitizeHtml( this string html, bool strict = true )
        {
            // Don't choke on nulls
            if ( string.IsNullOrWhiteSpace( html ) )
            {
                return string.Empty;
            }

            if ( strict )
            {
                // from http://stackoverflow.com/a/18154152/
                HtmlDocument doc = new HtmlDocument();
                doc.LoadHtml( html );
                return doc.DocumentNode.InnerText;
            }
            else
            {
                return Rock.Web.Utilities.HtmlSanitizer.SanitizeHtml( html );
            }
        }

        /// <summary>
        /// Removes all lava markup from the string including short codes.
        /// </summary>
        /// <param name="lava">The lava.</param>
        /// <returns></returns>
        public static string SanitizeLava( this string lava )
        {
            // Don't choke on nulls
            if ( string.IsNullOrWhiteSpace( lava ) )
            {
                return string.Empty;
            }

            var doubleBracesRegex = new Regex( @"\{\{([^\}]+)\}\}" );
            lava = doubleBracesRegex.Replace( lava, string.Empty );

            var bracePercentRegex = new Regex( @"\{%([^\}]+)%\}" );
            lava = bracePercentRegex.Replace( lava, string.Empty );

            var bracBracketRegex = new Regex( @"\{\[([^\}]+)\]\}" );
            lava = bracBracketRegex.Replace( lava, string.Empty );

            return lava;
        }

        /// <summary>
        /// Scrubs any html from the string but converts carriage returns into html &lt;br/&gt; suitable for web display.
        /// </summary>
        /// <param name="str">a string that may contain unsanitized html and carriage returns</param>
        /// <returns>a string that has been scrubbed of any html with carriage returns converted to html br</returns>
        public static string ScrubHtmlAndConvertCrLfToBr( this string str )
        {
            if ( str == null )
            {
                return string.Empty;
            }

            // Note: \u00A7 is the section symbol

            // First we convert newlines and carriage returns to a character that can
            // pass through the Sanitizer.
            str = str.Replace( Environment.NewLine, "\u00A7" ).Replace( "\x0A", "\u00A7" );

            // Now we pass it to sanitizer and then convert those section-symbols to <br>
            return str.SanitizeHtml().Replace( "\u00A7", "<br>" );
        }

        /// <summary>
        /// Scrubs the HTML but retains "&lt;br/&gt;",changes "&lt;/p/&gt;" to "&lt;br//&gt;&lt;br/&gt;", and "\r\n" to "&lt;br/&gt;".
        /// </summary>
        /// <param name="str">The string.</param>
        /// <returns></returns>
        public static string ScrubHtmlForGridDisplay( this string str )
        {
            if ( string.IsNullOrWhiteSpace( str ) )
            {
                return string.Empty;
            }

            // Note: \u00A7 is the section symbol, \u00A6 is the broken bar symbol
            // First convert HTML breaks to a character that can pass through the Sanitizer.
            str = str.Replace( "<br/>", "\u00A7" ).Replace( "<br />", "\u00A7" ).Replace( "<br>", "\u00A7" );
            str = str.Replace( "</p>", "\u00A6" );

            // Now sanitize and convert the symbols to breaks
            str = str.SanitizeHtml().Replace( "\u00A7", "<br>" ).Replace( "\u00A6", "<br><br>" ).Replace( "\r\n", "<br>" );
            return str;
        }

        /// <summary>
        /// Returns true if the given string is a valid email address.
        /// </summary>
        /// <param name="email">The string to validate</param>
        /// <returns>true if valid email, false otherwise</returns>
        public static bool IsValidEmail( this string email )
        {
            Match match = Regex.Match( email, @"[\w\.\'_%-]+(\+[\w-]*)?@([\w-]+\.)+[\w-]+" );
            if ( !match.Success || match.Index != 0 )
            {
                return false;
            }
            return match.Length == email.Length;
        }

        /// <summary>
        /// Convert strings within the text that appear to be http/ftp/https links into clickable html links
        /// </summary>
        /// <param name="text">The text.</param>
        /// <returns></returns>
        public static string Linkify( this string text )
        {
            // from http://stackoverflow.com/a/4750468
            var result = Regex.Replace( text,
                @"((http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?)",
                "<a target='_blank' href='$1'>$1</a>" );

            return result;
        }

        /// <summary>
        /// Uses the CommonMark Markdown library to convert Markdown into HTML
        /// </summary>
        /// <param name="markdown">The markdown.</param>
        /// <param name="renderSoftLineBreaksAsLineBreaks">if set to <c>true</c> [render soft line breaks as line breaks].</param>
        /// <returns></returns>
        public static string ConvertMarkdownToHtml( this string markdown, bool renderSoftLineBreaksAsLineBreaks = false )
        {
            // convert any Markdown into HTML
            var settings = CommonMark.CommonMarkSettings.Default.Clone();
            settings.RenderSoftLineBreaksAsLineBreaks = renderSoftLineBreaksAsLineBreaks;

            /*
	            6/9/2020 - JME 
	            Added the .Trim() to the return below. Without it CommonMark was converting strings
                like 'Test' to '<p>Test</p>/r/n/r/n'. The adding of two line breaks was causing issues
                when other filters were being applied in Lava to make line breaks '<br>'.

                Reason: Notes Lava was having extra <br>'s at the end.
            */
            
            return CommonMark.CommonMarkConverter.Convert( markdown, settings ).Trim();
        }

        /// <summary>
        /// Moves the CSS inline using PreMailer.Net, which moves any stylesheets to inline style attributes, for maximum compatibility with email clients
        /// </summary>
        /// <param name="html">The HTML.</param>
        /// <returns></returns>
        public static string ConvertHtmlStylesToInlineAttributes( this string html )
        {
            try
            {
                var rockHtmlMarkupFormatter = new Rock.Utility.RockHtmlMarkupFormatter();
                var result = PreMailer.Net.PreMailer.MoveCssInline( html, false, ".ignore", null, false, false, rockHtmlMarkupFormatter );
                return result.Html;
            }
            catch
            {
                return html;
            }
        }
    }
}
