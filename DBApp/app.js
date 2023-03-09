// App.js

/*
    SETUP
*/
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))   // Enable express to handle json and form data
PORT        = 9002;                 // Set a port number at the top so it's easy to change in the future

const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

// Database
var db = require('./database/db-connector')
// So we export an object containing an object with a key pool, and in app.js assign that object to db. 
// This is why we have to run queries by first typing db.pool.*.

/*
    ROUTES
*/
app.get('/', function(req, res)
    {
        let query1 = "SELECT * FROM Customers;";
        db.pool.query(query1, function(error, rows, fields){
            res.render('index', {data: rows}); 
        })                                      // Note the call to render() and not send(). Using render() ensures the templating engine
    });                                         // will process this file, before sending the finished HTML to the client.

app.get('/employees', function(req, res){
    res.render('employees')
    });

app.get('/items_ordered', function(req, res)
    {
        let query1 = "SELECT * FROM Items_Ordered;";
        db.pool.query(query1, function(error, rows, fields){
            res.render('items_ordered', {data: rows});
        })
    });

app.get('/menuitems', function(req, res)
    {
        let query1 = "SELECT * FROM MenuItems;";
        db.pool.query(query1, function(error, rows, fields){
            res.render('menuitems', {data: rows});
        })
    });

app.get('/order_employees', function(req, res){
    res.render('order_employees')
    });

app.get('/orders', function(req, res){
    res.render('orders')
    });

app.get('/recipes', function(req, res)
    {
        let query1 = "SELECT * FROM Recipes;";
        db.pool.query(query1, function(error, rows, fields){
            res.render('recipes', {data: rows});
        })
    });

app.get('/inventoryitems', function(req, res)
    {
        let query1 = "SELECT * FROM InventoryItems;";
        db.pool.query(query1, function(error, rows, fields){
            res.render('inventoryitems', {data: rows});
        })
    });
 
app.post('/add-customer-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values, for int values
    //let homeworld = parseInt(data.homeworld);
    //if (isNaN(homeworld))
    //{
    //    homeworld = 'NULL'
    //}

    // Create the query and run it on the database
    query1 = `INSERT INTO Customers (name, phone, email, address) VALUES ('${data.name}', '${data.phone}', '${data.email}', '${data.address}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on Customers
            query2 = `SELECT * FROM Customers;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

app.post('/add-menu-ajax', function(req, res) 
{
    let data = req.body;

    query1 = `INSERT INTO MenuItems (item, type, price) VALUES ('${data.item}', '${data.type}', '${data.price}')`;
    db.pool.query(query1, function(error, rows, fields){
        if (error) { 
            console.log(error)
            res.sendStatus(400);
        } else {
            query2 = `SELECT * FROM MenuItems;`;
            db.pool.query(query2, function(error, rows, fields){
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.send(rows);
                }
            })
        }
    })
});

app.post('/add-inventory-ajax', function(req, res) 
{
    let data = req.body;

    query1 = `INSERT INTO InventoryItems (item, type, quantity) VALUES ('${data.item}', '${data.type}', '${data.quantity}')`;
    db.pool.query(query1, function(error, rows, fields){
        if (error) { 
            console.log(error)
            res.sendStatus(400);
        } else {
            query2 = `SELECT * FROM InventoryItems;`;
            db.pool.query(query2, function(error, rows, fields){
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.send(rows);
                }
            })
        }
    })
});

app.post('/add-recipe-ajax', function(req, res) 
{
    let data = req.body;

    query1 = `INSERT INTO Recipes (menuID, inventoryID, reqAmt) VALUES ('${data.menu}', '${data.inventory}', '${data.reqAmt}')`;
    db.pool.query(query1, function(error, rows, fields){
        if (error) { 
            console.log(error)
            res.sendStatus(400);
        } else {
            query2 = `SELECT * FROM Recipes;`;
            db.pool.query(query2, function(error, rows, fields){
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.send(rows);
                }
            })
        }
    })
});

app.post('/add-itemsordered-ajax', function(req, res) 
{
    let data = req.body;

    query1 = `INSERT INTO Items_Ordered (orderID, menuID) VALUES ('${data.order}', '${data.menu}')`;
    db.pool.query(query1, function(error, rows, fields){
        if (error) { 
            console.log(error)
            res.sendStatus(400);
        } else {
            query2 = `SELECT * FROM Items_Ordered;`;
            db.pool.query(query2, function(error, rows, fields){
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.send(rows);
                }
            })
        }
    })
});

app.delete('/delete-customer-ajax', function(req,res,next){
    let data = req.body;
    let customerID = parseInt(data.id);
    let updateOrders = `UPDATE Orders SET customerID = NULL WHERE customerID = ?`;
    let deleteCustomer = `DELETE FROM Customers WHERE customerID = ?`;
  
  
          // Run the 1st query
          db.pool.query(updateOrders, [customerID], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
  
              else
              {
                  // Run the second query
                  db.pool.query(deleteCustomer, [customerID], function(error, rows, fields) {
  
                      if (error) {
                          console.log(error);
                          res.sendStatus(400);
                      } else {
                          res.sendStatus(204);
                      }
                  })
              }
  })});

