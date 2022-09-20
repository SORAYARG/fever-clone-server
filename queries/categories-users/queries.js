const { sql } = require("slonik");

const InsertCategoriesUser
 = () =>{
    return sql `
          INSERT INTO categories_users (
            category_id, user_id
          ) VALUES (
            ${category_id}, ${user_id}
          );
        `;
};

// const selectAllCategoriesUser
//  = () =>{
//     return sql `
//     SELECT id FROM categories_user 
//     `;
// };

module.exports = {
    InsertCategoriesUser,
    // selectAllCategoriesUser
};