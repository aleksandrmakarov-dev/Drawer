import { FC } from "react";
import { Outlet } from "react-router-dom";

const MainLayout: FC = () => {
  return (
    <div className="bg-gray-100">
      <div className="max-w-screen-xl mx-auto min-h-screen flex items-center justify-center">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
