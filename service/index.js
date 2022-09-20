const router = require("express").Router();

module.exports = (db) => {
  router.use("/auth", require("./auth")(db));
  router.use("/user", require("./user")(db));
  router.use("/categories", require("./categories")(db));
  router.use("/events", require("./events")(db));
  router.use("/categories-users", require("./categories-users")(db));
  return router;
};
