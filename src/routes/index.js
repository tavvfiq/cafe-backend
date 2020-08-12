const express = require("express");
const menuRouter = require("./menu");
const historyRouter = require("./report");
const transactionRouter = require("./transaction");
const authRouter = require("./authentication");

const indexRouter = express.Router();

indexRouter.use("/menu", menuRouter);
indexRouter.use("/history", historyRouter);
indexRouter.use("/addtransaction", transactionRouter);
indexRouter.use("/auth",authRouter);


module.exports = indexRouter;