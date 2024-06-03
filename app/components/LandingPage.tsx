import { UserButton, useUser } from "@clerk/nextjs";
import React from "react";

// LandingPage component
const LandingPage = () => {
  const { user } = useUser(); // useUser hook retrieves user information from Clerk authentication

  return (
    <div className="h-[100vh] w-full">
      {/* Header section */}

      <div className="w-full h-[4rem] px-[2rem] flex items-center justify-between">
        {/* Site title */}

        <h2 className="text-xl font-bold text-white">ContentBlocks</h2>
        {/* Container for user profile button */}

        <div className="bg-white p-1 rounded-full border-black border-[1px] user-profile">
          <UserButton afterSignOutUrl="/" />{" "}
          {/* UserButton component for handling user authentication */}
        </div>
      </div>
      {/* Content section */}
      <div
        className="bg-white text-5xl font-bold w-full flex justify-center items-center"
        style={{ height: "calc(100vh - 4rem)" }} // Dynamic height adjustment to fit viewport
      >
        {/* Display welcome message if user is logged in, otherwise show loading message */}

        {user ? `Welcome back, ${user.username}!` : `Loading...`}
      </div>
    </div>
  );
};

export default LandingPage;
