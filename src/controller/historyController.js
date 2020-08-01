const historyModel = require("../model/historyModel");
const responseForm = require("../helpers/form/responseForm");

const historyController = {
    showAllHistory : function(_,res){
        historyModel.showAllHistory()
        .then((data)=>{
            responseForm.success(res,data);
        }).catch((err)=>{
            responseForm.error(res,err);
        });
    },
    showHistoryByInvoice : function(req, res){
        historyModel.showHistoryByInvoice(req.params.invoice)
        .then((data)=>{
            responseForm.success(res, data);
        }).catch((err)=>{
            responseForm.error(res, err);
        });
    }
}
module.exports = historyController;