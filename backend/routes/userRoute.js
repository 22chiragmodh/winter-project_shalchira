const express = require('express');
const {registerUser,loginUser, logoutuser} = require('../controllers/usercontroller');
const router= express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutuser);
module.exports = router;