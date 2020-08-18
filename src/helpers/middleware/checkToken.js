const responseForm = require("../form/responseForm");
const jwt = require("jsonwebtoken");
const _ = require("underscore");

const checkToken = {
  isCashier: (req, res, next) => {
    const bearerToken = req.header("x-access-token");
    if (_.isEmpty(bearerToken)) {
      responseForm.error(res, "please login first", 400);
    }
    try {
      const token = bearerToken.split(" ")[1];
      const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
      if (Number(decodedToken.level_id) > 1) {
        req.decodedToken = decodedToken;
        next();
      } else {
        responseForm.error(res, "Forbidden", 500);
      }
      // console.log(decodedToken);
    } catch (e) {
      responseForm.error(res, e, 500);
    }
  },
  isMaintainer: (req, res, next) => {
    const bearerToken = req.header("x-access-token");
    if (_.isEmpty(bearerToken)) {
      responseForm.error(res, "please login first", 400);
    }
    try {
      const token = bearerToken.split(" ")[1];
      const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
      // console.log(decodedToken);
      if (Number(decodedToken.level_id) === 4) {
        req.decodedToken = decodedToken;
        next();
      } else {
        responseForm.error(res, "Forbidden", 500);
      }
    } catch (e) {
      responseForm.error(res, e, 500);
    }
  },
};

module.exports = checkToken;
