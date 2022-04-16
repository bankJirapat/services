import mongoose from "mongoose";

const { MONGOURI } = process.env;
const MONGO_URI:any = process.env.MONGO_URL || MONGOURI
console.log("MONGO_URI : " + MONGO_URI);

exports.connect = () => {
    // Connecting to the database
    mongoose
        // .connect(MONGO_URI, {
        //     useNewUrlParser: true,
        //     useUnifiedTopology: true,
        //     // useCreateIndex: true,
        //     // useFindAndModify: false,
        // })
        .connect(MONGO_URI)
        .then(() => {
            console.log("Successfully connected to database");
        })
        .catch((error) => {
            console.log("database connection failed. exiting now...");
            console.error(error);
            process.exit(1);
        });
};