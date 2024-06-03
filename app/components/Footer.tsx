import React from "react";

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
