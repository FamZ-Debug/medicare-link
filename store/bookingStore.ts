import { create } from 'zustand';
import { BookingData, BookingStatus, BookingMode } from '@/types';

interface BookingStore {
    booking: BookingData;
    updateBooking: (data: Partial<BookingData>) => void;
    setService: (type: any, title: string) => void;
    setStatus: (status: BookingStatus) => void;
    resetBooking: () => void;
}

const initialBooking: BookingData = {
    id: '',
    userId: '',
    status: 'waiting',
};

export const useBookingStore = create<BookingStore>((set) => ({
    booking: initialBooking,

    updateBooking: (data) =>
        set((state) => ({
            booking: { ...state.booking, ...data },
        })),

    setService: (type, title) =>
        set((state) => ({
            booking: { ...state.booking, serviceType: type, serviceTitle: title },
        })),

    setStatus: (status) =>
        set((state) => ({
            booking: { ...state.booking, status },
        })),

    resetBooking: () => set({ booking: initialBooking }),
}));
