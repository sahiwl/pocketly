import api, { currUser, logoutApi, loginApi, signupApi } from "@/api";
import { useAuthStore } from "@/stores/useAuthStore";
import type {
  AuthResponseDTO,
  LoginRequestDTO,
  SignupRequestDTO,
} from "@/types/dtos";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useAuth() {
  const queryClient = useQueryClient();
  const user = useAuthStore((s) => s.user);
  const ready = useAuthStore((s) => s.ready);
  const clear = useAuthStore((s) => s.clear);
  const setToken = useAuthStore((s) => s.setToken);
  const setUser = useAuthStore((s) => s.setUser);

  // Shared success handler for both login and signup
  const handleAuthSuccess = async (data: AuthResponseDTO) => {
    if (data.token) {
      const token = data.token;
      setToken(token);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    try {
      const u = await queryClient.fetchQuery({
        queryKey: ["me"],
        queryFn: currUser,
      });
      setUser(u);
    } catch {
      setUser(null);
    }
  };

  const loginMutation = useMutation<AuthResponseDTO, Error, LoginRequestDTO>({
    mutationFn: (creds) => loginApi(creds),
    onSuccess: handleAuthSuccess,
  });

  const signupMutation = useMutation<AuthResponseDTO, Error, SignupRequestDTO>({
    mutationFn: (data) => signupApi(data),
    onSuccess: handleAuthSuccess,
  });

  const logout = async () => {
    try {
      await logoutApi();
    } catch (error) {
      // Log error but continue with logout - local cleanup is more important
      console.error(
        "Logout API failed, but continuing with local cleanup:",
        error,
      );
    }
    clear();
    delete api.defaults.headers.common["Authorization"];
    queryClient.removeQueries({ queryKey: ["me"] });
  };

  return {
    user,
    ready,
    login: loginMutation.mutateAsync,
    signup: signupMutation.mutateAsync,
    logout,
    loginStatus: {
      isLoading: loginMutation.isPending,
      isError: loginMutation.isError,
      error: loginMutation.error,
    },
    signupStatus: {
      isLoading: signupMutation.isPending,
      isError: signupMutation.isError,
      error: signupMutation.error,
    },
  };
}
