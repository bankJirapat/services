const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    _id: { type: String },
    name: { type: String },
    price: { type: Number },
    picture: { type: String },
    description: { type: String },
}, {
    versionKey: false
},
    {
        collection: "services"
    });

module.exports = mongoose.model("service", userSchema);