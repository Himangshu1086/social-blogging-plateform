import { NavLink, Outlet, useParams } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import AuthorDetails from "../components/AuthorDetails";

import style from "./User.module.css";

function User() {
  const { setUserCredentials, userCredentials } = useAuth();
  return (
    <div className={style.User}>
      <AuthorDetails
        name={userCredentials.name}
        email={userCredentials.email}
        image={
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSR7GmxlQndDPCyxjYK4o8_qT06Pz9XGH-_8UlJrNyL&s"
        }
      ></AuthorDetails>
      <div className={style.userOptions}>
        <NavLink to="yourPosts" className={style.link}>
          Your Posts
        </NavLink>
        <NavLink to="allPosts" className={style.link}>
          All Posts
        </NavLink>
        <NavLink to="recPosts" className={style.link}>
          Rec Posts
        </NavLink>
        <NavLink to="topPosts" className={style.link}>
          Top Posts
        </NavLink>
        <NavLink to="savePost" className={style.link}>
          Saved Posts
        </NavLink>
        <NavLink to="topicList" className={style.link}>
          Topic List
        </NavLink>
      </div>
      <div className={style.userSection}>
        <Outlet />
      </div>
    </div>
  );
}

export default User;
