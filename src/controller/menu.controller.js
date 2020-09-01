const menuModel = require("../model/menu.model");
const responseForm = require("../helpers/form/responseForm");

const menuController = {
  getAllmenus: function (req, res) {
    menuModel
      .getAllmenus(req.query)
      .then((menu) => {
        responseForm.pagination(req.query, res, { menu }, 200);
      })
      .catch((err) => {
        responseForm.error(res, err, 500);
      });
  },
  getMenuById: function (req, res) {
    menuModel
      .getMenuById(req.params.id)
      .then((menu) => {
        responseForm.menuResponse(res, menu, 200);
      })
      .catch((err) => {
        responseForm.error(res, err, 500);
      });
  },
  sortmenuBy: function (req, res) {
    menuModel
      .sortmenuBy(req.query)
      .then((menu) => {
        responseForm.menuResponse(res, menu, 200);
      })
      .catch((err) => {
        responseForm.error(res, err, 500);
      });
  },
  searchmenuByName: function (req, res) {
    menuModel
      .searchmenuByName(req.query.name)
      .then((menu) => {
        responseForm.menuResponse(res, menu, 200);
      })
      .catch((err) => {
        responseForm.error(res, err, 500);
      });
  },
  addmenu: function (req, res) {
    menuModel
      .addmenu(req.body)
      .then((menu) => {
        responseForm.menuResponse(res, menu, 201);
      })
      .catch((err) => {
        responseForm.error(res, err, 500);
      });
  },
  deletemenu: function (req, res) {
    menuModel
      .deletemenu(req.params.id)
      .then((menu) => {
          responseForm.menuResponse(
            res,
            menu,
            200
          );
      })
      .catch((err) => {
        responseForm.error(res, err, 500);
      });
  },
  updateExistingmenu: function (req, res) {
    menuModel
      .updateExistingmenu(req.params.id, req.body)
      .then((menu) => {
        responseForm.menuResponse(res, menu, 201);
      })
      .catch((err) => {
        responseForm.error(res, err, 500);
      });
  },
  filterMenu: function (req, res) {
    menuModel
      .filterMenu(req.query)
      .then((menu) => {
        responseForm.menuResponse(res, menu, 200);
      })
      .catch((err) => {
        responseForm.error(res, err, 500);
      });
  },
  pagination: function (req, res) {
    menuModel
      .pagination(req.query)
      .then((data) => {
        responseForm.pagination(req.query, res, data, 200);
      })
      .catch((err) => {
        responseForm.error(res, err, 500);
      });
  },
};

module.exports = menuController;
