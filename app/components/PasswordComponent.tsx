import { useAtom } from "jotai";
import React, { useState } from "react";
import { errorAtom } from "../atoms/authAtoms";
import "@fortawesome/fontawesome-free/css/all.min.css";

// Define props interface for Password Component
interface PasswordComponentProps {
  setPassword: (passWord: string) => void; // Function to set password
}

// Password Component
const PasswordComponent = ({ setPassword }: PasswordComponentProps) => {
  const [error, setError] = useAtom(errorAtom); // Error state
  const [showPassword, setShowPassword] = useState<boolean>(false); // State to toggle password visibility

  // Get the password container element
  const passWordBox = document.getElementById("pass-continer");

  return (
    <div
      id="pass-continer"
      className={`mb-4 rounded-md password-with-strength ${
        error && "password-error" // Add error class if there's an error
      }`}
    >
      <div className="relative w-full">
        <input
          name="password"
          id="password"
          className="text-xs sm:text-sm lg:text-base w-full pr-[2.5rem] rounded-md input-pass"
          placeholder="Password..."
          type={showPassword ? "text" : "password"} // Toggle password visibility
          onFocus={(e) => {
            passWordBox?.classList.add("password-focus"); // Add focus style
          }}
          onChange={(e) => {
            setPassword(e.target.value); // Set password value
            setError(""); // Clear error message
          }}
          onBlur={(e) => {
            passWordBox?.classList.remove("password-focus"); // Remove focus style
          }}
          required
        />
        <button
          type="button"
          id="eye-icon"
          className="absolute inset-y-0 right-0 flex justify-center items-center text-xs sm:text-sm lg:text-base leading-5 bg-gray-200 rounded-r-md h-full eye-icon"
          onClick={(e) => setShowPassword(!showPassword)} // Toggle password visibility on button click
        >
          <i
            className={`px-2 text-xs ${
              showPassword ? "fas fa-eye-slash" : "fas fa-eye" // Change eye icon based on password visibility
            }`}
          ></i>
        </button>
      </div>
    </div>
  );
};

export default PasswordComponent; // Export Password Component
