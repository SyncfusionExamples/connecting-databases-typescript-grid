using Microsoft.AspNetCore.Mvc;
using Syncfusion.EJ2.Base;
using System.ComponentModel.DataAnnotations;
using System.Data;
using Microsoft.Data.SqlClient;
using Dapper;
using System.Collections;

namespace Grid_Dapper.Controllers
{
    [ApiController]
    public class GridController : ControllerBase
    {

        string ConnectionString = @"<Enter a valid connection string>";
        
        /// <summary>
        /// Processes the DataManager request to perform searching, filtering, sorting, and paging operations.
        /// </summary>
        /// <param name="DataManagerRequest">Contains the details of the data operation requested.</param>
        /// <returns>Returns a JSON object with the filtered, sorted, and paginated data along with the total record count.</returns>
        [HttpPost]
        [Route("api/[controller]")]
        public object Post([FromBody] DataManagerRequest DataManagerRequest)
        {
            // Retrieve data from the data source (e.g., database)
            IQueryable<Orders> DataSource = GetOrderData().AsQueryable();

            QueryableOperation queryableOperation = new QueryableOperation(); // Initialize QueryableOperation instance


            // Handling Searching operation
            if (DataManagerRequest.Search != null && DataManagerRequest.Search.Count > 0)
            {
                DataSource = queryableOperation.PerformSearching(DataSource, DataManagerRequest.Search);
            }

            // Handling filtering operation
            if (DataManagerRequest.Where != null && DataManagerRequest.Where.Count > 0)
            {
                foreach (var condition in DataManagerRequest.Where)
                {
                    foreach (var predicate in condition.predicates)
                    {
                        DataSource = queryableOperation.PerformFiltering(DataSource, DataManagerRequest.Where, predicate.Operator);
                    }
                }
            }

            // Handling Sorting operation.
            if (DataManagerRequest.Sorted != null && DataManagerRequest.Sorted.Count > 0)
            {
                DataSource = queryableOperation.PerformSorting(DataSource, DataManagerRequest.Sorted);
            }
            // Handle aggregation
            List<string> str = new List<string>();
            if (DataManagerRequest.Aggregates != null)
            {
                for (var i = 0; i < DataManagerRequest.Aggregates.Count; i++)
                {
                    str.Add(DataManagerRequest.Aggregates[i].Field);
                }
            }

            // Assuming PerformSelect is the method that handles the aggregation logic
            IEnumerable aggregate = queryableOperation.PerformSelect(DataSource, str);

            // Get the total count of records.
            int totalRecordsCount = DataSource.Count();

            // Handling paging operation.
            if (DataManagerRequest.Skip != 0)
            {

                DataSource = queryableOperation.PerformSkip(DataSource, DataManagerRequest.Skip);
            }
            if (DataManagerRequest.Take != 0)
            {
                DataSource = queryableOperation.PerformTake(DataSource, DataManagerRequest.Take);
            }

            // Return data based on the request.
            return new { result = DataSource, count = totalRecordsCount, aggregate = aggregate };
        }

        [HttpGet]
        [Route("api/[controller]")]
        public List<Orders> GetOrderData()
        {
            string Query = "SELECT * FROM dbo.Orders ORDER BY OrderID;";
            //Create SQL Connection.
            using (IDbConnection Connection = new SqlConnection(ConnectionString))
            {
                Connection.Open();
                // Dapper automatically handles mapping to your Order class.
                List<Orders> orders = Connection.Query<Orders>(Query).ToList();
                return orders;
            }
        }

        /// <summary>
        /// Inserts a new data item into the data collection.
        /// </summary>
        /// <param name="newRecord">It contains the new record detail which is need to be inserted.</param>
        /// <returns>Returns void</returns>
        [HttpPost]
        [Route("api/[controller]/Insert")]
        public void Insert([FromBody] CRUDModel<Orders> value)
        {
            //Create query to insert the specific into the database by accessing its properties 
            string Query = "INSERT INTO Orders(CustomerID, Freight, ShipCity, EmployeeID) VALUES(@CustomerID, @Freight, @ShipCity, @EmployeeID)";
            using (IDbConnection Connection = new SqlConnection(ConnectionString))
            {
                Connection.Open();
                //Execute this code to reflect the changes into the database
                Connection.Execute(Query, value.value);
            }

        }

