const express = require("express");
const productRouter = require("./productRoutes");

const indexRouter = express.Router();

indexRouter.use("/product", productRouter);

module.exports = indexRouter;