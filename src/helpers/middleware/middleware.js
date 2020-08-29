const responseForm = require("../form/responseForm");
const _ = require("underscore");

const menuMiddleware = (req, res, next) => {
  const requestPath = req.route.path;
  const requestMethod = req.method;
  const queryIsEmpty = _.isEmpty(req.query);
  const paramIsEmpty = _.isEmpty(req.params);
  const bodyIsEmpty = _.isEmpty(req.body);

  console.log(requestPath);

  if (
    requestMethod === "GET" &&
    (requestPath === "/" ||
      requestPath === "/:id" ||
      requestPath === "/sort" ||
      requestPath === "/search" ||
      requestPath === "/filter" ||
      requestPath === "/pagination")
  ) {
    if (requestPath !== "/" && (queryIsEmpty && paramIsEmpty)) {
      const errorMsg = "Error 400: Bad request";
      const status = 400;
      responseForm.error(res, errorMsg, status);
    } else {
      next();
    }
  } else if (requestMethod === "DELETE" && requestPath === "/:id") {
    if (paramIsEmpty) {
      const errorMsg = "Error 400: Bad request";
      const status = 400;
      responseForm.error(res, errorMsg, status);
    } else {
      next();
    }
  } else if (requestMethod === "POST" && requestPath === "/") {
    if (bodyIsEmpty) {
      const errorMsg = "Error 400: Bad request";
      const status = 400;
      responseForm.error(res, errorMsg, status);
    } else {
      next();
    }
  } else if (requestMethod === "PATCH" && requestPath === "/:id") {
    if (bodyIsEmpty && paramIsEmpty) {
      const errorMsg = "Error 400: Bad request";
      const status = 400;
      responseForm.error(res, errorMsg, status);
    } else {
      next();
    }
  } else {
    const errorMsg = "Error 400: Bad request";
    const status = 400;
    responseForm.error(res, errorMsg, status);
  }
};

const historyMiddleware = (req, res, next) => {};

const transactionMiddleware = (req, res, next) => {};

module.exports = {
  menuMiddleware,
  historyMiddleware,
  transactionMiddleware,
};
