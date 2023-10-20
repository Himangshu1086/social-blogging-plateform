import { useState } from "react";
import style from "./EditForm.module.css";

function EditForm({ postId, setEditFormVisible, setYourPosts }) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [topic, setTopic] = useState("");
  const [image, setImage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setEditFormVisible(false);
    // Make post request for saving data
    const url = `http://127.0.0.1:3001/editPost/${postId}`;
    const payload = {
      title,
      topic,
      image,
      text,
    };

    await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      credentials: "include",
    });
    setYourPosts((c) => {
      // Later make a useEffect that synchronizes with the server and handle errors
      return c.map((elm) => {
        if (elm._id === postId)
          return {
            ...elm,
            title: title !== "" ? title : elm.title,
            text: text !== "" ? text : elm.text,
            topic: topic !== "" ? topic : elm.topic,
            image: image !== "" ? image : elm.image,
          };
        return elm;
      });
    });
  }

  return (
    <div className={style.EditForm}>
      <div className={style.overlay}>
        <form className={style.form_post} onSubmit={handleSubmit}>
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
            Text
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

          <input type="submit" value="Submit" className={style.submit} />
          <span
            className={style.cross}
            onClick={() => setEditFormVisible(false)}
          >
            &times;
          </span>
        </form>
      </div>
    </div>
  );
}

export default EditForm;
