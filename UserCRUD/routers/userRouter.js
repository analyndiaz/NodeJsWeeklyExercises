const express = require("express");
const { check } = require("express-validator");

const {
  userController: {
    getAllUsers,
    getUserByEmail,
    getUserByUserName,
    createUser,
    updateUser,
    deleteUser,
  },
} = require("../controllers");

const router = express.Router();

router.get("/", getAllUsers);
router.get("/user/:userName", getUserByUserName);
router.get("/user/email/:emailAddress", getUserByEmail);

router.post(
  "/",
  [check("emailAddress", "Email address is not valid.").isEmail()],
  [
    check("userName", "User Name cannot be empty or undefined.")
      .not()
      .isEmpty(),
  ],
  createUser
);

router.put(
  "/user/:userName",
  [check("emailAddress", "Email address is not valid.").isEmail()],
  updateUser
);

router.delete("/user/:userName", deleteUser);

module.exports = router;
