const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullName: { type: String },
    username: { type: String },
    password: { type: String },
}, {
    versionKey: false
},
    {
        collection: "user_profiles"
    });

module.exports = mongoose.model("user_profile", userSchema);