const router = require("express").Router();
const { UserModel } = require("../models");

router.post("/register", async (req, res) => {

    UserModel.create({
        username: "username",
        password: "password"
    })
 });

module.exports = router;