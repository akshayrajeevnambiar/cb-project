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

  const [clerkError] = useAtom(errorAtom);

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
            };

            const userName = target.userName.value;
            const email = target.email.value;
            const passWord = target.password.value;

            setEmailAddress(email);
            setPassword(passWord);
            setUserName(userName);
            signUpWithEmail({
              username: userName,
              emailAddress: email,
              password: passWord,
            });
          }}
        >
          <label className="mb-1 text-sm font-bold">Username:</label>
          <input
            name="userName"
            className="mb-4 text-sm w-full rounded-md input"
            placeholder="Username..."
            type="text"
            required
          />

          <label className="mb-1 text-sm font-bold">Email Address:</label>
          <input
            name="email"
            className="mb-4 text-sm w-full rounded-md input"
            placeholder="Email address..."
            type="email"
            required
          />

          <label className="mb-1 text-sm font-bold">Password:</label>
          <input
            name="password"
            className="mb-4 text-sm w-full rounded-md input"
            placeholder="Password..."
            type="password"
            required
          />

          <label className="mb-1 text-sm font-bold">Re-type Password:</label>
          <input
            name="re-password"
            className="mb-4 text-sm w-full rounded-md input"
            placeholder="Re-type Password..."
            type="password"
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
            className="ml-1 text-sm font-semibold text-indigo-500"
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
