import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./index.css";
import { Router } from "./router.jsx";
import { Toaster } from "sonner";
import queryClient from "./config/queryClient.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster position="top-center" richColors />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </StrictMode>
);
