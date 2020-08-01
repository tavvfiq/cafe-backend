const express = require("express");

const productController = require("../controller/productController");

const {productMiddleware,} = require("../helpers/middleware/middleware");

const productRouter = express.Router();

//get all product available
productRouter.get("/", productMiddleware, productController.getAllProducts);
//add product
productRouter.post("/", productMiddleware, productController.addProduct);
//delete product
productRouter.delete("/", productMiddleware, productController.deleteProduct);
//update product
productRouter.patch("/", productMiddleware, productController.updateExistingProduct);
//sort product by name
productRouter.get("/sort/byname", productMiddleware, productController.sortProductByName);
//sort product by category
productRouter.get("/sort/bycategory", productMiddleware, productController.sortProductByCategory);
//sort product by newest
productRouter.get("/sort/bynewest", productMiddleware, productController.sortProductByNewest);
//sort product by price
productRouter.get("/sort/byprice", productMiddleware, productController.sortProductByPrice);
//get product by name
productRouter.get("/search/:name", productMiddleware, productController.searchProductByName);

module.exports = productRouter;