var inquirer = require("inquirer");

var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "bamazon_db"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
});

const purchaseConfirmation = {
  name: "purchaseConfirmation",
  message: "would you like to buy a product?",
  type: "confirm"
};

const itemChoice = {
  when: function(currentAnswers) {
    if (currentAnswers.purchaseConfirmation) {
      return true;
    }
    end.connection()
    return false;
  },
  name: "itemChoice",
  message: "what item would you like to buy",
  type: "list",
  choices: []
};

const purchaseCountPrompt = {
  name: "purchaseCount",
  message: "how many units would you like to purchase",
  validate: function(number) {
    if (parseInt(number) == number) {
      return true;
    }
    console.log("\n please use a number");
    return false;
  }
};

async function menu() {

  const queryRead = await query("SELECT * FROM products");
  const product_names = [];
  
  console.table(queryRead);
  
  queryRead.forEach(item => {

    const {product_name} = item;
    product_names.push(product_name);
  });

  itemChoice.choices = product_names;

  const userResponse = await inquirer.prompt([
    purchaseConfirmation,
    itemChoice,
    purchaseCountPrompt
  ]);

  await inquirer.prompt([{type: "confirm", name: 'test'}])
 
  const stockObject = await query(
    `SELECT stock_quantity FROM products WHERE product_name = '${userResponse.itemChoice}'`
  )
  
  const stockQuantity = parseInt(stockObject[0].stock_quantity);
  const purchaseCount =  parseInt(userResponse.purchaseCount);
  const updatedStock = stockQuantity - purchaseCount;

  if ( purchaseCount <= stockQuantity) {
    try {

      const updateResult = await query("UPDATE products SET ? WHERE ?", [
        {
          stock_quantity: updatedStock
        },
        {
          product_name: userResponse.itemChoice
        }
      ])

      if (!updateResult.affectRows) {
        console.log('Unable to purchase!')
      }
    } catch (err) {
      console.log('Something went wrong processing the order!')
    }

      
  } else {
    console.log("sorry we do not have enough stock for your order")
  }
  connection.end();

}


menu();

function query(q, o) {
  return new Promise(function(resolve, reject) {
    connection.query(q, o, function(err, res) {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
}
