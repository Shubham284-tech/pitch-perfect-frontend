import React from "react";

const LeftSection = () => {
  return (
    <div className="px-10 text-white p-mid">
      <p className="">
        Pitch Perfect AI has transformed the way I practice my sales pitches.
        The role-play scenarios feel real, and the personalized feedback helps
        me refine my approach every time. I feel more confident in client
        meetings now!"
      </p>
      <h3 className="mt-10 p-big">Alex M.,</h3>
      <p className="mt-5 p-vsmall">Enterprise Sales Executive</p>
      <div className="flex gap-2 mt-10">
        <div className="h-2 w-2 rounded-full bg-white"></div>
        <div className="h-2 w-2 rounded-full bg-white"></div>
        <div className="h-2 w-2 rounded-full bg-white"></div>
      </div>
    </div>
  );
};

export default LeftSection;
