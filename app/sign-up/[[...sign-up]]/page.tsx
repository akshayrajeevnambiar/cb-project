"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useSignUp } from "@clerk/nextjs";
import SignupForm from "@/app/components/SignupForm";
import VerifyForm from "@/app/components/VerifyForm";
import bcrypt from "bcryptjs";
import { PasswordHasher } from "@/app/util/PasswordHasher";

import { emailCode, errorAtom, isVerifiedAtom } from "@/app/atoms/authAtoms";

import { useAtom } from "jotai";

const Signup = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [clerkError, setClerkError] = useAtom(errorAtom);
  const router = useRouter();
  const [verifying, setVerifying] = useAtom(isVerifiedAtom);
  const [code, setCode] = useAtom(emailCode);

  const signUpWithEmail = async ({
    username,
    emailAddress,
    password,
  }: {
    username: string;
    emailAddress: string;
    password: string;
  }) => {
    if (!isLoaded) {
      return;
    }

    try {
      const hashedPassword = PasswordHasher(password);
      console.log("hashedPassword - " + hashedPassword);

      await signUp.create({
        username,
        emailAddress,
        password: hashedPassword,
      });
      // send the email.
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // change the UI to our pending section.
      setVerifying(true);
    } catch (err: any) {
      setClerkError(err.errors[0].message);
    }
  };

  const handleVerify = async (e: FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });
      if (completeSignUp.status !== "complete") {
        console.log(JSON.stringify(completeSignUp, null, 2));
      }

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.push("/");
      }
    } catch (err) {
      console.log("Error:", JSON.stringify(err, null, 2));
    }
  };

  return (
    <>
      {!verifying ? (
        <SignupForm signUpWithEmail={signUpWithEmail} />
      ) : (
        <VerifyForm handleVerify={handleVerify} />
      )}
    </>
  );
};

export default Signup;
