const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requirelogin = require("../middleware/requireLogine");
const Post = mongoose.model("post");
const User = mongoose.model("User");

router.get("/user/:id", requirelogin, (req, res) => {
  User.findOne({ _id: req.params.id })
    .select("-password")
    .then((user) => {
      Post.find({ postedBy: req.params.id })
        .populate("postedBy", "_id name rig_id")
        .exec((err, posts) => {
          if (err) {
            return res.status(422).json({ error: err });
          }
          res.json({ user, posts });
        });
    })
    .catch((err) => {
      return res.status(404).json({ error: "user not found" });
    });
});



router.put("/updatepic", requirelogin, (req, res) => {
  User.findByIdAndUpdate(req.user._id, { $set: { pic: req.body.pic } }, { new: true },
    (err, result) => {
      if (err) {
        return res.status(422).json({ error: "pic canot post" })
      }
      res.json(result)
    })
})

module.exports = router;
