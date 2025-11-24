import { useAuthStore } from "@/stores/useAuthStore";
import { Navigate } from "react-router";

export function ProtectedRoute({children}: { children: React.ReactNode }){
  const user = useAuthStore((s) => s.user);
  const ready = useAuthStore((s) => s.ready);

  if (!ready) return <div>Checking session...</div>;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}
