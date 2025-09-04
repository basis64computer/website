import { create } from "zustand";

interface IAuthStore {
    user: boolean;
    name: string | null;
    email: string | null;
    picture: string | null;
    login: (name: string, email: string, picture: string) => void;
    logout: () => void;
}

const useAuth = create<IAuthStore>((set) => ({
    user: false,
    name: null,
    email: null,
    picture: null,
    login: (name: string, email: string, picture: string) => set({ user: true, name, email, picture }),
    logout: () => set({ user: false, name: null, email: null, picture: null }),
}));

export default useAuth;
