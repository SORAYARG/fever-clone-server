const { deserialize } = require("../../fever-clone-server/utils");
const errors = require("../../fever-clone-server/errors/commons");

module.exports = (req, res, next) => {
  const payload = deserialize(req);

  if (!payload) return next(errors[401]);

  res.locals = { ...payload };

  next();
};