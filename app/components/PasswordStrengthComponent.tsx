// PasswordStrengthMeter.tsx
import { useAtom } from "jotai";
import React from "react";
import { passwordStrengthAtom } from "../atoms/authAtoms";

interface PasswordStrengthMeterProps {
  password: string;
}

const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({
  password,
}) => {
  const [passwordStrength, setPasswordStrength] = useAtom(passwordStrengthAtom);

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
    <div className="pt-0 mt-0 overflow-hidden h-2 flex rounded-b-md border-[1.5px] border-gray-400 bg-white">
      <div
        style={{ width: `${(strength / 5) * 100}%` }}
        className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${strengthColor}`}
      ></div>
    </div>
  );
};

export default PasswordStrengthMeter;
