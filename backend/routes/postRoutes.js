const { Router } = require("express");
const postController = require("../controllers/postController");
const {
  requireAuth,
  checkUser,
  adminAuth,
} = require("../middleware/authMiddleware");

const router = Router();

router.post("/addPost", requireAuth, postController.addPost_post);

router.get(
  "/authorPosts/:authorId",
  requireAuth,
  postController.authorPosts_get
);

router.get("/recPosts/:authorId", requireAuth, postController.recPosts_get);

router.get("/allPosts", requireAuth, postController.allPosts_get);

router.get("/topPosts", requireAuth, postController.topPosts_get);

router.get("/post/:postId", requireAuth, checkUser, postController.post_get);

router.delete(
  "/deletePost/:postId",
  requireAuth,
  postController.deletePost_delete
);

router.put("/editPost/:postId", requireAuth, postController.editPost_put);

router.put(
  "/toggleLikeStatus/:postId",
  requireAuth,
  postController.toggleLikeStatus_put
);

router.put("/addComment/:postId", requireAuth, postController.addComment_put);

// router.get("/logout", authController.logout_get);

// router.get('/signup', authController.signup_get);
// router.get('/login', authController.login_get);
// router.get('/practise',authController.topic_get);
// router.get('/addquestion',checkUser,requireAuth,authController.question_get);
// router.post('/addquestion',checkUser,adminAuth, authController.question_post);
// router.get('/addexperience',authController.addexperience_get);
// router.post('/addexperience',authController.addexperience_post);

module.exports = router;
