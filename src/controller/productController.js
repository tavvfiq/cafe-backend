const productModel = require("../model/productModel");

const productController = {
    getAllProducts: function(_, res){
        productModel.getAllProducts()
        .then((data)=>{
            res.json(data);
        }).catch((err)=>{
            res.json(err);
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
            res.status(200).json(data);
        }).catch((err)=>{
            res.status(500).json(err);
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