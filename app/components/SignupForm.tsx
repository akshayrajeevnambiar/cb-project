import Header from "./Header";
import "@/app/dashboard.css";
import Footer from "./Footer";

import {
  usernameAtom,
  emailAtom,
  passwordAtom,
  errorAtom,
  passwordStrengthAtom,
  rePasswordAtom,
} from "@/app/atoms/authAtoms"; // Importing atoms from authAtoms file

import { useAtom } from "jotai";
import { useEffect } from "react";
import PasswordWithStrengthComponent from "./PasswordWithStrengthComponent";
import PasswordComponent from "./PasswordComponent";

interface SignUpFormProps {
  signUpWithEmail: ({
    username,
    emailAddress,
    password,
  }: {
    username: string;
    emailAddress: string;
    password: string;
  }) => void; // Props interface for SignUpForm component
}

/**
 * SignUpForm Component
 * Displays a form for signing up
 * @param signUpWithEmail Function to handle sign up with email, username, and password
 */
const SignupForm = ({ signUpWithEmail }: SignUpFormProps) => {
  const [username, setUserName] = useAtom(usernameAtom); // State for username
  const [emailAddress, setEmailAddress] = useAtom(emailAtom); // State for email address
  const [password] = useAtom(passwordAtom); // State for password
  const [clerkError, setClerkError] = useAtom(errorAtom); // State for clerk error
  const [rePassword, setRePassword] = useAtom(rePasswordAtom); // State for re-typed password
  const [passwordStrength] = useAtom(passwordStrengthAtom); // State for password strength

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
    <>
      <Header placeHolderText="Create Your Account" /> {/* Header component */}
      <div className="my-3 flex flex-col p-8 bg-white w-[20rem] sm:w-[26.25rem] lg:w-[30rem] rounded-md border-black border-[1.5px]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const target = e.target as typeof e.target & {
              userName: { value: string };
              email: { value: string };
            };

            const userName = target.userName;
            const email = target.email;

            if (password !== rePassword) {
              setClerkError("Paswords do not match");
              return;
            }

            setEmailAddress(email.value);
            setUserName(userName.value);

            signUpWithEmail({
              username: userName.value,
              emailAddress: email.value,
              password,
            });
          }}
        >
          <label className="mb-1 text-xs sm:text-sm lg:text-base font-bold">
            Username:
          </label>
          <input
            name="userName"
            id="userName"
            className="mb-4 text-xs sm:text-sm lg:text-base w-full rounded-md input"
            placeholder="Username..."
            type="text"
            onChange={(e) => {
              (e.target as HTMLInputElement).classList.remove("input-error");
              setClerkError("");
            }}
            required
          />
          <label className="mb-1 text-xs sm:text-sm lg:text-base font-bold">
            Email Address:
          </label>
          <input
            name="email"
            id="email"
            className="mb-4 text-xs sm:text-sm lg:text-base w-full rounded-md input"
            placeholder="Email address..."
            type="email"
            onChange={(e) => {
              (e.target as HTMLInputElement).classList.remove("input-error");
              setClerkError("");
            }}
            required
          />
          <label className="mb-1 text-xs sm:text-sm lg:text-base font-bold">
            Password:{" "}
            <span
              id="strength-text"
              className="text-xs sm:text-sm lg:text-base font-medium italic hidden"
            >
              ({passwordStrength})
            </span>
          </label>
          <PasswordWithStrengthComponent />{" "}
          {/* PasswordWithStrengthComponent */}
          <label className="mb-1 text-xs sm:text-sm lg:text-base font-bold">
            Re-type Password:
          </label>
          <PasswordComponent setPassword={setRePassword} />{" "}
          {/* PasswordComponent */}
          <h2>
            {clerkError && (
              <p className="mb-3 text-xs sm:text-sm lg:text-base font-semibold text-red-600">
                {clerkError}
              </p>
            )}
          </h2>
          <button
            className="mb-4 p-4 w-full text-xs sm:text-sm lg:text-base items-center font-bold text-white rounded-md btn"
            type="submit"
          >
            Create an account
          </button>
        </form>
        <p className="text-xs sm:text-sm lg:text-base text-center text-black font-medium">
          * Create Mini Courses, Bridges Pages & much more.
          <a
            className="ml-1 text-xs sm:text-sm lg:text-base font-semibold text-indigo-500 link"
            href="/sign-in"
          >
            Already a member? Login here.
          </a>
        </p>
      </div>
      <Footer /> {/* Footer component */}
    </>
  );
};

export default SignupForm;
