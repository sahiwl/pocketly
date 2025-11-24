import { currUser } from "@/api";
import { useAuthStore } from "@/stores/useAuthStore";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export default function AuthLoader() {
  const queryClient = useQueryClient();
  const setUser = useAuthStore((s) => s.setUser);
  const setReady = useAuthStore((s) => s.setReady);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const user = await queryClient.fetchQuery({
          queryKey: ["me"],
          queryFn: currUser,
          retry: false,
        });
        if (mounted) {
          setUser(user);
        }
      } catch {
        // no session or failed - keep user null
        if (mounted) {
          setUser(null);
        }
      } finally {
        if (mounted) {
          setReady(true);
        }
      }
    })();
    return () => {
      mounted = false;
    };
  }, [queryClient, setUser, setReady]);

  return null;
}
