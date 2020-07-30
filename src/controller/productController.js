const productModel = require("../model/productModel");
const responseForm = require("../helpers/form/responseForm");

const productController = {
    getAllProducts: function(_, res){
        productModel.getAllProducts()
        .then((data)=>{
            responseForm.success(res, data);
        }).catch((err)=>{
            responseForm.error(res, err);
        });
    },
    searchProductByName: function(req,res){
        productModel.searchProductByName(req.params.name)
        .then((data)=>{
            res.status(200).json(data);
        }).catch((err)=>{
            res.status(500).json(err);
        })
    },
    sortProductByName: function(_, res){
        productModel.sortProductByName()
        .then((data)=>{
            res.status(200).json(data);
        }).catch((err)=>{
            res.status(500).json(err);
        });
    },
    sortProductByCategory: function(_, res){
        productModel.sortProductByCategory()
        .then((data)=>{
            res.status(200).json(data);
        }).catch((err)=>{
            res.status(500).json(err);
        });
    },
    sortProductByNewest: function(_, res){
        productModel.sortProductByNewest()
        .then((data)=>{
            res.status(200).json(data);
        }).catch((err)=>{
            res.status(500).json(err);
        });
    },
    sortProductByPrice: function(_,res){
        productModel.sortProductByPrice()
        .then((data)=>{
            res.status(200).json(data);
        }).catch((err)=>{
            res.status(500).json(err);
        });
    },
    addProduct: function(req,res){
        productModel.addProduct(req.body)
        .then((data)=>{
            const currDate = new Date();
            const responseObj = {
                product_id: data.insertId,
                ...req.body,
                added_at: `${currDate.getFullYear()}-${currDate.getMonth()}-${currDate.getDate()} ${currDate.getHours()}:${currDate.getMinutes()}:${currDate.getSeconds()}`
            }
            responseForm.success(res, responseObj);
        }).catch((err)=>{
            responseForm.error(res,err);
        });
    },
    deleteProduct: function(req, res){
        productModel.deleteProduct(req.body)
        .then((data)=>{
            res.status(200).json(data);
        }).catch((err)=>{
            res.status(500).json(err);
        });
    },
    updateExistingProduct: function(req, res){
        productModel.updateExistingProduct(req.body)
        .then((data)=>{
            res.status(200).json(data);
        }).catch((err)=>{
            res.status(500).json(err);
        });
    }
}

module.exports = productController;