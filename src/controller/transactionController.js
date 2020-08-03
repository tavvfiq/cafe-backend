const historyModel = require("../model/transactionModel");
const responseForm = require("../helpers/form/responseForm");

const transactionModel = {
    addTransaction: function (req, res) {
        historyModel.addTransaction(req.body)
            .then((data) => {
                responseForm.success(res, data, 201);
            }).catch((err) => {
                responseForm.error(res, err, 500);
            });
    }
}

module.exports = transactionModel;