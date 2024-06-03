import Header from "./Header";
import Footer from "./Footer";
import "@/app/dashboard.css";
import { useAtom } from "jotai";
import { emailAtom, errorAtom, passwordAtom } from "../atoms/authAtoms";
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

/**
 * SigninForm Component
 * Displays a form for signing in
 * @param signInWithEmail Function to handle sign in with email and password
 */
const SigninForm = ({ signInWithEmail }: SignInFormProps) => {
  const [clerkError] = useAtom(errorAtom); // State for clerk error
  const [email, setEmail] = useAtom(emailAtom); // State for email
  const [passWord, setPassword] = useAtom(passwordAtom); // State for password

  return (
    <>
      <Header placeHolderText="Welcome Back!" />
      <div className="m-3 flex flex-col p-8 bg-white w-[20rem] sm:w-[26.25rem] lg:w-[30rem] rounded-md border-black border-[1.5px]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const target = e.target as typeof e.target & {
              email: { value: string };
              password: { value: string };
            };
            const email = target.email.value;
            const password = passWord;
            signInWithEmail({ emailAddress: email, password: password });
          }}
        >
          <label className="mb-1 text-xs sm:text-sm lg:text-base lg:text-base font-bold">
            Email Address:
          </label>
          <input
            name="email"
            className="mb-4 text-xs sm:text-sm lg:text-base w-full rounded-md input"
            placeholder="Email address..."
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label className="mb-1 text-xs sm:text-sm lg:text-base lg:text-base font-bold">
            Password:
          </label>
          <PasswordComponent setPassword={setPassword} />

          <h2>
            {clerkError && (
              <p className="mb-3 text-xs sm:text-sm lg:text-base font-semibold text-red-600">
                {clerkError.toLowerCase()}
              </p>
            )}
          </h2>
          <button
            className="mb-4 p-4 w-full text-xs sm:text-sm lg:text-base items-center font-bold text-white rounded-md btn"
            type="submit"
          >
            Sign in
          </button>
        </form>
        <p className="mb-2 text-xs sm:text-sm lg:text-base text-center text-black font-medium">
          Don&apos;t have an account yet?
          <a
            className="ml-1 text-xs sm:text-sm lg:text-base font-semibold text-indigo-500 link"
            href="/sign-up"
          >
            Sign up here
          </a>
        </p>
        <div className="flex w-full justify-evenly">
          <a
            className="text-center text-xs sm:text-sm lg:text-base font-semibold text-indigo-500 link"
            href="/forgot-password"
          >
            Forgot Your Password?
          </a>
          <a
            className="text-center text-xs sm:text-sm lg:text-base font-semibold text-indigo-500 link"
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
