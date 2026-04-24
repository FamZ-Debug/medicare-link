import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { BookingData } from '@/types';

export interface HistoryItem extends BookingData {
    id: string;
    createdAt: string;
    providerName?: string;
    rating?: number;
    review?: string;
}

interface HistoryStore {
    items: HistoryItem[];
    addBooking: (item: Omit<HistoryItem, 'id' | 'createdAt'>) => string;
    updateItem: (id: string, data: Partial<HistoryItem>) => void;
    removeItem: (id: string) => void;
    clear: () => void;
}

export const useHistoryStore = create<HistoryStore>()(
    persist(
        (set) => ({
            items: [],
            addBooking: (item) => {
                const id = `bk_${Date.now()}`;
                const createdAt = new Date().toISOString();
                set((state) => ({
                    items: [{ ...item, id, createdAt } as HistoryItem, ...state.items],
                }));
                return id;
            },
            updateItem: (id, data) =>
                set((state) => ({
                    items: state.items.map((it) => (it.id === id ? { ...it, ...data } : it)),
                })),
            removeItem: (id) =>
                set((state) => ({ items: state.items.filter((it) => it.id !== id) })),
            clear: () => set({ items: [] }),
        }),
        {
            name: 'medicare-history',
            storage: createJSONStorage(() => (typeof window !== 'undefined' ? localStorage : (undefined as any))),
        }
    )
);
