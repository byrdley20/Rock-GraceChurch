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
using System.ComponentModel;
using System.ComponentModel.Composition;
using System.Linq;
using System.Web.UI;
using System.Web.UI.WebControls;

using Rock.Attribute;
using Rock.Model;
using Rock.Web.Cache;
using Rock.Web.UI.Controls;

namespace Rock.Financial
{
    /// <summary>
    /// Test Payment Gateway
    /// </summary>
    [Description( "Test Payment Gateway" )]
    [Export( typeof( GatewayComponent ) )]
    [ExportMetadata( "ComponentName", "TestGateway" )]

    [TextField( "Declined Card Numbers",
        Key = AttributeKey.DeclinedCardNumbers,
        Description = "Enter partial card numbers that you wish to be declined separated by commas. Any card number that ends with a number matching a value entered here will be declined.",
        IsRequired = false,
        Order = 0 )]

    [TextField( "Declined CVV",
        Key = AttributeKey.DeclinedCVV,
        Description = "Enter a CVV that should be declined",
        DefaultValue = "911",
        IsRequired = false,
        Order = 1 )]

    [IntegerField( "Years until Max Expiration",
        Key = AttributeKey.MaxExpirationYears,
        Description = "The number of years before an 'Invalid Card Expiration' validation error occurs.",
        DefaultIntegerValue = 10,
        IsRequired = false,
        Order = 2 )]

    [BooleanField(
        "Generate Fake Payments",
        Description = "Enable this to return some sample payments for the Download Payments job and block. Note that this requires that some scheduled transactions are created for this gateway.",
        Key = AttributeKey.GenerateFakeGetPayments,
        DefaultBooleanValue = false,
        Order = 3 )]

    [BooleanField(
        "Prompt for Name on Card",
        Description = "This will tell the Gateway to prompt for the name on card.",
        Key = AttributeKey.PromptForNameOnCard,
        DefaultBooleanValue = false,
        Order = 4 )]

    [EnumsField(
        "Gateway Mode",
        Description = "Selected the gateway mode",
        Key = AttributeKey.GatewayMode,
        EnumSourceType = typeof( HostedGatewayMode ),
        DefaultValue = "Unhosted",
        Order = 5 )]
    public class TestGateway : GatewayComponent, IAutomatedGatewayComponent, IObsidianHostedGatewayComponent, IHostedGatewayComponent
    {
        #region Attribute Keys

        /// <summary>
        /// Keys to use for Component Attributes
        /// </summary>
        private static class AttributeKey
        {
            public const string DeclinedCardNumbers = "DeclinedCardNumbers";
            public const string GenerateFakeGetPayments = "GenerateFakeGetPayments";
            public const string MaxExpirationYears = "MaxExpirationYears";
            public const string DeclinedCVV = "DeclinedCVV";
            public const string PromptForNameOnCard = "PromptForNameOnCard";
            public const string GatewayMode = "GatewayMode";
        }

        #endregion

        #region Obsidian

        /// <summary>
        /// Creates the customer account using a token received and returns a customer account token that can be used for future transactions.
        /// </summary>
        /// <param name="financialGateway">The financial gateway.</param>
        /// <param name="paymentInfo">The payment information.</param>
        /// <param name="errorMessage">The error message.</param>
        /// <returns></returns>
        public string CreateCustomerAccount( FinancialGateway financialGateway, ReferencePaymentInfo paymentInfo, out string errorMessage )
        {
            errorMessage = string.Empty;
            return Guid.NewGuid().ToString( "N" );
        }

        /// <summary>
        /// Gets the obsidian control file URL.
        /// </summary>
        /// <param name="financialGateway">The financial gateway.</param>
        /// <returns></returns>
        public string GetObsidianControlFileUrl( FinancialGateway financialGateway )
        {
            return "/Obsidian/Controls/TestGatewayControl.js";
        }

        /// <inheritdoc/>
        public object GetObsidianControlSettings( FinancialGateway financialGateway, HostedPaymentInfoControlOptions options )
        {
            return new
            {
            };
        }

        /// <inheritdoc/>
        public bool TryGetPaymentTokenFromParameters( FinancialGateway financialGateway, IDictionary<string, string> parameters, out string paymentToken )
        {
            paymentToken = null;

            return false;
        }

