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
    sortProductBy: function(req, res){
        console.log(req.query);
        productModel.sortProductBy(req.query)
        .then((data)=>{
            res.status(200).json(data);
        }).catch((err)=>{
            res.status(500).json(err);
        });
    },
    searchProductByName: function(req,res){
        productModel.searchProductByName(req.query.name)
        .then((data)=>{
            res.status(200).json(data);
        }).catch((err)=>{
            res.status(500).json(err);
        })
    },
    addProduct: function(req,res){
        productModel.addProduct(req.body)
        .then((data)=>{
            const currDate = new Date();
            const responseObj = {
                product_id: data.insertId,
                ...req.body,
                added_at: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
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