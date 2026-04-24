'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, AlertTriangle, Phone, ShieldAlert, MapPin } from 'lucide-react';
import MobileContainer from '@/components/MobileContainer';
import Button from '@/components/ui/Button';

const hotlines = [
    { label: 'กู้ชีพ 1669', number: '1669', desc: 'สถาบันการแพทย์ฉุกเฉินแห่งชาติ' },
    { label: 'ตำรวจ 191', number: '191', desc: 'แจ้งเหตุด่วน-เหตุร้าย' },
    { label: 'ดับเพลิง 199', number: '199', desc: 'สายด่วนสำนักป้องกันบรรเทาสาธารณภัย' },
];

export default function SosPage() {
    const router = useRouter();
    const [sent, setSent] = useState(false);

    const handleSOS = () => {
        setSent(true);
        setTimeout(() => setSent(false), 4000);
    };

    return (
        <MobileContainer>
            <div className="flex-1 flex flex-col pb-24 overflow-y-auto bg-rose-50">
                <div className="p-8 pb-4 bg-rose-500 text-white">
                    <button onClick={() => router.back()} className="bg-white/20 w-10 h-10 rounded-xl flex items-center justify-center mb-4">
                        <ArrowLeft size={20} />
                    </button>
                    <h1 className="text-2xl font-extrabold flex items-center gap-2">
                        <ShieldAlert size={28} /> ขอความช่วยเหลือฉุกเฉิน
                    </h1>
                    <p className="text-sm opacity-95 mt-1">กดปุ่ม SOS เพื่อส่งสัญญาณไปยังศูนย์</p>
                </div>

                <div className="p-6 flex flex-col gap-6">
                    <motion.button
                        onClick={handleSOS}
                        whileTap={{ scale: 0.95 }}
                        className="w-full aspect-square max-w-[260px] mx-auto rounded-full bg-gradient-to-br from-rose-500 to-red-600 text-white shadow-[0_20px_40px_rgba(244,63,94,0.4)] flex flex-col items-center justify-center gap-3 relative"
                    >
                        <motion.div
                            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute inset-0 rounded-full bg-rose-400"
                        />
                        <AlertTriangle size={56} strokeWidth={2.5} className="relative" />
                        <span className="text-2xl font-black relative">กด SOS</span>
                        <span className="text-xs font-bold opacity-90 relative">แจ้งเหตุฉุกเฉิน</span>
                    </motion.button>

                    {sent && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-green-500 text-white p-4 rounded-2xl text-center font-bold"
                        >
                            ✓ ส่งสัญญาณ SOS สำเร็จ ทีมกู้ชีพจะติดต่อคุณในอีกสักครู่
                        </motion.div>
                    )}

                    <div className="bg-white rounded-3xl p-5 border border-gray-100">
                        <div className="flex items-center gap-2 mb-4">
                            <MapPin size={18} className="text-rose-500" />
                            <h3 className="font-black text-text-main">ตำแหน่งปัจจุบัน</h3>
                        </div>
                        <p className="text-xs text-text-muted">ระบบจะใช้ตำแหน่ง GPS ของคุณโดยอัตโนมัติ</p>
                    </div>

                    <div>
                        <h3 className="font-black text-text-main mb-3">สายด่วนฉุกเฉิน</h3>
                        <div className="flex flex-col gap-3">
                            {hotlines.map((h) => (
                                <a
                                    key={h.number}
                                    href={`tel:${h.number}`}
                                    className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between no-underline"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-11 h-11 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center">
                                            <Phone size={20} />
                                        </div>
                                        <div>
                                            <p className="font-bold text-text-main text-sm">{h.label}</p>
                                            <p className="text-[10px] text-text-muted">{h.desc}</p>
                                        </div>
                                    </div>
                                    <span className="text-primary font-black text-sm">โทร</span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </MobileContainer>
    );
}
