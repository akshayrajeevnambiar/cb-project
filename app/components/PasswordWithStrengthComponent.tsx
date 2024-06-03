// PasswordStrengthMeter.tsx
import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import {
  errorAtom,
  passwordAtom,
  passwordStrengthAtom,
} from "../atoms/authAtoms";
import "@fortawesome/fontawesome-free/css/all.min.css";

const PasswordStrengthMeter = () => {
  const [password, setPassword] = useAtom(passwordAtom);
  const [passwordStrength, setPasswordStrength] = useAtom(passwordStrengthAtom);
  const [clerkError, setClerkError] = useAtom(errorAtom);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const passWithStrength = document.getElementById("password-container");
  const strengthMeter = document.getElementById("strength-text");

  const calculateStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 1;
    return strength;
  };

  const strength = calculateStrength(password);

  let strengthColor;
  switch (strength) {
    case 0:
    case 1:
      strengthColor = "bg-red-500";
      break;
    case 2:
      strengthColor = "bg-yellow-500";
      break;
    case 3:
      strengthColor = "bg-yellow-300";
      break;
    case 4:
      strengthColor = "bg-green-500";
      break;
    case 5:
      strengthColor = "bg-green-300";
      break;
    default:
      strengthColor = "bg-gray-400";
  }

  const strengthText = ["Very Weak", "Weak", "Fair", "Good", "Strong"][
    strength
  ];

  setPasswordStrength(strengthText);

  return (
    <>
      <div
        id="password-container "
        className="relative w-full mb-4 rounded-md password"
      >
        <input
          name="password"
          id="password"
          className={`text-xs sm:text-sm lg:text-base w-full pr-[2.5rem] rounded-t-md mb-0 input-pass ${
            clerkError && "input-error"
          }`}
          placeholder="Password..."
          type={showPassword ? "text" : "password"}
          onFocus={(e) => {
            passWithStrength?.classList.add("password-focus");
          }}
          onBlur={(e) => {
            passWithStrength?.classList.remove("password-focus");
            strengthMeter?.classList.add("hidden");
          }}
          onChange={(e) => {
            (e.target as HTMLInputElement).classList.remove("input-error");
            strengthMeter?.classList.remove("hidden");
            setClerkError("");
            setPassword(e.target.value);
          }}
          required
        />
        <button
          type="button"
          id="eye-icon"
          className={`absolute inset-y-0 right-0 flex justify-center items-center text-xs sm:text-sm lg:text-base leading-5 bg-gray-200 rounded-r-md h-full eye-icon ${
            clerkError && "eye-icon-focus-error "
          }`}
          onClick={(e) => setShowPassword(!showPassword)}
        >
          <i
            className={`px-2 text-xs ${
              showPassword ? "fas fa-eye-slash" : "fas fa-eye"
            }`}
          ></i>
        </button>
        <div className="pt-0 mt-0 overflow-hidden h-2 flex rounded-b-md border-[1.5px] border-gray-400 bg-white">
          <div
            style={{ width: `${(strength / 5) * 100}%` }}
            className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${strengthColor}`}
          ></div>
        </div>
      </div>
    </>
  );
};

export default PasswordStrengthMeter;