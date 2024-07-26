import React, { useEffect, useState } from "react";
import axios from "axios";
import CommentCreation from "./CommentCreation";
import Coments from "./Coments";

const PostList = () => {
  const [posts, setPosts] = useState({});

  const fetchPosts = async () => {
    const res = await axios.get("http://localhost:4000/posts");

    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const rendered = Object.values(posts).map((post) => {
    return (
      <>
        <div key={post.id} className="bg-slate-400  border p-5  w-[30%] m-1">
          <div>
            <h3>{post.title}</h3>
            <CommentCreation postId={post.id}/>
            <h1>All comments</h1>
            <Coments postId={post.id}/>
          </div>
          
        </div>
      </>
    );
  });

  return (
    <>
    <h1 className="bg-red-400 font-bold text-lg">Posts</h1>

      {rendered}
      

    </>
  );
};

export default PostList;
