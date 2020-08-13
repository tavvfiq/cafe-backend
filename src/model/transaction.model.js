const database = require("../config/config");

const moment = require("moment");

const transactionModel = {
    addTransaction: function (body) {
        const {
            invoice,
            cashier,
            order_menu,
            amount
        } = body;
        return new Promise((resolve, reject) => {
            const startTrans = "START TRANSACTION;";
            const firstQuery = "INSERT INTO history SET invoice=?, cashier=?, amount=?;";
            const lastQuery = "INSERT INTO menu_order_history (menu_id, invoice, quantity) VALUES ?;";
            const commitTrans = "COMMIT;";
            const allQuery = startTrans + firstQuery + lastQuery + commitTrans;
            let arrayOfOrder = order_menu.map((element) => {
                return [element.menu_id, invoice, element.quantity];
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

module.exports = transactionModel;