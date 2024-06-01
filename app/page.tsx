"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "@/app/dashboard.css";

export default function Dashboard() {
  const { isSignedIn, user, isLoaded } = useUser();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {isSignedIn && <h1 className="text-2xl">You are logged in!</h1>}
      <div className="flex flex-col items-center justify-center">
        {!isSignedIn ? (
          <>
            <Header placeHolderText="Welcome Back!" />
            <div className="m-3 flex flex-col p-8 bg-white w-[420px] rounded-md border-black border-[1.5px]">
              <label className="mb-1 text-sm font-bold">Email Address...</label>
              <input
                type="email"
                placeholder="Email..."
                className="mb-4 text-sm w-full rounded-md input"
              />
              <div className="p-4 w-full text-sm font-bold text-white rounded-md btn">
                <Link href="/sign-in" className="self-center">
                  Login
                </Link>
              </div>

              <div className="w-full mt-6 mb-4 text-gray-400 text-sm font-bold divider">
                OR
              </div>

              <label className="w-full text-center mb-3 text-sm font-bold">
                Get Started with ContentBlocks
              </label>
              <div className="mb-4 p-4 w-full text-sm font-bold text-white rounded-md btn">
                <Link href="/sign-up" className="self-center">
                  Create Your Account
                </Link>
              </div>
              <label className="w-full text-center text-sm">
                Your first workspace is free!
              </label>
            </div>
            <Footer />
          </>
        ) : (
          <UserButton afterSignOutUrl="/" />
        )}
      </div>
    </div>
  );
}
