"use client";
import React, { useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z, ZodType } from "zod";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  CreatePasswordSchema,
  EmailSchema,
  PasswordSchema,
  ProfessionalSchema,
  ResetPasswordOtpSchema,
  SignInSchema,
  SignUpSchema,
} from "@/lib/validations";
import ROUTES from "@/constants/routes";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/state";

const SigningForm = ({
  page,
  heading,
  subHeading,
  btnTxt,
  routingText,
  routingTo,
  redirect = "/",
}: {
  page: string;
  heading: string;
  subHeading?: string;
  btnTxt: string;
  routingText: string;
  routingTo: string;
  redirect?: string; // Optional, not used in this component but can be useful for routing
}) => {
  const router = useRouter();
  const user = useSelector((state: any) => state.global.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUser("singlas107@gbhnml.efvg"));
  }, []);
  console.log({ user });
  // const dispatch = useDispatch()
  let formSchema: ZodType<any>;
  let defaultValues: any;

  if (page === "signup") {
    formSchema = SignUpSchema;
    defaultValues = { email: "", password: "" };
  } else if (page === "signin") {
    formSchema = SignInSchema;
    defaultValues = { email: "", password: "" };
  } else if (page === "password") {
    formSchema = PasswordSchema;
    defaultValues = { password: "" };
  } else if (page === "confirmPassword") {
    formSchema = CreatePasswordSchema;
    defaultValues = { password: "", confirmPassword: "" };
  } else if (page === "otp") {
    formSchema = ResetPasswordOtpSchema;
    defaultValues = { otp: "", password: "", confirmPassword: "" };
  } else if (page === "aboutYouGroup") {
    formSchema = ProfessionalSchema;
    defaultValues = { name: "", companyName: "", jobTitle: "" };
  } else if (page === "aboutYou") {
    formSchema = ProfessionalSchema;
    defaultValues = { name: "", aspiringRole: "" };
  } else {
    formSchema = EmailSchema;
    defaultValues = { email: "" };
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    if (page === "signin") {
      router.push(ROUTES.ENTER_PASSWORD);
    }
  };

  const getFieldLabel = (page: string, fieldName: string): string => {
    if (fieldName === "email") return "Email address*";

    if (fieldName === "password") {
      if (page === "otp") return "Create new password*";
      return "Enter your password*";
    }

    if (fieldName === "confirmPassword") {
      if (page === "otp") return "Confirm new password*";
      return "Create your password*";
    }

    if (fieldName === "otp") return "Enter Authentication Code*";
    if (page === "aboutYouGroup" || page === "aboutYou") {
      if (fieldName === "companyName") return "Company Name*";
      if (fieldName === "name") return "Your Name*";
      if (fieldName === "jobTitle") return "Job Title*";
      if (fieldName === "aspiringRole") return "Aspiring Role*";
    }

    // Default fallback
    return fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
  };

  const getPlaceHolderText = (page: string, fieldName: string) => {
    if (fieldName === "email") return "e.g. johndoe@sales.com";
    if (fieldName === "otp") return "xxxxxx";
    if (fieldName === "password" || fieldName === "confirmPassword")
      return "*********";
  };

  const showLink =
    page !== "confirmPassword" &&
    page !== "otp" &&
    heading !== "Reset Password" &&
    page !== "aboutYouGroup" &&
    page !== "aboutYou";
  console.log(redirect, "redirectredirect");
  return (
    <>
      <h1 className="text-center heading text-black-200 mb-8 px-10">
        {heading}
      </h1>
      {subHeading && (
        <p className="text-center mb-4 -mt-4 text-grey-200 px-10">
          {subHeading}
        </p>
      )}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 px-10"
        >
          {Object.keys(defaultValues).map((fieldName) => (
            <FormField
              key={fieldName}
              control={form.control}
              name={fieldName as any}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black-200 paragraph-medium mb-4 mx-10">
                    {getFieldLabel(page, fieldName)}
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="min-h-[54px] rounded-full bg-white mx-10 max-sm:w-[340px] max-w-[400px] px-6 py-4 paragraph-regular border-blue-400 border-2 placeholder:text-grey-100 placeholder:placeholderr  focus-visible:border-3 focus-visible:border-blue-400 focus-visible:ring-0 focus-visible:shadow-none"
                      placeholder={getPlaceHolderText(page, fieldName)}
                      {...field}
                      type={
                        fieldName === "password" ||
                        fieldName === "confirmPassword"
                          ? "password"
                          : "text"
                      }
                    />
                  </FormControl>
                  <FormMessage className=" mx-15" />
                </FormItem>
              )}
            />
          ))}

          <Button
            className=" rounded-4xl min-h-[56px] bg-blue-200  mx-10 max-sm:w-[340px] sm:w-[400px] cursor-pointer"
            type="submit"
            onClick={() => router.push(redirect)}
            // disabled={!form.formState.isValid || form.formState.isSubmitting}
          >
            {btnTxt}
          </Button>
          {showLink && (
            <p className="text-center text-normal1 px-10 text-black-200">
              {routingText}{" "}
              <Link
                href="/reset-password"
                className="text-semibold text-blue-200"
              >
                {routingTo}
              </Link>
            </p>
          )}
        </form>
      </Form>
    </>
  );
};

export default SigningForm;
