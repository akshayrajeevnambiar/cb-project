import { useAtom } from "jotai";
import React, { useState } from "react";
import { errorAtom } from "../atoms/authAtoms";
import "@fortawesome/fontawesome-free/css/all.min.css";

interface PasswordComponentProps {
  setPassword: (passWord: string) => void;
}

const PasswordComponent = ({ setPassword }: PasswordComponentProps) => {
  const [error, setError] = useAtom(errorAtom);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const passWordBox = document.getElementById("pass-continer");

  return (
    <div
      id="pass-continer"
      className={`mb-4 rounded-md password-with-strength ${
        error && "password-error"
      }`}
    >
      <div className="relative w-full">
        <input
          name="password"
          id="password"
          className="text-xs sm:text-sm lg:text-base w-full pr-[2.5rem] rounded-md input-pass"
          placeholder="Password..."
          type={showPassword ? "text" : "password"}
          onFocus={(e) => {
            passWordBox?.classList.add("password-focus");
          }}
          onChange={(e) => {
            setPassword(e.target.value);
            setError("");
          }}
          onBlur={(e) => {
            passWordBox?.classList.remove("password-focus");
          }}
          required
        />
        <button
          type="button"
          id="eye-icon"
          className="absolute inset-y-0 right-0 flex justify-center items-center text-xs sm:text-sm lg:text-base leading-5 bg-gray-200 rounded-r-md h-full eye-icon"
          onClick={(e) => setShowPassword(!showPassword)}
        >
          <i
            className={`px-2 text-xs ${
              showPassword ? "fas fa-eye-slash" : "fas fa-eye"
            }`}
          ></i>
        </button>
      </div>
    </div>
  );
};

export default PasswordComponent;
