const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

router.post("/register", async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    if (!username || !password || !email) {
      return res
        .status(400)
        .json({ error: "no username or password recieved" });
    }
    if (password.length < 8) {
        return res
          .status(400)
          .json({ error: "password must have a minimum of 8 characters" });
    }
    const existeduser = await User.findOne({ $or: [{email: email}, {username: username}] });
    if (existeduser) {
      return res.status(400).json({ error: "username or email already exist" });
    }
    const passwordhash = await bcrypt.hash(password, 10);
    const newuser = new User({ username, email, role, password: passwordhash });
    const saveduser = await newuser.save();
    res.json({ message: "user registered successfully" });
  } catch (error) {
    return res.status(500).json({ error: "server error" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "no username or password recieved" });
    }
    const existeduser = await User.findOne({ email: email });
    if (!existeduser) {
      return res.status(400).json({ error: "user does not exit" });
    }
    const hashedpassword = existeduser.password;
    const passwordcompare = await bcrypt.compare(password, hashedpassword);
    if (passwordcompare) {
      const token = await jwt.sign(
        { id: existeduser._id, username: existeduser.username, role: existeduser.role },
        process.env.JWT_SECRET
      );
      res.cookie("jwt", token);
      res.json({ message: "correct credentials" });
    } else {
      return res
        .status(400)
        .json({ error: "username or password is not correct" });
    }
  } catch (error) {
    return res.status(500).json({ error: "server error" });
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("jwt");
  res.json({ message: "logout" });
});

router.get("/loggedin", (req, res) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      res.json({ loggedin: false });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //console.log(decoded)
    res.json({ loggedin: true, id: decoded.id, username: decoded.username, role: decoded.role });
  } catch (error) {
    res.json({ loggedin: false });
  }
});

router.get("/all", auth, async (req, res) => {
  const users = await User.find({})
  res.json({users})
})

router.put("/updaterole", auth, async (req, res) => {
  const {id, role} = req.body;
  console.log(id, role);
  const newrole = await User.findByIdAndUpdate(id, {role})
})

module.exports = router;
