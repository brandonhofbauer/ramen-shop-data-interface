/*
Citation for a delete CRUD operation in js:
Date: 3/17/2023
Based on OSUs cs340 nodejs-starter-app
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
*/
// Get the objects we need to modify
let updateEmployeeForm = document.getElementById('update-employee-form-ajax');

// Modify the objects we need
updateEmployeeForm.addEventListener('submit', function (e) {
  // Prevent the form from submitting
  e.preventDefault();

  // Get form fields we need to get data from
  let inputEmployee = document.getElementById('mySelect');
  let inputName = document.getElementById('input-name1');
  let inputPhone = document.getElementById('input-phone1');
  let inputEmail = document.getElementById('input-email1');
  let inputAddress = document.getElementById('input-address1');
  let inputRole = document.getElementById('input-role1');

  // Get the values from the form fields
  let employeeValue = inputEmployee.value;
  let nameValue = inputName.value;
  let phoneValue = inputPhone.value;
  let emailValue = inputEmail.value;
  let addressValue = inputAddress.value;
  let roleValue = inputRole.value;

  // currently the database table for Employee does not allow updating name values to NULL
  // so we must abort if being bassed NULL for homeworld

  if (nameValue === null) {
    return;
  }

  // Put our data we want to send in a javascript object
  let data = {
    employee: employeeValue,
    name: nameValue,
    phone: phoneValue,
    email: emailValue,
    address: addressValue,
    role: roleValue,
  };

  // Setup our AJAX request
  var xhttp = new XMLHttpRequest();
  xhttp.open('PUT', '/put-employee-ajax', true);
  xhttp.setRequestHeader('Content-type', 'application/json');

  // Tell our AJAX request how to resolve
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      // Add the new data to the table
      updateRow(xhttp.response, employeeValue);
    } else if (xhttp.readyState == 4 && xhttp.status != 200) {
      console.log('There was an error with the input.');
    }
  };

  // Send the request and wait for the response
  xhttp.send(JSON.stringify(data));
});

function updateRow(data, employeeID) {
  let parsedData = JSON.parse(data);

  let table = document.getElementById('employee-table');

  for (let i = 0, row; (row = table.rows[i]); i++) {
    //iterate through rows
    //rows would be accessed using the "row" variable assigned in the for loop
    if (table.rows[i].getAttribute('data-value') == employeeID) {
      // Get the location of the row where we found the matching person ID
      let updateRowIndex = table.getElementsByTagName('tr')[i];

      // Get td to update and reassign to value
      let td1 = updateRowIndex.getElementsByTagName('td')[1];
      td1.innerHTML = parsedData[0].name;

      let td2 = updateRowIndex.getElementsByTagName('td')[2];
      td2.innerHTML = parsedData[0].phone;

      let td3 = updateRowIndex.getElementsByTagName('td')[3];
      td3.innerHTML = parsedData[0].email;

      let td4 = updateRowIndex.getElementsByTagName('td')[4];
      td4.innerHTML = parsedData[0].address;

      let td5 = updateRowIndex.getElementsByTagName('td')[5];
      td5.innerHTML = parsedData[0].role;
    }
  }

  updateDropDownMenu(employeeID, parsedData[0].name);
}

function updateDropDownMenu(employeeID, employeeName) {
  let selectMenu = document.getElementById('mySelect');
  for (let i = 0; i < selectMenu.length; i++) {
    if (Number(selectMenu.options[i].value) === Number(employeeID)) {
      selectMenu.options[i].text = employeeName;
      break;
    }
  }
}
