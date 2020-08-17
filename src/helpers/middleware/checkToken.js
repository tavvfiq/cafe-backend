const responseForm = require("../form/responseForm");
const jwt = require("jsonwebtoken");
const _ = require("underscore");

const checkToken = (req, res, next) => {
  const bearerToken = req.header("x-access-token");
  if (_.isEmpty(bearerToken)) {
    responseForm.error(res,"please login first",400);
  }
  try {
    const token = bearerToken.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    // console.log(decodedToken);
    req.decodedToken = decodedToken;
    next();
  } catch (e) {
    responseForm.error(res,e,500);
  }
};

module.exports = checkToken;
