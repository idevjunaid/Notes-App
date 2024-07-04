import mongoose from "mongoose";
import NoteSchema from "./Schemas/noteSchema.js";


const NoteModel = new mongoose.model("Note",NoteSchema);






export default NoteModel;