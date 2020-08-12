const formResponse = require("../helpers/form/responseForm");
const authModel = require("../model/authentication");

const authController = {
  register: (req, res) => {
    authModel
      .register(req.body)
      .then((data) => {
          const msg="Account registered";
        formResponse.success(res, msg,200);
      })
      .catch((err) => {
        formResponse.error(res, err, 500);
      });
  },
  login: (req, res) => {
    authModel
      .login(req.body)
      .then((data) => {
        formResponse.success(res, data,200);
      })
      .catch((err) => {
        formResponse.error(res, err,500);
      });
  },
};

module.exports = authController;