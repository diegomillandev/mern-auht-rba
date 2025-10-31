import {
  LayoutDashboard,
  LockKeyhole,
  UserRoundCog,
  UserRoundPen,
  Users,
} from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";

export const SettingsLayout = () => {
  return (
    <>
      <div className="flex flex-row space-x-4">
        <aside className="">
          <nav className="flex flex-col w-60 space-y-1 space-x-0">
            <ul className="space-y-1">
              <li>
                <NavLink
                  to="/settings/profile"
                  className={({ isActive }) =>
                    `flex items-center gap-x-3 py-2 px-2.5 text-sm rounded-lg hover:bg-gray-100 focus:outline-none transition-colors ${
                      isActive ? "bg-gray-100 text-blue-600" : "text-gray-800"
                    }`
                  }
                >
                  <UserRoundPen size={18} />
                  Profile
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/settings/password"
                  className={({ isActive }) =>
                    `flex items-center gap-x-3 py-2 px-2.5 text-sm rounded-lg hover:bg-gray-100 focus:outline-none transition-colors ${
                      isActive ? "bg-gray-100 text-blue-600" : "text-gray-800"
                    }`
                  }
                >
                  <LockKeyhole size={18} />
                  Password
                </NavLink>
              </li>
            </ul>
          </nav>
        </aside>

        <div className="flex-1 md:max-w-2xl">
          <section className="max-w-xl space-y-12">
            <Outlet />
          </section>
        </div>
      </div>
    </>
  );
};
