
let updateOrderForm = document.getElementById('update-order-form-ajax');

// Modify the objects we need
updateOrderForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputOrder = document.getElementById("mySelect");
    let inputCID = document.getElementById("update-customerID");
    let inputTotPrice = document.getElementById("update-total-price");
    let inputOrderOn = document.getElementById("update-order-on");

    // Get the values from the form fields
    let orderValue = inputOrder.value;
    let CIDValue = inputCID.value;
    let totPriceValue = inputTotPrice.value;
    let orderOnValue = inputOrderOn.value;
    
    // currently the database table for Customers does not allow updating name values to NULL
    // so we must abort if being bassed NULL for homeworld

    if (orderValue === null || CIDValue === null || totPriceValue === null || orderOnValue === null) 
    {
        return;
    }

    // Put our data we want to send in a javascript object
    let data = {
        orderID: orderValue,
        CID: CIDValue,
        totalPrice: totPriceValue,
        orderOn: orderOnValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-order-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, orderValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, orderID){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("order-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == orderID) {
        
            // Get the location of the row where we found the matching person ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td to update and reassign to value
            let td1 = updateRowIndex.getElementsByTagName("td")[1];
            td1.innerHTML = parsedData[0].customerID; 

            let td2 = updateRowIndex.getElementsByTagName("td")[2];
            td2.innerHTML = parsedData[0].totalPrice; 

            let td3 = updateRowIndex.getElementsByTagName("td")[3];
            td3.innerHTML = parsedData[0].orderOn; 
       }
    }

    //updateDropDownMenu(orderID, parsedData[0].CID);
}

function updateDropDownMenu(orderID, CustomerID){
    let selectMenu = document.getElementById("mySelect");
    for (let i = 0; i < selectMenu.length; i++){
        if (Number(selectMenu.options[i].value) === Number(orderID)){
            selectMenu.options[i].text = customerName;
            break;
        } 
    }
}