        /// <inheritdoc/>
        public bool IsPaymentTokenCharged( FinancialGateway financialGateway, string paymentToken )
        {
            return false;
        }

        /// <inheritdoc/>
        public FinancialTransaction FetchPaymentTokenTransaction( Data.RockContext rockContext, FinancialGateway financialGateway, int? fundId, string paymentToken )
        {
            // This method is not required in our implementation.
            throw new NotImplementedException();
        }

        #endregion Obsidian

        #region Automated Gateway Component

        /// <summary>
        /// The most recent exception thrown by the gateway's remote API
        /// </summary>
        public Exception MostRecentException { get; private set; }

        /// <summary>
        /// Handle a payment from a REST endpoint or other automated means. This payment can only be made with a saved account.
        /// </summary>
        /// <param name="financialGateway">The financial gateway.</param>
        /// <param name="paymentInfo">The payment info.</param>
        /// <param name="errorMessage">The error message.</param>
        /// <param name="metadata">Optional. Metadata key value pairs to send to the gateway</param>
        /// <returns></returns>
        public Payment AutomatedCharge( FinancialGateway financialGateway, ReferencePaymentInfo paymentInfo, out string errorMessage, Dictionary<string, string> metadata = null )
        {
            MostRecentException = null;
            errorMessage = string.Empty;
            var transaction = Charge( financialGateway, paymentInfo, out errorMessage );

            if ( !string.IsNullOrEmpty( errorMessage ) )
            {
                MostRecentException = new Exception( errorMessage );
                return null;
            }

            if ( transaction == null )
            {
                errorMessage = "No error was indicated but the transaction was null";
                MostRecentException = new Exception( errorMessage );
                return null;
            }

            return new Payment
            {
                TransactionCode = transaction.TransactionCode,
                NameOnCard = $"{paymentInfo.FirstName} {paymentInfo.LastName}",
                Amount = paymentInfo.Amount
            };
        }

        #endregion

        #region Gateway Component Implementation

        /// <summary>
        /// Gets the supported payment schedules.
        /// </summary>
        /// <value>
        /// The supported payment schedules.
        /// </value>
        public override List<DefinedValueCache> SupportedPaymentSchedules
        {
            get
            {
                var values = new List<DefinedValueCache>();
                values.Add( DefinedValueCache.Get( Rock.SystemGuid.DefinedValue.TRANSACTION_FREQUENCY_ONE_TIME ) );
                values.Add( DefinedValueCache.Get( Rock.SystemGuid.DefinedValue.TRANSACTION_FREQUENCY_WEEKLY ) );
                values.Add( DefinedValueCache.Get( Rock.SystemGuid.DefinedValue.TRANSACTION_FREQUENCY_BIWEEKLY ) );
                values.Add( DefinedValueCache.Get( Rock.SystemGuid.DefinedValue.TRANSACTION_FREQUENCY_TWICEMONTHLY ) );
                values.Add( DefinedValueCache.Get( Rock.SystemGuid.DefinedValue.TRANSACTION_FREQUENCY_MONTHLY ) );
                return values;
            }
        }

        /// <summary>
        /// Gets the URL that the Gateway Information UI will navigate to when they click the 'Configure' link
        /// </summary>
        /// <value>The configure URL.</value>
        public string ConfigureURL => "";

        /// <summary>
        /// Gets the URL that the Gateway Information UI will navigate to when they click the 'Learn More' link
        /// </summary>
        /// <value>The learn more URL.</value>
        public string LearnMoreURL => "";

        /// <summary>
        /// Gets a value indicating whether the gateway requires the name on card for CC processing
        /// </summary>
        /// <param name="financialGateway">The financial gateway.</param>
        /// <returns></returns>
        /// <value>
        ///   <c>true</c> if [name on card required]; otherwise, <c>false</c>.
        /// </value>
        public override bool PromptForNameOnCard( FinancialGateway financialGateway )
        {
            return GetAttributeValue( financialGateway, AttributeKey.PromptForNameOnCard ).AsBoolean();
        }

