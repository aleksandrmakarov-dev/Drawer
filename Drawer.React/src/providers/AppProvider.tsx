import React, { FC, PropsWithChildren } from "react";
import DrawerHubProvider from "./DrawerHubProvider";

export const AppProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <React.Suspense
      fallback={
        <div className="h-screen flex items-center justify-center">
          <div className="text-center">
            <h5 className="font-semibold text-lg">Please wait for a while</h5>
            <p className="text-gray-700">Loading page...</p>
          </div>
        </div>
      }
    >
      <DrawerHubProvider>{children}</DrawerHubProvider>
    </React.Suspense>
  );
};
