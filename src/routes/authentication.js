const authRouter = require("express").Router();
const authController = require("../controller/authentication");

authRouter.post("/", authController.register);
authRouter.get("/", authController.login);

module.exports = authRouter;