app.delete('/delete-menu-ajax', function(req,res,next){
    let data = req.body;
    let menuID = parseInt(data.id);
    let deleteItems_Ordered = `DELETE FROM Items_Ordered WHERE menuID = ?`;
    let deleteMenu = `DELETE FROM MenuItems WHERE menuID = ?`;

        db.pool.query(deleteItems_Ordered, [menuID], function(error, rows, fields){
            if (error) {

            console.log(error);
            res.sendStatus(400);
            } else {
                db.pool.query(deleteMenu, [menuID], function(error, rows, fields) {
                    if (error) {
                        console.log(error);
                        res.sendStatus(400);
                    } else {
                        res.sendStatus(204);
                    }
                })
            }
})});

app.delete('/delete-inventory-ajax', function(req,res,next){
    let data = req.body;
    let inventoryID = parseInt(data.id);
    let deleteInventory = `DELETE FROM InventoryItems WHERE inventoryID = ?`;

        db.pool.query(deleteInventory, [inventoryID], function(error, rows, fields){
            if (error) {
                console.log(error);
                res.sendStatus(400);
            } else {
                res.sendStatus(204);
            }
})});

app.delete('/delete-recipe-ajax', function(req,res,next){
    let data = req.body;
    let recipeID = parseInt(data.id);
    let deleteRecipe = `DELETE FROM Recipes WHERE recipeID = ?`;

        db.pool.query(deleteRecipe, [recipeID], function(error, rows, fields){
            if (error) {
                console.log(error);
                res.sendStatus(400);
            } else {
                res.sendStatus(204);
            }
})});

app.delete('/delete-itemsordered-ajax', function(req,res,next){
    let data = req.body;
    let itemsorderedID = parseInt(data.id);
    let deleteItemsOrdered = `DELETE FROM Items_Ordered WHERE itemsorderedID = ?`;

        db.pool.query(deleteItemsOrdered, [itemsorderedID], function(error, rows, fields){
            if (error) {
                console.log(error);
                res.sendStatus(400);
            } else {
                res.sendStatus(204);
            }
})});

app.put('/put-customer-ajax', function(req,res,next){
let data = req.body;

let customerID = data.customer;
let name = data.name;
let phone = data.phone;
let email = data.email;
let address = data.address;

let updateCustomer = `UPDATE Customers SET name = ?, phone = ?, email = ?, address = ? WHERE Customers.customerID = ?`;
let selectCustomer = `SELECT * FROM Customers WHERE customerID = ?`

        // Run the 1st query
        db.pool.query(updateCustomer, [name, phone, email, address, customerID], function(error, rows, fields){
            if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
            }

            // If there was no error, we run our second query and return that data so we can use it to update the people's
            // table on the front-end
            else
            {
                // Run the second query
                db.pool.query(selectCustomer, [customerID], function(error, rows, fields) {

                    if (error) {
                        console.log(error);
                        res.sendStatus(400);
                    } else {
                        res.send(rows);
                    }
                })
            }
})});

app.put('/put-menu-ajax', function(req,res,next){
    let data = req.body;
    
    let menuID = data.menu;
    let item = data.item;
    let type = data.type;
    let price = data.price;
    
    let updateMenu = `UPDATE MenuItems SET item = ?, type = ?, price = ? WHERE MenuItems.menuID = ?`;
    let selectMenu = `SELECT * FROM MenuItems WHERE menuID = ?`
    
            db.pool.query(updateMenu, [item, type, price, menuID], function(error, rows, fields){
                if (error) {
    
                console.log(error);
                res.sendStatus(400);
                } else {
                    db.pool.query(selectMenu, [menuID], function(error, rows, fields) {
                        if (error) {
                            console.log(error);
                            res.sendStatus(400);
                        } else {
                            res.send(rows);
                        }
                    })
                }
})});

app.put('/put-inventory-ajax', function(req,res,next){
    let data = req.body;
    
    let inventoryID = data.inventory;
    let item = data.item;
    let type = data.type;
    let quantity = data.quantity;
    
    let updateInventory = `UPDATE InventoryItems SET item = ?, type = ?, quantity = ? WHERE InventoryItems.inventoryID = ?`;
    let selectInventory = `SELECT * FROM InventoryItems WHERE inventoryID = ?`
            db.pool.query(updateInventory, [item, type, quantity, inventoryID], function(error, rows, fields){
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    db.pool.query(selectInventory, [inventoryID], function(error, rows, fields) {
                        if (error) {
                            console.log(error);
                            res.sendStatus(400);
                        } else {
                            res.send(rows);
                        }
                    })
                }
})});

app.put('/put-recipe-ajax', function(req,res,next){
    let data = req.body;
    
    let recipeID = data.recipe;
    let menu = data.menu;
    let inventory = data.inventory;
    let reqAmt = data.reqAmt;
    
    let updateRecipe = `UPDATE Recipes SET menuID = ?, inventoryID = ?, reqAmt = ? WHERE Recipes.recipeID = ?`;
    let selectRecipe = `SELECT * FROM Recipes WHERE recipeID = ?`
            db.pool.query(updateRecipe, [menu, inventory, reqAmt, recipeID], function(error, rows, fields){
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    db.pool.query(selectRecipe, [recipeID], function(error, rows, fields) {
                        if (error) {
                            console.log(error);
                            res.sendStatus(400);
                        } else {
                            res.send(rows);
                        }
                    })
                }
})});

/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://flip2.engr.oregonstate.edu:' + PORT + '; press Ctrl-C to terminate.')
});
