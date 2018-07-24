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
    listProducts();
});

//function to list the products
function listProducts() {
    connection.query("SELECT * FROM products ORDER BY department_name", function (err, res) {
        if (err) throw err;
        console.log("\n-----------------------------------");
        for (var i = 0; i < res.length; i++) {
            
            console.log(`${res[i].item_id} | ${res[i].product_name} | ${res[i].price}`);
        }
        console.log("-----------------------------------");
    });
    wantToBuy();
    
}

//function to ask the user what they want to buy and how many
function wantToBuy() {
    
    //prompts to ask what the user wants
    inquirer.prompt([
        {
            type: 'input',
            name: 'prodID',
            message: 'What is the id number of the product you would like to purchase?'
        },
        {
            type: 'input',
            name: "prodAmount",
            message: 'How many would you like to get?'
        }
    ]).then(function (inqRes) {

        //set variables for the info we get back
        let wanted = inqRes.prodID;
        let amount = inqRes.prodAmount

        //get data for the user's chosen item
        connection.query(`SELECT * FROM products WHERE item_id = ${wanted};`, function (err, res) {

            //set variables for the information we get back from the database
            if (err) throw err;
            let price = res[0].price;
            let stock = res[0].stock_quantity
            let item = res[0].product_name

            //function to determine what to do with the order
            switch (amount <= stock) {
                //amount is less than or equal to stock
                case true:
                    //sum the amount the person will pay
                    //log the amount
                    console.log(`Thank you for your order. Your purchase total is $${amount * price}`)
                    //remove amount from stock on the database
                    connection.query(`UPDATE products SET stock_quantity = ${stock - amount} WHERE item_id = ${wanted};`, function (err, res) {
                        if (err) throw err;
                    });
                    break;
                //amount is more than the stock
                case false:
                    //log that there's insufficient stock (maybe say how much stock there is)
                    console.log(`You ordered too many. We only have ${stock} ${item} left.`)
                    break;
            }
            connection.end();
        })
    })
    
}