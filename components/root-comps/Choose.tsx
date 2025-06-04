"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import Link from "next/link";
import { Button } from "../ui/button";
// import { useGetCoursesQuery } from "@/state/api";
import { useRouter } from "next/navigation";

interface ChooseProps {
  link: string;
  arr: {
    src: string;
    text: string;
  }[];
  selected: string;
  setSelected: (value: string) => void;
  heading: string;
  secondaryHeading: string;
  btnText: string;
  showImages?: boolean;
  showSkip?: boolean;
  randomBtn?: boolean;
  redirect?: string; // Optional, not used in this component but can be useful for routing
}

const Choose: React.FC<ChooseProps> = ({
  arr,
  selected,
  setSelected,
  link,
  heading,
  btnText,
  secondaryHeading,
  showImages = true,
  showSkip = false,
  randomBtn = false,
  redirect = "/seller/choose-industry", // Default value for page
}) => {
  const router = useRouter();
  // const { data: courses, isLoading: load, isError } = useGetCoursesQuery({});
  // console.log({ courses, load, isError });

  const items = [
    "Insurance Brokerage",
    "Software Development",
    "Retail",
    "Healthcare",
    "Software",
    "Softwa",
  ];
  const [showList, setShowList] = useState(false);
  const [query, setQuery] = useState("");
  const [apiResults, setApiResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  );
  useEffect(() => {
    setSelected(query);
  }, [query]);

  useEffect(() => {
    if (query.length < 1) return;

    const delayDebounce = setTimeout(() => {
      // You can limit by length here if needed
      if (query.length > 3) {
        setIsLoading(true);
        fetch(`/api/search?q=${encodeURIComponent(query)}`)
          .then((res) => res.json())
          .then((data) => {
            setApiResults(data);
            setIsLoading(false);
          })
          .catch((err) => {
            console.error("Search error:", err);
            setIsLoading(false);
          });
      }
    }, 300); // 3-second debounce

    return () => clearTimeout(delayDebounce); // Cleanup previous timeout
  }, [query]);

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
          <h1 className="heading text-center sm:text-left">{heading}</h1>
        )}

        <div className="relative min-h-[54px]">
          <Image
            src="/search.png"
            alt="search"
            width={20}
            height={20}
            className="absolute left-5 top-5"
          />
          <Input
            className="z-20 min-h-[54px] rounded-full bg-white max-w-full pl-12 pr-6 py-4 paragraph-regular border-blue-400 border-2 placeholder:text-grey-100  focus-visible:border-3 focus-visible:border-blue-400 focus-visible:ring-0 focus-visible:shadow-none"
            placeholder="Find here"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowList(e.target.value.length > 0);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && query.length > 3) {
                e.preventDefault();
                setShowList(false);
              }
            }}
          />
          {showList && filteredItems.length > 0 && (
            <div className="absolute -mt-8 w-full pt-10 pb-3 rounded-b-xl border-x border-b border-blue-400 shadow-md max-h-60 overflow-y-auto">
              {filteredItems.map((item, i) => (
                <div
                  key={i}
                  className={`px-4 py-2 cursor-pointer hover:bg-blue-50 
                     
                    ${selected === item ? "border-2 text-blue-500" : "text-black"}
                    `}
                  onClick={() => {
                    setSelected(item);
                    setShowList(false);
                    setQuery(item);
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>
        {!showList && (
          <>
            <p className="p-small text-grey-200 text-center sm:text-left">
              {secondaryHeading}
            </p>
            <div className="flex flex-wrap justify-center sm:justify-between gap-5 w-full">
              {arr.map(
                (value: { src: string; text: string }, index: number) => (
                  <div
                    key={index}
                    className={`bg-white cursor-pointer flex-grow basis-[200px] max-w-[250px] sm:min-h-[120px] rounded-2xl p-3 ${selected === value.text ? "border-2 border-blue-100" : ""}`}
                    onClick={() => {
                      setSelected(value.text);
                      setQuery(value.text);
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
          </>
        )}

        <div
          className={`max-sm:flex-col gap-3 flex-between ${showList ? "mt-70" : "mt-10"}`}
        >
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
              disabled={selected.length === 0}
              className="bg-blue-200 w-[150px] md:w-[230px] h-[56px] rounded-4xl cursor-pointer"
              onClick={() => router.push(redirect)}
            >
              {btnText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Choose;
