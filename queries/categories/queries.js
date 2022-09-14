const { sql } = require("slonik");

const selectAllCategories
 = () =>{
    return sql `
    SELECT name FROM categories
    `;
};

module.exports = {
    selectAllCategories,
}