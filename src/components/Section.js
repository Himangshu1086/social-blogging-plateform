import { useEffect, useState } from "react";
import AddForm from "../pages/AddForm";
import FilterForm from "../pages/FilterForm";
import { useAuth } from "../contexts/AuthContext";
import Search from "./Search";
import Filter from "./Filter";
import ListPosts from "./ListPosts";
import SortViews from "./SortViews";
import SortLikes from "./SortLikes";
import SortComments from "./SortComments";

import style from "./Section.module.css";

function Section({ url, sectionId, savePost, setSavePost }) {
  const { userCredentials } = useAuth();
  const [Posts, setPosts] = useState([]);
  const [displayPosts, setDisplayPosts] = useState([]);
  const [isFilterFormVisible, setFilterFormVisible] = useState(false);

  const [isAddFormVisible, setAddFormVisible] = useState(false);
  const [addOption, setAddOption] = useState(() =>
    sectionId === 0 ? true : false
  );

  useEffect(() => {
    if (sectionId === 0) setAddOption(true);
    else setAddOption(false);
  });

  useEffect(() => {
    async function fetchPosts() {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const posts = await response.json();
      setPosts(posts);
    }
    fetchPosts();
  }, [url]);

  useEffect(
    function () {
      setDisplayPosts(Posts);
    },
    [Posts]
  );

  return (
    <div className={style.YourPosts}>
      <div className={style.yourPostsOptions}>
        {addOption && <Add setAddFormVisible={setAddFormVisible}></Add>}
        <Search yourPosts={Posts} setDisplayPosts={setDisplayPosts}></Search>
        <Filter setFilterFormVisible={setFilterFormVisible}></Filter>
        <SortViews
          displayPosts={displayPosts}
          setDisplayPosts={setDisplayPosts}
        ></SortViews>
        <SortLikes
          displayPosts={displayPosts}
          setDisplayPosts={setDisplayPosts}
        ></SortLikes>
        <SortComments
          displayPosts={displayPosts}
          setDisplayPosts={setDisplayPosts}
        ></SortComments>
      </div>
      {displayPosts.length > 0 ? (
        <ListPosts
          displayPosts={displayPosts}
          setYourPosts={setPosts}
          savePost={savePost}
          setSavePost={setSavePost}
        ></ListPosts>
      ) : (
        <></>
      )}
      {isFilterFormVisible && (
        <FilterForm
          setDisplayPosts={setDisplayPosts}
          setFilterFormVisible={setFilterFormVisible}
          yourPosts={Posts}
        ></FilterForm>
      )}
      {isAddFormVisible && (
        <AddForm
          setYourPosts={setPosts}
          setAddFormVisible={setAddFormVisible}
        ></AddForm>
      )}
    </div>
  );
}

export default Section;

const handleAdd = (setAddFormVisible) => {
  setAddFormVisible(true);
};

function Add({ setAddFormVisible }) {
  return (
    <div
      className={style.ops}
      alt="Add Post"
      onClick={() => handleAdd(setAddFormVisible)}
    >
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
          d="M12 4.5v15m7.5-7.5h-15"
        />
      </svg>
      <p>Add</p>
    </div>
  );
}
