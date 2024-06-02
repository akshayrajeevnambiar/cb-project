import { FormEvent } from "react";
import { emailCode } from "@/app/atoms/authAtoms";
import { useAtom } from "jotai";
import Header from "./Header";
import Footer from "./Footer";

interface VerifyFormProps {
  handleVerify: (e: FormEvent) => void;
}

const VerifyForm = ({ handleVerify }: VerifyFormProps) => {
  const [code, setCode] = useAtom(emailCode);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Header placeHolderText="Verification Code" />
      <div className="my-3 flex flex-col p-8 bg-white w-[26.25rem] rounded-md border-black border-[1.5px]">
        <form onSubmit={handleVerify}>
          <input
            value={code}
            className="mb-4 text-sm w-full rounded-md input"
            id="code"
            name="code"
            onChange={(e) => setCode(e.target.value)}
          />

          <button
            className="mb-4 p-4 w-full text-sm items-center font-bold text-white rounded-md btn"
            type="submit"
          >
            Complete sign up
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default VerifyForm;
