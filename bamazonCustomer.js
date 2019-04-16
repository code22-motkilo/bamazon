/********* BAMAZON CUSTOMER APP *************/
/* 
1. In the terminal of the root folder of the app install the following:
  a. npm init
  b. npm install
  c. npm install mysql inquirer columnify

*/

var mysql = require("mysql");
var inquirer = require("inquirer");
var columnify = require("columnify");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "riley1115",
  database: "bamazon"
});

connection.connect(function(err) {
  if(err) throw err;
  console.log("successfully penetrated the database as thread: " + connection.threadId);
  displayItems();
  
});

/* create a Node application called `bamazonCustomer.js`. Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale. */
function displayItems () {
  
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.log("\n");

    var inventory = [];

    for (var i = 0; i < res.length; i++) {
      var data = {
        "ID": res[i].id,
        "PRODUCT NAME": res[i].product_name,
        "DEPARTMENT NAME": res[i].department_name,
        "PRICE": res[i].price,
        "QUANTITY IN STOCK": res[i].stock_quantity
      };
      inventory.push(data);

    }
    console.log(columnify(inventory, {columnSplitter: ' | '}));
    console.log("---------------------------------");

    inquirer.prompt([
      {
        name: "choice_id",
        type: "rawlist",
        choices: function() {
          var choiceArray = [];
          for (var i = 0; i < res.length; i++) {
            choiceArray.push(res[i].product_name);
          }
          return choiceArray;
        },
        message: "Select the ID of the item you want: "
      },
      {
        name: "choice_quantity",
        type: "input",
        message: "How many do you want?: "
      }
    ]).then(function(answer){
      // test the answer function is working
      console.log("you choose: " + answer.choice_id + " and want " + 
      answer.choice_quantity);

      // rettrieve the info for the the selected item
      var chosenItem;
      for (var i = 0; i < res.length; i++) {
        if (res[i].product_name === answer.choice_id) {
          chosenItem = res[i];
        }
      }

      // determine if enough quantity is left
      if (chosenItem.stock_quantity > parseInt(answer.choice_quantity)) {
        console.log("\nGreat we have enought to fill your order!");
        console.log("Your total is: $" + (chosenItem.price * answer.choice_quantity));
        // Build the update the database part
        //update the database to reflect the remaining quantity.;
        connection.query(
          "UPDATE products SET ? WHERE ?",
          [
            {
              stock_quantity: chosenItem.stock_quantity - answer.choice_quantity
            },
            {
              id: chosenItem.id
            }
          ],
          function(error) {
            if (error) throw err;
            console.log("\nDatabase was updated.");
            displayItems();
          }
        );
      }
      else {
        console.log(" Sorry, there are not enough in stock to fullfill your order.");
        
      }

    });
    
  });
  
}

