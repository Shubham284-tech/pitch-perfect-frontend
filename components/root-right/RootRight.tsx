"use client";
import React from "react";
import { Button } from "../ui/button";
import { stepsArray } from "@/constants/Constants";
import { useRouter } from "next/navigation";

const RootRight = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen max-sm:mt-40 flex flex-col flex-start sm:flex-center relative">
      <h1 className="text-center h1-medium text-black-200 mb-8 px-10">
        Time to deliver your sales pitch!
      </h1>
      <div className="flex-center gap-8">
        {stepsArray.map(
          (item: { step: string; text: string }, index: number) => (
            <div
              key={index}
              className="w-[230px] h-[120px] rounded-2xl bg-white border-1 border-blue-100 flex flex-col justify-center gap-3 pt-2 px-[16px]"
            >
              <p className="text-grey-200 paragraph-regular">{item.step}</p>
              <p className="h3-semibold">{item.text}</p>
            </div>
          )
        )}
      </div>
      <Button
        className="bg-blue-200 rounded-full min-w-[400px] min-h-[54px] absolute bottom-20"
        onClick={() => router.push("/seller/choose-industry")}
      >
        Start New Pitch
      </Button>
    </div>
  );
};

export default RootRight;
