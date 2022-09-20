const router = require("express").Router();
const { authorizer } = require("../../middlewares");

module.exports = (db) => {

    router.get("/get-all", authorizer, require("./get-all-events")(db));
    router.get("/get-one", authorizer, require("./get-event")(db));

    return router;
};