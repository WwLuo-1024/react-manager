// import resso from "resso";
import { User } from "@/types/api";
import { create } from "zustand";

//resso state management
// export const store = resso({
//   token: "",
//   userInfo: {
//     userEmail: "",
//     userName: "",
//   },
//   updateUserInfo(userInfo: User.UserItem) {
//     store.userInfo = userInfo;
//   },
// });

export const useUserStore = create<{
  token: string;
  userInfo: {
    userEmail: string;
    userName: string;
  };
  collapsed: boolean;
  updateToken: (token: string) => void;
  updateUserInfo: (userInfo: User.UserItem) => void;
  updateCollapsed: () => void;
}>((set) => ({
  token: "",
  userInfo: {
    userEmail: "",
    userName: "",
  },
  collapsed: false,
  updateToken: (token: string) => set({ token }),
  updateUserInfo: (userInfo: User.UserItem) => set({ userInfo }),
  //   updateUserInfo(userInfo: User.UserItem) {
  //     set({
  //       userInfo,
  //     });
  //   },
  updateCollapsed: () =>
    set((state) => {
      return {
        collapsed: !state.collapsed,
      };
    }),
}));
