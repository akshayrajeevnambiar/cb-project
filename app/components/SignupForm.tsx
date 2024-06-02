import Header from "./Header";
import "@/app/dashboard.css";
import Footer from "./Footer";

import {
  usernameAtom,
  emailAtom,
  passwordAtom,
  errorAtom,
} from "@/app/atoms/authAtoms";

import { useAtom } from "jotai";
import { useEffect, useState } from "react";

interface SignUpFormProps {
  signUpWithEmail: ({
    username,
    emailAddress,
    password,
  }: {
    username: string;
    emailAddress: string;
    password: string;
  }) => void;
}

const SignupForm = ({ signUpWithEmail }: SignUpFormProps) => {
  const [username, setUserName] = useAtom(usernameAtom);
  const [emailAddress, setEmailAddress] = useAtom(emailAtom);
  const [password, setPassword] = useAtom(passwordAtom);

  const [clerkError, setClerkError] = useAtom(errorAtom);

  useEffect(() => {
    const userName = document.getElementById("userName");
    const email = document.getElementById("email");
    const password = document.getElementById("password");

    if (clerkError === "That email address is taken. Please try another.") {
      (email as HTMLInputElement).classList.add("input-error");
      return;
    }

    if (clerkError === "That username is taken. Please try another.") {
      (userName as HTMLInputElement).classList.add("input-error");
      return;
    }

    if (
      clerkError ===
      "Password has been found in an online data breach. For account safety, please use a different password."
    ) {
      (password as HTMLInputElement).classList.add("input-error");
      return;
    }
  }, [clerkError]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Header placeHolderText="Create Your Account" />
      <div className="my-3 flex flex-col p-8 bg-white w-[26.25rem] rounded-md border-black border-[1.5px]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const target = e.target as typeof e.target & {
              userName: { value: string };
              email: { value: string };
              password: { value: string };
              rePassword: { value: string };
            };

            const userName = target.userName;
            const email = target.email;
            const passWord = target.password;
            const rePassword = target.rePassword;

            if (!userName || !email || !passWord || !rePassword) {
              console.error("All fields are required");
              return;
            }

            if (passWord.value !== rePassword.value) {
              (passWord as HTMLInputElement).classList.add("input-error");
              (rePassword as HTMLInputElement).classList.add("input-error");
              setClerkError("Passwords do not match");
              return;
            }

            setEmailAddress(email.value);
            setPassword(passWord.value);
            setUserName(userName.value);

            signUpWithEmail({
              username: userName.value,
              emailAddress: email.value,
              password: passWord.value,
            });
          }}
        >
          <label className="mb-1 text-sm font-bold">Username:</label>
          <input
            name="userName"
            id="userName"
            className="mb-4 text-sm w-full rounded-md input"
            placeholder="Username..."
            type="text"
            onChange={(e) => {
              (e.target as HTMLInputElement).classList.remove("input-error");
              setClerkError("");
            }}
            required
          />

          <label className="mb-1 text-sm font-bold">Email Address:</label>
          <input
            name="email"
            id="email"
            className="mb-4 text-sm w-full rounded-md input"
            placeholder="Email address..."
            type="email"
            onChange={(e) => {
              (e.target as HTMLInputElement).classList.remove("input-error");
              setClerkError("");
            }}
            required
          />

          <label className="mb-1 text-sm font-bold">Password:</label>
          <input
            name="password"
            className="mb-4 text-sm w-full rounded-md input"
            placeholder="Password..."
            id="password"
            type="password"
            onChange={(e) => {
              (e.target as HTMLInputElement).classList.remove("input-error");
              setClerkError("");
            }}
            required
          />

          <label className="mb-1 text-sm font-bold">Re-type Password:</label>
          <input
            name="rePassword"
            className="mb-4 text-sm w-full rounded-md input"
            placeholder="Re-type Password..."
            type="password"
            onChange={(e) => {
              (e.target as HTMLInputElement).classList.remove("input-error");
              setClerkError("");
            }}
            required
          />

          <h2>
            {clerkError && (
              <p className="mb-3 text-sm font-semibold text-red-600">
                {clerkError}
              </p>
            )}
          </h2>

          <button
            className="mb-4 p-4 w-full text-sm items-center font-bold text-white rounded-md btn"
            type="submit"
          >
            Create an account
          </button>
        </form>
        <p className="text-sm text-center text-black font-medium">
          * Create Mini Courses, Bridges Pages & much more.
          <a
            className="ml-1 text-sm font-semibold text-indigo-500 link"
            href="/sign-in"
          >
            Already a member? Login here.
          </a>
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default SignupForm;
