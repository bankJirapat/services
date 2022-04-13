// importing user profile context
const userProfile = require("../model/user_profile");
const service = require("../model/service");
const booking = require("../model/booking");

const findDataService = async () => {
    return await service.find();
}

const findOneDataUser = async (data) => {
    return await userProfile.findOne({ username: data })
}

const findOneDataService = async (id) => {
    return await service.findOne({ _id: id })
}

const findOneDataUserWithID = async (id) => {
    return await userProfile.findOne({ _id: id })
}

const findDataBookingWithID = async (data) => {
    console.log("data: ", data)
    let result
    let array = []
    let result_booking = await booking.find({})
    console.log("result_booking in findDataBookingWithID: ", result_booking)
    if (result_booking.length > 0) {
        console.log("result_booking.length > 0")
        result_booking.map((item) => {
            console.log("item : ", item)
            if (item.user == data.username) {
                array.push(item)
            }
        })
        result = array
    } else {
        result = []
    }
    return result
}

module.exports = {
    findDataService,
    findOneDataUser,
    findOneDataService,
    findOneDataUserWithID,
    findDataBookingWithID
}