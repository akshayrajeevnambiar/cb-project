"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "@/app/dashboard.css";
import { useAtom } from "jotai";
import { emailAtom } from "./atoms/authAtoms";
import { useState } from "react";

export default function Dashboard() {
  const { isSignedIn, user, isLoaded } = useUser();
  const [email, setEmail] = useAtom(emailAtom);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  return (
    <>
      {isSignedIn && <h1 className="text-2xl">You are logged in!</h1>}
      {!isSignedIn ? (
        <>
          <Header placeHolderText="Welcome Back!" />
          <div className="m-3 flex flex-col p-8 bg-white w-[20rem] sm:w-[26.25rem] lg:[28rem] rounded-md border-black border-[1.5px]">
            <label className="mb-1 text-sm font-bold">Email Address:</label>
            <input
              type="email"
              placeholder="Email..."
              id="email"
              className="mb-4 text-sm w-full rounded-md input"
              onChange={(e) => {
                setEmail(e.target.value);
                e.target.value === ""
                  ? setIsDisabled(true)
                  : setIsDisabled(false);
              }}
            />
            {isDisabled ? (
              <button
                className="p-4 w-full text-sm items-center font-bold text-white rounded-md btn-disabled"
                disabled
              >
                Login
              </button>
            ) : (
              <Link
                href="/sign-in"
                className="p-4 w-full text-sm items-center font-bold text-white rounded-md btn"
              >
                Login
              </Link>
            )}

            <div className="w-full mt-6 mb-4 text-gray-400 text-sm font-bold divider">
              OR
            </div>

            <label className="w-full text-center mb-3 text-sm font-bold">
              Get Started with ContentBlocks
            </label>

            <Link
              href="/sign-up"
              className="block mb-4 p-4 w-full items-center text-sm font-bold text-white rounded-md btn"
            >
              Create Your Account
            </Link>

            <label className="w-full text-center text-sm">
              Your first workspace is free!
            </label>
          </div>
          <Footer />
        </>
      ) : (
        <UserButton afterSignOutUrl="/" />
      )}
    </>
  );
}
