import React from "react";

const Footer = ({
  placeHolderText = "© 2024 ContentBlocks. All rights reserved.",
}: {
  placeHolderText?: string;
}) => {
  return <p className="py-7 font-bold text-xs text-white">{placeHolderText}</p>;
};

export default Footer;
