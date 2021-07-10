const router = require("express").Router();
const { UniqueConstraintError } = require("sequelize/lib/errors");
const { UserModel } = require("../models");

/*
============================
User Register
============================
*/


router.post("/register", async (req, res) => {


    let { username, passwordhash } = req.body.user;
    try {
    const User = await UserModel.create({
        username,
        passwordhash
    });
    res.status(201).json({
        message: "You've successfully registered! Go you!",
        user: User
    });
} catch (err) {
    if (err instanceof UniqueConstraintError){
        res.status(409).json({
            message: "Oops this username is already in use.",
        });
    } else {
    res.status(500).json({
        message: "Boo.. you've failed to register."
    });
}
}
 });

 /*
============================
User Login
============================
*/


 router.post("/login", async (req, res) => {
    let { username, passwordhash } = req.body.user; 
    
    try {
    const loginUser = await UserModel.findOne({
        where: {
            username: username,
        },
    });
    if (loginUser) {
    res.status(200).json({
        user: loginUser,
        message: "Hey there, welcome back!"
    });
} else {
    res.status(401).json({
        message:"Login failed"
    });
}
} catch (error) {
    res.status(500).json({
        message: "Uh oh, we couldn't log you in!"
    })
}
 });

module.exports = router;