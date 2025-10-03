import React from "react";

const RightSideBar = () => {
  return (
    <aside className="hidden md:block w-ful h-full p-4 border rounded-md">
      <h2 className="text-[#232323] font-bold">Notifications</h2>
      <p className="text-sm text-gray-600 mt-2">
        This sidebar is independent and takes 15% of width, full height.
      </p>
    </aside>
  );
};

export default RightSideBar;
