const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    id_service: { type: String },
    name: { type: String },
    user: { type: String },
    createdAt: { type: String }
}, {
    versionKey: false
},
    {
        collection: "bookings"
    });

module.exports = mongoose.model("booking", userSchema);