        /// <summary>
        /// Gets a value indicating whether [address required].
        /// </summary>
        /// <param name="financialGateway">The financial gateway.</param>
        /// <returns></returns>
        /// <value>
        ///   <c>true</c> if [address required]; otherwise, <c>false</c>.
        /// </value>
        public override bool PromptForBillingAddress( FinancialGateway financialGateway )
        {
            return true;
        }

        /// <summary>
        /// Charges the specified payment info.
        /// </summary>
        /// <param name="financialGateway">The financial gateway.</param>
        /// <param name="paymentInfo">The payment info.</param>
        /// <param name="errorMessage">The error message.</param>
        /// <returns></returns>
        public override FinancialTransaction Charge( FinancialGateway financialGateway, PaymentInfo paymentInfo, out string errorMessage )
        {
            errorMessage = string.Empty;

            if ( ValidateCard( financialGateway, paymentInfo, out errorMessage ) )
            {
                var transaction = new FinancialTransaction();
                transaction.TransactionCode = "T" + RockDateTime.Now.ToString( "yyyyMMddHHmmssFFF" );

                transaction.FinancialPaymentDetail = new FinancialPaymentDetail()
                {
                    ExpirationMonth = ( paymentInfo as ReferencePaymentInfo )?.PaymentExpirationDate?.Month,
                    ExpirationYear = ( paymentInfo as ReferencePaymentInfo )?.PaymentExpirationDate?.Year,
                    CurrencyTypeValueId = DefinedValueCache.GetId( Rock.SystemGuid.DefinedValue.CURRENCY_TYPE_CREDIT_CARD.AsGuid() ),
                    AccountNumberMasked = paymentInfo.MaskedNumber,
                    CreditCardTypeValueId = CreditCardPaymentInfo.GetCreditCardTypeFromCreditCardNumber( paymentInfo.MaskedNumber )?.Id ?? DefinedValueCache.GetId( Rock.SystemGuid.DefinedValue.CREDITCARD_TYPE_VISA.AsGuid() )
                };

                return transaction;
            }

            return null;
        }

        /// <summary>
        /// Authorizes the specified payment information.
        /// </summary>
        /// <param name="financialGateway">The financial gateway.</param>
        /// <param name="paymentInfo">The payment information.</param>
        /// <param name="errorMessage">The error message.</param>
        /// <returns></returns>
        public override FinancialTransaction Authorize( FinancialGateway financialGateway, PaymentInfo paymentInfo, out string errorMessage )
        {
            errorMessage = string.Empty;

            if ( ValidateCard( financialGateway, paymentInfo, out errorMessage ) )
            {
                var transaction = new FinancialTransaction();
                transaction.TransactionCode = "T" + RockDateTime.Now.ToString( "yyyyMMddHHmmssFFF" );
                return transaction;
            }

            return null;
        }
        /// <summary>
        /// Credits the specified transaction.
        /// </summary>
        /// <param name="transaction">The transaction.</param>
        /// <param name="amount">The amount.</param>
        /// <param name="comment">The comment.</param>
        /// <param name="errorMessage">The error message.</param>
        /// <returns></returns>
        public override FinancialTransaction Credit( FinancialTransaction transaction, decimal amount, string comment, out string errorMessage )
        {
            errorMessage = string.Empty;

            var refundTransaction = new FinancialTransaction();
            refundTransaction.TransactionCode = "T" + RockDateTime.Now.ToString( "yyyyMMddHHmmssFFF" );
            return refundTransaction;
        }

