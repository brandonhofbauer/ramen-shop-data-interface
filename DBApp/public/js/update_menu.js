/*
Citation for a delete CRUD operation in js:
Date: 3/17/2023
Based on OSUs cs340 nodejs-starter-app
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
*/
let updateCustomerForm = document.getElementById('update-menu-form-ajax');

updateCustomerForm.addEventListener("submit", function (e) {

    e.preventDefault();

    let inputMenu = document.getElementById("mySelect");
    let inputItem = document.getElementById("input-item1");
    let inputType = document.getElementById("input-type1");
    let inputPrice = document.getElementById("input-price1");

    let menuValue = inputMenu.value;
    let itemValue = inputItem.value;
    let typeValue = inputType.value;
    let priceValue = inputPrice.value;


    if (itemValue === null) 
    {
        return;
    }

    let data = {
        menu: menuValue,
        item: itemValue,
        type: typeValue,
        price: priceValue,
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-menu-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, menuValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, menuID){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("menu-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == menuID) {
        
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td to update and reassign to value
            let td1 = updateRowIndex.getElementsByTagName("td")[1];
            td1.innerHTML = parsedData[0].item; 

            let td2 = updateRowIndex.getElementsByTagName("td")[2];
            td2.innerHTML = parsedData[0].type; 

            let td3 = updateRowIndex.getElementsByTagName("td")[3];
            td3.innerHTML = parsedData[0].price; 
       }
    }
    updateDropDownMenu(menuID, parsedData[0].item);
}

function updateDropDownMenu(menuID, menuItem){
    let selectMenu = document.getElementById("mySelect");
    for (let i = 0; i < selectMenu.length; i++){
        if (Number(selectMenu.options[i].value) === Number(menuID)){
            selectMenu.options[i].text = menuItem;
            break;
        } 
    }
}
