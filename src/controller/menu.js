const menuModel = require("../model/menu");
const responseForm = require("../helpers/form/responseForm");
const moment = require("moment");

const menuController = {
    getAllmenus: function(_, res){
        menuModel.getAllmenus()
        .then((data)=>{
            responseForm.success(res, data, 200);
        }).catch((err)=>{
            responseForm.error(res, err, 500);
        });
    },
    sortmenuBy: function(req, res){
        menuModel.sortmenuBy(req.query)
        .then((data)=>{
            responseForm.success(res, data, 200);
        }).catch((err)=>{
            responseForm.error(res, err, 500);
        });
    },
    searchmenuByName: function(req,res){
        menuModel.searchmenuByName(req.query.name)
        .then((data)=>{
            responseForm.success(res, data, 200);
        }).catch((err)=>{
            responseForm.error(res, err, 500);
        });
    },
    addmenu: function(req,res){
        console.log(req.body);
        menuModel.addmenu(req.body)
        .then((data)=>{
            const responseObj = {
                menu_id: data.insertId,
                ...req.body,
                added_at: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
            }
            responseForm.success(res, responseObj, 201);
        }).catch((err)=>{
            responseForm.error(res,err, 500);
        });
    },
    deletemenu: function(req, res){
        menuModel.deletemenu(req.params.id)
        .then((data)=>{
            const responseObj = {
                msg:`delete menu with id: ${req.params.id} was successful`
            }
            responseForm.success(res, responseObj, 200);
        }).catch((err)=>{
            responseForm.error(res, err, 500);
        });
    },
    updateExistingmenu: function(req, res){
        menuModel.updateExistingmenu(req.params.id,req.body)
        .then((data)=>{
            const responseObj = {
                ...req.body,
                updated_at: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
            }
            responseForm.success(res, responseObj, 201);
        }).catch((err)=>{
            responseForm.error(res, err, 500);
        });
    },
    filterMenu: function(req, res){
        menuModel.filterMenu(req.query)
        .then((data)=>{
            responseForm.success(res, data, 200);
        }).catch((err)=>{
            responseForm.error(res, err, 500);
        });
    },
    pagination: function(req,res){
        menuModel.pagination(req.query).then((data)=>{
            responseForm.pagination(req.query, res, data,200)
        }).catch((err)=>{
            responseForm.error(res,err,500);
        })
    }
}

module.exports = menuController;