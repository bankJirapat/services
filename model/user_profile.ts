import {model,Schema,Model,Document} from "mongoose";

interface Iuser extends Document {
    fullName: string;
    username: string;
    password: string;
}

const userSchema: Schema = new Schema({
    fullName: { type: String },
    username: { type: String },
    password: { type: String },
},
{
    collection: "user_profiles"
});

const user_profile: Model<Iuser> = model("user_profile", userSchema);
export default user_profile;