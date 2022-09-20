const { insertCategoriesUser } = require("../../queries/categories-users");
const errors = require("../../errors/commons");

module.exports = (db) => async (req, res, next) => {
    const { email } = res.locals;
    const categoriesUser = req.body
    console.log("categories user:", categoriesUser)
    const queryResult = await insertCategoriesUser(db)({ email, categoriesUser});

    if (!queryResult.ok) return next(errors[500]);

    res.status(200).json({
        success: true,
        data: queryResult.data
    });
}