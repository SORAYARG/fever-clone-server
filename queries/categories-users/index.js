const { InsertCategoriesUser  } = require("./queries");
const { queryCatcher } = require("../utils")

const CreateCategoriesUser = (db) => async() =>{
    return await queryCatcher(db.query, "CreateCategoriesUser")(InsertCategoriesUser());
    
};

module.exports = {
    CreateCategoriesUser,
}