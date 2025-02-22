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
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using Rock.Data;
using Rock.Model;
using Rock.Rest.Filters;

namespace Rock.Rest.Controllers
{
    /// <summary>
    ///
    /// </summary>
    [RockGuid( "7a278b6f-ad6f-4e00-94f0-ce6d0d3ce769" )]
    public partial class FinancialBatchesController
    {
        /// <summary>
        /// Gets the control totals.
        /// </summary>
        /// <param name="queryOptions">The query options.</param>
        /// <returns></returns>
        [Authenticate, Secured]
        [System.Web.Http.Route( "api/FinancialBatches/GetControlTotals" )]
        [RockGuid( "76da430f-1470-4bdc-8466-28bdd47894be" )]
        public IEnumerable<ControlTotalResult> GetControlTotals( System.Web.Http.OData.Query.ODataQueryOptions<FinancialBatch> queryOptions = null )
        {
            var financialBatchQuery = new FinancialBatchService( this.Service.Context as Rock.Data.RockContext ).Queryable();
            financialBatchQuery = queryOptions.ApplyTo( financialBatchQuery ) as IOrderedQueryable<FinancialBatch>;

            var batchControlTotalsQuery = financialBatchQuery.SelectMany( a => a.Transactions ).Where(a => a.BatchId.HasValue).GroupBy( a => a.BatchId.Value ).Select( a => new
            {
                BatchId = a.Key,
                TransactionTotalAmounts = a.Select( x => x.TransactionDetails.Sum( d => (decimal?)d.Amount ) )
            } );

            var batchControlTotalsList = batchControlTotalsQuery.ToList();

            var controlTotalsList = batchControlTotalsList.Select( a => new ControlTotalResult
            {
                FinancialBatchId = a.BatchId,
                ControlTotalCount = a.TransactionTotalAmounts.Count(),
                ControlTotalAmount = a.TransactionTotalAmounts.Sum( x => (decimal?)x) ?? 0
            } ).ToList();

            return controlTotalsList;
        }
    }
}
