import Header from "./Header";
import Footer from "./Footer";
import "@/app/dashboard.css";
import { useAtom } from "jotai";
import { emailAtom, errorAtom, passwordAtom } from "../atoms/authAtoms";
import { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import PasswordComponent from "./PasswordComponent";

interface SignInFormProps {
  signInWithEmail: ({
    emailAddress,
    password,
  }: {
    emailAddress: string;
    password: string;
  }) => void;
}

const SigninForm = ({ signInWithEmail }: SignInFormProps) => {
  const [clerkError] = useAtom(errorAtom);
  const [email, setEmail] = useAtom(emailAtom);
  const [passWord] = useAtom(passwordAtom);

  return (
    <>
      <Header placeHolderText="Welcome Back!" />
      <div className="m-3 flex flex-col p-8 bg-white w-[26.25rem] rounded-md border-black border-[1.5px]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const target = e.target as typeof e.target & {
              email: { value: string };
              password: { value: string };
            };
            const email = target.email.value;
            const password = passWord;
            console.log(passWord);
            signInWithEmail({ emailAddress: email, password: password });
          }}
        >
          <label className="mb-1 text-sm font-bold">Email Address:</label>
          <input
            name="email"
            className="mb-4 text-sm w-full rounded-md input"
            placeholder="Email address..."
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label className="mb-1 text-sm font-bold">Password:</label>
          <PasswordComponent />

          <h2>
            {clerkError && (
              <p className="mb-3 text-sm font-semibold text-red-600">
                {clerkError.toLowerCase()}
              </p>
            )}
          </h2>
          <button
            className="mb-4 p-4 w-full text-sm items-center font-bold text-white rounded-md btn"
            type="submit"
          >
            Sign in
          </button>
        </form>
        <p className="mb-2 text-sm text-center text-black font-medium">
          Don&apos;t have an acccount yet?
          <a
            className="ml-1 text-sm font-semibold text-indigo-500 link"
            href="/sign-up"
          >
            Sign up here
          </a>
        </p>
        <div className="flex w-full justify-center">
          <a
            className="text-sm font-semibold text-indigo-500 link"
            href="/forgot-password"
          >
            Forgot Your Password?
          </a>
          <p className="ml-1 text-sm font-semibold">|</p>
          <a
            className="ml-1 text-sm font-semibold text-indigo-500 link"
            href="https://app.contentblocks.com/login"
          >
            Login via Magic Link!
          </a>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SigninForm;
