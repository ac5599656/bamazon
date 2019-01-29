//This homework is linked to my portfolio. https://ac5599656.github.io/Bootstrap-Portfolio/portfolio.html
const mysql = require("mysql");
const inquirer = require("inquirer");

//create the connection information for the sql database
const connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "Kyldopen",
  database: "bamazon_db"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
});
//checkQuanity updates the quanity in MySQL.
function checkQuanity(onHand, orderAmount, chosenId, price) {
  if (onHand >= parseInt(orderAmount)) {
    let updateQuantity = onHand - parseInt(orderAmount);
    console.log(updateQuantity);
    let amount = parseInt(orderAmount) * price;
    connection.query(
      "UPDATE products SET ? WHERE ?",

      [{
          stock_quanity: updateQuantity
        },
        {
          item_id: parseInt(chosenId)
        }
      ],
      function (err) {
        if (err) throw err;
        console.log("--------------------------------------");
        console.log("Order placed successfully!");
        console.log(
          `orderAmount: ${orderAmount} price: $${price} amount: $${amount}`
        );
        console.log("---------------------------------------");

        start();
      }
    );
  } else {
    //returns insuffiecient quanitity when the quanity in MySQL is not enough.
    console.log("Insufficient Quantity");
    start();
  }
}

//Prompt users for the id and quantity of the product.
function start() {
  connection.query("SELECT * FROM products", function (err, results) {
    if (err) throw err;
    inquirer
      .prompt([{
          name: "id",
          type: "input",
          message: "Please provide the id of the product that you like to purchase.",
          validate: function (value) {
            if (
              isNaN(value) === false &&
              parseInt(value) <= results.length &&
              parseInt(value) > 0
            ) {
              return true;
            } else {
              console.log(" " + "This product is not available!");
              return false;
            }
          }
        },
        {
          name: "quanity",
          type: "input",
          message: "The quanity for this product",
          validate: function (value) {
            if (isNaN(value) === false && parseInt(value) > 0) {
              return true;
            } else {
              console.log(" " + "Please state the quanity.");
              return false;
            }
          }
        }
      ])
      .then(answer => {
        console.log(answer);

        //loops through to find the product that the users selected.
        let foundItem = results.find(
          item => JSON.parse(item.item_id) === parseInt(answer.id)
        );

        console.log(
          "------------------------------------------------------------------------"
        );
        console.log(
          `Id: ${foundItem.item_id} Product:${
            foundItem.product_name
          } Department: ${foundItem.department_name} Price: ${
            foundItem.price
          } Quanity: ${foundItem.stock_quanity}`
        );
        console.log(
          "------------------------------------------------------------------------"
        );
        let onHand = foundItem.stock_quanity;
        let price = foundItem.price;
        let orderAmount = answer.quanity;
        let chosenId = answer.id;
        checkQuanity(onHand, orderAmount, chosenId, price, results);
      });
  });
}