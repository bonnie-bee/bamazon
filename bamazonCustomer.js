// require modules (mysql, inquirer, password file)
const mysql = require("mysql");
const inquirer = require("inquirer");
const keys = require('./keys.js');

//connect to the database
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: mysqlPW,
    database: "bamazon"
});

//connection function
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    wantToBuy();
});

//function to list the products
function listProducts() {
    connection.query("SELECT * FROM products", function(err, res) {
      for (var i = 0; i < res.length; i++) {
        console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].price);
      }
      console.log("-----------------------------------");
    });
  }

  //function to ask the user what they want to buy and how many
  function wantToBuy() {
    listProducts();
      //prompts to ask what the user wants
      inquirer.prompt([
        {type:'input',
         name: 'prodID',
         message: 'What is the id number of the product you would like to purchase?'   
        },
        {type: 'input',
        name: "prodAmount",
        message: 'How many would you like to get?'}
      ]).then(function(inqRes){
        console.log(inqRes)
          let wanted = inqRes.prodID;
          let amount = inqRes.prodAmount
        connection.query(`SELECT * FROM products WHERE item_id = ${wanted};`, function(err, res) {
            if (err) throw err;
            let price=res[0].price;
            let stock = res[0].stock_quantity
            console.log(res)
            console.log(stock)

            //amount is less than or equal to stock
            //remove amount from stock on the database
            //sum the amount the person will pay
            //log the amount
        //amount is more than the stock
            //log that there's insufficient stock (maybe say how much stock there is)

        if (amount <= stock) {
            console.log(`amount owed: ${amount*price}`)
            connection.query(`UPDATE products SET stock_quantity = ${stock-amount} WHERE item_id = ${wanted};`, function (err, res) {
                if(err) throw err;
                console.log(res)
            });
            
        }
            
        })
          //check to see amount the store has

          //if enough stock- update DB to change quantity, show total cost of order
          //if ask for too many of the item - say insufficient stock and don't place order
        //   console.log(inqRes)
      })
      
  }