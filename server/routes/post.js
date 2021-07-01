const { request } = require("express");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requirelogin = require("../middleware/requireLogine");
const Post = mongoose.model("post");
const User = mongoose.model("User");

router.get("/allpost", requirelogin, (req, res) => {
  Post.find()
    .populate("postedBy", "_id name pic")
    .populate("comments.postedBy", "_id name")
    .then((post) => {
      res.json({ post });
    })
    .catch((err) => {
      console.log(err);
    });
});


router.post("/createpost", requirelogin, (req, res) => {
  const { title, body, pic, members, occasion, domain, tech, apply, hlink } = req.body;
  console.log(title, body, pic, members, occasion, domain, tech, apply, hlink);
  if (!title || !body || !pic || !occasion || !domain || !apply) {
    res.status(431).json({ error: "please add all the field" });
  }

  req.user.password = undefined;
  // it will not change but it will not visible in DB
  const post = new Post({
    title,
    photo: pic,
    body,
    postedBy: req.user,
    members,
    occasion,
    domain,
    tech,
    apply,
    hlink,
  });
  post
    .save()
    .then((result) => {
      res.json({ post: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/mypost", requirelogin, (req, res) => {
  Post.find({ postedBy: req.user._id })
    .populate("postedBy", "_id name email ")
    .then((mypost) => {
      res.json({ mypost });
    })
    .catch((err) => {
      console.log(err);
    });
});
router.get("/openpost/:postId", requirelogin, (req, res) => {
  Post.find({ postid: req.params.postid })
    .populate("postedBy", "_id name email pic")
    .then((post) => {
      console.log(post)
      res.json({ post });
    })
    .catch((err) => {
      console.log(err);
    });
});
router.delete("/deletepost/:postId", requirelogin, (req, res) => {
  Post.findOne({ _id: req.params.postId })
    .populate("postedBy", "_id")
    .exec((err, post) => {
      if (err || !post) {
        return res.status(422).json({ error: err });
      }
      if (post.postedBy._id.toString() === req.user._id.toString()) {
        post
          .remove()
          .then((result) => {
            res.json(result);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
});

router.put("/like", requirelogin, (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { likes: req.user._id },
    },
    {
      new: true,
    }
  ).exec((err, result) => {
    if (err) {
      return res.status(422).json({ error: err });
    } else {
      res.json(result);
    }
  });
});

router.put("/unlike", requirelogin, (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $pull: { likes: req.user._id },
    },
    {
      new: true,
    }
  ).exec((err, result) => {
    if (err) {
      return res.status(422).json({ error: err });
    } else {
      res.json(result);
    }
  });
});

router.put("/comment", requirelogin, (req, res) => {
  const comment = {
    text: request.body.text,
    postedby: req.user._id,
  };
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { comments: comment },
    },
    {
      new: true,
    }
  )
    .populate("comments.postedBy", "_id name")
    .populate("postedBy", "_id name")
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
    });
});




module.exports = router;
