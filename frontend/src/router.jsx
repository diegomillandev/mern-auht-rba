import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { AuthLayout } from "./layouts/AuthLayout";
import { setNavigate } from "./lib/navigate";

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
      </Routes>
    </BrowserRouter>
  );
};
