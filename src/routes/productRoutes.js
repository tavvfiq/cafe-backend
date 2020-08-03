const express = require("express");

const productController = require("../controller/productController");

const {productMiddleware, historyMiddleware, transactionMiddleware} = require("../helpers/middleware/middleware");

const productRouter = express.Router();

//get all product available
productRouter.get("/", productMiddleware, productController.getAllProducts);
//add product
productRouter.post("/", productMiddleware, productController.addProduct);
//delete product
productRouter.delete("/:id", productMiddleware, productController.deleteProduct);
//update product
productRouter.patch("/:id", productMiddleware, productController.updateExistingProduct);
//sort product by
productRouter.get("/sort", productMiddleware, productController.sortProductBy);
//get product by name
productRouter.get("/search", productMiddleware, productController.searchProductByName);

module.exports = productRouter;