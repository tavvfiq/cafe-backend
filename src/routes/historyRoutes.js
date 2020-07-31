const express = require("express");

const historyController = require("../controller/historyController");
const historyModel = require("../model/historyModel");

const historyRouter = express.Router();

//show all history available
historyRouter.get("/",historyController.showAllHistory);
//show history by invoice
historyRouter.get("/:invoice", historyController.showHistoryByInvoice);
//add transaction
historyRouter.post("/addtransaction", historyController.addTransaction);

module.exports = historyRouter;