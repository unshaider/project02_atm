#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

let pinCode: number = 1214;
let balance: any = 10000;

let pin = await inquirer.prompt([
  {
    type: "number",
    name: "enterPin",
    message: "Enter your PIN",
  },
]);

if (pin.enterPin === pinCode) {
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
      choices: ["Fast Cash", "Cash Withdrawl", "Balance Inquiry"],
    },
  ]);
  if (cash.selectOption === "Fast Cash") {
    let fastCash = await inquirer.prompt([
      {
        type: "list",
        name: "selectOption",
        message: "Select Cash",
        choices: [500, 1000, 5000, 10000],
      },
    ]);
    console.log(
      `Your remaining balance is $${balance - fastCash.selectOption}.`
    );
  } else if (cash.selectOption === "Cash Withdrawl") {
    let cashWithdrawl = await inquirer.prompt({
      type: "number",
      name: "withdraw",
      message: "Enter a cash amount",
    });
    let cashBalance = balance - cashWithdrawl.withdraw;
    if (cashWithdrawl.withdraw > balance) {
      console.log(chalk.red("Insufficient Balance"));
    } else {
      console.log(chalk.green(`Your remaining balance is $${cashBalance}.`));
    }
  } else if (cash.selectOption === "Balance Inquiry") {
    console.log(chalk.green(`Your current balance is $${balance}.`));
  }
} else {
  console.log(chalk.red("You have entered the incorrect PIN."));
}
