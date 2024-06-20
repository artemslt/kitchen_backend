const express = require("express");

const { ctrlWrapper } = require("../middleware/controllerWrapper");

const login = require("../controllers/user/login");
const register = require("../controllers/user/register");
const logOut = require("../controllers/user/logOut");
const auth = require("../middleware/auth");
const resetPass = require("../controllers/user/resetPasswod");
const newPass = require("../controllers/user/newPassword");
const validation = require("../middleware/validation");
const schema = require("../schemas/user");

const router = express.Router();

router.post("/login", validation(schema), ctrlWrapper(login));
router.post("/register", ctrlWrapper(register));
router.post("/logout", auth, ctrlWrapper(logOut));
router.patch("/resetpassword", ctrlWrapper(resetPass));
router.patch("/newpassword", ctrlWrapper(newPass));

module.exports = router;
