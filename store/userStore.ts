import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { User } from '@/types';

interface UserStore {
    user: User | null;
    isAuthenticated: boolean;
    setUser: (user: User) => void;
    updateUser: (data: Partial<User>) => void;
    logout: () => void;
}

export const useUserStore = create<UserStore>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,

            setUser: (user) => set({ user, isAuthenticated: true }),

            updateUser: (data) =>
                set((state) => ({
                    user: state.user ? { ...state.user, ...data } : null,
                })),

            logout: () => set({ user: null, isAuthenticated: false }),
        }),
        {
            name: 'medicare-user',
            storage: createJSONStorage(() => (typeof window !== 'undefined' ? localStorage : (undefined as any))),
        }
    )
);
