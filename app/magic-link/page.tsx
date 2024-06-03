"use client";
import React, { useState } from "react";
import { useAuth, useSignIn } from "@clerk/nextjs";
import type { NextPage } from "next";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { emailAtom } from "../atoms/authAtoms";
import "@/app/dashboard.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ForgotPasswordPage: NextPage = () => {
  const [email, setEmail] = useAtom(emailAtom);
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [successfulCreation, setSuccessfulCreation] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();
  const { isSignedIn } = useAuth();
  const { isLoaded, signIn, setActive } = useSignIn();

  if (!isLoaded) {
    return null;
  }

  if (isSignedIn) {
    router.push("/");
  }

  async function create(e: React.FormEvent) {
    e.preventDefault();
    await signIn
      ?.create({
        strategy: "reset_password_email_code",
        identifier: email,
      })
      .then((_) => {
        setSuccessfulCreation(true);
        setError("");
      })
      .catch((err) => {
        console.error("error", err.errors[0].longMessage);
        setError(err.errors[0].longMessage);
      });
  }

  async function reset(e: React.FormEvent) {
    e.preventDefault();
    await signIn
      ?.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password,
      })
      .then((result) => {
        if (result.status === "complete") {
          setActive({ session: result.createdSessionId });
          setError("");
        } else {
          console.log(result);
        }
      })
      .catch((err) => {
        console.error("error", err.errors[0].longMessage);
        setError(err.errors[0].longMessage);
      });
  }

  return (
    <>
      <Header placeHolderText="Reset Your Password!" />
      <div className="my-3 flex flex-col p-8 bg-white w-[26.25rem] rounded-md border-black border-[1.5px]">
        <form onSubmit={!successfulCreation ? create : reset}>
          {!successfulCreation && (
            <>
              <label htmlFor="email" className="mb-1 text-sm font-bold">
                Email Address:
              </label>
              <input
                type="email"
                placeholder="Email Address..."
                className="mb-4 text-sm w-full rounded-md input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <button
                type="submit"
                className="p-4 w-full text-sm items-center font-bold text-white rounded-md btn"
              >
                Send password reset code
              </button>
              {error && <p>{error}</p>}
            </>
          )}

          {successfulCreation && (
            <>
              <label htmlFor="password" className="mb-1 text-sm font-bold">
                New Password:
              </label>
              <input
                type="password"
                className="mb-4 text-sm w-full rounded-md input"
                placeholder="New Password..."
                onChange={(e) => setPassword(e.target.value)}
              />

              <label htmlFor="password" className="mb-1 text-sm font-bold">
                Password reset code:{" "}
                <span className="text-sm font-medium italic">
                  (Check your email inbox)
                </span>
              </label>
              <input
                type="text"
                className="mb-4 text-sm w-full rounded-md input"
                placeholder="Password Reset Code..."
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />

              <button
                type="submit"
                className="p-4 w-full text-sm items-center font-bold text-white rounded-md btn"
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

export default ForgotPasswordPage;
