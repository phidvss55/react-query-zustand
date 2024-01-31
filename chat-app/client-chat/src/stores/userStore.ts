import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { User } from "../gql/graphql";

interface UserState {
  id: number | undefined;
  avatarUrl: string | null;
  fullname: string;
  email?: string;
}

interface UserAction {
  updateProfileImage: (image: string) => void;
  updateUsername: (name: string) => void;
  setUser: (user: User) => void;
}

export const useUserStore = create<UserState & UserAction>()(
  persist(
    devtools(
      (set) => ({
        id: undefined,
        fullname: "",
        email: "",
        avatarUrl: null,
        updateProfileImage: (image: string) => set({ avatarUrl: image }),
        updateUsername: (name: string) => set({ fullname: name }),
        setUser: (user) =>
          set({
            id: user.id ?? undefined,
            avatarUrl: user.avatarUrl,
            fullname: user.fullname,
            email: user.email,
          }),
      }),
      {
        name: "user-store",
      }
    ),
    {
      name: "user-store",
    }
  )
);
