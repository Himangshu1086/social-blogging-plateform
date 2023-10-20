const User = require("../models/User");
const Post = require("../models/Post");
const jwt = require("jsonwebtoken");
// const Question = require('../models/question');
// const Topic = require('../models/topic');
// const Company = require("../models/company");
// const Experience = require("../models/experience");
// handle errors

const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: "", password: "" };

  // incorrect email
  if (err.message === "incorrect email") {
    errors.email = "That email is not registered";
  }

  // incorrect password
  if (err.message === "incorrect password") {
    errors.password = "That password is incorrect";
  }

  // duplicate email error
  if (err.code === 11000) {
    errors.email = "that email is already registered";
    return errors;
  }

  // validation errors
  if (err.message.includes("user validation failed")) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

function formatDate(date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

module.exports.addPost_post = async (req, res) => {
  const newPost = req.body;
  const today = new Date();
  const formattedDate = formatDate(today);
  newPost.publishDate = formattedDate;

  try {
    const ret_newPost = await Post.create(newPost);
    const authorId = newPost.authorId;
    const updatedUser = await User.findById(authorId);
    updatedUser.posts_written.push(ret_newPost._id);
    await User.findByIdAndUpdate(
      authorId,
      updatedUser,
      { new: true },
      (error, updatedUser) => {
        if (error) {
          console.error("Error:", error);
        } else {
          console.log("Updated User:", updatedUser);
        }
      }
    );
    res.status(200).json(newPost);
  } catch (err) {
    console.log(err);
  }
};

module.exports.authorPosts_get = async (req, res) => {
  const authorId = req.params.authorId;
  try {
    const [authorDetails] = await User.find({ _id: authorId });
    const postPromises = authorDetails.posts_written?.map(async (postId) => {
      const post = await Post.findById(postId);
      return post;
    });

    const posts = await Promise.all(postPromises);
    const updatedPosts = posts.filter((p) => p !== null);
    res.status(200).json(updatedPosts);
  } catch (err) {
    console.log(err);
  }
};

module.exports.allPosts_get = async (req, res) => {
  try {
    const allPosts = await Post.find();
    console.log(allPosts);
    res.status(200).json(allPosts);
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching all posts" });
  }
};

module.exports.topPosts_get = async (req, res) => {
  try {
    const allPosts = await Post.find();
    allPosts.sort((postA, postB) => -postA.views.length + postB.views.length);
    res.status(200).json(allPosts);
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching all posts" });
  }
};

module.exports.recPosts_get = async (req, res) => {
  const authorId = req.params.authorId;

  try {
    const authorDetails = await User.findById(authorId);
    const allPostsId = await Promise.all(
      authorDetails.following.map(async (followedAuthorId) => {
        const { posts_written } = await User.findById(followedAuthorId);
        return posts_written;
      })
    );
    const flatAllPostsId = allPostsId.flat();
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!", flatAllPostsId);

    const postPromises = flatAllPostsId.map(async (postId) => {
      const post = await Post.findById(postId);
      return post;
    });

    const posts = await Promise.all(postPromises);
    const updatedPosts = posts.filter((p) => p !== null);
    console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$", updatedPosts);
    res.status(200).json(updatedPosts);
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching recommended posts" });
  }
};

module.exports.post_get = async (req, res) => {
  const postId = req.params.postId;

  try {
    const author = await User.findById(res.locals.user._id);

    // Ensure postId is not already in today_views
    if (!author?.today_views?.includes(postId)) {
      author?.today_views.push(postId);
      await author.save();
    }

    const post = await Post.findById(postId);
    if (!post.views.includes(res.locals.user._id)) {
      post.views.push(res.locals.user._id);
      await post.save();
    }

    res.status(200).json(post);
  } catch (err) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the post" });
  }
};

module.exports.deletePost_delete = async (req, res) => {
  const postId = req.params.postId;
  try {
    const result = await Post.deleteOne({ _id: postId }); // Replace idToDelete with the actual document's _id you want to delete
    // later delete the postId of the post from wherever it is there in USer and Post models
    if (result.deletedCount === 1) {
      console.log("Document deleted successfully.");
    } else {
      console.log("Document not found or not deleted.");
    }

    res.send("deleted succesfully");
  } catch (error) {
    console.error("Error:", error);
    res.send("Not deleted succesfully");
  }
};

module.exports.editPost_put = async (req, res) => {
  const postId = req.params.postId;
  const existingPost = await Post.findById(postId);
  if (!existingPost) {
    return res.status(404).json({ message: "Post not found" });
  }

  // Update properties if they are provided in the payload
  if (req.body.title !== undefined && req.body.title !== "") {
    existingPost.title = req.body.title;
  }
  if (req.body.topic !== undefined && req.body.topic !== "") {
    existingPost.topic = req.body.topic;
  }
  if (req.body.image !== undefined && req.body.image !== "") {
    existingPost.image = req.body.image;
  }
  if (req.body.text !== undefined && req.body.text !== "") {
    existingPost.text = req.body.text;
  }

  // Save the updated post
  const updatedPost = await existingPost.save();

  res.status(200).json(updatedPost);
};

module.exports.toggleLikeStatus_put = async (req, res) => {
  const postId = req.params.postId;
  const { likedAuthorId: client } = req.body;

  const updatedPost = await Post.findById(postId);
  if (updatedPost.likes.includes(client)) {
    updatedPost.likes.pull(client);
  } else {
    updatedPost.likes.push(client);
  }
  await updatedPost.save();
  res.send("Success");
};

module.exports.addComment_put = async (req, res) => {
  const postId = req.params.postId;
  const comment = req.body;

  try {
    const updatedPost = await Post.findById(postId);
    const newComment = {
      text: comment.text,
      commentAuthorId: comment.commentAuthorId,
    };

    updatedPost.comments.push(newComment);

    await updatedPost.save();

    res.json({ message: "Comment added successfully", updatedPost });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while adding the comment" });
  }
};

// controller actions
// module.exports.signup_get = (req, res) => {
//   res.render('signup');
// }

// module.exports.login_get = (req, res) => {
//   res.render('login');
// }

// module.exports.question_get = (req, res) => {
//   res.render('addquestion');
// }

// module.exports.question_post = async(req,res) => {

//   console.log("alia");
//   var x = await Topic.find({ topic : req.body.topic });
//   var id = x[0]._id;
//   req.body.topic = id;
//   console.log(req.body);

//   var data = new Question(req.body);
//  data.save()
//   .then(item => {
//     console.log("data is saved");
//   })
//  .catch(err => {
//     console.log(err);
//   })

// }

// module.exports.addexperience_get = (req,res) =>{
//   res.render('addexperience');
// }

// module.exports.topic_get = (req, res) => {
//   Topic.find({},(err,data)=> {
//     if(err){
//       console.log(err)
//     }else{

//       res.render('practise',{ topic : data});
//     }
//   }
//   )};

//   module.exports.addexperience_get = (req,res) =>{

//     res.render('addexperience');
//   }

//   module.exports.addexperience_post = async(req,res) => {

//    var phew = req.body.company;

//    console.log(req.body);
//     var x = await Company.find({ name : req.body.company });
//     console.log(x);
//      var id = x[0]._id;
//      req.body.company = id;

//   var data = new Experience(req.body);
//    data.save()
//     .then(item => {
//       console.log("data is saved");
//     })
//    .catch(err => {
//       console.log(err);
//     })
//   }
