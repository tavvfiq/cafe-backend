const express = require("express");

const menuController = require("../controller/menu.controller");

const {menuMiddleware, historyMiddleware, transactionMiddleware} = require("../helpers/middleware/middleware");

const checkToken = require("../helpers/middleware/checkToken");

const singleFileUpload=require("../helpers/middleware/singleFileUpload");

const menuRouter = express.Router();


//get all menu available
menuRouter.get("/", menuMiddleware, menuController.getAllmenus);
//add menu
menuRouter.post("/", checkToken.isMaintainer, singleFileUpload.singleUpload, menuMiddleware, menuController.addmenu);

menuRouter.get("/pagination",menuMiddleware, menuController.pagination);
//delete menu
menuRouter.delete("/:id", checkToken.isMaintainer,menuMiddleware, menuController.deletemenu);
//update menu
menuRouter.patch("/:id", checkToken.isMaintainer, singleFileUpload.singleUpload, menuMiddleware, menuController.updateExistingmenu);
//sort menu by
menuRouter.get("/sort", menuMiddleware, menuController.sortmenuBy);
//get menu by name
menuRouter.get("/search", menuMiddleware, menuController.searchmenuByName);
//get menu name
menuRouter.get("/filter",menuMiddleware, menuController.filterMenu);

module.exports = menuRouter;