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

  const rendered = posts?.map((post,idx) => {
    return (

        <div key={idx} className="bg-slate-400  border p-5  w-[30%] m-1">
 
            <h3>{post.title}</h3>
           
            <h1>All comments</h1>
            {/* <Coments comments={post.comments}/>

            <CommentCreation postId={post.id}/> */}
      
          
        </div>

    );
  });

  return (
    <>
    <h1 className="bg-red-400 font-bold text-lg">Posts</h1>

      {rendered? rendered : "Loading..."}
      

    </>
  );
};

export default PostList;
