import { useState } from "react";
import style from "./AddForm.module.css";
import { useAuth } from "../contexts/AuthContext";

function AddForm({ setAddFormVisible, setYourPosts }) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [topic, setTopic] = useState("");
  const [image, setImage] = useState("");
  const { userCredentials, setUserCredentials } = useAuth();

  async function handleSubmit(event, setAddFormVisible) {
    event.preventDefault();
    setAddFormVisible(false);
    const publishDate = new Intl.DateTimeFormat("en-GB").format(new Date());
    console.log(publishDate);

    const newPost = {
      title,
      text,
      topic,
      image,
      author: userCredentials.name,
      publishDate,
      likes: [],
      comments: [],
      views: [],
      authorId: userCredentials._id,
    };
    // console.log(newPost);

    const URL = `http://127.0.0.1:3001/addPost`;
    await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(newPost),
    });

    setYourPosts((c) => {
      return [...c, newPost];
    });
    setAddFormVisible(false);
  }

  return (
    <div className="AddForm">
      <div className={style.overlay}>
        <form
          className={style.form_post}
          onSubmit={(event) => handleSubmit(event, setAddFormVisible)}
        >
          <label htmlFor="form_post_title" className={style.form_post_label}>
            Title
          </label>
          <input
            type="text"
            name="form_post_title"
            className={style.form_post_entry}
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            placeholder="Add title for post"
          />
          <label htmlFor="form_post_text" className={style.form_post_label}>
            Description
          </label>
          <input
            type="text"
            name="form_post_text"
            className={style.form_post_entry}
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
            placeholder="Add text for post"
          />
          <label htmlFor="form_post_topic" className={style.form_post_label}>
            Topic
          </label>
          <input
            type="text"
            name="form_post_topic"
            className={style.form_post_entry}
            value={topic}
            onChange={(e) => {
              setTopic(e.target.value);
            }}
            placeholder="Add topic for post"
          />
          <label htmlFor="form_post_image" className={style.form_post_label}>
            Image
          </label>
          <input
            type="text"
            name="form_post_image"
            className={style.form_post_entry}
            value={image}
            onChange={(e) => {
              setImage(e.target.value);
            }}
            placeholder="Add image"
          />

          <input type="submit" className={style.submit} value="Submit" />
          <span
            className={style.cross}
            onClick={() => setAddFormVisible(false)}
          >
            &times;
          </span>
        </form>
      </div>
    </div>
  );
}

export default AddForm;
