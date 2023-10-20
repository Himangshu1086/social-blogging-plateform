import style from "./Search.module.css";
import { useState } from "react";

function Search({ setDisplayPosts, yourPosts }) {
  const [keyword, setKeyword] = useState("");
  const handleClick = (e) => {
    setKeyword(e.target.value);
    if (keyword.length <= 1) setDisplayPosts(yourPosts);
    else {
      setDisplayPosts((c) =>
        yourPosts.filter((elm) => {
          return (
            elm.title.toLowerCase().includes(keyword.toLowerCase()) ||
            elm.topic.toLowerCase().includes(keyword.toLowerCase()) ||
            elm.author.toLowerCase().includes(keyword.toLowerCase())
          );
        })
      );
    }
  };
  return (
    <div className={style.Search}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
        />
      </svg>
      <input type="text" value={keyword} onChange={handleClick}></input>
    </div>
  );
}

export default Search;
