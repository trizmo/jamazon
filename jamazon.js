const mysql = require("mysql")
const inquirer = require("inquirer")
const chalk = require("chalk")
let inventory = "";
let menuItems = [];
let currentProductPage = [];
let gotProductPage = false;
let cart = [];
let cartPrice = 0;


const connection = mysql.createConnection({
  host: "localhost",
  port: 3307,
  user: "root",
  password: "root",
  database: "jamazon"
})

connection.connect(function (err) {
  if (err) throw err;
  connection.query("SELECT * FROM inventory", function (err, result, fields) {
    if (err) throw err;
    console.log("connection successful")
    inventory = result
    startStore()

  });
});



function startStore() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "Welcome to Jamazon- Here is what we have to sell you",
      choices: [
        "Menu",
        "Exit"
      ]
    })
    .then(function (answer) {
      switch (answer.action) {
        case "Menu":
          displayMenu()
          break;

        case "Exit":
          storeExit();
          break;
      }
    });
}

function getMenuItems() {
  for (let i = 0; i < inventory.length; i++) {
    if (inventory[i].quantity > 0) {
      menuItems.push(inventory[i].name)
    }
  }
  menuItems.push("YOUR CART")
}


function displayMenu() {
  menuItems = []
  getMenuItems();
  inquirer
    .prompt({
      name: "inventoryName",
      type: "list",
      message: "==== MENU ====",
      choices: menuItems
    })
    .then(function (answer) {
      switch (answer.inventoryName) {
        case answer.inventoryName:
          displayProductPage(answer.inventoryName)
          break;
        case "YOUR CART":
          // displayCart()
          break;
        case "Exit":
          storeExit();
          break;
      }
    });
}

function getProductInfo(target) {
  // console.log("getting product info for: " + target);
  connection.query("SELECT * FROM inventory WHERE name = ?", [target], function (err, result, fields) {
    if (err) throw err;
    // console.log("connection successful")
    // console.log(result)
    currentProductPage = result
    gotProductPage = true;
    // console.log(currentProductPage[0].name)

  });
}
// setTimeout(function(){ alert("Hello"); }, 3000);

function updateCart() {
  cartPrice += currentProductPage[0].price
  cart.push(currentProductPage[0].name)
  console.log("Added to Cart!")
}

function displayProductPage(target) {
  getProductInfo(target)
  setTimeout(function () {
    let prodInfo = function () {
      console.log(currentProductPage[0].name)
      console.log(currentProductPage[0].description)
      console.log("Quantity: " + currentProductPage[0].quantity)
      console.log("$ " + currentProductPage[0].price)
    }
    // console.log(currentProductPage[0])
    if (gotProductPage === true) {
      inquirer
        .prompt({
          name: "action",
          type: "list",
          message: prodInfo(),

          choices: [
            "Add to Cart",
            "Back",
            "Exit"
          ]
        })
        .then(function (answer) {
          switch (answer.action) {
            case "Add to Cart":
              updateCart()
              displayCart()
              break;

            case "Back":
              displayMenu()
              break;

            case "Exit":
              storeExit();
              break;
          }
        });
    }
  }, 1000)
}

function displayCart() {
  console.log("Your cart: ")
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "Cart items: " + cart + " | Total: $" + cartPrice,

      choices: [
        "Continue Shopping",
        "Checkout",
        "Exit"
      ]
    })
    .then(function (answer) {
      switch (answer.action) {
        case "Continue Shopping":
          displayMenu()
          break;

        case "Checkout":
          displayCheckout()
          break;

        case "Exit":
          storeExit();
          break;
      }
    });
}

function displayCheckout() {
  console.log("Please review your cart before confirming your purchase")
  console.log("Your Cart:")
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "Total items: " + cart + " | Total: $" + cartPrice,

      choices: [
        "Confirm",
        "Back to Menu",
        "Exit"
      ]
    })
    .then(function (answer) {
      switch (answer.action) {
        case "Back to Menu":
          displayMenu()
          break;

        case "Confirm":
          updateDB()
          break;

        case "Exit":
          storeExit();
          break;
      }
    });

}

function updateDB() {
  console.log("running updateDB")


  for (let i = 0; i < cart.length; i++) {
    let currentQ = 0;
    let sub = 0;

    connection.query("SELECT quantity FROM inventory WHERE name = ?", [cart[i]], function (err, result, fields) {
      if (err) throw err;
      currentQ = result
      sub = currentQ[0].quantity - 1
      console.log(typeof (currentQ[0].quantity) + " " + currentQ[0].quantity)
      console.log("current Quantity: " + currentQ[0].quantity)
      console.log(typeof (sub) + " " + sub)

      console.log("UPDATED QUANTITY: " + sub)

    })

    setTimeout(function () {
      connection.query(
        "UPDATE inventory SET ? WHERE ?",
        [
          { quantity: sub },
          { name: cart[i] }
        ],
        function (err, res) {
          console.log(res.affectedRows + " products updated!\n");
          // Call deleteProduct AFTER the UPDATE completes
        });
    }, 1000)

    setTimeout(function () {
      storeExit()
    }, 1250)




  }
};


function storeExit() {
  console.log("Thank you for your purchase- Goodbye!")
  process.exit(1);
}
