/*
Citation for a delete CRUD operation in js:
Date: 3/17/2023
Based on OSUs cs340 nodejs-starter-app
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
*/
// Get the objects we need to modify
let updateInventoryForm = document.getElementById('update-inventory-form-ajax');

// Modify the objects we need
updateInventoryForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputInventory = document.getElementById("mySelect");
    let inputItem = document.getElementById("input-item1");
    let inputType = document.getElementById("input-type1");
    let inputQuantity = document.getElementById("input-quantity1");

    // Get the values from the form fields
    let inventoryValue = inputInventory.value;
    let itemValue = inputItem.value;
    let typeValue = inputType.value;
    let quantityValue = inputQuantity.value;

    
    // currently the database table for Customers does not allow updating name values to NULL
    // so we must abort if being bassed NULL for homeworld

    if (itemValue === null) 
    {
        return;
    }


    // Put our data we want to send in a javascript object
    let data = {
        inventory: inventoryValue,
        item: itemValue,
        type: typeValue,
        quantity: quantityValue,
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-inventory-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, inventoryValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, inventoryID){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("inventory-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == inventoryID) {
        
            // Get the location of the row where we found the matching person ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td to update and reassign to value
            let td1 = updateRowIndex.getElementsByTagName("td")[1];
            td1.innerHTML = parsedData[0].item; 

            let td2 = updateRowIndex.getElementsByTagName("td")[2];
            td2.innerHTML = parsedData[0].type; 

            let td3 = updateRowIndex.getElementsByTagName("td")[3];
            td3.innerHTML = parsedData[0].quantity; 
       }
    }
    updateDropDownMenu(inventoryID, parsedData[0].item);
}

function updateDropDownMenu(inventoryID, inventoryItem){
    let selectMenu = document.getElementById("mySelect");
    for (let i = 0; i < selectMenu.length; i++){
        if (Number(selectMenu.options[i].value) === Number(inventoryID)){
            selectMenu.options[i].text = inventoryItem;
            break;
        } 
    }
}
