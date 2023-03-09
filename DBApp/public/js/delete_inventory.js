function deleteInventory(inventoryID) {
    // Put our data we want to send in a javascript object
    let data = {
        id: inventoryID
    };

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-inventory-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {

            deleteRow(customerID);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }
    xhttp.send(JSON.stringify(data));
}


function deleteRow(inventoryID){

    let table = document.getElementById("inventory-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == inventoryID) {
            table.deleteRow(i);
            deleteDropDownMenu(inventoryID);
            break;
       }
    }
}

function deleteDropDownMenu(inventoryID){
    let selectMenu = document.getElementById("mySelect");
    for (let i = 0; i < selectMenu.length; i++){
        if (Number(selectMenu.options[i].value) === Number(inventoryID)){
            selectMenu[i].remove();
            break;
        } 
    }
}