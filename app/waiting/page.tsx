'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Clock, X } from 'lucide-react';
import MobileContainer from '@/components/MobileContainer';
import Button from '@/components/ui/Button';
import { useBookingStore } from '@/store/bookingStore';

export default function WaitingPage() {
    const router = useRouter();
    const { setStatus, resetBooking } = useBookingStore();
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        const t = setInterval(() => setSeconds((s) => s + 1), 1000);
        const accept = setTimeout(() => {
            setStatus('accepted');
            router.push('/tracking');
        }, 8000);
        return () => { clearInterval(t); clearTimeout(accept); };
    }, [router, setStatus]);

    const handleCancel = () => {
        if (confirm('ยกเลิกการรอผู้ดูแลใช่หรือไม่?')) {
            resetBooking();
            router.push('/home');
        }
    };

    const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
    const ss = String(seconds % 60).padStart(2, '0');

    return (
        <MobileContainer>
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-primary/5 to-white">
                <div className="relative mb-10">
                    <motion.div className="absolute inset-0 bg-primary/20 rounded-full"
                        animate={{ scale: [1, 2, 1], opacity: [0.4, 0, 0.4] }}
                        transition={{ duration: 2, repeat: Infinity }} />
                    <motion.div className="absolute inset-0 bg-primary/20 rounded-full"
                        animate={{ scale: [1, 2.5, 1], opacity: [0.4, 0, 0.4] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }} />
                    <div className="relative w-28 h-28 bg-primary text-white rounded-full flex items-center justify-center shadow-2xl z-10">
                        <Clock size={44} />
                    </div>
                </div>

                <h2 className="text-2xl font-black text-text-main mb-2">กำลังรอผู้ดูแล...</h2>
                <p className="text-text-muted text-sm mb-6">ระบบกำลังติดต่อผู้ดูแลที่เหมาะกับคุณ</p>

                <div className="bg-white border border-gray-100 rounded-2xl px-8 py-4 font-mono text-3xl font-black text-primary mb-10 shadow-sm">
                    {mm}:{ss}
                </div>

                <p className="text-xs text-text-muted mb-8 max-w-[260px]">โปรดรอสักครู่ หากผู้ดูแลไม่ตอบรับภายใน 5 นาที เราจะส่งคำขอให้ผู้ดูแลท่านอื่น</p>

                <Button variant="outline" onClick={handleCancel} className="border-rose-500 text-rose-500">
                    <X size={18} className="mr-2 inline" /> ยกเลิกการรอ
                </Button>
            </div>
        </MobileContainer>
    );
}
