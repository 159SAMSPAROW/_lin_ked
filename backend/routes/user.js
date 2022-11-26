const router = require("express").Router()
const userCtrl = require("../controllers/user")
const { body } = require("express-validator")
const { verifyToken } = require("../middleware/verifytoken")

router.post(
  "/signup",
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
  body("username").isLength({ min: 3 }),
  body("phonenumber").isLength({ min: 10 }),
  userCtrl.signup
)
router.post("/verify/email", userCtrl.verifyEmail)
router.post(
    "/login",
    body("email").isEmail(),
    body("password").isLength({ min: 6 }),
    userCtrl.login
  )
router.put("/reset/password", userCtrl.resetPassword)
router.post("/forgot/password", userCtrl.forgotPassword)
router.put('/following/:id', verifyToken, userCtrl.following)
router.get("/followerspost/:id", verifyToken, userCtrl.followersPost)
router.put("/update/:id", verifyToken, userCtrl.updateUser)
router.delete("/delete/:id", verifyToken, userCtrl.deleteUser)
router.get("/userdetails/:id", userCtrl.userDetails)
router.get("/alluser/:id", userCtrl.getAllUser)


module.exports = router