        /// <summary>
        /// Adds the scheduled payment.
        /// </summary>
        /// <param name="financialGateway">The financial gateway.</param>
        /// <param name="schedule">The schedule.</param>
        /// <param name="paymentInfo">The payment info.</param>
        /// <param name="errorMessage">The error message.</param>
        /// <returns></returns>
        public override FinancialScheduledTransaction AddScheduledPayment( FinancialGateway financialGateway, PaymentSchedule schedule, PaymentInfo paymentInfo, out string errorMessage )
        {
            errorMessage = string.Empty;

            if ( ValidateCard( financialGateway, paymentInfo, out errorMessage ) )
            {
                var scheduledTransaction = new FinancialScheduledTransaction();
                scheduledTransaction.IsActive = true;
                scheduledTransaction.StartDate = schedule.StartDate;
                scheduledTransaction.NextPaymentDate = schedule.StartDate;
                scheduledTransaction.TransactionCode = "T" + RockDateTime.Now.ToString( "yyyyMMddHHmmssFFF" );
                scheduledTransaction.GatewayScheduleId = "Subscription_" + RockDateTime.Now.ToString( "yyyyMMddHHmmssFFF" );
                scheduledTransaction.LastStatusUpdateDateTime = RockDateTime.Now;
                scheduledTransaction.Status = FinancialScheduledTransactionStatus.Active;
                scheduledTransaction.StatusMessage = "active";

                scheduledTransaction.FinancialPaymentDetail = new FinancialPaymentDetail()
                {
                    ExpirationMonth = ( paymentInfo as ReferencePaymentInfo )?.PaymentExpirationDate?.Month,
                    ExpirationYear = ( paymentInfo as ReferencePaymentInfo )?.PaymentExpirationDate?.Year,
                    CurrencyTypeValueId = DefinedValueCache.GetId(Rock.SystemGuid.DefinedValue.CURRENCY_TYPE_CREDIT_CARD.AsGuid()),
                    AccountNumberMasked = paymentInfo.MaskedNumber,
                    CreditCardTypeValueId = CreditCardPaymentInfo.GetCreditCardTypeFromCreditCardNumber(paymentInfo.MaskedNumber)?.Id ?? DefinedValueCache.GetId(Rock.SystemGuid.DefinedValue.CREDITCARD_TYPE_VISA.AsGuid())
                };

                return scheduledTransaction;
            }

            return null;
        }

        /// <summary>
        /// Reactivates the scheduled payment.
        /// </summary>
        /// <param name="transaction">The transaction.</param>
        /// <param name="errorMessage">The error message.</param>
        /// <returns></returns>
        public override bool ReactivateScheduledPayment( FinancialScheduledTransaction transaction, out string errorMessage )
        {
            transaction.IsActive = true;
            errorMessage = string.Empty;
            return true;
        }

        /// <summary>
        /// Updates the scheduled payment.
        /// </summary>
        /// <param name="transaction">The transaction.</param>
        /// <param name="paymentInfo">The payment info.</param>
        /// <param name="errorMessage">The error message.</param>
        /// <returns></returns>
        public override bool UpdateScheduledPayment( FinancialScheduledTransaction transaction, PaymentInfo paymentInfo, out string errorMessage )
        {
            errorMessage = string.Empty;
            var referencePaymentInfo = paymentInfo as ReferencePaymentInfo;

            if ( referencePaymentInfo != null )
            {
                transaction.TransactionCode = referencePaymentInfo.TransactionCode;
            }

            return true;
        }

        /// <summary>
        /// Cancels the scheduled payment.
        /// </summary>
        /// <param name="transaction">The transaction.</param>
        /// <param name="errorMessage">The error message.</param>
        /// <returns></returns>
        public override bool CancelScheduledPayment( FinancialScheduledTransaction transaction, out string errorMessage )
        {
            transaction.IsActive = false;
            errorMessage = string.Empty;
            return true;
        }

        /// <summary>
        /// Gets the scheduled payment status.
        /// </summary>
        /// <param name="transaction">The transaction.</param>
        /// <param name="errorMessage">The error message.</param>
        /// <returns></returns>
        public override bool GetScheduledPaymentStatus( FinancialScheduledTransaction transaction, out string errorMessage )
        {
            transaction.LastStatusUpdateDateTime = RockDateTime.Now;
            if ( !transaction.IsActive )
            {
                transaction.NextPaymentDate = null;
            }

            errorMessage = string.Empty;
            return true;
        }

