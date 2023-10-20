import { useState } from "react";
import style from "./TopicList.module.css";
import { useEffect } from "react";
import ListPosts from "./ListPosts";

function TopicList() {
  const [posts, setPosts] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState("");
  console.log(selectedTopic);

  const tempTopics = posts.map((p) => p.topic);
  const topics = [...new Set(tempTopics)];

  useEffect(() => {
    async function fetchTopics() {
      const url = `http://127.0.0.1:3001/allPosts`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const t = await response.json();
      setPosts(t);
    }
    fetchTopics();
  }, []);

  return (
    <div className={style.topicList}>
      <div className={style.tagList}>
        {topics.map((topic) => {
          return (
            <div
              className={style.tag}
              data-topic={topic} // Change value to data-topic
              onClick={(e) => {
                setSelectedTopic(e.target.dataset.topic); // Use dataset.topic to access the data attribute
              }}
            >
              {topic}
            </div>
          );
        })}
      </div>
      <div className={style.results}>
        <ListPosts
          displayPosts={posts.filter((p) => p.topic === selectedTopic)}
        ></ListPosts>
      </div>
    </div>
  );
}

export default TopicList;
