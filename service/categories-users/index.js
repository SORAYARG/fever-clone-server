const router = require("express").Router();
const { authorizer } = require("../../middlewares");

module.exports = (db) => {
  router.post("/insert", authorizer, require("./insert")(db));
  router.get("/get-all", authorizer, require("./get-all")(db));

  return router;
};