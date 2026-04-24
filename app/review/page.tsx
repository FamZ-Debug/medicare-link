'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Star, Heart } from 'lucide-react';
import MobileContainer from '@/components/MobileContainer';
import Button from '@/components/ui/Button';
import { useBookingStore } from '@/store/bookingStore';
import { useHistoryStore } from '@/store/historyStore';

const tagOptions = ['ตรงเวลา', 'สุภาพมาก', 'เชี่ยวชาญ', 'ให้คำปรึกษาดี', 'สะอาด', 'ใส่ใจ'];

export default function ReviewPage() {
    const router = useRouter();
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const { booking, resetBooking } = useBookingStore();
    const addBooking = useHistoryStore((s) => s.addBooking);

    const toggleTag = (t: string) => {
        setSelectedTags((prev) => prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]);
    };

    const handleSubmit = () => {
        addBooking({
            ...booking,
            status: 'completed',
            userId: booking.userId || 'me',
            rating,
            review: [comment, ...selectedTags].filter(Boolean).join(' • '),
        } as any);
        resetBooking();
        router.push('/home');
    };

    return (
        <MobileContainer>
            <div className="flex-1 flex flex-col p-8 pt-16 items-center text-center overflow-y-auto">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', damping: 15 }} className="w-24 h-24 rounded-full bg-rose-50 border-4 border-rose-100 flex items-center justify-center mb-6">
                    <Heart className="text-rose-500" size={44} fill="currentColor" />
                </motion.div>

                <h1 className="text-3xl font-black text-text-main mb-2">บริการเสร็จสิ้น</h1>
                <p className="text-text-muted mb-10">ช่วยให้คะแนนผู้ดูแลเพื่อพัฒนาบริการ</p>

                <div className="flex justify-center gap-2 mb-8">
                    {[1, 2, 3, 4, 5].map((s) => (
                        <motion.button
                            key={s}
                            whileTap={{ scale: 0.85 }}
                            onClick={() => setRating(s)}
                            className="transition-transform"
                        >
                            <Star
                                size={44}
                                fill={rating >= s ? '#fbbf24' : 'none'}
                                stroke={rating >= s ? '#fbbf24' : '#d1d5db'}
                                strokeWidth={2}
                            />
                        </motion.button>
                    ))}
                </div>

                {rating > 0 && (
                    <>
                        <div className="flex flex-wrap justify-center gap-2 mb-6">
                            {tagOptions.map((t) => (
                                <button
                                    key={t}
                                    onClick={() => toggleTag(t)}
                                    className={`px-4 py-2 rounded-full text-sm font-bold border-2 transition-all ${
                                        selectedTags.includes(t) ? 'border-primary bg-primary/5 text-primary' : 'border-gray-200 text-text-muted'
                                    }`}
                                >
                                    {t}
                                </button>
                            ))}
                        </div>

                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="เขียนรีวิว (ไม่บังคับ)..."
                            rows={4}
                            className="w-full p-5 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:ring-4 focus:ring-primary/10 outline-none resize-none mb-6"
                        />
                    </>
                )}

                <div className="w-full mt-auto">
                    <Button onClick={handleSubmit} disabled={rating === 0}>ส่งรีวิวและกลับหน้าหลัก</Button>
                    <button onClick={handleSubmit} className="mt-4 text-text-muted text-sm font-bold">ข้าม</button>
                </div>
            </div>
        </MobileContainer>
    );
}
