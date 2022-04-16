// importing user profile context
import booking from "../model/booking";
// import { findDataService, findOneDataUser, findOneDataService, findOneDataUserWithID, findDataBookingWithID } from './queryDB';
import {findOneDataService} from './queryDB';
// import findOneDataService from './queryDB';

// console.log("booking : ", booking);

// const createBooking = async (id_service, name, user, createdAt) => {
//     console.log("createBooking started");
//     console.log(`id_service : ${id_service} name : ${name} user : ${user} createdAt : ${createdAt}`);
//     return await booking.create({
//         id_service,
//         name,
//         user,
//         createdAt
//     })
// }

// const createData = async (result_booking, result_user) => {
//     let result_final = []
//     await Promise.all(result_booking.map(async (item) => {
//         let object = {}
//         let result_service = await findOneDataService(item.id_service)
//         object["_id"] = item._id
//         object["service"] = result_service
//         object["customer"] = result_user
//         object["createdAt"] = item.createdAt
//         console.log("object in createData : ", object)
//         result_final.push(object)
//     }))
//     return result_final
// }

// export default {
//     createBooking,
//     createData
// }

export async function createBooking  (id_service:string, name:string, user:string, createdAt:string)  {
    console.log("createBooking started");
    console.log(`id_service : ${id_service} name : ${name} user : ${user} createdAt : ${createdAt}`);
    return await booking.create({
        id_service,
        name,
        user,
        createdAt
    })
}

export async function createData (result_booking:any, result_user:any){
    let result_final:any = []
    await Promise.all(result_booking.map(async (item:any) => {
        let object:any = {}
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