import React, { useEffect, useState } from "react";
import axios from "axios";

const Coments = ({ postId }) => {



  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    const res = await axios.get(`http://localhost:8000/api/comments/posts/${postId}/comments`);
    console.log(res.data);
    console.log(comments)
    setComments(res.data);
  };

  useEffect(() => {
    fetchComments();
  },[])


  const rendered = comments.map((coment) => {
    return <li key={coment.id}>{coment.content}</li>
  });

  return (
    <div className="m-5">
      <ul className="bg-blue-400">
        {rendered}
      </ul>
    </div>
  );
};

export default Coments;
