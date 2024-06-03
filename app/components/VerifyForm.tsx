import { FormEvent } from "react";
import { emailCode } from "@/app/atoms/authAtoms";
import { useAtom } from "jotai";
import Header from "./Header";
import Footer from "./Footer";
import OtpComponent from "./OtpComponent";

interface VerifyFormProps {
  handleVerify: (e: FormEvent) => void;
}

const VerifyForm = ({ handleVerify }: VerifyFormProps) => {
  const [code, setCode] = useAtom(emailCode);

  return (
    <>
      <Header placeHolderText="Verification Code" />
      <div className="my-3 flex flex-col p-8 bg-white w-[20rem] sm:w-[26.25rem] lg:w-[30rem] rounded-md border-black border-[1.5px]">
        <div className="mb-2 text-xs sm:text-sm text-center ">
          Please enter the 6 digit verification code sent to your email.
        </div>
        <OtpComponent
          handleVerify={handleVerify}
          buttonText="Complete sign up"
        />
      </div>
      <Footer />
    </>
  );
};

export default VerifyForm;
