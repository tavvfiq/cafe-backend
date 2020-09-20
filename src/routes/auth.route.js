const authRouter = require("express").Router();
const authController = require("../controller/auth.controller");
const singleFileUpload = require("../helpers/middleware/singleFileUpload");

authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
authRouter.get("/user/:id", authController.userData);
authRouter.patch(
  "/user/:id",
  singleFileUpload.profileImageUpload,
  authController.updateUser
);

module.exports = authRouter;
