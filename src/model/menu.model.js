const database = require("../config/config");

const moment = require("moment");

const _ = require("underscore");
const { isEmpty } = require("underscore");

const selectQuery =
  "SELECT menu.id, menu.name, menu.image_path, menu.price, menu.quantity, category.category, menu.added_at, menu.updated_at FROM menu JOIN category ON menu.category_id = category.id";

const menuModel = {
  getAllmenus: function (query) {
    let queryString = "";
    if (_.isEmpty(query)) {
      queryString = selectQuery;
    } else {
      if (
        query.page === undefined ||
        (query.limit === undefined && query.filter === undefined)
      ) {
        queryString =
          selectQuery +
          " WHERE menu.name LIKE '%" +
          query.search +
          "%' ORDER BY menu." +
          query.sortby +
          " " +
          query.order;
      } else if (query.filter === undefined) {
        const offset = (Number(query.page) - 1) * Number(query.limit);
        queryString =
          selectQuery +
          " WHERE menu.name LIKE '%" +
          query.search +
          "%' ORDER BY menu." +
          query.sortby +
          " " +
          query.order +
          " LIMIT " +
          query.limit +
          " OFFSET " +
          offset.toString();
      } else {
        const offset = (Number(query.page) - 1) * Number(query.limit);
        queryString =
          selectQuery +
          " WHERE menu.name LIKE '%" +
          query.search +
          "%' " +
          "AND category_id=" +
          query.filter +
          " ORDER BY menu." +
          query.sortby +
          " " +
          query.order +
          " LIMIT " +
          query.limit +
          " OFFSET " +
          offset.toString();
      }
    }
    return new Promise((resolve, reject) => {
      database.query(queryString, (err, data) => {
        if (!err) {
          resolve(data);
        } else {
          reject(err);
        }
      });
    });
  },
  getMenuById: function (id) {
    return new Promise((resolve, reject) => {
      const query = "SELECT name FROM menu WHERE id=?";
      database.query(query, id, (err, data) => {
        if (!err) {
          if (_.isEmpty(data)) {
            resolve({ msg: "id not found" });
          } else {
            resolve({ msg: data[0].name });
          }
        } else {
          reject(err);
        }
      });
    });
  },
  sortmenuBy: function (query) {
    const sortBy = query.by;
    const sortOrder = query.order;
    return new Promise((resolve, reject) => {
      const sortmenuQuery = `${selectQuery} ORDER BY menu.${sortBy} ${sortOrder}`;
      database.query(sortmenuQuery, (err, data) => {
        if (!err) {
          resolve(data);
        } else {
          reject(err);
        }
      });
    });
  },
  searchmenuByName: function (name) {
    return new Promise((resolve, reject) => {
      const searchmenuByNameQuery = `${selectQuery} WHERE menu.name LIKE '%${name}%'`;
      database.query(searchmenuByNameQuery, (err, data) => {
        if (!err) {
          resolve(data);
        } else {
          reject(err);
        }
      });
    });
  },
  addmenu: function (body) {
    const { name, image_path, price, category_id } = body;
    return new Promise((resolve, reject) => {
      const startTrans = "START TRANSACTION;";
      const firstQuery =
        "INSERT INTO menu SET name=?, image_path=?, price=?, category_id=?;";
      const lastQuery = selectQuery + ";";
      const commitTrans = "COMMIT;";
      const allQuery = startTrans + firstQuery + lastQuery + commitTrans;
      database.query(
        allQuery,
        [name, image_path, price, category_id],
        (err, data) => {
          if (!err) {
            resolve(data[2]);
          } else {
            reject(err);
          }
        }
      );
    });
  },
  deletemenu: function (id) {
    return new Promise((resolve, reject) => {
      const startTrans = "START TRANSACTION;";
      const firstQuery = `DELETE FROM menu WHERE menu.id = ${id};`;
      const lastQuery = selectQuery + ";";
      const commitTrans = "COMMIT;";
      const allQuery = startTrans + firstQuery + lastQuery + commitTrans;
      database.query(allQuery, (err, data) => {
        if (!err) {
          resolve(data[2]);
        } else {
          reject(err);
        }
      });
    });
  },
  updateExistingmenu: function (id, body) {
    // console.log(body);
    return new Promise((resolve, reject) => {
      const updated_at = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
      const startTrans = "START TRANSACTION;";
      const firstQuery = `UPDATE menu SET ? WHERE menu.id = ${id};`;
      const lastQuery = selectQuery + ";";
      const commitTrans = "COMMIT;";
      const allQuery = startTrans + firstQuery + lastQuery + commitTrans;
      database.query(allQuery, [{ ...body, updated_at }], (err, data) => {
        if (!err) {
          resolve(data[2]);
        } else {
          reject(err);
        }
      });
    });
  },
  filterMenu: function (query) {
    return new Promise((resolve, reject) => {
      const filterQuery = `${selectQuery} WHERE menu.name LIKE '%${query.name}%' ORDER BY menu.${query.by} ${query.order}`;
      database.query(filterQuery, (err, data) => {
        if (!err) {
          resolve(data);
        } else {
          reject(err);
        }
      });
    });
  },
  pagination: function (query) {
    return new Promise((resolve, reject) => {
      const offset = (Number(query.page) - 1) * Number(query.limit);
      console.log(query);
      const paginationQuery = `${selectQuery} LIMIT ${query.limit} OFFSET ${offset}`;
      database.query(paginationQuery, (err, data) => {
        if (!err) {
          resolve(data);
        } else {
          reject(err);
        }
      });
    });
  },
};

module.exports = menuModel;
