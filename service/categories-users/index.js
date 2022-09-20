const router = require("express").Router();
const { authorizer } = require("../../middlewares");

module.exports = (db) => {
  router.post("/", authorizer, require("./insert")(db));

  return router;
};