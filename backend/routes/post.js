const router = require("express").Router()
const postCtrl = require("../controllers/post")
const { verifyToken } = require("../middleware/verifytoken")

router.post("/createpost", verifyToken, postCtrl.createPost)
router.get("/getpost/:id", postCtrl.getPost)
router.put("/updatepost/:id", verifyToken, postCtrl.updatePost)
router.put("/:id/like",verifyToken, postCtrl.like)
router.put("/:id/dislike",verifyToken, postCtrl.dislike)
router.put("/commentpost", verifyToken, postCtrl.Comment)
router.delete("/deletepost/:id", verifyToken, postCtrl.deletePost)
router.get("/following/:id", postCtrl.followingUser)
router.get("/followers/:id", postCtrl.followersUser)

module.exports = router
