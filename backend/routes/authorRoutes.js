const { Router } = require("express");
const authorController = require("../controllers/authorController");
const {
  requireAuth,
  checkUser,
  adminAuth,
} = require("../middleware/authMiddleware");

const router = Router();

router.get(
  "/authorDetails/:authorId",
  requireAuth,
  authorController.authorDetails_get
);
router.put(
  "/toggleFollowStatus/:authorId",
  requireAuth,
  authorController.toggleFollowStatus_put
);
// router.get("/authorPosts/:authorId", postController.authorPosts_get);
// router.get("/post/:postId", postController.post_get);
// router.delete("/deletePost/:postId", postController.deletePost_delete);
// router.put("/editPost/:postId", postController.editPost_put);

module.exports = router;
