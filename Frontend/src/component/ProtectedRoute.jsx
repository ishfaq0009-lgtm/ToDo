import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function ProtectedRoute() {
  if (!localStorage.getItem("token")) return <Navigate to="/login" replace />;

  return (
    <div className="min-h-screen bg-stone-50">
      <Sidebar />
      <main className="pt-14 md:pl-60">
        <div className="mx-auto max-w-5xl p-4 sm:p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}