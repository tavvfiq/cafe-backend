const express = require("express");
const productRouter = require("./productRoutes");
const historyRouter = require("./historyRoutes");

const indexRouter = express.Router();

indexRouter.use("/product", productRouter);
indexRouter.use("/history", historyRouter);

module.exports = indexRouter;