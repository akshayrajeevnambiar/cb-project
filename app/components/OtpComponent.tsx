import { useAtom } from "jotai";
import React, { useState, useRef, FormEvent, useEffect } from "react";
import { emailCode } from "../atoms/authAtoms";

// Define props interface for OTP Component
interface OtpComponentProps {
  handleVerify: (e: FormEvent) => void; // Function to handle OTP verification
  buttonText: string; // Text for the submit button
}

// OTP Component
const OtpComponent = ({ handleVerify, buttonText }: OtpComponentProps) => {
  const [otp, setOtp] = useAtom(emailCode); // OTP state
  const [currIndex, setCurrIndex] = useState(0); // Current active input index
  const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(6).fill(null)); // Ref for input elements

  // Handle input change in OTP input field
  const handleChange = (index: number, e: FormEvent) => {
    const target = e.target as HTMLInputElement;
    target.value = target.value.replace(/[^0-9]/g, ""); // Allow only numbers
    const newOtp =
      otp.substring(0, index) + target.value + otp.substring(index + 1); // Update OTP
    setOtp(newOtp);
    if (index < 5 && target.value !== "") {
      setCurrIndex(index + 1); // Move to next input if available
    }
  };

  // Handle backspace in OTP input field
  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && index > 0) {
      setOtp(otp.substring(0, index - 1)); // Remove character
      setCurrIndex(index - 1); // Move to previous input
    }
  };

  // Focus on current active input
  useEffect(() => {
    inputRefs.current[currIndex]?.focus();
  }, [currIndex]);

  // Render OTP input fields and submit button
  return (
    <form onSubmit={handleVerify}>
      <div className="flex gap-x-2">
        {Array.from({ length: 6 }, (_, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            maxLength={1}
            value={otp[index] || ""}
            className="mb-4 text-xs sm:text-sm lg:text-base w-full font-bold rounded-md input-otp"
            onChange={(e) => handleChange(index, e)}
            onKeyDownCapture={(e) => {
              handleKeyDown(index, e);
            }}
            disabled={index !== currIndex} // Disable inputs except the active one
            required
          />
        ))}
      </div>
      <button
        className="p-4 w-full text-xs sm:text-sm lg:text-base items-center font-bold text-white rounded-md btn"
        type="submit"
      >
        {buttonText} {/* Display button text */}
      </button>
    </form>
  );
};

export default OtpComponent;
