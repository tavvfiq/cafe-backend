const historyModel = require("../model/report.model");
const responseForm = require("../helpers/form/responseForm");

const historyController = {
    showAllHistory : function(_,res){
        historyModel.showAllHistory()
        .then((data)=>{
            console.log(res.status);
            responseForm.success(res,data, 200);
        }).catch((err)=>{
            responseForm.error(res,err, 500);
        });
    },
    showHistoryByInvoice : function(req, res){
        historyModel.showHistoryByInvoice(req.params.invoice)
        .then((data)=>{
            responseForm.success(res, data, 200);
        }).catch((err)=>{
            responseForm.error(res, err, 400);
        });
    }
}
module.exports = historyController;