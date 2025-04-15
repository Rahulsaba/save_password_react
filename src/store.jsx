// authStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      // token: null,
      isAuth: false,
//token
      login: () => set({  isAuth: true }),
       // token: null,
      logout: () => set({  isAuth: false }),

      // Optional: if you want to trigger UI or reset on app load
      checkAuth: () => {
        set((state) => ({
          isAuth: !!state.isAuth, // or some user check
        }));
      },
    }),
  )
);

export default useAuthStore;
