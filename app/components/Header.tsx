import React from "react";

const Header = ({ placeHolderText }: { placeHolderText: string }) => {
  return (
    <h1 className="font-bold text-2xl sm:text-3xl lg:text-4xl text-white leading-9 drop-shadow-md">
      {placeHolderText}
    </h1>
  );
};

export default Header;
