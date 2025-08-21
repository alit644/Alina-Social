import { create } from "zustand";
interface IAlertDialog {
  openPostId: string | null;
  setOpenPostId: (id: string | null) => void;
  alertPostId: string | null;
  setAlertPostId: (id: string | null) => void;
}

export const useAlertDialogStore = create<IAlertDialog>((set) => ({
  openPostId: null,
  setOpenPostId: (id) => set({ openPostId: id }),
  alertPostId: null,
  setAlertPostId: (id) => set({ alertPostId: id }),
}));
