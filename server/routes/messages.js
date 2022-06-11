const { addMessage, getMessages } = require("../controllers/messageC");
const router = require("express").Router();

router.post("/addMsg/", addMessage);
router.post("/getMsg/", getMessages);

module.exports = router;
