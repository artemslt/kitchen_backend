const express = require("express");
const { ctrlWrapper } = require("../middleware/controllerWrapper");

const getInfo = require("../controllers/accountInfo/getInfo");
const updateInfo = require("../controllers/accountInfo/updateInfo");
const auth = require("../middleware/auth");
const validation = require("../middleware/validation");
const schema = require("../schemas/accountInfo");
const createInfo = require("../controllers/accountInfo/createInfo");
const deleteInfo = require("../controllers/accountInfo/deleteInfo");

const router = express.Router();

router.get("/", ctrlWrapper(getInfo));
router.post("/", auth, validation(schema), ctrlWrapper(createInfo));
router.patch("/:infoId", auth, validation(schema), ctrlWrapper(updateInfo));
router.delete("/:infoId", auth, ctrlWrapper(deleteInfo));

module.exports = router;
