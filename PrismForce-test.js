//Imports
const readline = require("readline");

//Init
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//Variables
var input = {};
var output = {};
let minMonth = 13;
let maxMonth = 0;
let year = "";

var processInput = () => {
    return new Promise((res, rej) => {
        rl.question("Please enter the input Object: ", (inputObj) => {
            res(JSON.parse(inputObj));
        })
    })
};

var processData = () => {
    let expenses = input["expenseData"];
    let revenue = input["revenueData"];

    expenses.map(data => {
        const date = new Date(data["startDate"]);
        let month = date.getMonth();
        if (month > maxMonth) maxMonth = month;
        if (month < minMonth) minMonth = month;
        year = date.getFullYear();
        let amount = data["amount"];

        if (output[month] == undefined) output[month] = 0;
        output[month] -= amount;
    });

    revenue.map(data => {
        const date = new Date(data["startDate"]);
        let month = date.getMonth();
        if (month > maxMonth) maxMonth = month;
        if (month < minMonth) minMonth = month;
        year = date.getFullYear();
        let amount = data["amount"];

        if (output[month] == undefined) output[month] = 0;
        output[month] += amount;
    });
};

var processOutput = () => {
    let result = { balance: [] };
    for (let i = minMonth; i <= maxMonth; i++) {
        result["balance"].push({
            amount: output[i] != undefined ? output[i] : 0,
            startDate: year + "-" + (i + 1) + "-01T00:00:00.000Z"
        });
    }

    console.log("\n\n\nOutput of the data: \n", result);
};

//process
async function Process() {
    input = await processInput();
    processData();
    processOutput();
};
Process();