'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import MobileContainer from '@/components/MobileContainer';
import Button from '@/components/ui/Button';
import { scaleInVariants } from '@/utils/animations';
import { useBookingStore } from '@/store/bookingStore';

export default function SuccessPage() {
    const router = useRouter();
    const { booking, resetBooking } = useBookingStore();
    const isCompleted = booking.status === 'completed';
    const [selectedRating, setSelectedRating] = useState(0);

    const handleGoHome = () => {
        resetBooking();
        router.push('/home');
    };

    return (
        <MobileContainer>
            <div className={`flex-1 flex flex-col items-center justify-center p-8 text-center ${isCompleted ? 'bg-white' : 'bg-gray-50'}`}>
                {/* Success Icon */}
                <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.2 }}
                    className="mb-8"
                >
                    <div className="w-24 h-24 rounded-full bg-green-50 flex items-center justify-center border-4 border-green-100">
                        <CheckCircle2 size={56} className="text-green-500" strokeWidth={3} />
                    </div>
                </motion.div>

                {/* Success Message */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="mb-8 w-full"
                >
                    <h1 className="text-3xl font-black text-text-main mb-3 tracking-tight">
                        {isCompleted ? 'บริการเสร็จสิ้น!' : 'จองสำเร็จ!'}
                    </h1>
                    <p className="text-sm text-text-muted mb-8 font-medium">
                        {isCompleted 
                            ? 'ขอบคุณที่ใช้บริการ MediCare Link' 
                            : 'ระบบได้บันทึกการจองของคุณเรียบร้อยแล้ว'}
                    </p>

                    {isCompleted ? (
                        <div className="my-10">
                            <h3 className="text-lg font-bold mb-6 text-text-main">รบกวนให้คะแนนความพึงพอใจ</h3>
                            <div className="flex justify-center gap-3 mb-8">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button 
                                        key={star} 
                                        onClick={() => setSelectedRating(star)}
                                        className={`transition-all duration-300 transform ${selectedRating >= star ? 'scale-125 text-amber-400' : 'text-gray-200'}`}
                                    >
                                        <svg width="40" height="40" viewBox="0 0 24 24" fill={selectedRating >= star ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                                    </button>
                                ))}
                            </div>
                            <textarea 
                                placeholder="เขียนรีวิวของคุณที่นี่..." 
                                className="w-full p-6 h-32 bg-gray-50 border border-gray-100 rounded-3xl text-sm font-medium focus:ring-4 focus:ring-primary/10 transition-all outline-none resize-none"
                            />
                        </div>
                    ) : (
                        /* Booking Details */
                        <div className="bg-white border-2 border-gray-100 rounded-[2rem] p-8 text-left shadow-sm">
                            <h3 className="font-black text-text-main mb-6 text-center text-lg">สรุปการจอง</h3>
                            <div className="space-y-4 text-sm font-bold">
                                <div className="flex justify-between items-center bg-gray-50 p-3 rounded-2xl">
                                    <span className="text-text-muted">บริการ</span>
                                    <span className="text-text-main">{booking.serviceTitle}</span>
                                </div>
                                <div className="flex justify-between items-center bg-gray-50 p-3 rounded-2xl">
                                    <span className="text-text-muted">วันที่-เวลา</span>
                                    <span className="text-text-main">{booking.date} {booking.time}</span>
                                </div>
                                <div className="border-t border-dashed border-gray-200 pt-4 flex justify-between items-center">
                                    <span className="text-text-main">ยอดชำระล่วงหน้า</span>
                                    <span className="text-primary text-2xl font-black">฿{booking.totalAmount?.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    )}
                </motion.div>

                {/* Action Button */}
                <motion.div
                    className="w-full"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                >
                    <Button onClick={handleGoHome}>
                        {isCompleted ? 'ส่งความเห็นและกลับหน้าหลัก' : 'กลับหน้าหลัก'}
                    </Button>
                </motion.div>
            </div>
        </MobileContainer>
    );
}
