import mongoose from "mongoose";
function validateEmail(v) {
  let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (v.match(regex)) {
    return true;
  } else {
    return false;
  }
}
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: [validateEmail /*, Custom message */],
    // match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ /*, custom message*/]
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^[a-z0-9_]+$/i]
  },
  password: {
    type: String,
    required: true,
  },
});

export default UserSchema;
