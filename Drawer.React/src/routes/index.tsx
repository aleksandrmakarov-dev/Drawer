import MainLayout from "@/components/layouts/MainLayout";
import { FC } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Group from "./Group";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Group />,
      },
      {
        path: ":id",
        element: <Group />,
      },
    ],
  },
]);

export const AppRouterProvider: FC = () => {
  return <RouterProvider router={router} />;
};
