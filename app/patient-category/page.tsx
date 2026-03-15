'use client';

import { Users, Accessibility } from 'lucide-react';
import MobileContainer from '@/components/MobileContainer';
import CategoryCard from '@/components/CategoryCard';
import { useRouter } from 'next/navigation';
import { useBookingStore } from '@/store/bookingStore';

export default function PatientCategoryPage() {
    const router = useRouter();
    const updateBooking = useBookingStore((state) => state.updateBooking);

    const handleSelect = (type: 'general' | 'disabled') => {
        updateBooking({ patientType: type });
        router.push('/home');
    };

    return (
        <MobileContainer>
            {/* Header */}
            <div className="p-8 pb-4 bg-primary-gradient text-white">
                <button
                    onClick={() => router.back()}
                    className="bg-white/20 border-none text-white w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer mb-4 hover:bg-white/30 transition-colors"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
                <h1 className="text-2xl font-extrabold">เลือกประเภทผู้ป่วย</h1>
            </div>

            {/* Content */}
            <div className="p-8 flex-1 overflow-y-auto">
                <div className="flex flex-col gap-4">
                    {/* General */}
                    <CategoryCard
                        icon={<Users className="w-7 h-7 text-teal-600" />}
                        title="บุคคลทั่วไป (General)"
                        description="บริการดูแลสุขภาพสำหรับบุคคลทั่วไปที่ต้องการผู้ช่วย"
                        onClick={() => handleSelect('general')}
                        iconBgColor="bg-teal-50"
                        delay={0}
                    />

                    {/* Disabled */}
                    <CategoryCard
                        icon={<Accessibility className="w-7 h-7 text-rose-600" />}
                        title="ทุพพลภาพ/ติดเตียง (Disabled)"
                        description="บริการดูแลพิเศษสำหรับผู้ทุพพลภาพ หรือผู้ป่วยติดเตียง"
                        onClick={() => handleSelect('disabled')}
                        iconBgColor="bg-rose-50"
                        delay={0.1}
                    />
                </div>
            </div>
        </MobileContainer>
    );
}
