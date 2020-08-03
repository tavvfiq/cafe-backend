const express = require("express");

const transactionController = require("../controller/transactionController");

const transactionRouter = express.Router();

//add transaction
transactionRouter.post("/", transactionController.addTransaction);

module.exports = transactionRouter;