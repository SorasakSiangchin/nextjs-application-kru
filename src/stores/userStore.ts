import { fetchMembers } from "@/app/_actions/userAction";
import { UserData } from "@/interfaces/user/userData";
import { create } from "zustand";

interface UserStates {
  user: UserData | null;
  members: UserData[];
  membersLoaded: boolean;
}

interface UserActions {
  setUser: (user: UserData) => void;
  loadMembers: () => void;
}

const useUserStore = create<UserStates & UserActions>((set) => ({
  user: null,
  setUser: (user) => {
    set({ user });
  },
  loadMembers: async () => {
    set({ membersLoaded: false });
    const result = await fetchMembers();
    if (result.success) {
      if (result.data) set({ members: result.data });
    }
    set({ membersLoaded: true });
  },
  members: [],
  membersLoaded: false,
}));

export default useUserStore;
