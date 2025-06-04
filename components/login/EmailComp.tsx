import React from "react";

const EmailComp = () => {
  return (
    <main className="flex min-h-screen flex-1 flex-col max-md:pb-14 sm:px-14">
      <div className="mx-auto w-full max-w-[2000px] bg-back">
        <main className=" min-h-screen grid grid-cols-3">
          <section className="col-span-1 min-h-screen rounded-r-4xl bg-linear-to-tr from-blue-100 to-black-100 flex-center">
            <div className="px-10 text-white">
              <p className="">
                Pitch Perfect AI has transformed the way I practice my sales
                pitches. The role-play scenarios feel real, and the personalized
                feedback helps me refine my approach every time. I feel more
                confident in client meetings now!"
              </p>
              <h3 className="mt-10 h3-medium">Alex M.,</h3>
              <p className="mt-5">Enterprise Sales Executive</p>
              <div className="flex gap-2 mt-10">
                <div className="h-2 w-2 rounded-full bg-white"></div>
                <div className="h-2 w-2 rounded-full bg-white"></div>
                <div className="h-2 w-2 rounded-full bg-white"></div>
              </div>
            </div>
          </section>
          <section className="col-span-2 flex-center">
            <div className="flex flex-col">
              <h1 className="text-center h1-medium text-black-200">
                Create an Account here
              </h1>
            </div>
          </section>
        </main>
      </div>
    </main>
  );
};

export default EmailComp;
