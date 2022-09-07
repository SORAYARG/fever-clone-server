const { generic } = require("../../fever-clone-server/errors/auth");

module.exports = (...fields) => (req, res, next) =>{
    for(const field of fields) {
        if(!req.body[field]) return next(generic["empty"])
    }
    next();
};
