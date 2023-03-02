// Get the objects we need to modify
let updateCustomerForm = document.getElementById('update-customer-form-ajax');

// Modify the objects we need
updateCustomerForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputCustomer = document.getElementById("mySelect");
    let inputName = document.getElementById("input-name1");
    let inputPhone = document.getElementById("input-phone1");
    let inputEmail = document.getElementById("input-email1");
    let inputAddress = document.getElementById("input-address1");

    // Get the values from the form fields
    let customerValue = inputCustomer.value;
    let nameValue = inputName.value;
    let phoneValue = inputPhone.value;
    let emailValue = inputEmail.value;
    let addressValue = inputAddress.value;
    
    // currently the database table for Customers does not allow updating name values to NULL
    // so we must abort if being bassed NULL for homeworld

    if (nameValue === null) 
    {
        return;
    }


    // Put our data we want to send in a javascript object
    let data = {
        customer: customerValue,
        name: nameValue,
        phone: phoneValue,
        email: emailValue,
        address: addressValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-customer-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, customerValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, customerID){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("customer-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == customerID) {

            // Get the location of the row where we found the matching person ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td to update and reassign to value
            let td1 = updateRowIndex.getElementsByTagName("td")[1];
            td1.innerHTML = parsedData.name; 

            let td2 = updateRowIndex.getElementsByTagName("td")[2];
            td2.innerHTML = parsedData.phone; 

            let td3 = updateRowIndex.getElementsByTagName("td")[3];
            td3.innerHTML = parsedData.email; 

            let td4 = updateRowIndex.getElementsByTagName("td")[4];
            td4.innerHTML = parsedData.address; 
       }
    }
}