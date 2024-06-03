"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "@/app/dashboard.css";
import { useAtom } from "jotai";
import { emailAtom } from "./atoms/authAtoms";
import { useState } from "react";
import LandingPage from "./components/LandingPage";

// Dashboard component
export default function Dashboard() {
  // Destructuring user information from useUser hook
  const { isSignedIn, user, isLoaded } = useUser();

  const [email, setEmail] = useAtom(emailAtom); // Using emailAtom with Jotai's useAtom hook

  const [isDisabled, setIsDisabled] = useState<boolean>(true); // State to manage disabled state of login button

  return (
    <>
      {/* Conditional rendering based on user authentication status */}
      {isSignedIn ? (
        <LandingPage /> // Render LandingPage if user is signed in
      ) : (
        <>
          <Header placeHolderText="Welcome Back!" />{" "}
          {/* Header with placeholder text */}
          {/* Login form */}
          <div className="m-3 flex flex-col p-8 bg-white w-[20rem] sm:w-[26.25rem] lg:[28rem] rounded-md border-black border-[1.5px]">
            <label className="mb-1 text-sm font-bold">Email Address:</label>{" "}
            {/* Email address label */}
            {/* Input field for email address */}
            <input
              type="email"
              placeholder="Email..."
              id="email"
              className="mb-4 text-sm w-full rounded-md input"
              // Handling email input change
              onChange={(e) => {
                setEmail(e.target.value); // Update email state with input value
                // Enable login button if email is not empty
                e.target.value === ""
                  ? setIsDisabled(true)
                  : setIsDisabled(false);
              }}
            />
            {/* Conditional rendering of login button based on email input */}
            {isDisabled ? (
              // Disabled login button if email is empty
              <button
                className="p-4 w-full text-sm items-center font-bold text-white rounded-md btn-disabled"
                disabled
              >
                Login
              </button>
            ) : (
              // Enabled login button if email is not empty
              <Link
                href="/sign-in"
                className="p-4 w-full text-sm items-center font-bold text-white rounded-md btn"
              >
                Login
              </Link>
            )}
            {/* Divider */}
            <div className="w-full mt-6 mb-4 text-gray-400 text-sm font-bold divider">
              OR
            </div>
            {/* Label for creating an account */}
            <label className="w-full text-center mb-3 text-sm font-bold">
              Get Started with ContentBlocks
            </label>
            {/* Link to sign up page */}
            <Link
              href="/sign-up"
              className="block mb-4 p-4 w-full items-center text-sm font-bold text-white rounded-md btn"
            >
              Create Your Account
            </Link>
            {/* Message about free workspace */}
            <label className="w-full text-center text-sm">
              Your first workspace is free!
            </label>
          </div>
          <Footer /> {/* Footer component */}
        </>
      )}
    </>
  );
}
