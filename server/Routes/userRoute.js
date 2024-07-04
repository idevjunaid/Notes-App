import { Router, json } from "express";
import userModel from "../Models/userModel.js";
import jwt from "jsonwebtoken";

const router = Router();

router.get('/', async(req, res)=>{
  res.json({user: req.user});
})

router.post("/register", async (req, res) => {
  let data = req.body;
  try {
    let newUser = new userModel({
      username: data["username"],
      email: data["email"],
      password: data["password"],
    });
    await newUser.save();
    console.log("new User");

    res.json({ msg: "success" });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
});

router.get("/populate", async (req, res) => {
  for (let i = 0; i < 10; i++) {
    let newUser = new userModel({
      username: `user${i}`,
      email: `user${i}@gmail.com`,
      password: 'admin',
    });
    newUser.populate('username');
    await newUser.save();
    console.log("i", i);
  }
  res.send("i");
})

router.post("/login", async (req, res) => {
  let data = req.body;
  try {
    let result = await userModel.findOne({ username: data["username"] });
    if (!result) {
      return res.status(401).json({ msg: "User not found", name: "username" });
    }
    if (result["password"] === data["password"]) {
      let payload = JSON.parse(JSON.stringify(result));
      let token = jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: "1h",
      });
      res.json({ token });
    } else {
      return res
        .status(401)
        .json({ msg: "Password not correct", name: "password" });
    }
  } catch (err) {
    res.status(401).json({ msg: err.message, name: "form" });
  }
});

export default router;
