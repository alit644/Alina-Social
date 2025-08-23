import { create } from "zustand";
interface IAlertDialog {
  openPostId: string | null;
  setOpenPostId: (id: string | null) => void;
  alertPostId: string | null;
  setAlertPostId: (id: string | null) => void;
  openDialogId: string | null;
  setOpenDialogId: (id: string | null) => void;
  openCommentDrawerId: string | null;
  setOpenCommentDrawerId: (id: string | null) => void;
}

export const useAlertDialogStore = create<IAlertDialog>((set) => ({
  openPostId: null,
  setOpenPostId: (id) => set({ openPostId: id }),
  alertPostId: null,
  setAlertPostId: (id) => set({ alertPostId: id }),
  openDialogId: null,
  setOpenDialogId: (id) => set({ openDialogId: id }),
  openCommentDrawerId: null,
  setOpenCommentDrawerId: (id) => set({ openCommentDrawerId: id }),
}));
