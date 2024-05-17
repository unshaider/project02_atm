#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let pinCode = 1234;
let balance = 10000;
console.log(chalk.blue("Welcome to the ATM!"));
let pin = await inquirer.prompt([
    {
        type: "password",
        name: "enterPin",
        message: "Please enter your PIN:",
        mask: "*",
    },
]);
if (pin.enterPin != pinCode) {
    console.log(chalk.red('Invalid PIN. Exiting...'));
}
else if (pin.enterPin == pinCode) {
    console.log(chalk.green("PIN accepted."));
    let cash = await inquirer.prompt([
        {
            type: "list",
            name: "accountType",
            message: "Select your account type",
            choices: ["Saving Account", "Current Account"],
        },
        {
            type: "list",
            name: "selectOption",
            message: "Select Service",
            choices: ["Check Balance", "Withdraw Money", "Deposit Money", "Exit"],
        },
    ]);
    if (cash.selectOption === "Check Balance") {
        console.log(chalk.blue(`Your current balance is: $${balance}`));
    }
    else if (cash.selectOption === "Withdraw Money") {
        let cashWithdrawl = await inquirer.prompt({
            type: "number",
            name: "withdraw",
            message: "Enter the amount to withdraw:",
        });
        let cashBalance = balance - cashWithdrawl.withdraw;
        if (cashWithdrawl.withdraw > balance) {
            console.log(chalk.red("Your current balance is insufficient for this transaction."));
        }
        else {
            console.log(chalk.green(`Your remaining balance is $${cashBalance}.`));
        }
    }
    else if (cash.selectOption === "Deposit Money") {
        let amount = await inquirer.prompt([
            {
                type: "number",
                name: "depositAmount",
                message: "Enter the amount to deposit:",
            },
        ]);
        const depositAmount = parseInt(amount.depositAmount);
        balance += depositAmount;
        console.log(chalk.green(`Successfully deposited $${balance}.`));
    }
}
