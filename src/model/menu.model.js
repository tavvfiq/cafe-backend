const database = require("../config/config");

const moment = require("moment");

const selectQuery =
  "SELECT menu.id, menu.name, menu.image_path, menu.price, category.category, menu.added_at, menu.updated_at FROM menu JOIN category ON menu.category_id = category.id";

const menuModel = {
  getAllmenus: function (query) {
    let queryString = "";
    console.log(query.length);
    if (query.length === undefined) {
      queryString = selectQuery;
    } else {
      if(query.page ===undefined || query.limit === undefined){
        queryString = `${selectQuery} WHERE menu.name LIKE '%${query.search}%' ORDER BY menu.${query.sortby} ${query.order}`;
      } else {
        const offset = (Number(query.page) - 1) * Number(query.limit);
        queryString = `${selectQuery} WHERE menu.name LIKE '%${query.search}%' ORDER BY menu.${query.sortby} ${query.order} LIMIT ${query.limit} OFFSET ${offset}`;
      }
    }
    return new Promise((resolve, reject) => {
      // const getAllmenuQuery = `${selectQuery}`;
      database.query(queryString, (err, data) => {
        // console.log(data);
        if (!err) {
          resolve(data);
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
      const addmenuQuery =
        "INSERT INTO menu SET name=?, image_path=?, price=?, category_id=?";
      database.query(
        addmenuQuery,
        [name, image_path, price, category_id],
        (err, data) => {
          if (!err) {
            resolve(data);
          } else {
            reject(err);
          }
        }
      );
    });
  },
  deletemenu: function (id) {
    return new Promise((resolve, reject) => {
      const deletemenuQuery = `DELETE FROM menu WHERE menu.id = ${id}`;
      database.query(deletemenuQuery, (err, data) => {
        if (!err) {
          resolve(data.affectedRows);
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
      const updatemenuQuery = `UPDATE menu SET ? WHERE menu.id = ${id}`;
      database.query(
        updatemenuQuery,
        [{ ...body, updated_at }],
        (err, data) => {
          if (!err) {
            resolve(data);
          } else {
            reject(err);
          }
        }
      );
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
