import mongoose from "mongoose";
import UserSchema from "./Schemas/userSchemas.js";


const userModel = mongoose.model('user',UserSchema);




export default userModel