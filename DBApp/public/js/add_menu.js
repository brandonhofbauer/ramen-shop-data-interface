/*
Citation for an add CRUD operation in js:
Date: 3/17/2023
Based on OSUs cs340 nodejs-starter-app
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
*/
// Get the objects we need to modify
let addMenuForm = document.getElementById('add-menu-form-ajax');

// Modify the objects we need
addMenuForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputItem = document.getElementById("input-item");
    let inputType = document.getElementById("input-type");
    let inputPrice = document.getElementById("input-price");

    // Get the values from the form fields
    let itemValue = inputItem.value;
    let typeValue = inputType.value;
    let priceValue = inputPrice.value;

    // Put our data we want to send in a javascript object
    let data = {
        item: itemValue,
        type: typeValue,
        price: priceValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-menu-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputItem.value = '';
            inputType.value = '';
            inputPrice.value = '';
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
    let currentTable = document.getElementById("menu-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 3 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let itemCell = document.createElement("TD");
    let typeCell = document.createElement("TD");
    let priceCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.menuID;
    itemCell.innerText = newRow.item;
    typeCell.innerText = newRow.type;
    priceCell.innerText = newRow.price;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteMenu(newRow.menuID);
    };

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(itemCell);
    row.appendChild(typeCell);
    row.appendChild(priceCell);

    row.appendChild(deleteCell);
    
    row.setAttribute('data-value', newRow.menuID);

    // Add the row to the table
    currentTable.appendChild(row);

    let selectMenu = document.getElementById("mySelect");
    let option = document.createElement("option");
    option.text = newRow.item;
    option.value = newRow.menuID;
    selectMenu.add(option);
}
