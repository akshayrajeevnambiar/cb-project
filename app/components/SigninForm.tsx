import Header from "./Header";
import Footer from "./Footer";
import "@/app/dashboard.css";
import { useAtom } from "jotai";
import { emailAtom, errorAtom } from "../atoms/authAtoms";

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
            const password = target.password.value;
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
          <input
            name="password"
            className="mb-4 text-sm w-full rounded-md input"
            placeholder="Password..."
            type="password"
            required
          />
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
        <p className="text-sm text-center text-black font-medium">
          Forgot your passwords?
          <a
            className="ml-1 text-sm font-semibold text-indigo-500 link"
            href="/magic-link"
          >
            Login via Magic Link!
          </a>
        </p>
      </div>
      <Footer />
    </>
  );
};

export default SigninForm;