        /// <summary>
        /// Gets the payments that have been processed for any scheduled transactions
        /// </summary>
        /// <param name="financialGateway">The financial gateway.</param>
        /// <param name="startDate">The start date.</param>
        /// <param name="endDate">The end date.</param>
        /// <param name="errorMessage">The error message.</param>
        /// <returns></returns>
        public override List<Payment> GetPayments( FinancialGateway financialGateway, DateTime startDate, DateTime endDate, out string errorMessage )
        {
            errorMessage = string.Empty;
            if ( !this.GetAttributeValue( financialGateway, AttributeKey.GenerateFakeGetPayments ).AsBoolean() )
            {
                return new List<Payment>();
            }

            var fakePayments = new List<Payment>();
            var randomNumberOfPayments = new Random().Next( 1, 1000 );
            var rockContext = new Rock.Data.RockContext();
            var scheduledTransactionList = new FinancialScheduledTransactionService( rockContext ).Queryable().Where( a => a.FinancialGatewayId == financialGateway.Id ).ToList();
            if ( !scheduledTransactionList.Any() )
            {
                return fakePayments;
            }

            var transactionDateTime = startDate;
            for ( int paymentNumber = 0; paymentNumber < randomNumberOfPayments; paymentNumber++ )
            {
                // get a random scheduled Transaction (if any)
                var scheduledTransaction = scheduledTransactionList.OrderBy( a => Guid.NewGuid() ).FirstOrDefault();
                if ( scheduledTransaction == null )
                {
                    return new List<Payment>();
                }

                var fakePayment = new Payment
                {
                    Amount = scheduledTransaction.TotalAmount,
                    TransactionDateTime = startDate,
                    CreditCardTypeValue = DefinedTypeCache.Get( Rock.SystemGuid.DefinedType.FINANCIAL_CREDIT_CARD_TYPE.AsGuid() ).DefinedValues.OrderBy( a => Guid.NewGuid() ).First(),
                    CurrencyTypeValue = DefinedValueCache.Get( Rock.SystemGuid.DefinedValue.CURRENCY_TYPE_CREDIT_CARD.AsGuid() ),
                    TransactionCode = Guid.NewGuid().ToString( "N" ),
                    GatewayScheduleId = scheduledTransaction.GatewayScheduleId,
                    GatewayPersonIdentifier = scheduledTransaction?.FinancialPaymentDetail?.GatewayPersonIdentifier
                };

                fakePayments.Add( fakePayment );
            }

            return fakePayments;
        }

        /// <summary>
        /// Gets an optional reference identifier needed to process future transaction from saved account.
        /// </summary>
        /// <param name="transaction">The transaction.</param>
        /// <param name="errorMessage">The error message.</param>
        /// <returns></returns>
        public override string GetReferenceNumber( FinancialTransaction transaction, out string errorMessage )
        {
            errorMessage = string.Empty;
            return string.Empty;
        }

        /// <summary>
        /// Gets an optional reference identifier needed to process future transaction from saved account.
        /// </summary>
        /// <param name="scheduledTransaction">The scheduled transaction.</param>
        /// <param name="errorMessage">The error message.</param>
        /// <returns></returns>
        public override string GetReferenceNumber( FinancialScheduledTransaction scheduledTransaction, out string errorMessage )
        {
            errorMessage = string.Empty;
            return string.Empty;
        }

        /// <summary>
        /// Gets the next payment date.
        /// </summary>
        /// <param name="scheduledTransaction">The transaction.</param>
        /// <param name="lastTransactionDate">The last transaction date.</param>
        /// <returns></returns>
        public override DateTime? GetNextPaymentDate( FinancialScheduledTransaction scheduledTransaction, DateTime? lastTransactionDate )
        {
            if ( scheduledTransaction.IsActive )
            {
                return CalculateNextPaymentDate( scheduledTransaction, lastTransactionDate );
            }
            else
            {
                return scheduledTransaction.NextPaymentDate;
            }
        }

        #endregion

        #region Private Methods

