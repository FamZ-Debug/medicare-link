'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Zap, Calendar } from 'lucide-react';
import MobileContainer from '@/components/MobileContainer';
import { fadeInVariants, staggerContainerVariants } from '@/utils/animations';
import { useBookingStore } from '@/store/bookingStore';

export default function BookingModePage() {
    const router = useRouter();
    const updateBooking = useBookingStore((state) => state.updateBooking);

    const handleModeSelect = (mode: 'quick' | 'advance') => {
        updateBooking({ mode });
        if (mode === 'quick') {
            router.push('/grab-search');
        } else {
            router.push('/booking-search');
        }
    };

    return (
        <MobileContainer>
            <div className="flex-1 flex flex-col p-8 pt-16">
                <motion.div
                    className="mb-8"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <button
                        onClick={() => router.back()}
                        className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center mb-8 hover:bg-gray-200"
                    >
                        <ArrowLeft size={20} />
                    </button>

                    <h1 className="text-4xl font-extrabold text-text-main mb-3 tracking-tight">
                        รูปแบบการจอง
                    </h1>
                    <p className="text-base text-text-muted">
                        เลือกรูปแบบที่คุณสะดวก
                    </p>
                </motion.div>

                <motion.div
                    className="flex-1 flex flex-col gap-6"
                    variants={staggerContainerVariants}
                    initial="initial"
                    animate="animate"
                >
                    {/* Quick Search */}
                    <motion.div
                        variants={fadeInVariants}
                        onClick={() => handleModeSelect('quick')}
                        className="p-6 rounded-4xl bg-white border-2 border-gray-100 shadow-sm cursor-pointer hover:border-primary transition-all flex flex-col gap-4 text-center group"
                    >
                        <div className="w-20 h-20 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center mx-auto group-hover:bg-amber-500 group-hover:text-white transition-colors">
                            <Zap size={40} fill="currentColor" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-text-main mb-1">ค้นหาด่วน (Quick GPS)</h3>
                            <p className="text-sm text-text-muted">หาผู้ดูแลใกล้เคียงในทันที ผ่านระบบระบุตำแหน่ง</p>
                        </div>
                    </motion.div>

                    {/* Advance Booking */}
                    <motion.div
                        variants={fadeInVariants}
                        onClick={() => handleModeSelect('advance')}
                        className="p-6 rounded-4xl bg-white border-2 border-gray-100 shadow-sm cursor-pointer hover:border-primary transition-all flex flex-col gap-4 text-center group"
                    >
                        <div className="w-20 h-20 rounded-full bg-teal-50 text-teal-500 flex items-center justify-center mx-auto group-hover:bg-teal-500 group-hover:text-white transition-colors">
                            <Calendar size={40} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-text-main mb-1">จองล่วงหน้า (Advance)</h3>
                            <p className="text-sm text-text-muted">ระบุวันและเวลาที่ต้องการล่วงหน้า เพื่อความแน่นอน</p>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </MobileContainer>
    );
}
