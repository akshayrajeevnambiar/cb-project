"use client";
import { useRouter } from "next/navigation";
import { useSignIn } from "@clerk/nextjs";
import SigninForm from "@/app/components/SigninForm";
import { useAtom } from "jotai";
import { errorAtom } from "@/app/atoms/authAtoms";
import { PasswordHasher } from "@/app/util/PasswordHasher";

const Signin = () => {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [clerkError, setClerkError] = useAtom(errorAtom);
  const router = useRouter();

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
      const hashedPassword = PasswordHasher(password);
      console.log("hashedPassword - " + hashedPassword);

      const result = await signIn.create({
        identifier: emailAddress,
        password: hashedPassword,
      });
      if (result.status === "complete") {
        console.log(result);
        await setActive({ session: result.createdSessionId });
        router.push("/");
      } else {
        console.log(result);
      }
    } catch (err: any) {
      console.log(JSON.stringify(err, null, 2));
      setClerkError(err.errors[0].message);
    }
  };

  return <SigninForm signInWithEmail={signInWithEmail} />;
};

export default Signin;
