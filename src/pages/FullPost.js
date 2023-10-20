import { useEffect, useState } from "react";
import style from "./FullPost.module.css";
import { Link, useParams } from "react-router-dom";
import DisplayComments from "../components/DisplayComments";
import { useAuth } from "../contexts/AuthContext";

function FullPost() {
  const { userCredentials, setUserCredentials } = useAuth();

  const { postId } = useParams();
  const [post, setPost] = useState({});
  const [isLiked, setIsLiked] = useState();
  const [currentComment, setCurrentComment] = useState("");
  useEffect(
    function () {
      async function fetchPost() {
        const URL = `http://127.0.0.1:3001/post/${postId}`;
        const response = await fetch(URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const data = await response.json();
        setPost(data);
        setUserCredentials((c) => {
          if (!c?.today_views?.includes(postId)) {
            c?.today_views?.push(postId);
          }
          console.log(c?.today_views);
          return c;
        });
        setIsLiked(data?.likes?.includes(userCredentials._id));
      }
      fetchPost();
    },
    [postId, isLiked, userCredentials._id]
  );

  async function handleLikeClick(event) {
    event.preventDefault();
    await fetch(`http://127.0.0.1:3001/toggleLikeStatus/${postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ likedAuthorId: userCredentials._id }),
      credentials: "include",
    });
    setIsLiked((c) => !c);
  }

  async function handleCommentClick(event) {
    event.preventDefault();
    await fetch(`http://127.0.0.1:3001/addComment/${postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: currentComment,
        commentAuthorId: userCredentials.email,
      }),
      credentials: "include",
    });
    setPost((prevPost) => ({
      ...prevPost,
      comments: [
        ...prevPost.comments,
        { text: currentComment, commentAuthorId: userCredentials.email },
      ],
    }));
    setCurrentComment("");
  }

  let { title, topic, image, text, publishTime, author, authorId } = post;

  return (
    <div className={style.FullPost}>
      <div className={style.Post}>
        <div className={style.postImgContainer}>
          <img src={image}></img>
        </div>
        <div className={style.postContent}>
          <div className={style.postWrite}>
            <div className={style.postTitle}>{title}</div>
            <div className={style.postText}>{text}</div>
            <div className={style.postPublishTime}>{publishTime}</div>
            <div className={style.postAuthor}>
              <Link to={`/author/${authorId}`}>Author | {author}</Link>
            </div>
          </div>
        </div>
        <div className={style.likes}>
          <button onClick={handleLikeClick}>
            {isLiked ? "Unlike" : "Like"}
          </button>
          <div>{post?.likes?.length} Likes</div>
        </div>

        <div className={style.likes}>
          <div>{post?.views?.length} Views</div>
        </div>

        <div className={style.likes}>
          <div>{parseInt(post?.text?.split(" ").length / 10)} Minute read</div>
        </div>
        <div className={style.comments}>
          <form>
            <input
              value={currentComment}
              onChange={(e) => setCurrentComment(e.target.value)}
              placeholder="Add comment..."
            ></input>
            <button onClick={handleCommentClick}>Add</button>
          </form>
          <DisplayComments comments={post.comments}></DisplayComments>
        </div>
      </div>
    </div>
  );
}

export default FullPost;
