/*
Citation for a delete CRUD operation in js:
Date: 3/17/2023
Based on OSUs cs340 nodejs-starter-app
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
*/
function deleteMenu(menuID) {
  let data = {
    id: menuID,
  };

  var xhttp = new XMLHttpRequest();
  xhttp.open('DELETE', '/delete-menu-ajax', true);
  xhttp.setRequestHeader('Content-type', 'application/json');

  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 204) {
      deleteRow(menuID);
    } else if (xhttp.readyState == 4 && xhttp.status != 204) {
      console.log('There was an error with the input.');
    }
  };
  xhttp.send(JSON.stringify(data));
}

function deleteRow(menuID) {
  let table = document.getElementById('menu-table');
  for (let i = 0, row; (row = table.rows[i]); i++) {
    //iterate through rows
    //rows would be accessed using the "row" variable assigned in the for loop
    if (table.rows[i].getAttribute('data-value') == menuID) {
      table.deleteRow(i);
      deleteDropDownMenu(menuID);
      break;
    }
  }
}

function deleteDropDownMenu(menuID) {
  let selectMenu = document.getElementById('mySelect');
  for (let i = 0; i < selectMenu.length; i++) {
    if (Number(selectMenu.options[i].value) === Number(menuID)) {
      selectMenu[i].remove();
      break;
    }
  }
}
