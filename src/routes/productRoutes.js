const express = require("express");

const productController = require("../controller/productController");

const middleware = require("../helpers/middleware/middleware");

const productRouter = express.Router();

//get all product available
productRouter.get("/", middleware, productController.getAllProducts);
//add product
productRouter.post("/", middleware, productController.addProduct);
//delete product
productRouter.delete("/", middleware, productController.deleteProduct);
//update product
productRouter.patch("/", middleware, productController.updateExistingProduct);
//sort product by name
productRouter.get("/sort/byname", middleware, productController.sortProductByName);
//sort product by category
productRouter.get("/sort/bycategory", middleware, productController.sortProductByCategory);
//sort product by newest
productRouter.get("/sort/bynewest", middleware, productController.sortProductByNewest);
//sort product by price
productRouter.get("/sort/byprice", middleware, productController.sortProductByPrice);
//get product by name
productRouter.get("/search/:name", middleware, productController.searchProductByName);

module.exports = productRouter;