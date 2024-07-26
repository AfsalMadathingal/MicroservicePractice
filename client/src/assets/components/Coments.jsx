import axios from "axios";
import React, { useEffect, useState } from "react";

const Coments = ({ postId }) => {
  const [comment, setComment] = useState([]);

  const fetchComments = async () => {
    const res = await axios.get(`http://localhost:4001/posts/${postId}/comments`);

    console.log(res);
    setComment(res.data);
  };

  useEffect(() => {
    fetchComments();


  },[]);


  const rendered = comment.map((coment) => {
    return <li key={coment.id}>{coment.content}</li>;
  });

  return (
    <div className="h-full">
      {console.log(comment)}
      <ul className="bg-blue-400">
        {rendered}
      </ul>
    </div>
  );
};

export default Coments;
