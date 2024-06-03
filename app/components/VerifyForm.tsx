import { FormEvent } from "react";
import { emailCode } from "@/app/atoms/authAtoms";
import { useAtom } from "jotai";
import Header from "./Header";
import Footer from "./Footer";
import OtpComponent from "./OtpComponent";

interface VerifyFormProps {
  handleVerify: (e: FormEvent) => void; // Props interface for VerifyForm component
}

/**
 * VerifyForm Component
 * Displays a form for verifying email with a verification code
 * @param handleVerify Function to handle verification
 */
const VerifyForm = ({ handleVerify }: VerifyFormProps) => {
  const [code, setCode] = useAtom(emailCode); // State for verification code

  return (
    <>
      <Header placeHolderText="Verification Code" /> {/* Header component */}
      <div className="my-3 flex flex-col p-8 bg-white w-[20rem] sm:w-[26.25rem] lg:w-[30rem] rounded-md border-black border-[1.5px]">
        <div className="mb-2 text-xs sm:text-sm lg:text-base text-center ">
          Please enter the 6 digit verification code sent to your email.
        </div>
        <OtpComponent // OtpComponent for entering verification code
          handleVerify={handleVerify}
          buttonText="Complete sign up"
        />
      </div>
      <Footer /> {/* Footer component */}
    </>
  );
};

export default VerifyForm;
