"use client";
import SigningForm from "@/components/forms/SigningForm";
import LeftSection from "@/components/leftSideAuth/LeftSection";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface props {
  heading: string;
  subHeading: string;
  btnTxt: string;
  imageSrc: string;
  btn?: boolean;
}

const BasicStructure: React.FC<props> = ({
  heading,
  subHeading,
  btnTxt,
  imageSrc,
  btn = true,
}) => {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-1 flex-col px-20 max-sm:px-10">
      <div className="mx-auto w-full max-w-[2000px] bg-back min-h-screen flex-center relative">
        <div className="absolute top-10 left-1/2 transform -translate-x-1/2">
          <Image src="/Logo.png" height={50} width={53} alt="Logo" />
        </div>
        <main className="flex-col flex-center gap-6 mt-10 ">
          <h1 className="text-center h1-medium text-black-200 ">{heading}</h1>
          <h3 className="text-center h3-medium text-grey-200 sm:max-w-[600px]">
            {subHeading}
          </h3>
          <Image
            src={imageSrc}
            alt="tick"
            height={180}
            width={180}
            className="mt-10 mb-20"
          />
          {btn && (
            <Button
              className=" text-white w-[400px] max-sm:w-[200px] min-h-[56px] rounded-4xl"
              onClick={() => router.push("/about-you")}
            >
              {btnTxt}
            </Button>
          )}
        </main>
      </div>
    </div>
  );
};

export default BasicStructure;
