const users = require("../controllers/usersController");
// const userr = require("../middleware/verifyToken");
const user = require("../controllers/refreshToken");

const router = require("express").Router();

router.get("/users", users.getUsers);
router.post("/register", users.Register);
router.post("/login", users.Login);
router.get("/token", user.refreshToken);
router.delete("/logout", users.Logout);

module.exports = router;
