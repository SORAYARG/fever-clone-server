const hash = require("./hash");
const cookie = require("./cookies");
const jwt =  require("./jwt");
const mailer = require("./mailer");

const serialize = (res, payload) => {
    const token = jwt.sign(payload);
    cookie.create(res,token);
};

const deserialize = (req) => {
    const { access_token } = req.cookies;
  
    const payload = jwt.verify(access_token);
  
    if (!payload) return false;
  
    return payload;
  };
  

module.exports = {
    hash,
    cookie,
    jwt,
    mailer,
    serialize,
    deserialize,
};