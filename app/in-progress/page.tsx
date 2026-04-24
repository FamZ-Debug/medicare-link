'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, ShieldAlert, MessageSquare, Phone, CheckCircle2 } from 'lucide-react';
import MobileContainer from '@/components/MobileContainer';
import Button from '@/components/ui/Button';
import { useBookingStore } from '@/store/bookingStore';

export default function InProgressPage() {
    const router = useRouter();
    const { booking, setStatus } = useBookingStore();
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        const t = setInterval(() => setSeconds((s) => s + 1), 1000);
        return () => clearInterval(t);
    }, []);

    const hh = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const mm = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const ss = String(seconds % 60).padStart(2, '0');

    const handleFinish = () => {
        if (confirm('ยืนยันเสร็จสิ้นบริการใช่หรือไม่?')) {
            setStatus('completed');
            router.push('/review');
        }
    };

    return (
        <MobileContainer>
            <div className="flex-1 flex flex-col bg-gradient-to-br from-teal-50 to-white overflow-y-auto">
                <div className="p-8 pb-4 flex items-center justify-between">
                    <button onClick={() => router.back()} className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm">
                        <ArrowLeft size={20} />
                    </button>
                    <button onClick={() => router.push('/sos')} className="bg-rose-500 text-white px-4 py-2 rounded-2xl shadow-lg flex items-center gap-2 font-bold">
                        <ShieldAlert size={18} />
                        SOS
                    </button>
                </div>

                <div className="px-8 py-6 text-center">
                    <span className="inline-block bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-xs font-black mb-4">● กำลังให้บริการ</span>
                    <h2 className="text-3xl font-black text-text-main mb-1">{booking.serviceTitle || 'บริการดูแล'}</h2>
                    <p className="text-sm text-text-muted">{booking.location || 'สถานที่ของคุณ'}</p>
                </div>

                <div className="mx-8 bg-white rounded-3xl p-8 shadow-sm border border-gray-100 text-center mb-6">
                    <p className="text-xs text-text-muted font-bold uppercase tracking-wider mb-4">เวลาให้บริการ</p>
                    <div className="text-6xl font-black text-primary font-mono tracking-tight">
                        {hh}:{mm}:{ss}
                    </div>
                </div>

                <div className="mx-8 bg-white rounded-3xl p-5 border border-gray-100 mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-black">A</div>
                        <div>
                            <p className="font-bold text-text-main">พยาบาลแอน</p>
                            <p className="text-[10px] text-text-muted">ผู้ดูแลของคุณ</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button onClick={() => router.push('/chat')} className="w-10 h-10 rounded-xl bg-gray-50 text-primary flex items-center justify-center">
                            <MessageSquare size={18} />
                        </button>
                        <a href="tel:0812345678" className="w-10 h-10 rounded-xl bg-gray-50 text-primary flex items-center justify-center">
                            <Phone size={18} />
                        </a>
                    </div>
                </div>

                <div className="px-8 pb-10 mt-auto">
                    <Button onClick={handleFinish}>
                        <CheckCircle2 size={20} className="inline mr-2" />
                        ยืนยันเสร็จสิ้นบริการ
                    </Button>
                </div>
            </div>
        </MobileContainer>
    );
}
