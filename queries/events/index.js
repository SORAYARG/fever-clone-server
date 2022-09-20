const { selectAllEvents, selectOneEvent } = require("./queries");
const { queryCatcher } = require("../utils")

const getAllEvents = (db) => async() =>{
    return await queryCatcher(db.query, "getAllEvents")(selectAllEvents());
    
};
const getOneEvent = (db) => async() =>{
    return await queryCatcher(db.query, "getOneEvent")(selectOneEvent());
};
module.exports = {
    getAllEvents,
    getOneEvent,
}