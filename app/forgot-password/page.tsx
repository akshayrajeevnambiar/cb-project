"use client";
import React, { FormEvent, useState } from "react";
import { useAuth, useSignIn } from "@clerk/nextjs";
import type { NextPage } from "next";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { emailAtom } from "../atoms/authAtoms";
import "@/app/dashboard.css";
import { PasswordHasher } from "@/app/util/PasswordHasher";
import Header from "../components/Header";
import Footer from "../components/Footer";

// ForgotPasswordPage component
const ForgotPasswordPage: NextPage = () => {
  const [email, setEmail] = useAtom(emailAtom); // State variable for email
  const [password, setPassword] = useState(""); // State variable for password
  const [code, setCode] = useState(""); // State variable for code
  const [successfulCreation, setSuccessfulCreation] = useState(false); // State variable for successful creation
  const [error, setError] = useState(""); // State variable for error message

  // Initialize router
  const router = useRouter();

  // Retrieve authentication status and sign-in method from Clerk
  const { isSignedIn } = useAuth();
  const { isLoaded, signIn, setActive } = useSignIn();

  // If Clerk authentication is not yet loaded, return null
  if (!isLoaded) {
    return null;
  }

  // If user is already signed in, redirect to home page
  if (isSignedIn) {
    router.push("/");
  }

  // Function to handle creation of password reset request
  async function create(e: FormEvent) {
    e.preventDefault();
    await signIn
      ?.create({
        strategy: "reset_password_email_code",
        identifier: email,
      })
      .then((_) => {
        setSuccessfulCreation(true); // Set successfulCreation to true
        setError(""); // Set error message
      })
      .catch((err: any) => {
        console.error("error", err.errors[0].longMessage);
        setError(err.errors[0].longMessage);
      });
  }

  // Function to handle resetting password
  async function reset(e: FormEvent) {
    e.preventDefault();
    const hashedPassword = PasswordHasher(password); // Hash the new password
    await signIn
      ?.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password: hashedPassword, // Provide the hashed password
      })
      .then((result) => {
        if (result.status === "complete") {
          setActive({ session: result.createdSessionId }); // Set active session
          setError(""); // Clear error
        } else {
          console.log(result); // Log result if status is not complete
        }
      })
      .catch((err) => {
        console.error("error", err.errors[0].longMessage);
        setError(err.errors[0].longMessage); // Set error message
      });
  }

  // Return JSX for ForgotPasswordPage componen
  return (
    <>
      <Header placeHolderText="Reset Your Password!" />
      {/* Container for form */}
      <div className="my-3 flex flex-col p-8 bg-white w-[26.25rem] rounded-md border-black border-[1.5px]">
        <form onSubmit={!successfulCreation ? create : reset}>
          {" "}
          {/* Conditional rendering based on successfulCreation state */}
          {!successfulCreation && (
            <>
              {/* Form for creating password reset request */}
              <label
                htmlFor="email"
                className="mb-1 text-xs sm:text-sm lg:text-base font-bold"
              >
                Email Address:
              </label>
              <input
                type="email"
                placeholder="Email Address..."
                className="mb-4 text-xs sm:text-sm lg:text-base w-full rounded-md input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <button
                type="submit"
                className="p-4 w-full text-xs sm:text-sm lg:text-base items-center font-bold text-white rounded-md btn"
              >
                Send password reset code
              </button>
              {error && (
                /* Error message */
                <p className="mb-3 text-xs sm:text-sm lg:text-base font-semibold text-red-600">
                  {error}
                </p>
              )}
            </>
          )}
          {successfulCreation && (
            <>
              {/* Form for resetting password */}
              <label
                htmlFor="password"
                className="mb-1 text-xs sm:text-sm lg:text-base font-bold"
              >
                New Password:
              </label>
              <input
                type="password"
                className="mb-4 text-xs sm:text-sm lg:text-base w-full rounded-md input"
                placeholder="New Password..."
                onChange={(e) => setPassword(e.target.value)}
              />

              <label
                htmlFor="password"
                className="mb-1 text-xs sm:text-sm lg:text-base font-bold"
              >
                Password reset code:{" "}
                <span className="text-xs sm:text-sm lg:text-base font-medium italic">
                  (Check your email inbox)
                </span>
              </label>
              <input
                type="text"
                className="mb-4 text-xs sm:text-sm lg:text-base w-full rounded-md input"
                placeholder="Password Reset Code..."
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />

              <button
                type="submit"
                className="p-4 w-full text-xs sm:text-sm lg:text-base items-center font-bold text-white rounded-md btn"
              >
                Reset
              </button>
              {error && <p>{error}</p>}
            </>
          )}
        </form>
      </div>
      <Footer />
    </>
  );
};

export default ForgotPasswordPage; // Export ForgotPasswordPage component
