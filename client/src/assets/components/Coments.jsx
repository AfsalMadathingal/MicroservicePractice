import React from "react";

const Coments = ({ comments }) => {






  const rendered = comments.map((coment) => {
    return <li key={coment.id}>{coment.content}</li>;
  });

  return (
    <div className="h-full">
      <ul className="bg-blue-400">
        {rendered}
      </ul>
    </div>
  );
};

export default Coments;