        private bool ValidateCard( FinancialGateway financialGateway, PaymentInfo paymentInfo, out string errorMessage )
        {
            string cardNumber = string.Empty;
            var declinedCVV = this.GetAttributeValue( financialGateway, AttributeKey.DeclinedCVV );
            int maxExpirationYears = this.GetAttributeValue( financialGateway, AttributeKey.MaxExpirationYears ).AsIntegerOrNull() ?? 10;

            CreditCardPaymentInfo ccPayment = paymentInfo as CreditCardPaymentInfo;
            if ( ccPayment != null )
            {
                if ( declinedCVV.IsNotNullOrWhiteSpace() && ccPayment.Code == declinedCVV )
                {
                    errorMessage = "Declined CVV";
                    return false;
                }

                cardNumber = ccPayment.Number;

                if ( ccPayment.ExpirationDate < RockDateTime.Now.Date )
                {
                    errorMessage = "Card Expired";
                    return false;
                }

                if ( ccPayment.ExpirationDate > RockDateTime.Now.AddYears( maxExpirationYears ) )
                {
                    errorMessage = "Invalid Card Expiration";
                    return false;
                }

                if ( ccPayment.Number.IsNullOrWhiteSpace() )
                {
                    errorMessage = "Card number is required.";
                    return false;
                }

                if ( ccPayment.Code.IsNullOrWhiteSpace() )
                {
                    errorMessage = "CVV is required.";
                    return false;
                }
            }

            SwipePaymentInfo swipePayment = paymentInfo as SwipePaymentInfo;
            if ( swipePayment != null )
            {
                cardNumber = swipePayment.Number;
            }

            if ( !string.IsNullOrWhiteSpace( cardNumber ) )
            {
                var declinedNumbers = GetAttributeValue( financialGateway, AttributeKey.DeclinedCardNumbers );
                if ( !string.IsNullOrWhiteSpace( declinedNumbers ) )
                {
                    if ( declinedNumbers.SplitDelimitedValues().Any( n => cardNumber.EndsWith( n ) ) )
                    {
                        errorMessage = "Declined Card";
                        return false;
                    }
                }
            }

            errorMessage = string.Empty;
            return true;
        }

        #endregion

        #region IHostedGatewayComponent

        /// <summary>
        /// Gets the hosted payment information control which will be used to collect CreditCard, ACH fields
        /// Note: A HostedPaymentInfoControl can optionally implement <seealso cref="IHostedGatewayPaymentControlTokenEvent" />
        /// </summary>
        /// <param name="financialGateway">The financial gateway.</param>
        /// <param name="controlId">The control identifier.</param>
        /// <param name="options">The options.</param>
        /// <returns>Control.</returns>
        public Control GetHostedPaymentInfoControl( FinancialGateway financialGateway, string controlId, HostedPaymentInfoControlOptions options )
        {
            return new TestGatewayPaymentControl
            {
                ID = controlId
            };
        }

        /// <summary>
        /// Gets the JavaScript needed to tell the hostedPaymentInfoControl to get send the paymentInfo and get a token.
        /// Have your 'Next' or 'Submit' call this so that the hostedPaymentInfoControl will fetch the token/response
        /// </summary>
        /// <param name="financialGateway">The financial gateway.</param>
        /// <param name="hostedPaymentInfoControl">The hosted payment information control.</param>
        /// <returns>System.String.</returns>
        public string GetHostPaymentInfoSubmitScript( FinancialGateway financialGateway, Control hostedPaymentInfoControl )
        {
            return ( hostedPaymentInfoControl as TestGatewayPaymentControl ).PostbackJS;
        }

        /// <summary>
        /// Populates the properties of the referencePaymentInfo from this gateway's <seealso cref="M:Rock.Financial.IHostedGatewayComponent.GetHostedPaymentInfoControl(Rock.Model.FinancialGateway,System.String)">hostedPaymentInfoControl</seealso>
        /// This includes the ReferenceNumber, plus any other fields that the gateway wants to set
        /// </summary>
        /// <param name="financialGateway">The financial gateway.</param>
        /// <param name="hostedPaymentInfoControl">The hosted payment information control.</param>
        /// <param name="referencePaymentInfo">The reference payment information.</param>
        /// <param name="errorMessage">The error message.</param>
        public void UpdatePaymentInfoFromPaymentControl( FinancialGateway financialGateway, Control hostedPaymentInfoControl, ReferencePaymentInfo referencePaymentInfo, out string errorMessage )
        {
            TestGatewayPaymentControl testGatewayPaymentControl = hostedPaymentInfoControl as TestGatewayPaymentControl;
            referencePaymentInfo.ReferenceNumber = testGatewayPaymentControl.PaymentInfoToken;
            referencePaymentInfo.PaymentExpirationDate = testGatewayPaymentControl.PaymentExpirationDate;
            referencePaymentInfo.MaskedAccountNumber = testGatewayPaymentControl.CreditCardNumber.Masked();
            referencePaymentInfo.GatewayPersonIdentifier = "person_" + Guid.NewGuid().ToString( "N" );
            errorMessage = null;
        }

