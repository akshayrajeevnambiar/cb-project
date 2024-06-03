"use client";

import { useRouter } from "next/navigation";
import { useSignIn } from "@clerk/nextjs";
import SigninForm from "@/app/components/SigninForm";
import { useAtom } from "jotai";
import { errorAtom } from "@/app/atoms/authAtoms";
import { PasswordHasher } from "@/app/util/PasswordHasher";

const Signin = () => {
  const { isLoaded, signIn, setActive } = useSignIn(); // Using useSignIn hook to handle sign in process
  const [clerkError, setClerkError] = useAtom(errorAtom); // Using useAtom hook to manage error state
  const router = useRouter(); // Accessing router object for navigation

  // Function to sign in with email
  const signInWithEmail = async ({
    emailAddress,
    password,
  }: {
    emailAddress: string;
    password: string;
  }) => {
    if (!isLoaded) {
      return;
    }

    try {
      const hashedPassword = PasswordHasher(password); // Hashing the password
      console.log("hashedPassword - " + hashedPassword);

      // Signing in with email and hashed password
      const result = await signIn.create({
        identifier: emailAddress,
        password: hashedPassword,
      });

      // Checking sign in status
      if (result.status === "complete") {
        console.log(result);
        await setActive({ session: result.createdSessionId }); // Setting active session
        router.push("/"); // Redirecting to home page
      } else {
        console.log(result); // Logging result if status is not complete
      }
    } catch (err: any) {
      console.log(JSON.stringify(err, null, 2)); // Logging error details
      setClerkError(err.errors[0].message); // Setting clerk error message
    }
  };

  return <SigninForm signInWithEmail={signInWithEmail} />; // Rendering SigninForm component
};

export default Signin;
