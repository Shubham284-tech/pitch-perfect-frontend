import LeftSection from "@/components/leftSideAuth/LeftSection";
import Image from "next/image";
import React from "react";
import RootRight from "../root-right/RootRight";

const RootLayout = () => {
  return (
    <div className="flex sm:min-h-screen min-w-full flex-1 flex-col mx-auto bg-back">
      <main className=" sm:min-h-screen sm:grid grid-cols-9">
        <section className="py-10 sm:py-0 min-h-[300px] col-span-3 xl:col-span-2 sm:min-h-screen max-sm:rounded-b-4xl sm:rounded-r-4xl bg-linear-to-tr from-blue-100 to-black-100 flex-center">
          <LeftSection />
        </section>
        <section className="col-span-6 xl:col-span-7 relative">
          <div className="sm:mt-10 -mt-20 absolute left-1/2 transform -translate-x-1/2">
            <Image src="/Logo.png" height={50} width={53} alt="Logo" />{" "}
            <h1 className=" h1-medium text-blue-200 mb-8 text-[48px] mt-10">
              Hello Sana!
            </h1>
          </div>
          <RootRight />
        </section>
      </main>
    </div>
  );
};

export default RootLayout;
