const database = require("../config/config");

const historyQuery = `SELECT history.invoice, history.cashier, history.order_date, product.name AS product_name, product_order_history.quantity AS product_quantity, history.amount AS total_amount FROM history JOIN product_order_history ON product_order_history.invoice = history.invoice JOIN product ON product_order_history.product_id = product.id`;
const historyModel = {
    showAllHistory: function () {
        return new Promise((resolve, reject) => {
            const showAllQuery = historyQuery;
            database.query(showAllQuery, (err, data) => {
                if (!err) {
                    resolve(data);
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
                    resolve(data);
                } else {
                    reject(err);
                }
            });
        });
    },
    addTransaction: function (body) {
        const {
            invoice,
            cashier,
            order_product,
            amount
        } = body;
        return new Promise((resolve, reject) => {
            const startTrans = "START TRANSACTION;";
            const midQuery = `INSERT INTO history SET invoice=?, cashier=?, amount=?;`;
            const lastQuery = `INSERT INTO product_order_history (product_id, invoice, quantity) VALUES ?;`;
            const commitTrans = "COMMIT;";
            const allQuery = startTrans + midQuery + lastQuery + commitTrans;
            let arrayOfOrder = order_product.map((element) => {
                return [element.product_id, invoice, element.quantity];
            });
            database.query(allQuery, [invoice, cashier, amount, arrayOfOrder], (err,data)=>{
                if(!err){
                    resolve(data);
                } else {
                    reject(err);
                }
            });
        });
    }
}

module.exports = historyModel;