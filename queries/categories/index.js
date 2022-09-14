const { selectAllCategories } = require("./queries");
const { queryCatcher } = require("../utils")

const getAllCategories = (db) => async() =>{
    return await queryCatcher(db.query, "getAllCategories")(selectAllCategories());
};
module.exports = {
    getAllCategories,
}