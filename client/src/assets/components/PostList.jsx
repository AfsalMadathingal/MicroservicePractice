import React, { useEffect, useState } from "react";
import axios from "axios";

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
        <div className="bg-blue-700">
          <div>
            <h3>{post.title}</h3>
          </div>
        </div>
      </>
    );
  });

  return (
    <div>
      <h1 className="bg-red-400 font-bold text-lg">Posts</h1>
      {rendered}
    </div>
  );
};

export default PostList;
