import { useEffect, useState } from "react";
import AuthorDetails from "../components/AuthorDetails";
import Post from "../components/Post";
import { useParams } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import ListPosts from "../components/ListPosts";

import style from "./AuthorProfile.module.css";

function AuthorProfile() {
  const { authorId } = useParams();
  const { setUserCredentials, userCredentials } = useAuth();

  const isFollowing = userCredentials.following.includes(authorId);
  const [isFollowed, setIsFollowed] = useState(isFollowing);
  const [authorPosts, setAuthorPosts] = useState([]);
  const [authorDetails, setAuthorDetails] = useState("");

  // get details of author from server
  useEffect(() => {
    async function fetchAuthorDetails() {
      const response = await fetch(
        `http://127.0.0.1:3001/authorDetails/${authorId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const authorDetails = await response.json();
      setAuthorDetails(authorDetails);
      const res = await fetch(`http://127.0.0.1:3001/authorPosts/${authorId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const posts = await res.json();
      setAuthorPosts(posts);
      // const resp = await fetch(
      //   `http://127.0.0.1:3001/authorDetails/${userCredentials._id}`,
      //   {
      //     method: "GET",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     credentials: "include",
      //   }
      // );
      // const { following } = await resp.json();
      // const isFollowing = userCredentials.following.includes(authorId);
      // setIsFollowed(isFollowing);
    }
    fetchAuthorDetails();
  }, []);

  async function handleFollow() {
    await fetch(
      `http://127.0.0.1:3001/toggleFollowStatus/${userCredentials._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ authorId }),
        credentials: "include",
      }
    );
    setIsFollowed(!isFollowed);
    setUserCredentials((c) => {
      const arr = c.following.slice(); // Create a copy of the array
      const index = arr.indexOf(authorId);

      if (index !== -1) {
        arr.splice(index, 1); // Remove the authorId from the array
      } else {
        arr.push(authorId); // Add the authorId to the array
      }

      return { ...c, following: arr };
    });
  }

  return (
    <div className={style.checkOutProfile}>
      <AuthorDetails
        name={authorDetails.name}
        email={authorDetails.email}
        image={
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQGkLSrKx0hnC1xRnTInk3ubhjrEydQ9ubnRoaj-02bg&s"
        }
      ></AuthorDetails>
      <button className={style.followButton} onClick={handleFollow}>
        {isFollowed ? "Unfollow" : "Follow"}
      </button>
      <ListPosts displayPosts={authorPosts}></ListPosts>;
    </div>
  );
}

export default AuthorProfile;
