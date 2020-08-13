const authRouter = require("express").Router();
const authController = require("../controller/auth.controller");

authRouter.post("/", authController.register);
authRouter.get("/", authController.login);

module.exports = authRouter;