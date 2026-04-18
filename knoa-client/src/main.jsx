import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import Routes from "./routes/Routes.jsx";
import AuthProvider from "./contexts/AuthProvider.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a client
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={Routes} />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
);
