const authRouter = require("express").Router();
const authController = require("../controller/auth.controller");

authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
authRouter.post("/user",authController.userData);

module.exports = authRouter;