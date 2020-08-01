const express = require("express");

const historyController = require("../controller/historyController");

const historyRouter = express.Router();

//show all history available
historyRouter.get("/",historyController.showAllHistory);
//show history by invoice
historyRouter.get("/:invoice", historyController.showHistoryByInvoice);

module.exports = historyRouter;