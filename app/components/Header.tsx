import React from "react";

const Header = ({ placeHolderText }: { placeHolderText: string }) => {
  return (
    <h1 className="py-3 font-bold text-3xl text-white leading-9 drop-shadow-md">
      {placeHolderText}
    </h1>
  );
};

export default Header;
