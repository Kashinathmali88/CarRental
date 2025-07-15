import React from "react";

function Title({ text1, text2 }) {
  return (
    <div>
      <h1 className="text-4xl">{text1}</h1>
      <p className="text-lg text-gray-500 mt-2">{text2}</p>
    </div>
  );
}

export default Title;
