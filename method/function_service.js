// importing user profile context
const service = require("../model/service");
console.log("service : ", service);

const createService = async (_id, name, price, picture, description) => {
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

module.exports = {
    createService
}