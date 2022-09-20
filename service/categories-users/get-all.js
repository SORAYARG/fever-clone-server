const { getAllCategoriesUser } = require("../../queries/categories-users");
const errors = require("../../errors/commons")

module.exports = (db) => async (req, res, next) => {

    const queryResult = await getAllCategoriesUser(db)();

    console.log(queryResult)
    if (!queryResult.ok) return next(errors[500]); 
    
    res.status(200).json({
        success: true,
        data:queryResult.data
      });
}