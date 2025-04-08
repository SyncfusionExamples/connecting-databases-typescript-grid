# JavaScript Grid SQL Server Connectivity using Dapper and CustomAdaptor

A project that enables data binding and CRUD action handling in the Syncfusion JavaScript Grid to a SQL Server using Dapper (mapping tool) and CustomAdaptor feature of the Grid.

## Steps to Run the Sample

1. Download or unzip the project and open the project in **Visual Studio 2022**.

2. Add the `NORTHWIND.MDF` database located in the `App_Data` folder of the backend project to the application.

3. Replace the connected database's connection string in the `GridController.cs` file.

4. In the JavaScript client project, open `js/index.js` and replace the port number in the API URL where it says `xxxx` with the actual backend server port.

5. Navigate to the client project folder and run the following command:

   ```bash
   npm install
   ```
6. Build the project to restore dependencies and compile it.

7. Run the project.