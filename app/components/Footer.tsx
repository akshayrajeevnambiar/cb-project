import React from "react";

// Footer component with optional placeholder text
const Footer = ({
  placeHolderText = "© 2024 ContentBlocks. All rights reserved.",
}: {
  placeHolderText?: string;
}) => {
  return (
    <p className="font-bold text-xs sm:text-sm text-white">{placeHolderText}</p>
  );
};

export default Footer;
