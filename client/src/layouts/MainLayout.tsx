import React from "react";
import { NavLink } from "react-router-dom";

interface Props {
  children?: React.ReactNode;
}

const MainLayout = ({ children }: Props) => {
  return (
    <div className="grid min-h-screen grid-cols-4">
      <aside className="col-span-1" aria-label="Sidebar">
        <div className="flex h-full flex-col overflow-y-auto bg-gray-100 py-4 px-3 shadow-lg">
          <ul className="space-y-2">
            <li>
              <NavLink
                to="/"
                end
                className={({ isActive }) => {
                  const activeClass = isActive ? "bg-gray-300" : "";
                  return `flex items-center rounded-lg ${activeClass} p-2 text-base font-normal text-gray-900 hover:bg-gray-300`;
                }}
              >
                {({ isActive }) => (
                  <span className={`ml-3 ${isActive ? "font-bold" : ""}`}>
                    Dashboard
                  </span>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/students"
                className={({ isActive }) => {
                  const activeClass = isActive ? "bg-gray-300" : "";
                  return `flex items-center rounded-lg ${activeClass} p-2 text-base font-normal text-gray-900 hover:bg-gray-300`;
                }}
              >
                {({ isActive }) => (
                  <span className={`ml-3 ${isActive ? "font-bold" : ""}`}>
                    Students (Demo React Query)
                  </span>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/products"
                className={({ isActive }) => {
                  const activeClass = isActive ? "bg-gray-300" : "";
                  return `flex items-center rounded-lg ${activeClass} p-2 text-base font-normal text-gray-900 hover:bg-gray-300`;
                }}
              >
                {({ isActive }) => (
                  <span className={`ml-3 ${isActive ? "font-bold" : ""}`}>
                    Products (Demo InfiniteLoading)
                  </span>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/cats"
                className={({ isActive }) => {
                  const activeClass = isActive ? "bg-gray-300" : "";
                  return `flex items-center rounded-lg ${activeClass} p-2 text-base font-normal text-gray-900 hover:bg-gray-300`;
                }}
              >
                {({ isActive }) => (
                  <span className={`ml-3 ${isActive ? "font-bold" : ""}`}>
                    Cat (Demo Zustand 1)
                  </span>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/tasks"
                className={({ isActive }) => {
                  const activeClass = isActive ? "bg-gray-300" : "";
                  return `flex items-center rounded-lg ${activeClass} p-2 text-base font-normal text-gray-900 hover:bg-gray-300`;
                }}
              >
                {({ isActive }) => (
                  <span className={`ml-3 ${isActive ? "font-bold" : ""}`}>
                    Task (Demo Zustand 2)
                  </span>
                )}
              </NavLink>
            </li>
          </ul>
        </div>
      </aside>
      <main className="col-span-3 h-full py-4 px-3">{children}</main>
    </div>
  );
};

export default MainLayout;
