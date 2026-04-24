'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, MapPin, Award, Clock, CheckCircle2, MessageSquare } from 'lucide-react';
import MobileContainer from '@/components/MobileContainer';
import Button from '@/components/ui/Button';

const provider = {
    name: 'พยาบาลแอน สมใจ',
    initial: 'A',
    color: '#14b8a6',
    rating: 4.9,
    reviews: 124,
    experience: 8,
    completedJobs: 342,
    bio: 'พยาบาลวิชาชีพ ประสบการณ์ 8 ปี ในการดูแลผู้สูงอายุและผู้ป่วยติดเตียง มีความเชี่ยวชาญด้านการให้ยา ดูแลสายต่าง ๆ และการฟื้นฟู',
    skills: ['ผู้สูงอายุ', 'ผู้ป่วยติดเตียง', 'การให้ยา', 'กายภาพบำบัด', 'การปฐมพยาบาล'],
    certs: ['ใบประกอบวิชาชีพพยาบาล', 'CPR / First Aid', 'Basic ICU Care'],
    price: 1500,
};

const reviews = [
    { user: 'คุณวิชัย', rating: 5, text: 'ดูแลคุณแม่ดีมาก สุภาพ ละเอียด', date: '2 สัปดาห์ที่แล้ว' },
    { user: 'คุณสมศรี', rating: 5, text: 'มืออาชีพมาก แนะนำเลย', date: '1 เดือนที่แล้ว' },
    { user: 'คุณนพดล', rating: 4, text: 'ตรงเวลา งานละเอียด', date: '2 เดือนที่แล้ว' },
];

export default function ProviderProfilePage() {
    const router = useRouter();

    return (
        <MobileContainer>
            <div className="flex-1 flex flex-col overflow-hidden">
                <div className="p-8 pb-4 bg-primary-gradient text-white relative">
                    <button onClick={() => router.back()} className="bg-white/20 w-10 h-10 rounded-xl flex items-center justify-center mb-6">
                        <ArrowLeft size={20} />
                    </button>
                    <div className="flex items-center gap-4">
                        <div className="w-20 h-20 rounded-3xl flex items-center justify-center text-white font-black text-3xl border-4 border-white/30" style={{ backgroundColor: provider.color }}>
                            {provider.initial}
                        </div>
                        <div>
                            <h2 className="text-2xl font-black">{provider.name}</h2>
                            <div className="flex items-center gap-2 mt-1">
                                <Star size={14} fill="#fbbf24" stroke="#fbbf24" />
                                <span className="font-bold">{provider.rating}</span>
                                <span className="text-xs opacity-90">({provider.reviews} รีวิว)</span>
                            </div>
                            <span className="inline-flex items-center gap-1 mt-2 bg-white/20 px-2 py-1 rounded-full text-[10px] font-bold">
                                <CheckCircle2 size={10} /> ยืนยันตัวตนแล้ว
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                    <div className="grid grid-cols-3 gap-3 mb-6">
                        <div className="bg-white rounded-2xl p-3 text-center border border-gray-100">
                            <Clock size={18} className="text-primary mx-auto mb-1" />
                            <p className="text-xs text-text-muted">ประสบการณ์</p>
                            <p className="font-black text-text-main text-sm">{provider.experience} ปี</p>
                        </div>
                        <div className="bg-white rounded-2xl p-3 text-center border border-gray-100">
                            <CheckCircle2 size={18} className="text-green-600 mx-auto mb-1" />
                            <p className="text-xs text-text-muted">งานสำเร็จ</p>
                            <p className="font-black text-text-main text-sm">{provider.completedJobs}</p>
                        </div>
                        <div className="bg-white rounded-2xl p-3 text-center border border-gray-100">
                            <Star size={18} className="text-amber-500 mx-auto mb-1" />
                            <p className="text-xs text-text-muted">ราคา/งาน</p>
                            <p className="font-black text-text-main text-sm">฿{provider.price}</p>
                        </div>
                    </div>

                    <section className="mb-6">
                        <h3 className="font-black text-text-main mb-2">เกี่ยวกับ</h3>
                        <p className="text-sm text-text-muted leading-relaxed">{provider.bio}</p>
                    </section>

                    <section className="mb-6">
                        <h3 className="font-black text-text-main mb-3">ทักษะและความเชี่ยวชาญ</h3>
                        <div className="flex flex-wrap gap-2">
                            {provider.skills.map((s) => (
                                <span key={s} className="bg-primary/10 text-primary px-3 py-1.5 rounded-full text-xs font-bold">{s}</span>
                            ))}
                        </div>
                    </section>

                    <section className="mb-6">
                        <h3 className="font-black text-text-main mb-3 flex items-center gap-2">
                            <Award size={18} className="text-amber-500" /> ใบรับรอง
                        </h3>
                        <div className="flex flex-col gap-2">
                            {provider.certs.map((c) => (
                                <div key={c} className="bg-white border border-gray-100 rounded-xl p-3 text-xs font-bold flex items-center gap-2">
                                    <CheckCircle2 size={14} className="text-green-500" />
                                    {c}
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h3 className="font-black text-text-main mb-3">รีวิวจากลูกค้า</h3>
                        <div className="flex flex-col gap-3">
                            {reviews.map((r, i) => (
                                <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="bg-white p-4 rounded-2xl border border-gray-100">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="font-bold text-sm">{r.user}</span>
                                        <span className="text-[10px] text-text-muted">{r.date}</span>
                                    </div>
                                    <div className="flex gap-0.5 mb-2">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <Star key={i} size={12} fill={i < r.rating ? '#fbbf24' : 'none'} stroke="#fbbf24" />
                                        ))}
                                    </div>
                                    <p className="text-xs text-text-muted">{r.text}</p>
                                </motion.div>
                            ))}
                        </div>
                    </section>
                </div>

                <div className="p-6 pb-10 border-t border-gray-100 bg-white flex gap-3">
                    <button onClick={() => router.push('/chat')} className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center text-primary">
                        <MessageSquare size={22} />
                    </button>
                    <Button onClick={() => router.push('/payment')} fullWidth>เลือกผู้ดูแลคนนี้</Button>
                </div>
            </div>
        </MobileContainer>
    );
}
