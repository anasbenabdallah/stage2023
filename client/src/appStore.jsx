// i need this code for the admin appbar, in order to open and close the drawer using the appbar
import { create } from "zustand";
import { persist } from "zustand/middleware";

const appStore = (set) => ({
  dopen: true,
  updateOpen: (dopen) => set((state) => ({ dopen: dopen })),
});

const persistedAppStore = persist(appStore, { name: "my_app_store" });
export const useAppStore = create(persistedAppStore);