        /// <summary>
        /// Gets the earliest scheduled start date that the gateway will accept for the start date, based on the current local time.
        /// </summary>
        /// <param name="financialGateway">The financial gateway.</param>
        /// <returns>DateTime.</returns>
        public DateTime GetEarliestScheduledStartDate( FinancialGateway financialGateway )
        {
            return RockDateTime.Today;
        }

        /// <summary>
        /// Gets the hosted gateway modes that this gateway has configured/supports. Use this to determine which mode to use (in cases where both are supported, like Scheduled Payments lists ).
        /// If the Gateway supports both hosted and unhosted (and has Hosted mode configured), hosted mode should be preferred.
        /// </summary>
        /// <param name="financialGateway">The financial gateway.</param>
        /// <returns>HostedGatewayMode[].</returns>
        /// <value>
        /// The hosted gateway modes that this gateway supports
        /// </value>
        public HostedGatewayMode[] GetSupportedHostedGatewayModes( FinancialGateway financialGateway )
        {
            return  this.GetAttributeValue( financialGateway, AttributeKey.GatewayMode )
                .SplitDelimitedValues()
                .Select( a => a.ConvertToEnum<HostedGatewayMode>() )?
                .ToArray()
                ?? new HostedGatewayMode[1] { HostedGatewayMode.Unhosted };
        }

        #endregion IHostedGatewayComponent
    }

