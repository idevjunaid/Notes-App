import jwt from "jsonwebtoken";
import userModel from "../Models/userModel.js";
const verifyToken = (req, res, next) => {
  let auth = req.headers["authorization"];
  let parts = auth.split(" ");
  let token = parts[1];
  req.token = token;

  try {
    jwt.verify(token, process.env.SECRET_KEY);
    req.userInfo = jwt.decode(token);
    next();
  } catch (e) {
    res.status(403).json({ token, msg: "Not authenticated" });
  }
};

const authRoute = (req, res, next) => {
  if (!req.user) {
    res.status(403).json({ msg: "Not auth" });
    return;
  }
    next();
};

const addUserToRequest = async (req, res, next) => {
  console.log("\n\n\nRequest\n\n");
  req.user = null;
  try {
    let auth = req.headers["authorization"];
    if (!auth) {
      return next();
    }
    let parts = auth.split(" ");
    let token = parts[1];
    jwt.verify(token, process.env.SECRET_KEY);
    let { username } = jwt.decode(token);
    let user = await userModel.findOne({ username: username });
    req.user = user;
  } catch (e) {
    // console.log(e);
  }
  return next();
};
export { authRoute, verifyToken, addUserToRequest };
