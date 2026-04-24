'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Bell, CheckCircle2, AlertCircle, Info, Calendar } from 'lucide-react';
import MobileContainer from '@/components/MobileContainer';
import BottomNav from '@/components/BottomNav';

const mock = [
    { id: 1, icon: CheckCircle2, title: 'การจองสำเร็จ', desc: 'พยาบาลแอนได้รับงานของคุณแล้ว', time: '5 นาทีที่แล้ว', color: 'text-green-600', bg: 'bg-green-50', unread: true },
    { id: 2, icon: Info, title: 'โปรโมชั่น 20%', desc: 'ใช้โค้ด HEALCARE20 ลดทันที 20%', time: '1 ชั่วโมงที่แล้ว', color: 'text-primary', bg: 'bg-primary/10', unread: true },
    { id: 3, icon: Calendar, title: 'นัดหมายใกล้ถึง', desc: 'การนัดหมายวันพรุ่งนี้ 14:00 น.', time: 'เมื่อวาน', color: 'text-amber-600', bg: 'bg-amber-50', unread: false },
    { id: 4, icon: AlertCircle, title: 'อัปเดตข้อมูลส่วนตัว', desc: 'กรุณายืนยันหมายเลขโทรศัพท์', time: '3 วันที่แล้ว', color: 'text-rose-600', bg: 'bg-rose-50', unread: false },
];

export default function NotificationsPage() {
    const router = useRouter();

    return (
        <MobileContainer>
            <div className="flex-1 flex flex-col pb-24 overflow-y-auto">
                <div className="p-8 pb-4 bg-primary-gradient text-white">
                    <button onClick={() => router.back()} className="bg-white/20 w-10 h-10 rounded-xl flex items-center justify-center mb-4">
                        <ArrowLeft size={20} />
                    </button>
                    <h1 className="text-2xl font-extrabold">การแจ้งเตือน</h1>
                </div>

                <div className="p-6 flex flex-col gap-3">
                    {mock.map((n, i) => (
                        <motion.div
                            key={n.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className={`bg-white p-4 rounded-2xl border shadow-sm flex gap-3 ${n.unread ? 'border-primary/30' : 'border-gray-100'}`}
                        >
                            <div className={`w-12 h-12 rounded-xl ${n.bg} ${n.color} flex items-center justify-center flex-shrink-0`}>
                                <n.icon size={22} />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <h4 className="font-bold text-sm text-text-main">{n.title}</h4>
                                    {n.unread && <span className="w-2 h-2 rounded-full bg-primary" />}
                                </div>
                                <p className="text-xs text-text-muted leading-relaxed">{n.desc}</p>
                                <p className="text-[10px] text-text-muted mt-2 font-bold">{n.time}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
            <BottomNav />
        </MobileContainer>
    );
}