    /// <summary>
    /// Class TestGatewayPaymentControl.
    /// Implements the <see cref="System.Web.UI.WebControls.CompositeControl" />
    /// Implements the <see cref="System.Web.UI.INamingContainer" />
    /// Implements the <see cref="Rock.Financial.IHostedGatewayPaymentControlTokenEvent" />
    /// Implements the <see cref="Rock.Financial.IHostedGatewayPaymentControlCurrencyTypeEvent" />
    /// </summary>
    /// <seealso cref="System.Web.UI.WebControls.CompositeControl" />
    /// <seealso cref="System.Web.UI.INamingContainer" />
    /// <seealso cref="Rock.Financial.IHostedGatewayPaymentControlTokenEvent" />
    /// <seealso cref="Rock.Financial.IHostedGatewayPaymentControlCurrencyTypeEvent" />
    public class TestGatewayPaymentControl : CompositeControl,
       INamingContainer,
       Rock.Financial.IHostedGatewayPaymentControlTokenEvent,
       Rock.Financial.IHostedGatewayPaymentControlCurrencyTypeEvent
    {

        private RockTextBox _tbCreditCardNumber;
        private RockTextBox _mypExpDate;
        private RockTextBox _nbCVV;
        private LinkButton _lbSubmit;

        /// <summary>
        /// Gets the credit card number.
        /// </summary>
        /// <value>The credit card number.</value>
        public string CreditCardNumber
        {
            get
            {
                EnsureChildControls();
                return _tbCreditCardNumber.Text;
            }
        }

        /// <summary>
        /// Gets the expiration mmyy.
        /// </summary>
        /// <value>The expiration mmyy.</value>
        public string ExpirationMMYY
        {
            get
            {
                EnsureChildControls();
                return _mypExpDate.Text.AsNumeric().PadLeft( 4, '0' );
            }
        }

        /// <summary>
        /// Gets the CVV.
        /// </summary>
        /// <value>The CVV.</value>
        public string CVV
        {
            get
            {
                EnsureChildControls();
                return _nbCVV.Text;
            }
        }

        /// <summary>
        /// Gets the currency type value.
        /// </summary>
        /// <value>The currency type value.</value>
        public DefinedValueCache CurrencyTypeValue => DefinedValueCache.Get( Rock.SystemGuid.DefinedValue.CURRENCY_TYPE_CREDIT_CARD );

        /// <summary>
        /// Occurs when [token received].
        /// </summary>
        public event EventHandler<HostedGatewayPaymentControlTokenEventArgs> TokenReceived;

        /// <summary>
        /// Occurs when [currency type change].
        /// </summary>
        public event EventHandler<HostedGatewayPaymentControlCurrencyTypeEventArgs> CurrencyTypeChange;

        /// <summary>
        /// Creates the child controls.
        /// </summary>
        protected override void CreateChildControls()
        {
            base.CreateChildControls();

            var pnlRow1 = new Panel { CssClass = "row margin-t-md margin-b-lg" };
            this.Controls.Add( pnlRow1 );

            var pnlRow1Col1 = new Panel { CssClass = "col-md-6" };
            var pnlRow1Col2 = new Panel { CssClass = "col-md-3" };
            var pnlRow1Col3 = new Panel { CssClass = "col-md-3" };

            pnlRow1.Controls.Add( pnlRow1Col1 );
            pnlRow1.Controls.Add( pnlRow1Col2 );
            pnlRow1.Controls.Add( pnlRow1Col3 );

            _tbCreditCardNumber = new RockTextBox
            {
                ID = "_tbCreditCardNumber",
                MaxLength = 16,
                Placeholder = "Credit Card Number"
            };

            _mypExpDate = new RockTextBox
            {
                ID = "_mypExpDate",
                Placeholder = "mm/yy",
                MaxLength = 5
            };

            _nbCVV = new RockTextBox
            {
                ID = "_nbCVV",
                Placeholder = "CVV",
                MaxLength = 3
            };

            _lbSubmit = new LinkButton
            {
                ID = "_lbSubmit",
                CssClass = "btn btn-primary btn-xs",
                Text = "Submit"
            };

            // have it rendeed, but don't display. We are just using to to send the PostBack
            _lbSubmit.Style[HtmlTextWriterStyle.Display] = "none";

            _lbSubmit.Click += _lbSubmit_Click;

            pnlRow1Col1.Controls.Add( _tbCreditCardNumber );
            pnlRow1Col2.Controls.Add( _mypExpDate );
            pnlRow1Col3.Controls.Add( _nbCVV );

            Controls.Add( _lbSubmit );

            if ( CurrencyTypeChange != null)
            {
                // do nothing
            }
        }

        /// <summary>
        /// Gets the token.
        /// </summary>
        /// <value>The token.</value>
        public string PaymentInfoToken { get; private set; }

        /// <summary>
        /// Gets the payment expiration date.
        /// </summary>
        /// <value>The payment expiration date.</value>
        public DateTime? PaymentExpirationDate
        {
            get
            {
                EnsureChildControls();

                var expirationMonth = ExpirationMMYY.Substring( 0, 2 ).AsIntegerOrNull() ?? 12;
                var expirationYear = 2000 + ( ExpirationMMYY.Substring( 2, 2 ).AsIntegerOrNull() ) ?? RockDateTime.Today.AddYears( 1 ).Year;

                return new DateTime( expirationYear, expirationMonth, 1 );
            }
        }

        /// <summary>
        /// Gets the postback js.
        /// </summary>
        /// <value>The postback js.</value>
        public string PostbackJS
        {
            get
            {
                EnsureChildControls();
                var postbackJS = this.Page.ClientScript.GetPostBackEventReference( _lbSubmit, "" );
                return postbackJS;
            }
        }

        /// <summary>
        /// Lbs the submit click.
        /// </summary>
        /// <param name="sender">The sender.</param>
        /// <param name="e">The <see cref="System.EventArgs"/> instance containing the event data.</param>
        private void _lbSubmit_Click( object sender, EventArgs e )
        {
            PaymentInfoToken = "token_" + Guid.NewGuid().ToString( "N" );
            Rock.Financial.HostedGatewayPaymentControlTokenEventArgs hostedGatewayPaymentControlTokenEventArgs = new Financial.HostedGatewayPaymentControlTokenEventArgs
            {
                Token = this.PaymentInfoToken,
                IsValid = true
            };

            TokenReceived?.Invoke( this, hostedGatewayPaymentControlTokenEventArgs );
        }
    }
}