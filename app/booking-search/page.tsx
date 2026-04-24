'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, Calendar, MapPin, Users } from 'lucide-react';
import MobileContainer from '@/components/MobileContainer';
import Button from '@/components/ui/Button';
import { useBookingStore } from '@/store/bookingStore';

const providers = [
    { id: '1', name: 'พยาบาลแอน สมใจ', initial: 'A', color: '#14b8a6', rating: 4.9, reviews: 124, price: 1500, tags: ['วิชาชีพ', 'ผู้สูงอายุ'] },
    { id: '2', name: 'คุณสมชาย ดีเดช', initial: 'S', color: '#f97316', rating: 4.5, reviews: 89, price: 1200, tags: ['ผู้ช่วยดูแล'] },
    { id: '3', name: 'พยาบาลก้อย ใจบุญ', initial: 'K', color: '#7c3aed', rating: 5.0, reviews: 210, price: 1800, tags: ['วิชาชีพ', 'ICU'] },
    { id: '4', name: 'คุณมานี ประเสริฐ', initial: 'M', color: '#0ea5e9', rating: 4.7, reviews: 76, price: 1300, tags: ['กายภาพ'] },
];

export default function BookingSearchPage() {
    const router = useRouter();
    const { booking, updateBooking } = useBookingStore();
    const [selectedId, setSelectedId] = useState<string>('');

    const handleSelect = () => {
        if (!selectedId) return;
        const p = providers.find((x) => x.id === selectedId);
        updateBooking({ providerId: selectedId, totalAmount: p?.price || 1500 });
        router.push('/payment');
    };

    return (
        <MobileContainer>
            <div className="flex-1 flex flex-col overflow-hidden">
                <div className="p-8 pb-4 bg-primary-gradient text-white">
                    <button onClick={() => router.back()} className="bg-white/20 w-10 h-10 rounded-xl flex items-center justify-center mb-4">
                        <ArrowLeft size={20} />
                    </button>
                    <h1 className="text-2xl font-extrabold">เลือกผู้ดูแล</h1>
                    <p className="text-sm opacity-90 mt-1 flex items-center gap-2">
                        <Calendar size={14} />
                        {booking.date || 'วันที่'} {booking.time || ''}
                    </p>
                </div>

                <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-3">
                    {providers.map((p, i) => (
                        <motion.div
                            key={p.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            onClick={() => setSelectedId(p.id)}
                            className={`bg-white p-4 rounded-3xl border-2 cursor-pointer transition-all ${
                                selectedId === p.id ? 'border-primary bg-primary/5' : 'border-gray-100'
                            }`}
                        >
                            <div className="flex items-center gap-4 mb-3">
                                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-extrabold text-xl" style={{ backgroundColor: p.color }}>
                                    {p.initial}
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-text-main">{p.name}</h4>
                                    <div className="flex items-center gap-1 text-xs font-bold text-text-muted">
                                        <Star size={12} fill="#fbbf24" stroke="#fbbf24" />
                                        <span className="text-amber-500">{p.rating}</span>
                                        <span>({p.reviews} รีวิว)</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-lg font-black text-primary">฿{p.price}</p>
                                    <p className="text-[10px] text-text-muted font-bold">ต่องาน</p>
                                </div>
                            </div>
                            <div className="flex gap-2 flex-wrap">
                                {p.tags.map((t) => (
                                    <span key={t} className="text-[10px] bg-primary/10 text-primary px-2 py-1 rounded-full font-bold">{t}</span>
                                ))}
                            </div>
                        </motion.div>
                    ))}

                    <button
                        onClick={() => router.push('/post-job')}
                        className="mt-4 p-4 rounded-2xl bg-amber-50 border-2 border-dashed border-amber-200 text-amber-700 font-bold flex items-center justify-center gap-2"
                    >
                        <Users size={18} />
                        ไม่พบคนที่ถูกใจ? ฝากประกาศหาผู้ดูแล
                    </button>
                </div>

                <div className="p-6 pb-10 border-t border-gray-100 bg-white">
                    <Button onClick={handleSelect} disabled={!selectedId}>
                        เลือกผู้ดูแลและชำระเงิน
                    </Button>
                </div>
            </div>
        </MobileContainer>
    );
}
