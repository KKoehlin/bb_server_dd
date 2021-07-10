const router = require("express").Router();
const { UniqueConstraintError } = require("sequelize/lib/errors");
const { UserModel } = require("../models");

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

module.exports = router;