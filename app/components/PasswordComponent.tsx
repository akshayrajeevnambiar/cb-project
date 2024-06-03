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

  const passWordBox = document.getElementById("password");
  const eyeIcon = document.getElementById("eye-icon");

  return (
    <>
      <div className="relative mb-4 w-full rounded-md">
        <input
          name="password"
          id="password"
          className={`text-xs sm:text-sm lg:text-base w-full pr-[2.5rem] rounded-md input ${
            error && "input-error"
          }`}
          placeholder="Password..."
          type={showPassword ? "text" : "password"}
          onChange={(e) => {
            setPassword(e.target.value);
            passWordBox?.classList.remove("input-error");
            setError("");
          }}
          onClick={(e) => {
            eyeIcon?.classList.add("eye-icon-focus");
          }}
          onBlur={(e) => {
            eyeIcon?.classList.remove("eye-icon-focus");
          }}
          required
        />
        <button
          type="button"
          id="eye-icon"
          className={`absolute inset-y-0 right-0 flex justify-center items-center text-xs sm:text-sm lg:text-base leading-5 bg-gray-200 rounded-r-md h-full eye-icon ${
            error && "eye-icon-focus-error "
          }`}
          onClick={(e) => setShowPassword(!showPassword)}
        >
          <i
            className={`px-2 text-xs ${
              showPassword ? "fas fa-eye-slash" : "fas fa-eye"
            }`}
          ></i>
        </button>
      </div>
    </>
  );
};

export default PasswordComponent;
