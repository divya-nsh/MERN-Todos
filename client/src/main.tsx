import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const retryHandler = (count = 3) => {
  return (failureCount: number, error: unknown) => {
    if (error instanceof AxiosError && failureCount < count) {
      if (error.status && error.status >= 400 && error.status < 500) {
        return false;
      }
      return true;
    }
    return false;
  };
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: retryHandler(3),
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: retryHandler(3),
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    <Toaster />
  </StrictMode>,
);
