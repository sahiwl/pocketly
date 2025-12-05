import { useAuthStore } from "@/stores/useAuthStore";
import { Navigate } from "react-router";
import { Spinner } from "./ui/spinner";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const user = useAuthStore((s) => s.user);
  const ready = useAuthStore((s) => s.ready);

  if (!ready) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <Spinner className="h-12 w-12" />
        <p className="text-sm text-muted-foreground animate-pulse">
          Checking session...
        </p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
