const {
  login,
  signup,
  getAllUsers,
  setAvatar,
  logOut,
} = require("../controllers/userC.js");

const router = require("express").Router();

router.post("/login", login);
router.post("/signup", signup);
router.get("/allUsers/:id", getAllUsers);
router.post("/setavatar/:id", setAvatar);
router.get("/logout/:id", logOut);

module.exports = router;
