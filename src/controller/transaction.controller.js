const historyModel = require("../model/transaction.model");
const responseForm = require("../helpers/form/responseForm");

const transactionModel = {
  addTransaction: function (req, res) {
    historyModel
      .addTransaction(req.body)
      .then((data) => {
        console.log(data);
        const responseObj = {
          msg: "Transaction success",
          ...req.body,
        };
        responseForm.success(res, responseObj, 201);
      })
      .catch((err) => {
        console.log(err);
        responseForm.error(res, err, 500);
      });
  },
  addOrder: function (req, res) {
    historyModel
      .addOrder(req.body)
      .then((data) => {
        console.log(data);
        const responseObj = {
          msg: "Order success",
          ...req.body,
        };
        responseForm.success(res, responseObj, 201);
      })
      .catch((err) => {
        console.log(err);
        responseForm.error(res, err, 500);
      });
  },
};

module.exports = transactionModel;