        /// <summary>
        /// Update a existing data item from the data collection.
        /// </summary>
        /// <param name="Order">It contains the updated record detail which is need to be updated.</param>
        /// <returns>Returns void</returns>
        [HttpPost]
        [Route("api/[controller]/Update")]
        public void Update([FromBody] CRUDModel<Orders> value)
        {
            //Create query to update the changes into the database by accessing its properties
            string Query = "UPDATE Orders SET CustomerID = @CustomerID, Freight = @Freight, ShipCity = @ShipCity, EmployeeID = @EmployeeID WHERE OrderID = @OrderID";
            using (IDbConnection Connection = new SqlConnection(ConnectionString))
            {
                Connection.Open();
                //Execute this code to reflect the changes into the database
                Connection.Execute(Query, value.value);
            }
        }

        /// <summary>
        /// Remove a specific data item from the data collection.
        /// </summary>
        /// <param name="value">It contains the specific record detail which is need to be removed.</param>
        /// <return>Returns void</return>
        [HttpPost]
        [Route("api/[controller]/Remove")]
        public void Remove([FromBody] CRUDModel<Orders> value)
        {
            //Create query to remove the specific from database by passing the primary key column value.
            string Query = "DELETE FROM Orders WHERE OrderID = @OrderID";
            using (IDbConnection Connection = new SqlConnection(ConnectionString))
            {
                Connection.Open();
                int orderID = Convert.ToInt32(value.key.ToString());
                //Execute this code to reflect the changes into the database
                Connection.Execute(Query, new { OrderID = orderID });
            }
        }



        /// <summary>
        /// The code for handling CRUD operation when enbaling batch editing
        /// </summary>
        /// <param name="batchmodel"></param>
        /// <returns></returns>

        [HttpPost]
        [Route("api/[controller]/BatchUpdate")]
        public IActionResult BatchUpdate([FromBody] CRUDModel<Orders> value)
        {
            //TODO: Enter the connectionstring of database
            if (value.changed != null && value.changed.Count > 0)
            {
                foreach (var Record in (IEnumerable<Orders>)value.changed)
                {
                    //Create query to update the changes into the database by accessing its properties
                    string Query = "UPDATE Orders SET CustomerID = @CustomerID, Freight = @Freight, ShipCity = @ShipCity, EmployeeID = @EmployeeID WHERE OrderID = @OrderID";
                    using (IDbConnection Connection = new SqlConnection(ConnectionString))
                    {
                        Connection.Open();
                        //Execute this code to reflect the changes into the database
                        Connection.Execute(Query, Record);
                    }
                }

            }
            if (value.added != null && value.added.Count > 0)
            {
                foreach (var Record in (IEnumerable<Orders>)value.added)
                {
                    //Create query to insert the specific into the database by accessing its properties 
                    string Query = "INSERT INTO Orders (CustomerID, Freight, ShipCity, EmployeeID) VALUES (@CustomerID, @Freight, @ShipCity, @EmployeeID)";
                    using (IDbConnection Connection = new SqlConnection(ConnectionString))
                    {
                        Connection.Open();
                        //Execute this code to reflect the changes into the database
                        Connection.Execute(Query, Record);
                    }
                }
            }
            if (value.deleted != null && value.deleted.Count > 0)
            {
                foreach (var Record in (IEnumerable<Orders>)value.deleted)
                {
                    //Create query to remove the specific from database by passing the primary key column value.
                    string Query = "DELETE FROM Orders WHERE OrderID = @OrderID";
                    using (IDbConnection Connection = new SqlConnection(ConnectionString))
                    {
                        Connection.Open();
                        //Execute this code to reflect the changes into the database
                        Connection.Execute(Query, new { OrderID = Record.OrderID });
                    }
                }
            }
            return new JsonResult(value);

        }




        public class CRUDModel<T> where T : class
        {

            public string? action { get; set; }

            public string? keyColumn { get; set; }

            public object? key { get; set; }

            public T? value { get; set; }

            public List<T>? added { get; set; }

            public List<T>? changed { get; set; }

            public List<T>? deleted { get; set; }

            public IDictionary<string, object>? @params { get; set; }

        }
        public class Orders
        {
            [Key]
            public int? OrderID { get; set; }
            public string? CustomerID { get; set; }
            public int? EmployeeID { get; set; }
            public decimal? Freight { get; set; }
            public string? ShipCity { get; set; }
        }
    
}
}
