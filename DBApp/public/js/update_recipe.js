/*
Citation for a delete CRUD operation in js:
Date: 3/17/2023
Based on OSUs cs340 nodejs-starter-app
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
*/
// Get the objects we need to modify
let updateRecipeForm = document.getElementById('update-recipe-form-ajax');

// Modify the objects we need
updateRecipeForm.addEventListener('submit', function (e) {
  // Prevent the form from submitting
  e.preventDefault();

  // Get form fields we need to get data from
  let inputRecipe = document.getElementById('mySelect');
  let inputMenu = document.getElementById('input-menu1');
  let inputInventory = document.getElementById('input-inventory1');
  let inputReqAmt = document.getElementById('input-reqAmt1');

  // Get the values from the form fields
  let recipeValue = inputRecipe.value;
  let menuValue = inputMenu.value;
  let inventoryValue = inputInventory.value;
  let reqAmtValue = inputReqAmt.value;

  // currently the database table for Customers does not allow updating name values to NULL
  // so we must abort if being bassed NULL for homeworld

  if (menuValue === null) {
    return;
  }

  // Put our data we want to send in a javascript object
  let data = {
    recipe: recipeValue,
    menu: menuValue,
    inventory: inventoryValue,
    reqAmt: reqAmtValue,
  };

  // Setup our AJAX request
  var xhttp = new XMLHttpRequest();
  xhttp.open('PUT', '/put-recipe-ajax', true);
  xhttp.setRequestHeader('Content-type', 'application/json');

  // Tell our AJAX request how to resolve
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      // Add the new data to the table
      updateRow(xhttp.response, recipeValue);
    } else if (xhttp.readyState == 4 && xhttp.status != 200) {
      console.log('There was an error with the input.');
    }
  };

  // Send the request and wait for the response
  xhttp.send(JSON.stringify(data));
});

function updateRow(data, recipeID) {
  let parsedData = JSON.parse(data);

  let table = document.getElementById('recipe-table');

  for (let i = 0, row; (row = table.rows[i]); i++) {
    //iterate through rows
    //rows would be accessed using the "row" variable assigned in the for loop
    if (table.rows[i].getAttribute('data-value') == recipeID) {
      // Get the location of the row where we found the matching person ID
      let updateRowIndex = table.getElementsByTagName('tr')[i];

      // Get td to update and reassign to value
      let td1 = updateRowIndex.getElementsByTagName('td')[1];
      td1.innerHTML = parsedData[0].menuID;

      let td2 = updateRowIndex.getElementsByTagName('td')[2];
      td2.innerHTML = parsedData[0].inventoryID;

      let td3 = updateRowIndex.getElementsByTagName('td')[3];
      td3.innerHTML = parsedData[0].reqAmt;
    }
  }

  updateDropDownMenu(recipeID, parsedData[0].menuID, parsedData[0].inventoryID);
}

function updateDropDownMenu(recipeID, menu, inventory) {
  let selectMenu = document.getElementById('mySelect');
  for (let i = 0; i < selectMenu.length; i++) {
    if (Number(selectMenu.options[i].value) === Number(recipeID)) {
      selectMenu.options[i].text = menu + inventory; /* return here */
      break;
    }
  }
}
