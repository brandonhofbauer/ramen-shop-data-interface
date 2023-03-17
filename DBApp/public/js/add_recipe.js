/*
Citation for an add CRUD operation in js:
Date: 3/17/2023
Based on OSUs cs340 nodejs-starter-app
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
*/
// Get the objects we need to modify
let addRecipeForm = document.getElementById('add-recipe-form-ajax');

// Modify the objects we need
addRecipeForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputMenu = document.getElementById("input-menu");
    let inputInventory = document.getElementById("input-inventory");
    let inputReqAmt = document.getElementById("input-reqAmt");

    // Get the values from the form fields
    let menuValue = inputMenu.value;
    let inventoryValue = inputInventory.value;
    let reqAmtValue = inputReqAmt.value;

    // Put our data we want to send in a javascript object
    let data = {
        menu: menuValue,
        inventory: inventoryValue,
        reqAmt: reqAmtValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-recipe-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputMenu.value = '';
            inputInventory.value = '';
            inputReqAmt.value = '';
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
    let currentTable = document.getElementById("recipe-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let menuCell = document.createElement("TD");
    let inventoryCell = document.createElement("TD");
    let reqAmtCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.recipeID;
    menuCell.innerText = newRow.menuID;
    inventoryCell.innerText = newRow.inventoryID;
    reqAmtCell.innerText = newRow.reqAmt;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteCustomer(newRow.recipeID);
    };

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(menuCell);
    row.appendChild(inventoryCell);
    row.appendChild(reqAmtCell);

    row.appendChild(deleteCell);
    
    row.setAttribute('data-value', newRow.recipeID);

    // Add the row to the table
    currentTable.appendChild(row);

    let selectMenu = document.getElementById("mySelect");
    let option = document.createElement("option");
    option.text = newRow.menu + newRow.inventory; /*return to this*/
    option.value = newRow.recipeID;
    selectMenu.add(option);
}
