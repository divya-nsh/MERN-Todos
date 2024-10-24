import NavBar from "@/components/NavBar";
import { Link, Navigate, Outlet } from "react-router-dom";
import { CircleNotch } from "@phosphor-icons/react";
import { useUserQ, todoQOptions } from "@/hooks/queries";
import { useQueryClient } from "@tanstack/react-query";

export default function MainLayout() {
  const { isPending, error } = useUserQ();
  const queryClient = useQueryClient();
  queryClient.prefetchQuery(todoQOptions);
  if (isPending) {
    return (
      <div className=" bg-slate-100 grid place-items-center min-h-screen ">
        <div className="-mt-[5%] flex flex-col items-center gap-10">
          <h1 className="font-bold text-4xl animate-pulse">Todos</h1>
          <CircleNotch
            size={80}
            className=" animate-spin text-blue-500"
            weight="light"
          />
          <p className="animate-pulse">Loading please wait for few seconds</p>
        </div>
      </div>
    );
  }

  if (error?.status === 401) {
    return <Navigate to="/login" />;
  }

  if (error) {
    return (
      <div className=" text-red-500 mt-6 text-xl font-bold">
        <h1 className=" text-xl">Something went wrong</h1>
        <p>Please try reloading the page ,if issue persits please contact us</p>
        <Link to="/login" className=" text-blue-500 underline">
          Try Login
        </Link>
      </div>
    );
  }

  return (
    <div className=" min-h-screen bg-slate-100">
      <NavBar />
      <Outlet />
    </div>
  );
}
