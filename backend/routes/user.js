const express = require("express");
const { userSignup,userSignin, updateUser,getUserWithFilter } = require("../controllers/userController");
const authmiddleware = require("../middlewares/authmiddleware");


const router = express.Router();

router.route("/signup")
    .post(userSignup)

router.route("/signin")
    .post(userSignin)

router.route("/")
    .all(authmiddleware) //apply this to all request of /
    .put(updateUser)

router.route("/bulk")
    .all(authmiddleware) //apply this to all request of /
    .get(getUserWithFilter)

module.exports = router