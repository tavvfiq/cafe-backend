const express = require("express");

const menuController = require("../controller/menu");

const {menuMiddleware, historyMiddleware, transactionMiddleware} = require("../helpers/middleware/middleware");

const menuRouter = express.Router();

//get all menu available
menuRouter.get("/", menuMiddleware, menuController.getAllmenus);
//add menu
menuRouter.post("/", menuMiddleware, menuController.addmenu);
//delete menu
menuRouter.delete("/:id", menuMiddleware, menuController.deletemenu);
//update menu
menuRouter.patch("/:id", menuMiddleware, menuController.updateExistingmenu);
//sort menu by
menuRouter.get("/sort", menuMiddleware, menuController.sortmenuBy);
//get menu by name
menuRouter.get("/search", menuMiddleware, menuController.searchmenuByName);
//get menu name
menuRouter.get("/filter",menuMiddleware, menuController.filterMenu);

module.exports = menuRouter;