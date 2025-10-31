import { useQuery } from "@tanstack/react-query";
import {
  LayoutDashboard,
  LoaderCircle,
  Settings,
  UserRoundCog,
  Users,
} from "lucide-react";
import { Navigate, NavLink, Outlet, useLocation } from "react-router-dom";
import { getProfile } from "../lib/api";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const AppLayout = () => {
  const location = useLocation();

  const { isLoading, error } = useQuery({
    queryFn: getProfile,
    queryKey: ["profile"],
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <LoaderCircle className="animate-spin text-blue-500" size={36} />
      </div>
    );
  }

  if (error) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  return (
    <div className="flex">
      <aside
        id="hs-sidebar-basic-usage"
        className="fixed top-0 left-0 z-40 w-64 h-full bg-white border-r border-gray-200 shadow-lg flex flex-col"
      >
        <header className="p-4 flex justify-between items-center border-b border-gray-100">
          <a
            href="#"
            aria-label="Brand"
            className="font-semibold text-xl text-black focus:outline-none focus:opacity-80"
          >
            MyApp
          </a>
        </header>

        <nav className="flex-1 overflow-y-auto px-2 py-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          <ul className="space-y-1">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `flex items-center gap-x-3 py-2 px-2.5 text-sm rounded-lg hover:bg-gray-100 focus:outline-none transition-colors ${
                    isActive ? "bg-gray-100 text-blue-600" : "text-gray-800"
                  }`
                }
              >
                <LayoutDashboard size={18} />
                Dashboard
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/users"
                className={({ isActive }) =>
                  `flex items-center gap-x-3 py-2 px-2.5 text-sm rounded-lg hover:bg-gray-100 focus:outline-none transition-colors ${
                    isActive ? "bg-gray-100 text-blue-600" : "text-gray-800"
                  }`
                }
              >
                <Users size={18} />
                Users
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/settings/profile"
                className={classNames(
                  "flex items-center gap-x-3 py-2 px-2.5 text-sm rounded-lg hover:bg-gray-100 focus:outline-none transition-colors",
                  location.pathname.startsWith("/settings")
                    ? "bg-gray-100 text-blue-600"
                    : "text-gray-800"
                )}
              >
                <Settings size={18} />
                Settings
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-6 bg-gray-50 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
};
