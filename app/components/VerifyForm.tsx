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
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Header placeHolderText="Verification Code" />
      <div className="my-3 flex flex-col p-8 bg-white w-[26.25rem] rounded-md border-black border-[1.5px]">
        <div className="mb-2 text-sm text-center ">
          Please enter the 6 digit verification code sent to your email.
        </div>
        <OtpComponent handleVerify={handleVerify} />
      </div>
      <Footer />
    </div>
  );
};

export default VerifyForm;
