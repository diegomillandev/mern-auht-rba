import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { AuthLayout } from "./layouts/AuthLayout";
import { setNavigate } from "./lib/navigate";
import { AppLayout } from "./layouts/AppLayout";
import { Profile } from "./pages/Profile";
import { SettingsLayout } from "./layouts/SettingsLayout";
import { Password } from "./pages/Password";

function NavigationHandler() {
  const navigate = useNavigate();
  setNavigate(navigate);
  return null;
}

export const Router = () => {
  return (
    <BrowserRouter>
      <NavigationHandler />
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Route>
        <Route path={"/"} element={<AppLayout />}>
          <Route index element={<div>Home Page</div>} />
          <Route path="/users" element={<div>Users Page</div>} />

          <Route element={<SettingsLayout />}>
            <Route path="/settings/profile" element={<Profile />} />
            <Route path="/settings/password" element={<Password />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
