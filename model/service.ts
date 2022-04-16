import {model,Schema,Model,Document} from "mongoose";

interface Iservice extends Document {
    _id: string;
    name: string;
    price: string;
    picture: string;
    description: string;
}

const userSchema:Schema = new Schema({
    _id: { type: String },
    name: { type: String },
    price: { type: Number },
    picture: { type: String },
    description: { type: String },
},
{
    collection: "services"
});

const service: Model<Iservice> = model("service", userSchema);
export default service;