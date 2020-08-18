const express = require("express");

const historyController = require("../controller/report.controller");
const checkToken = require("../helpers/middleware/checkToken");

const historyRouter = express.Router();

//show all history available
historyRouter.get("/", checkToken.isMaintainer, historyController.showAllHistory);
//show history by invoice
historyRouter.get("/:invoice", historyController.showHistoryByInvoice);

module.exports = historyRouter;