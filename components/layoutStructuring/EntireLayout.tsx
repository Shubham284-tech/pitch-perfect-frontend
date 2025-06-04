"use client";
import SigningForm from "@/components/forms/SigningForm";
import LeftSection from "@/components/leftSideAuth/LeftSection";
import Image from "next/image";
import React from "react";

interface Props {
  page: string;
  heading: string;
  btnTxt: string;
  routingTo: string;
  routingText: string;
  subHeading?: string;
  redirect?: string; // Optional, not used in this component but can be useful for routing
}
const EntireLayout = ({
  page,
  heading,
  btnTxt,
  routingTo,
  routingText,
  subHeading,
  redirect = "/",
}: Props) => {
  return (
    <div className="flex sm:min-h-screen min-w-full flex-1 flex-col mx-auto bg-back">
      <main className=" sm:min-h-screen sm:grid grid-cols-9">
        <section className="py-10 sm:py-0 min-h-[300px] col-span-3 xl:col-span-2 sm:min-h-screen max-sm:rounded-b-4xl sm:rounded-r-4xl bg-linear-to-tr from-blue-100 to-black-100 flex-center">
          <LeftSection />
        </section>
        <section className=" col-span-6 xl:col-span-7 relative">
          <Image
            src="/Logo.png"
            height={50}
            width={53}
            alt="Logo"
            className="sm:mt-10 -mt-20 absolute left-1/2 transform -translate-x-1/2"
          />{" "}
          <div className="min-h-screen max-sm:mt-40 flex flex-col flex-start sm:flex-center ">
            <SigningForm
              page={page}
              heading={heading}
              btnTxt={btnTxt}
              routingTo={routingTo}
              routingText={routingText}
              subHeading={subHeading}
              redirect={redirect}
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default EntireLayout;
