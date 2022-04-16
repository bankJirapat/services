// importing user profile context
import service from "../model/service";
console.log("service : ", service);

// const createService = async (_id:string, name:string, price:number, picture:string, description:string) => {
//     console.log("createService started");
//     console.log(`_id : ${_id} name : ${name} price : ${price} picture : ${picture} description : ${description}`);
//     return await service.create({
//         _id,
//         name,
//         price,
//         picture,
//         description
//     })
// }

// export default {
//     createService
// }

export async function createService  (_id:string, name:string, price:number, picture:string, description:string) {
    console.log("createService started");
    console.log(`_id : ${_id} name : ${name} price : ${price} picture : ${picture} description : ${description}`);
    return await service.create({
        _id,
        name,
        price,
        picture,
        description
    })
}