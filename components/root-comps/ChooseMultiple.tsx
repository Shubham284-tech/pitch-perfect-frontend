"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import Link from "next/link";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

interface ChooseProps {
  link: string;
  arr1: {
    src: string;
    text: string;
  }[];
  arr2: {
    src: string;
    text: string;
  }[];
  arr3: {
    src: string;
    text: string;
  }[];
  selected1: string;
  selected2: string;
  selected3: string;
  setSelected1: (value: string) => void;
  setSelected2: (value: string) => void;
  setSelected3: (value: string) => void;
  heading: string;
  secondaryHeading1: string;
  secondaryHeading2: string;
  secondaryHeading3: string;
  btnText: string;
  showImages?: boolean;
  showSkip?: boolean;
  randomBtn?: boolean;
}

const ChooseMultiple: React.FC<ChooseProps> = ({
  arr1,
  arr2,
  arr3,
  selected1,
  selected2,
  selected3,
  setSelected1,
  setSelected2,
  setSelected3,
  link,
  heading,
  btnText,
  secondaryHeading1,
  secondaryHeading2,
  secondaryHeading3,
  showImages = true,
  showSkip = false,
  randomBtn = false,
}) => {
  const router = useRouter();

  return (
    <div className="relative min-h-screen min-w-full bg-back flex flex-1 flex-col mx-auto custom-scrollbar">
      <div className="sm:mt-10 mt-10 absolute left-1/2 transform -translate-x-1/2">
        <Image src="/Logo.png" height={50} width={53} alt="Logo" />{" "}
      </div>
      <div className="lg:w-[840px] md:w-[800px] flex m-auto flex-col gap-5 p-10 pt-20 mt-10">
        {showSkip ? (
          <div className="sm:flex-between flex max-sm:flex-col-reverse gap-3 align-center not-first-of-type:">
            <h1 className="heading text-center sm:text-left">{heading}</h1>
            <p className="bg-white rounded-2xl px-2 py-1 text-grey-200 cursor-pointer max-w-[70px] text-center ms-auto">
              Skip
            </p>
          </div>
        ) : (
          <h1 className="h1-medium text-center sm:text-left">{heading}</h1>
        )}

        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <p className="p-small text-grey-200 text-center sm:text-left">
              {secondaryHeading1}
            </p>
            <div className="flex flex-wrap justify-center sm:justify-between gap-5 w-full">
              {arr1.map(
                (value: { src: string; text: string }, index: number) => (
                  <div
                    key={index}
                    className={`bg-white cursor-pointer flex-grow basis-[200px] max-w-[250px] sm:min-h-[120px] rounded-2xl p-3 ${selected1 === value.text ? "border-2 border-blue-100" : ""}`}
                    onClick={() => {
                      setSelected1(value.text);
                    }}
                  >
                    <div
                      key={index}
                      className={`flex flex-col ${!showImages ? "justify-center" : "justify-between"} min-h-full p-2`}
                    >
                      {showImages && (
                        <Image
                          src={value.src}
                          alt="fv"
                          height={24}
                          width={24}
                        />
                      )}
                      <h3 className="text-black-300 text-normal">
                        {value.text}
                      </h3>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="p-small text-grey-200 text-center sm:text-left">
              {secondaryHeading2}
            </p>
            <div className="flex flex-wrap justify-center sm:justify-between gap-5 w-full">
              {arr2.map(
                (value: { src: string; text: string }, index: number) => (
                  <div
                    key={index}
                    className={`bg-white cursor-pointer flex-grow basis-[200px] max-w-[250px] sm:min-h-[120px] rounded-2xl p-3 ${selected2 === value.text ? "border-2 border-blue-100" : ""}`}
                    onClick={() => {
                      setSelected2(value.text);
                    }}
                  >
                    <div
                      key={index}
                      className={`flex flex-col ${!showImages ? "justify-center" : "justify-between"} min-h-full p-2`}
                    >
                      {showImages && (
                        <Image
                          src={value.src}
                          alt="fv"
                          height={24}
                          width={24}
                        />
                      )}
                      <h3 className="text-black-300 text-normal">
                        {value.text}
                      </h3>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="p-small text-grey-200 text-center sm:text-left">
              {secondaryHeading3}
            </p>
            <div className="flex flex-wrap justify-center sm:justify-between gap-5 w-full">
              {arr3.map(
                (value: { src: string; text: string }, index: number) => (
                  <div
                    key={index}
                    className={`bg-white cursor-pointer flex-grow basis-[200px] max-w-[250px] sm:min-h-[120px] rounded-2xl p-3 ${selected3 === value.text ? "border-2 border-blue-100" : ""}`}
                    onClick={() => {
                      setSelected3(value.text);
                    }}
                  >
                    <div
                      key={index}
                      className={`flex flex-col ${!showImages ? "justify-center" : "justify-between"} min-h-full p-2`}
                    >
                      {showImages && (
                        <Image
                          src={value.src}
                          alt="fv"
                          height={24}
                          width={24}
                        />
                      )}
                      <h3 className="text-black-100 text-normal">
                        {value.text}
                      </h3>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        <div className={`max-sm:flex-col gap-3 flex-between`}>
          <Link href={link}>
            <Image
              src="/back.png"
              alt="fv"
              className="object-contain"
              height={56}
              width={56}
            />
          </Link>

          <div className="flex gap-3 max-sm:flex-col">
            {randomBtn && (
              <Button
                variant="outline"
                className=" w-[150px] md:w-[230px] h-[56px] rounded-4xl cursor-pointer border-1 border-blue-400 text-blue-400"
              >
                Randomize
              </Button>
            )}
            <Button
              disabled={selected1.length === 0}
              onClick={() => router.push("/b2c/motivates")}
              className="bg-blue-200 w-[150px] md:w-[230px] h-[56px] rounded-4xl cursor-pointer"
            >
              {btnText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseMultiple;
