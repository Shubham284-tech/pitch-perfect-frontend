import { Label } from "@radix-ui/react-label";
import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const FormFields = ({ page }: { page: string }) => {
  return (
    <>
      {page === "signUp" && (
        <div className="min-w-[400px] flex flex-col gap-2 mt-10">
          <Label htmlFor="Email address">Email address*</Label>
          <Input
            id="Email address"
            className="py-3 px-5 rounded-full min-h-[54px]"
          />
        </div>
      )}
      <Button className="bg-blue-200 rounded-full mt-10">Continue</Button>
      {page === "signUp" && (
        <h5 className="paragraph-regular text-black-200 mt-10 text-center font-medium">
          Already have an account?{" "}
          <span className="text-blue-300 font-medium">Login</span>
        </h5>
      )}
    </>
  );
};

export default FormFields;
