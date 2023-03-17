/*
Citation for an add CRUD operation in js:
Date: 3/17/2023
Based on OSUs cs340 nodejs-starter-app
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
*/
// Get the objects we need to modify
let addOrderForm = document.getElementById('add-order-form-ajax');

// Modify the objects we need
addOrderForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputCID = document.getElementById("input-customerID");
    let inputTotPrice = document.getElementById("input-total-price");
    let inputOrderOn = document.getElementById("input-order-on");

    // Get the values from the form fields
    let CIDValue = inputCID.value;
    let totPriceValue = inputTotPrice.value;
    let orderOnValue = inputOrderOn.value;

    // Put our data we want to send in a javascript object
    let data = {
        CID: CIDValue,
        totalPrice: totPriceValue,
        orderOn: orderOnValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-order-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputCID.value = '';
            inputTotPrice.value = '';
            inputOrderOn.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from 
// Customers
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("order-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let customerIDCell = document.createElement("TD");
    let totalPriceCell = document.createElement("TD");
    let orderOnCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.orderID;
    customerIDCell.innerText = newRow.customerID;
    totalPriceCell.innerText = newRow.totalPrice;
    orderOnCell.innerText = newRow.orderOn;

    deleteCell=document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteOrder(newRow.orderID);
    };

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(customerIDCell);
    row.appendChild(totalPriceCell);
    row.appendChild(orderOnCell);
    row.appendChild(deleteCell);
    
    row.setAttribute('data-value', newRow.orderID);

    // Add the row to the table
    currentTable.appendChild(row);

    let selectMenu = document.getElementById("mySelect");
    let option = document.createElement("option");
    option.text = newRow.orderID;
    option.value = newRow.orderID;
    selectMenu.add(option);
}
