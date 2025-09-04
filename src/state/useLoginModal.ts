import { create } from "zustand";

interface ILoginModalStore {
    modal: boolean | false;
    show: () => void;
    hide: () => void;
}

const useLoginModal = create<ILoginModalStore>((set) => ({
    modal: false,
    show: () => set({ modal: true }),
    hide: () => set({ modal: false }),
}));

export default useLoginModal;
