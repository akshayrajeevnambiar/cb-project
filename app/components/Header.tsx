import React from "react";

// Define the Header component
const Header = ({ placeHolderText }: { placeHolderText: string }) => {
  // Return JSX for the Header component
  return (
    <h1 className="font-bold text-2xl sm:text-3xl text-white leading-9 drop-shadow-md">
      {placeHolderText} {/* Display placeholder text */}
    </h1>
  );
};

export default Header;
