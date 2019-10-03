var inquirer = require('inquirer');
var mysql = require('mysql');
​
var connection;
function startGreatBay() {
​
    connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "password",
        database: "greatBay_db"
    });
​
    connection.connect(function (err) {
        if (err) throw err;
​
        console.log("connected as id " + connection.threadId + "\n");
        mainMenu();
    });
}
​
function mainMenu() {
​
    inquirer.prompt([
        {
            name: 'menuChoice',
            message: 'What would you like to do?',
            type: 'list',
            choices: [
                'POST AN ITEM',
                'BID ON AN ITEM',
                'EXIT'
            ],
        }
    ])
        .then(function (answers) {
​
            if (answers.menuChoice === 'POST AN ITEM') {
​
                createItemMenu();
            }
            else if (answers.menuChoice === 'BID ON AN ITEM') {
​
                readProducts();
            }
            else if (answers.menuChoice === 'EXIT') {
                console.log('Bye');
                
                connection.end();
            }
        });
}
​
function createItem(name, type, price) {
    console.log("Inserting a new item...\n");
    var query = connection.query(
        "INSERT INTO items SET ?",
        {
            name: name,
            type: type,
            price: parseFloat(price),
        },
        function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " item inserted!\n");
​
            mainMenu();
        }
​
    );
    // logs the actual query being run
    console.log(query.sql);
}
​
function createItemMenu() {
    inquirer.prompt([
        {
            name: "itemName",
            message: "What item would you like to sell to sell?"
        },
        {
            name: "itemType",
            message: "What type of item is it?"
        },
        {
            name: "itemPrice",
            message: "What is your starting price?"
        }
    ]).then(function (answer) {
        createItem(answer.itemName, answer.itemType, answer.itemPrice);
    })
}
​
function readProducts() {
    connection.query("SELECT * FROM items", function (err, res) {
        if (err) throw err;
        inquirer.prompt([
            {
                name: "item",
                message: "Items for sale:",
                type: 'list',
                choices: res.reduce(function (accumulator, currentValue) {
                    accumulator.push({
                        name: currentValue.name,
                        value: {
                            name: currentValue.name,
                            id: currentValue.id,
                            price: currentValue.price,
                        }
                    });
​
                    return accumulator;
                }, [])
            },
​
        ]).then(function (answers) {
​
            inquirer.prompt([
                {
                    name: 'bidPrice',
                    message: 'How much would you like to bid?'
                }
            ])
                .then(function (bidAnswers) {
​
                    var newBid = parseFloat(bidAnswers.bidPrice);
                    var currentBid = parseFloat(answers.item.price);
                    var itemID = parseInt(answers.item.id);
​
                    // If our new bid is valid
                    if (newBid > currentBid) {
​
                        console.log(`Updating item with ID: ${itemID}\n`);
                        var updateQuery = connection.query(
                            "UPDATE items SET ? WHERE ?",
                            [
                                {
                                    price: newBid
                                },
                                {
                                    id: itemID
                                }
                            ],
                            function (err, res) {
                                if (err) throw err;
​
                                console.log(res.affectedRows + " item bid updated!\n");
​
                                // Call the completed callback once the UPDATE completes
                                mainMenu();
                            }
                        );
​
                        // logs the actual query being run
                        console.log(updateQuery.sql);
                    }
                    // If our bid is invalid
                    else {
​
                        console.log(`New bid (${newBid}) is not better than current bid (${currentBid})`);
​
                        mainMenu();
                    }
                });
        });
    });
}
​
// Start the Great Bay app
startGreatBay();
Collapse



