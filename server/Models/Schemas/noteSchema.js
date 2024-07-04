import mongoose, {SchemaTypes} from "mongoose";

const NoteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter the Title"],
  },
  content:{
    type:String,
  },
  userid:{
    type : SchemaTypes.ObjectId , ref:'user'  //ref is a reference to another collection in our database
  }
});

export default NoteSchema;
