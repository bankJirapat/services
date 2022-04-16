// importing user profile context
import userProfile from "../model/user_profile";
import service from "../model/service";
import booking from "../model/booking";

// const findDataService = async () => {
//     return await service.find();
// }

// const findOneDataUser = async (data: string) => {
//     return await userProfile.findOne({ username: data })
// }

// const findOneDataService = async (id:string ) => {
//     return await service.findOne({ _id: id })
// }

// const findOneDataUserWithID = async (id:string) => {
//     return await userProfile.findOne({ _id: id })
// }

// const findDataBookingWithID = async (data:any) => {
//     console.log("data: ", data)
//     let result
//     let array:any = []
//     let result_booking = await booking.find({})
//     console.log("result_booking in findDataBookingWithID: ", result_booking)
//     if (result_booking.length > 0) {
//         console.log("result_booking.length > 0")
//         result_booking.map((item) => {
//             console.log("item : ", item)
//             if (item.user == data.username) {
//                 array.push(item)
//             }
//         })
//         result = array
//     } else {
//         result = []
//     }
//     return result
// }

// export default {
//     findDataService,
//     findOneDataUser,
//     findOneDataService,
//     findOneDataUserWithID,
//     findDataBookingWithID
// }

export async function findDataService() {
    return await service.find();
}

export async function findOneDataUser (data: string)  {
    return await userProfile.findOne({ username: data })
}

export async function findOneDataService  (id:string ) {
    return await service.findOne({ _id: id })
}

export async function findOneDataUserWithID  (id:string)  {
    return await userProfile.findOne({ _id: id })
}

export async function findDataBookingWithID  (data:any)  {
    console.log("data: ", data)
    let result
    let array:any = []
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