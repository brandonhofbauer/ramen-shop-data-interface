/*
Citation for an add CRUD operation in js:
Date: 3/17/2023
Based on OSUs cs340 nodejs-starter-app
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
*/
// Get the objects we need to modify
let addOrderForm = document.getElementById('add-order-employee-form-ajax');

// Modify the objects we need
addOrderForm.addEventListener('submit', function (e) {
  // Prevent the form from submitting
  e.preventDefault();

  // Get form fields we need to get data from
  let inputEmployeeID = document.getElementById('input-employeeID');
  let inputOrderID = document.getElementById('input-orderID');

  // Get the values from the form fields
  let employeeIDValue = inputEmployeeID.value;
  let orderIDValue = inputOrderID.value;

  // Put our data we want to send in a javascript object
  let data = {
    orderID: orderIDValue,
    employeeID: employeeIDValue,
  };

  // Setup our AJAX request
  var xhttp = new XMLHttpRequest();
  xhttp.open('POST', '/add-order-employee-ajax', true);
  xhttp.setRequestHeader('Content-type', 'application/json');

  // Tell our AJAX request how to resolve
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      // Add the new data to the table
      addRowToTable(xhttp.response);

      // Clear the input fields for another transaction
      inputOrderID.value = '';
      inputEmployeeID.value = '';
    } else if (xhttp.readyState == 4 && xhttp.status != 200) {
      console.log('There was an error with the input.');
    }
  };

  // Send the request and wait for the response
  xhttp.send(JSON.stringify(data));
});

// Creates a single row from an Object representing a single record from
// Customers
addRowToTable = (data) => {
  // Get a reference to the current table on the page and clear it out.
  let currentTable = document.getElementById('order-employee-table');

  // Get the location where we should insert the new row (end of table)
  let newRowIndex = currentTable.rows.length;

  // Get a reference to the new row from the database query (last object)
  let parsedData = JSON.parse(data);
  let newRow = parsedData[parsedData.length - 1];

  // Create a row and 4 cells
  let row = document.createElement('TR');
  let orderemployeesCell = document.createElement('TD');
  let employeeIDCell = document.createElement('TD');
  let orderIDCell = document.createElement('TD');

  let deleteCell = document.createElement('TD');

  // Fill the cells with correct data
  orderemployeesCell.innerText = newRow.orderemployeesID;
  employeeIDCell.innerText = newRow.employeeID;
  orderIDCell.innerText = newRow.orderID;

  deleteCell = document.createElement('button');
  deleteCell.innerHTML = 'Delete';
  deleteCell.onclick = function () {
    deleteOrderEmployee(newRow.orderemployeesID);
  };

  // Add the cells to the row
  row.appendChild(orderemployeesCell);
  row.appendChild(orderIDCell);
  row.appendChild(employeeIDCell);
  row.appendChild(deleteCell);

  row.setAttribute('data-value', newRow.orderemployeesID);

  // Add the row to the table
  currentTable.appendChild(row);
};
