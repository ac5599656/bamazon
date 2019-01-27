//  Running this application will:

//   * List a set of menu options:

//     * View Products for Sale

//     * View Low Inventory

//     * Add to Inventory

//     * Add New Product


const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",
    //port
    port: 3306,
    //username
    user: "root",
    //psasword and database
    password: "Kyldopen",
    database: "bamazon_db"

});

//connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    start();
})

//function prompts users to select an action (View Products for Sale, Low Inventory, Add to Inventory, or Add New Product)
function start() {
    inquirer.prompt({
        name: "managerMenu",
        type: "rawlist",
        message: "Would you like to view product for sale or low inventory or to add to inventory or new product",
        choices: ["View product for sale", "View low inventory", "Add to inventory", "Add New Product"]
    }).then(function (answer) {
        console.log(answer.managerMenu);
        if (answer.managerMenu === "View product for sale") {
            viewSaleProduct();
        } else if (answer.managerMenu === "View low inventory") {
            viewLowInventory();
        } else if (answer.managerMenu === "Add to inventory") {
            addInventory();
        } else {
            addProduct();
        }
    });
}

function viewSaleProduct() {
    //   * If a manager selects `View Products for Sale`, the app should list every available item: the item IDs, names, prices, and quantities.
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        console.table(results);
        connection.end();
    });
}

function viewLowInventory() {
    //   * If a manager selects `View Low Inventory`, then it should list all items with an inventory count lower than five.
    connection.query("SELECT * FROM products WHERE stock_quanity < 5", function (err, results) {
        if (err) throw err;
        console.table(results);
        connection.end();
    });

}

function addInventory() {
    //   * If a manager selects `Add to Inventory`, your app should display a prompt that will let the manager "add more" of any item currently in the store.
    connection.query("SELECT * FROM products", function (err, results) {
        let product = results.map(result => {
            return result.product_name
        });


        inquirer.prompt([{
                    name: "item",
                    type: "input",
                    message: "What product would you to increase?",
                    validate: function (value) {
                        if (typeof value === 'string' && product.includes(value)) {
                            console.log(" " + "Product is not part of the inventory on hand.")
                            return true;
                        } else {
                            return false;
                        }
                    }
                },
                {
                    name: "quantity",
                    type: "input",
                    message: "How much would you to increase?",
                    validate: function (value) {
                        if (isNaN(value) === false) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                }
            ])
            .then(answer => {
                // console.log(answer.item, answer.quantity);
                // console.log(typeof answer.quantity);
                let foundItem = results.find(item => item.product_name === answer.item)
                console.log(foundItem.stock_quanity)
                console.log(typeof foundItem.stock_quanity);


                let quantity = parseInt(answer.quantity);
                let total = quantity + foundItem.stock_quanity;

                connection.query(
                    "UPDATE products SET ? WHERE ?",
                    [{
                            stock_quanity: total
                        },
                        {
                            product_name: answer.item
                        }
                    ],
                    function (err) {
                        if (err) throw err
                        console.log(`${answer.item} updated successfully.`);
                        start()
                        // re-prompt the user for the menu at the start
                    }
                )


            })
    })

}

function addProduct() {
    //   * If a manager selects `Add New Product`, it should allow the manager to add a completely new product to the store.
    inquirer
        .prompt([{
                name: "product_name",
                type: "input",
                message: "What is the item you would like to submit?",
                validate: function (value) {
                    if (typeof value === 'string') {
                        return true;
                    }
                    return false;
                }
            },
            {
                name: "department_name",
                type: "input",
                message: "What department would you like to place your product?",
                validate: function (value) {
                    if (typeof value === 'string') {
                        return true;
                    }
                    return false;
                }
            },
            {
                name: "price",
                type: "input",
                message: "What would you like your price to be?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            },
            {
                name: "stock_quanity",
                type: "input",
                message: "How much order of this product would you like?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            },
        ])
        .then(function (answer) {
            connection.query(
                "INSERT INTO products SET?", {
                    product_name: answer.product_name,
                    department_name: answer.department_name,
                    price: answer.price,
                    stock_quanity: answer.stock_quanity
                },
                function (err) {
                    if (err) throw err;
                    console.log("Your product was created successfully!");
                    // re-prompt the user for the menu at the start
                    start();
                }
            );

        })
}