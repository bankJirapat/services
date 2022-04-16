import {model,Schema,Model,Document} from "mongoose";

interface Ibook extends Document {
    id_service: string;
    name: string;
    user: string;
    createdAt: string;
}

const userSchema: Schema= new Schema({
    id_service: { type: String },
    name: { type: String },
    user: { type: String },
    createdAt: { type: String }
},
{ 
    collection: "bookings"
});

const booking: Model<Ibook> =model("booking", userSchema);
export default booking;