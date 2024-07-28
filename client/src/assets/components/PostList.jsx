import React, { useEffect, useState } from "react";
import axios from "axios";
import CommentCreation from "./CommentCreation";
import Coments from "./Coments";

const PostList = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const res = await axios.get("http://localhost:4000/posts");
    console.log(res.data);
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const rendered = posts?.map((post, idx) => {
    return (
      <div key={idx} className="bg-slate-400  border p-5 w-1/3 m-1">
        <h3>{post.title}</h3>
        <p>{post.content}</p>
        <h1>All comments</h1>
        <Coments postId={post._id} />

        <CommentCreation postId={post._id} />
      </div>
    );
  });

  return (
    <>
     <h1 className="bg-red-400 font-bold text-lg">Posts</h1>
      <div className="flex">
       

        {rendered ? rendered : "Loading..."}
      </div>
    </>
  );
};

export default PostList;
