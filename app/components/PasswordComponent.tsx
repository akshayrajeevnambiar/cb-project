import { useAtom } from "jotai";
import React, { useState } from "react";
import { passwordAtom } from "../atoms/authAtoms";

const PasswordComponent = () => {
  const [password, setPassword] = useAtom(passwordAtom);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <>
      <div className="relative mb-4 w-full rounded-md">
        <input
          name="password"
          className="text-sm w-full pr-[2.5rem] rounded-md input"
          placeholder="Password..."
          type={showPassword ? "text" : "password"}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          onClick={(e) => {
            document
              .getElementById("eye-icon")
              ?.classList.add("eye-icon-focus");
          }}
          onBlur={(e) => {
            document
              .getElementById("eye-icon")
              ?.classList.remove("eye-icon-focus");
          }}
          required
        />
        <button
          type="button"
          id="eye-icon"
          className="absolute inset-y-0 right-0 flex justify-center items-center text-sm leading-5 bg-gray-200 rounded-r-md h-full eye-icon"
          onClick={(e) => setShowPassword(!showPassword)}
        >
          <i
            className={`px-1 ${
              showPassword ? "fas fa-eye-slash" : "fas fa-eye"
            }`}
          ></i>
        </button>
      </div>
    </>
  );
};

export default PasswordComponent;
