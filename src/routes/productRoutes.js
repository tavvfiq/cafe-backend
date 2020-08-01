const express = require("express");

const productController = require("../controller/productController");

const productRouter = express.Router();

//get all product available
productRouter.get("/", productController.getAllProducts);
//add product
productRouter.post("/", productController.addProduct);
//delete product
productRouter.delete("/", productController.deleteProduct);
//update product
productRouter.patch("/", productController.updateExistingProduct);
//sort product by name
productRouter.get("/sort/byname",productController.sortProductByName);
//sort product by category
productRouter.get("/sort/bycategory",productController.sortProductByCategory);
//sort product by newest
productRouter.get("/sort/bynewest",productController.sortProductByNewest);
//sort product by price
productRouter.get("/sort/byprice",productController.sortProductByPrice);
//get product by name
productRouter.get("/search/:name", productController.searchProductByName);

module.exports = productRouter;