import { create } from "zustand";

export type User = {
  id: number;
  username: string;
};

type AuthStore = {
  user: User | null;
  token?: string | null;
  ready: boolean; //if false, means auth data is "loading"
  setUser: (u: User | null) => void;
  setToken: (t?: string | null) => void;
  setReady: (v: boolean) => void;
  clear: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,
  ready: false,
  setUser: (user) => set({ user }),
  setToken: (token) => set({ token }),
  setReady: (ready) => set({ ready }),
  clear: () => set({ user: null, token: null, ready: true }),
}));
