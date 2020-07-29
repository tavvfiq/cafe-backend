const database = require("../config/config");
const productController = require("../controller/productController");
const { resolve } = require("path");
const { sortProductByNewest } = require("../controller/productController");

const selectQuery = `SELECT product.id, product.name, product.price, category.category FROM product JOIN category ON product.category_id = category.id`;

const productModel = {
    getAllProducts: function(){
        return new Promise((resolve, reject)=>{
            const getAllProductQuery = `${selectQuery}`;
            database.query(getAllProductQuery,(err, data)=>{
                if(!err){
                    resolve(data);
                } else {
                    reject(err);
                }
            });
        });
    },
    searchProductByName: function(name){
        return new Promise((resolve, reject)=>{
            const searchProductByNameQuery = `${selectQuery} WHERE product.name LIKE '%${name}%'`;
            database.query(searchProductByNameQuery, (err,data)=>{
                if(!err){
                    resolve(data);
                } else {
                    reject(err);
                }
            });
        });
    },
    sortProductByName: function(){
        return new Promise((resolve,reject)=>{
            const sortProductQuery= `${selectQuery} ORDER BY product.name ASC`;
            database.query(sortProductQuery, (err,data)=>{
                if(!err){
                    resolve(data);
                } else {
                    reject(err);
                }
            });
        });
    },
    sortProductByCategory: function(){
        return new Promise((resolve, reject)=>{
            const sortProductQuery = `${selectQuery} ORDER BY product.category_id ASC`;
            database.query(sortProductQuery,(err,data)=>{
                if(!err){
                    resolve(data);
                } else {
                    reject(err);
                }
            });
        });
    },
    sortProductByNewest: function(){
        return new Promise((resolve, reject)=>{
            const sortProductQuery = `${selectQuery} ORDER BY product.added_at DESC`;
            database.query(sortProductQuery,  (err,data)=>{
                if(!err){
                    resolve(data);
                } else {
                    reject(err);
                }
            });
        });
    },
    sortProductByPrice: function(){
        return new Promise((resolve, reject)=>{
            const sortProductQuery = `${selectQuery} ORDER BY product.price ASC`
            database.query(sortProductQuery,  (err,data)=>{
                if(!err){
                    resolve(data);
                } else {
                    reject(err);
                }
            });
        });
    },
    addProduct: function(body){
        const {name, image_path, price, category_id} = body;
        return new Promise((resolve, reject)=>{
            const addProductQuery = `INSERT INTO product SET name=?, image_path=?, price=?, category_id=?`;
            database.query(addProductQuery, [name, image_path, price, category_id],(err,data)=>{
                if(!err){
                    resolve(data);
                } else {
                    reject(err);
                }
            });
        });
    },
    deleteProduct: function(body){
        const {name} = body;
        return new Promise((resolve,reject)=>{
            const deleteProductQuery = `DELETE FROM product WHERE product.name="${name}"`;
            database.query(deleteProductQuery, (err,data)=>{
                if(!err){
                    resolve(data);
                } else {
                    reject(err);
                }
            });
        });
    },
    updateExistingProduct: function(body){
        const {name, image_path, price, category_id} = body;
        return new Promise((resolve,reject)=>{
            const updateProductQuery = `UPDATE product SET image_path=?, price=?, category_id=? WHERE product.name = "${name}"`;
            database.query(updateProductQuery, [image_path, price, category_id], (err,data)=>{
                if(!err){
                    resolve(data);
                } else {
                    reject(err);
                }
            });
        });
    }
}

module.exports = productModel;