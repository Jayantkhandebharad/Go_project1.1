const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model("User");
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require("../keys")
const requirelogin = require("../middleware/requireLogine")

router.get('/', (req, res) => {
    res.send("hello jk")
})


router.post('/signup', (req, res) => {
    const { name, email, password, pic, rig_id } = req.body
    if (!email || !password || !name || !rig_id) { //if any of these is empty then error
        return res.status(422).json({ error: "please add all the fields" });
    } //status to show the status or request
    User.findOne({ email: email })
        .then((savedUser) => {
            if (savedUser) {
                return res.status(422).json({ error: "user already exist with that email !" });
            }
            bcryptjs.hash(password, 12)
                .then(hashedpassword => {
                    const user = new User({
                        email,
                        password: hashedpassword,
                        name,
                        pic,
                        rig_id
                    })
                    user.save()
                        .then(user => {
                            res.json({
                                message: "saved successfully"
                            })

                        })
                        .catech(err => {
                            console.log(err);
                        });
                })
                .catch(err => {
                    console.log(err);
                })
        }
            //res.json({ message: "successfully posted" }); //sending responce
            //console.log("added");
        )
        .catch(err => {
            console.log(err);
        })
})


router.post('/signin', (req, res) => {
    const { email, password } = req.body
    if ((!email || !password)) {
        return res.status(422).json({ error: "please add valid email or password" })
    }
    User.findOne({ email: email })
        .then(savedUser => {
            if (!savedUser) {
                return res.status(422).json({ error: "invalid email or password" })
            }
            bcryptjs.compare(password, savedUser.password)
                .then(doMatch => {
                    if (doMatch) {
                        //res.json({ message: "successfully signed in" })
                        const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);
                        const { _id, name, email, pic, rig_id } = savedUser
                        res.json({ token, user: { _id, name, email, pic, rig_id } })
                    } else {
                        return res.status(422).json({ error: "invalid email in or password" })

                    }
                })
                .catch(err => {
                    console.log(err)
                })

        })
        .catch(err => {
            console.log(err)
        })
});
module.exports = router;