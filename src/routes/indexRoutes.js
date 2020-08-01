const express = require("express");
const productRouter = require("./productRoutes");
const historyRouter = require("./historyRoutes");
const transactionRouter = require("./transactionRoutes");

const indexRouter = express.Router();

indexRouter.use("/product", productRouter);
indexRouter.use("/history", historyRouter);
indexRouter.use("/", transactionRouter);

module.exports = indexRouter;