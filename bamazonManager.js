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
    managerOptions();
});



//function to provide list of options
function managerOptions() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'managerMenu',
            choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product']
        }
    ]).then(function (inqRes) {
        switch (inqRes.managerMenu) {
            //if view products for sale - show everything
            case 'View Products for Sale':
                allSale();
                break;
            //if view low inventory - show everything with inventory less than 5
            case 'View Low Inventory':
                lowInventory();
                break;
            //if add to inventory - prompt to add more of anything in the store
            case 'Add to Inventory':
                addInventory();
                break;
            //if add new product - prompts to add brand new item to store
            case 'Add New Product':
                newProduct();
                break;
        }

    })
}


//function for displaying info on everything on sale
function allSale() {

    //connect to databse and get info on everything, ordered by department name so it's organized
    connection.query("SELECT * FROM products ORDER BY department_name", function (err, res) {
        if (err) throw err;

        //log everything currently in the store
        console.log('\nEverything in the store right now:')
        console.log("-----------------------------------");
        for (var i = 0; i < res.length; i++) {

            console.log(`${res[i].item_id} | ${res[i].product_name} | ${res[i].price} | ${res[i].stock_quantity}`);
        }
        console.log("-----------------------------------");
    });
    connection.end();
}

//function for showing everything with a low inventory
function lowInventory() {
    connection.query("SELECT * FROM products WHERE stock_quantity < 5 ORDER BY department_name", function (err, res) {
        if (err) throw err;

        //log the items with a low inventory
        console.log('\nEverything with an inventory less than 5 items:')
        console.log("-----------------------------------");
        for (var i = 0; i < res.length; i++) {
            console.log(`${res[i].item_id} | ${res[i].product_name} | ${res[i].price} | ${res[i].stock_quantity}`);
        }
        console.log("-----------------------------------");
    });
    connection.end();
}

//function to add more inventory to an existing item
function addInventory() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'itemChosen',
            message: "What is the id number of the item who's inventory you want to increase?"
        },
        {
            type: 'input',
            name: 'amountUp',
            message: "How many are you adding to the inventory?"
        }
    ]).then(function (inqRes) {
        //set variables for prompt info
        const amountUp = parseInt(inqRes.amountUp);
        const itemChosen = inqRes.itemChosen;

        //connect to get database info
        connection.query(`SELECT * FROM products WHERE item_id = ${itemChosen}`, function (err, res) {

            //set variables for info from database
            const itemName = res[0].product_name;
            const currentAmount = res[0].stock_quantity;
            //set variable for new inventory amount
            const newAmount = amountUp + currentAmount;

            //connect to database and change the inventory amount
            connection.query(`UPDATE products SET stock_quantity = ${newAmount} WHERE item_id = ${itemChosen}`, function (err, res) {
                if (err) throw err;

                //log the new amount
                console.log('\nNew inventory amount:')
                console.log("-----------------------------------");
                console.log(`${itemName} | ${newAmount}`);
                console.log("-----------------------------------");
            });
            connection.end();
        });

    });

}

function newProduct() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'newName',
            message: "What is the new product's name?"
        },
        {
            type: 'input',
            name: 'newDept',
            message: "What department is the new product in?"
        },
        {
            type: 'input',
            name: 'newPrice',
            message: "What is the price of the new product?"
        },
        {
            type: 'input',
            name: 'newStock',
            message: "What is the inventory amount of the new product?"
        }
    ]).then(function (inqRes) {

        //set variables for prompt info
        const newName = inqRes.newName;
        const newDept = inqRes.newDept;
        const newPrice = inqRes.newPrice;
        const newStock = inqRes.newStock;

        //set up connection to insert in new product 
        connection.query(`INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES('${newName}', '${newDept}', '${newPrice}', '${newStock}');`, function (err, res) {
            if (err) throw err;

            //create variable for id number of new product
            const newID = res.insertId;

            //connection to read the new product's info
            connection.query(`SELECT * FROM products WHERE item_id = ${newID}`, function (err, res) {
                if (err) throw err;

                // log the new item
                console.log('\nNew item:')
                console.log("-----------------------------------");
                console.log(`${res[0].item_id} | ${res[0].product_name} | ${res[0].department_name} | ${res[0].price} | ${res[0].stock_quantity}`);
                console.log("-----------------------------------");
            })
            connection.end();
        })
    })
}