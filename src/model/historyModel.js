const database = require("../config/config");

const historyQuery = `SELECT history.invoice, history.cashier, history.order_date, product.name AS product_name, product_order_history.quantity AS product_quantity, history.amount AS total_amount FROM history JOIN product_order_history ON product_order_history.invoice = history.invoice JOIN product ON product_order_history.product_id = product.id`;
const historyModel = {
    alignHelper: function (data) {
        let arrayOfOrder = [
            []
        ];
        let objRes = [];
        let lastElement = {};
        let orderIdx = 0;
        let dataLength = data.length;
        for (let i = 0; i < dataLength; i++) {
            if (i === 0) {
                arrayOfOrder[orderIdx].push({
                    product_name: data[i].product_name,
                    product_quantity: data[i].product_quantity
                });
                lastElement = data[i];
            } else if (data[i].invoice !== lastElement.invoice) {
                objRes[orderIdx] = [];
                objRes[orderIdx].push({
                    invoice: lastElement.invoice,
                    cashier: lastElement.cashier,
                    order_date: lastElement.order_date,
                    product_order: arrayOfOrder[orderIdx],
                    total_amount: lastElement.total_amount
                });
                orderIdx++;
                arrayOfOrder[orderIdx] = [];
                arrayOfOrder[orderIdx].push({
                    product_name: data[i].product_name,
                    product_quantity: data[i].product_quantity
                });
                lastElement = data[i];
            } else {
                arrayOfOrder[orderIdx].push({
                    product_name: data[i].product_name,
                    product_quantity: data[i].product_quantity
                });
                lastElement = data[i];
            }
            if (i === dataLength - 1) {
                objRes[orderIdx] = [];
                objRes[orderIdx].push({
                    invoice: lastElement.invoice,
                    cashier: lastElement.cashier,
                    order_date: lastElement.order_date,
                    product_order: arrayOfOrder[orderIdx],
                    total_amount: lastElement.total_amount
                });
            }
        }
        return objRes;
    },
    showAllHistory: function () {
        return new Promise((resolve, reject) => {
            const showAllQuery = historyQuery;
            database.query(showAllQuery, (err, data) => {
                if (!err) {
                    const objRes = this.alignHelper(data);
                    resolve(objRes);
                } else {
                    reject(err);
                }
            });
        });
    },
    showHistoryByInvoice: function (invoice) {
        return new Promise((resolve, reject) => {
            const queryByInvoice = `${historyQuery} WHERE history.invoice = ${invoice}`;
            database.query(queryByInvoice, (err, data) => {
                if (!err) {
                    const objRes = this.alignHelper(data);
                    resolve(objRes);
                } else {
                    reject(err);
                }
            });
        });
    }
}

module.exports = historyModel;