import ListPosts from "./ListPosts";

function SavePost({ savePost }) {
  return <ListPosts displayPosts={savePost}></ListPosts>;
}

export default SavePost;
