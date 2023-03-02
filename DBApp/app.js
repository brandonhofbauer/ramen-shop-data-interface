// App.js

/*
    SETUP
*/
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))   // Enable express to handle json and form data
PORT        = 9001;                 // Set a port number at the top so it's easy to change in the future

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

app.delete('/delete-customer-ajax/', function(req,res,next){
    let data = req.body;
    let customerID = parseInt(data.id);
    let updateOrders = `UPDATE Orders SET customerID = NULL WHERE customerID = ?`;
    let deleteCustomer= `DELETE FROM Customers WHERE customerID = ?`;
  
  
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

/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://flip2.engr.oregonstate.edu:' + PORT + '; press Ctrl-C to terminate.')
});