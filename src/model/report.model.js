const database = require("../config/config");

const historyQuery = `SELECT history.invoice, history.cashier, history.customer_id, history.order_date, menu.name AS menu_name, menu.image_path, menu_order_history.quantity AS menu_quantity, history.amount AS total_amount FROM history JOIN menu_order_history ON menu_order_history.invoice = history.invoice JOIN menu ON menu_order_history.menu_id = menu.id JOIN users ON users.id = history.customer_id`;
const historyModel = {
  alignHelper: function (data) {
    let arrayOfOrder = [[]];
    let objRes = [];
    let lastElement = {};
    let orderIdx = 0;
    let dataLength = data.length;
    for (let i = 0; i < dataLength; i++) {
      if (i === 0) {
        arrayOfOrder[orderIdx].push({
          menu_name: data[i].menu_name,
          image: data[i].image_path,
          menu_quantity: data[i].menu_quantity,
        });
        lastElement = data[i];
      } else if (data[i].invoice !== lastElement.invoice) {
        objRes[orderIdx] = [];
        objRes[orderIdx] = {
          invoice: lastElement.invoice,
          cashier: lastElement.cashier,
          order_date: lastElement.order_date,
          menu_order: arrayOfOrder[orderIdx],
          total_amount: lastElement.total_amount,
        };
        orderIdx++;
        arrayOfOrder[orderIdx] = [];
        arrayOfOrder[orderIdx].push({
          menu_name: data[i].menu_name,
          image: data[i].image_path,
          menu_quantity: data[i].menu_quantity,
        });
        lastElement = data[i];
      } else {
        arrayOfOrder[orderIdx].push({
          menu_name: data[i].menu_name,
          image: data[i].image_path,
          menu_quantity: data[i].menu_quantity,
        });
        lastElement = data[i];
      }
      if (i === dataLength - 1) {
        objRes[orderIdx] = {};
        objRes[orderIdx] = {
          invoice: lastElement.invoice,
          cashier: lastElement.cashier,
          order_date: lastElement.order_date,
          menu_order: arrayOfOrder[orderIdx],
          total_amount: lastElement.total_amount,
        };
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
  },
  showHistoryById: function (id) {
    return new Promise((resolve, reject) => {
      console.log(id);
      const queryByInvoice = `${historyQuery} WHERE history.customer_id = ${id}`;
      database.query(queryByInvoice, (err, data) => {
        if (!err) {
          const objRes = this.alignHelper(data);
          resolve(objRes);
        } else {
          reject(err);
        }
      });
    });
  },
};

module.exports = historyModel;
