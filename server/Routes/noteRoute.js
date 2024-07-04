import { Router } from "express";
import NoteModel from "../Models/noteModel.js";
import { authRoute } from "../Middleware/auth.js";
import mongoose, { ObjectId } from "mongoose";

const router = Router();


router.post("/create", authRoute, async (req, res) => {
  let data = req.body;
  // res.send("dat")
  // return ;
  try {
    let newNote = new NoteModel({
      title: data["title"],
      content: data["content"],
      userid: new mongoose.Types.ObjectId(req.user._id),
    });
    await newNote.save();
    console.log("New Note");
    res.json({ msg: "Note created successfully" });
  } catch (err) {
    res.status(500).Json({msg:"Note cannot be created"});
  }
});

router.get("/populate", async (req, res)=>{
  // 651eaa5bda39745f6fafa947
  // 651eaa5bda39745f6fafa949
  let uids = ["651eaa5bda39745f6fafa949", "651eaa5bda39745f6fafa947"];
  await NoteModel.deleteMany({});
  for (let i = 0; i < 100; i++) {
    let newNote = new NoteModel({
      title: `Note - ${i}`,
      content: "loremipsum dolalasfkl aslkdfjlaks ",
      userid: new mongoose.Types.ObjectId(Math.random()>0.5?uids[0]:uids[1]),
    });
    await newNote.save();
    console.log("New Note");
  }
  res.send("i");
});

router.put("/:id/update", authRoute, async (req, res) => {
  let data = req.body;
  let noteid = new mongoose.Types.ObjectId(req.params.id);
  let note = await NoteModel.findOne({ _id: noteid });
  if (note.userid.equals(req.user._id)) {
    try {
      await NoteModel.updateOne({_id:noteid},{
        $set:{
          "title": data["title"],
          "content":data["content"]
        }
      })
      res.send('Note updated successfully');
    } catch (err) {
      res.json({ msg: "Note cannot be updated" });
    }
  }else{
    res.status(403).send("Not authorize for edit the note");
  }
});

router.get("/:id", async (req, res) => {

  const id = new mongoose.Types.ObjectId(req.params.id);
  try {
    let note = await NoteModel.findOne({_id:id});
    res.json(note);
  }
  catch(err){
    console.log(err)
    res.status(403).json({msg: "Note not available"});
  }
});

router.get("/", async (req, res) => {

  let notes = await NoteModel.find({ userid: req.user._id });
  res.json(notes);
  // res.send("All notes");
});

router.delete("/:id/delete", authRoute, async (req, res) => {
  //check author is current user
  let noteId=new  mongoose.Types.ObjectId(req.params.id);
  let authuserid  = req.user._id
  let note = await NoteModel.findOne({_id : noteId});
  if(note.userid.equals(authuserid)){
    try{
      await NoteModel.findOneAndRemove({_id: noteId});
      res.json({msg:" Note Deleted Successfully"})
    }catch(e){
      res.send("error")
    }
  }else{
    res.status(403).json({msg:"user is not authorized to delete this note"})
  }

});

export default router;
