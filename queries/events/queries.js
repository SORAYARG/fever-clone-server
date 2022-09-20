const { sql } = require("slonik");

const selectAllEvents
 = () =>{
    return sql `
    SELECT image, name, price FROM events

    `;
};

const selectOneEvent = () =>{
        return sql `
        SELECT image, name, date, price, description, address FROM events 
        `
};

module.exports = {
    selectAllEvents,
    selectOneEvent,
}