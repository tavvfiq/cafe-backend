const express = require("express");
const menuRouter = require("./menu.route");
const historyRouter = require("./report.route");
const transactionRouter = require("./transaction.route");
const authRouter = require("./auth.route");

const indexRouter = express.Router();

indexRouter.use("/menu", menuRouter);
indexRouter.use("/history", historyRouter);
indexRouter.use("/addtransaction", transactionRouter);
indexRouter.use("/auth", authRouter);

module.exports = indexRouter;
