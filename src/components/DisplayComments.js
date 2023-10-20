import styles from "./DisplayComments.module.css";

function DisplayComments({ comments }) {
  return (
    <div className={styles.displayComments}>
      {comments?.map((c) => (
        <div className={styles.comment}>
          <div clas>{c.commentAuthorId}</div>
          <div>{c.text}</div>
        </div>
      ))}
    </div>
  );
}

export default DisplayComments;
