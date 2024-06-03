"use client";

import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useSignUp } from "@clerk/nextjs";
import SignupForm from "@/app/components/SignupForm";
import VerifyForm from "@/app/components/VerifyForm";
import { PasswordHasher } from "@/app/util/PasswordHasher";
import { emailCode, errorAtom, isVerifiedAtom } from "@/app/atoms/authAtoms";
import { useAtom } from "jotai";

const Signup = () => {
  const { isLoaded, signUp, setActive } = useSignUp(); // Using useSignUp hook to handle sign up process

  const [clerkError, setClerkError] = useAtom(errorAtom); // Using useAtom hook to manage error state

  const router = useRouter(); // Accessing router object for navigation

  const [verifying, setVerifying] = useAtom(isVerifiedAtom); // Using useAtom hook to manage verification state

  const [code, setCode] = useAtom(emailCode); // Using useAtom hook to manage email verification code

  // Function to sign up with email
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
      const hashedPassword = PasswordHasher(password); // Hashing the password
      console.log("hashedPassword - " + hashedPassword);

      await signUp.create({
        username,
        emailAddress,
        password: hashedPassword, // Sending hashed password for sign up
      });

      // Preparing email address verification
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // Changing UI to pending verification section
      setVerifying(true);
    } catch (err: any) {
      // Handling sign up errors
      setClerkError(err.errors[0].message);
    }
  };

  // Function to handle email verification
  const handleVerify = async (e: FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    try {
      // Attempting email address verification
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      // Checking verification status
      if (completeSignUp.status !== "complete") {
        console.log(JSON.stringify(completeSignUp, null, 2));
      }

      // Redirecting to home page after successful verification
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
      {/* Conditional rendering based on verification state */}
      {!verifying ? (
        <SignupForm signUpWithEmail={signUpWithEmail} /> // Render SignupForm if not verifying
      ) : (
        <VerifyForm handleVerify={handleVerify} /> // Render VerifyForm if verifying
      )}
    </>
  );
};

export default Signup;
