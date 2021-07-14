const express = require("express");
const router = express.Router();
const Bug = require("../models/Bug");
const auth = require("../middleware/auth");

router.get("/all", auth, async (req, res) => {
  const role = req.user.role;
  const username = req.user.username;
  if (role === "admin") {
    const bugs = await Bug.find({});
    res.json(bugs);
  } else if (role === "tester") {
    const bugs = await Bug.find({ postedBy: username });
    res.json(bugs);
  } else if (role === "dev") {
    const bugs = await Bug.find({ assignedTo: username });
    res.json(bugs);
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const id = req.params.id;
    const bug = await Bug.findById(id);
    if (!bug) {
      return res.status(400).json({ error: "no bug found" });
    }
    res.json(bug);
  } catch (error) {
    res.status(400).json({ error: "no bug found" });
  }
});

router.post("/add", auth, async (req, res) => {
  try {
    const postedBy = req.user.username;
    const { title, priority, category, description } = req.body;
    if (!title || !description || !priority || !category) {
      return res.status(400).json({ error: "please fill all fields" });
    }
    const bug = new Bug({
      title,
      category,
      priority,
      postedBy,
      description,
    });
    await bug.save();
    res.json({ message: "added new bug" });
  } catch (error) {
    res.status(500).json({ error: "server error" });
  }
});

router.delete("/delete/:id", auth, async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ error: "bug not found" });
  }
  const deleted = await Bug.deleteOne({ _id: id });
  res.json({ message: "bug removed" });
});

router.put("/update/:id", auth, async (req, res) => {
  const id = req.params.id;
  const { title, description, category, status, priority } = req.body;
  const updatebug = await Bug.updateOne(
    { _id: id },
    { title, description, category, status, priority }
  );
  res.json({ message: "bug updated" });
});

router.put("/update-status/:id", auth, async (req, res) => {
  const id = req.params.id;
  const { status } = req.body;
  const updateStatus = await Bug.findByIdAndUpdate(id, {status: status})
})

router.put("/assign/:id", auth, async (req, res) => {
  const id = req.params.id;
  const { username } = req.body;
  const assignUser = await Bug.updateOne({_id: id}, {assignedTo: username});
  res.json({ message: "user assigned" });
})

module.exports = router;
