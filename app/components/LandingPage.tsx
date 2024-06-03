import { UserButton, useUser } from "@clerk/nextjs";
import React from "react";

const LandingPage = () => {
  const { user } = useUser();

  return (
    <div className="h-[100vh] w-full">
      <div className="w-full h-[4rem] px-[2rem] flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">ContentBlocks</h2>
        <div className="bg-white p-1 rounded-full border-black border-[1px] user-profile">
          <UserButton />
        </div>
      </div>
      <div
        className="bg-white text-5xl font-bold w-full flex justify-center items-center"
        style={{ height: "calc(100vh - 4rem)" }}
      >
        {user ? `Welcome back, ${user.username}!` : `Loading...`}
      </div>
    </div>
  );
};

export default LandingPage;
