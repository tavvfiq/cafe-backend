const express = require("express");

const transactionController = require("../controller/transaction.controller");
const checkToken = require("../helpers/middleware/checkToken");

const transactionRouter = express.Router();

//add transaction
transactionRouter.post(
  "/",
  checkToken.isCashier,
  transactionController.addTransaction
);

module.exports = transactionRouter;
