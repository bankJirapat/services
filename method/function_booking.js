// importing user profile context
const booking = require("../model/booking");
const { findDataService, findOneDataUser, findOneDataService, findOneDataUserWithID, findDataBookingWithID } = require('./queryDB');
console.log("booking : ", booking);

const createBooking = async (id_service, name, user, createdAt) => {
    console.log("createBooking started");
    console.log(`id_service : ${id_service} name : ${name} user : ${user} createdAt : ${createdAt}`);
    return await booking.create({
        id_service,
        name,
        user,
        createdAt
    })
}

const createData = async (result_booking, result_user) => {
    let result_final = []
    await Promise.all(result_booking.map(async (item) => {
        let object = {}
        let result_service = await findOneDataService(item.id_service)
        object["_id"] = item._id
        object["service"] = result_service
        object["customer"] = result_user
        object["createdAt"] = item.createdAt
        console.log("object in createData : ", object)
        result_final.push(object)
    }))
    return result_final
}

module.exports = {
    createBooking,
    createData
}