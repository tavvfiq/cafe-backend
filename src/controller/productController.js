const productModel = require("../model/productModel");
const responseForm = require("../helpers/form/responseForm");
const moment = require("moment");

const productController = {
    getAllProducts: function(_, res){
        productModel.getAllProducts()
        .then((data)=>{
            responseForm.success(res, data, 200);
        }).catch((err)=>{
            responseForm.error(res, err, 500);
        });
    },
    sortProductBy: function(req, res){
        productModel.sortProductBy(req.query)
        .then((data)=>{
            responseForm.success(res, data, 200);
        }).catch((err)=>{
            responseForm.error(res, err, 500);
        });
    },
    searchProductByName: function(req,res){
        productModel.searchProductByName(req.query.name)
        .then((data)=>{
            responseForm.success(res, data, 200);
        }).catch((err)=>{
            responseForm.error(res, err, 500);
        });
    },
    addProduct: function(req,res){
        productModel.addProduct(req.body)
        .then((data)=>{
            const responseObj = {
                product_id: data.insertId,
                ...req.body,
                added_at: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
            }
            responseForm.success(res, responseObj, 201);
        }).catch((err)=>{
            responseForm.error(res,err, 500);
        });
    },
    deleteProduct: function(req, res){
        productModel.deleteProduct(req.params.id)
        .then((data)=>{
            const responseObj = {
                msg:`delete product with id: ${req.params.id} was successful`
            }
            responseForm.success(res, responseObj, 200);
        }).catch((err)=>{
            responseForm.error(res, err, 500);
        });
    },
    updateExistingProduct: function(req, res){
        productModel.updateExistingProduct(req.body)
        .then((data)=>{
            const responseObj = {
                ...req.body,
                updated_at: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
            }
            responseForm.success(res, responseObj, 201);
        }).catch((err)=>{
            responseForm.error(res, err, 500);
        });
    }
}

module.exports = productController;