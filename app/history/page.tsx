'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, MapPin, Clock, Package } from 'lucide-react';
import MobileContainer from '@/components/MobileContainer';
import BottomNav from '@/components/BottomNav';
import { useHistoryStore } from '@/store/historyStore';

const statusMap: Record<string, { label: string; cls: string }> = {
    completed: { label: 'เสร็จสิ้น', cls: 'bg-green-100 text-green-700' },
    cancelled: { label: 'ยกเลิก', cls: 'bg-gray-100 text-gray-600' },
    'in-progress': { label: 'กำลังดำเนินการ', cls: 'bg-amber-100 text-amber-700' },
    waiting: { label: 'รอผู้ดูแล', cls: 'bg-blue-100 text-blue-700' },
    accepted: { label: 'รับงานแล้ว', cls: 'bg-teal-100 text-teal-700' },
    arrived: { label: 'ผู้ดูแลถึงแล้ว', cls: 'bg-teal-100 text-teal-700' },
};

export default function HistoryPage() {
    const router = useRouter();
    const { items } = useHistoryStore();

    return (
        <MobileContainer>
            <div className="flex-1 flex flex-col pb-24 overflow-y-auto">
                <div className="p-8 pb-4 bg-primary-gradient text-white">
                    <button onClick={() => router.back()} className="bg-white/20 w-10 h-10 rounded-xl flex items-center justify-center mb-4">
                        <ArrowLeft size={20} />
                    </button>
                    <h1 className="text-2xl font-extrabold">ประวัติการใช้บริการ</h1>
                    <p className="text-sm opacity-90 mt-1">ทั้งหมด {items.length} รายการ</p>
                </div>

                <div className="p-6 flex-1">
                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center text-gray-300 mb-4">
                                <Package size={36} />
                            </div>
                            <h4 className="font-bold text-gray-400">ยังไม่มีประวัติ</h4>
                            <p className="text-xs text-gray-400 mt-1">การจองของคุณจะปรากฏที่นี่</p>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-4">
                            {items.map((item, idx) => {
                                const st = statusMap[item.status] || statusMap.waiting;
                                return (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                        className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm"
                                    >
                                        <div className="flex justify-between items-start mb-3">
                                            <h4 className="font-bold text-text-main">{item.serviceTitle || 'บริการ'}</h4>
                                            <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${st.cls}`}>{st.label}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-text-muted mb-1">
                                            <Calendar size={12} />
                                            <span>{item.date || new Date(item.createdAt).toLocaleDateString('th-TH')}</span>
                                            {item.time && (<><Clock size={12} /><span>{item.time}</span></>)}
                                        </div>
                                        {item.location && (
                                            <div className="flex items-center gap-2 text-xs text-text-muted">
                                                <MapPin size={12} />
                                                <span className="truncate">{item.location}</span>
                                            </div>
                                        )}
                                        {item.totalAmount != null && (
                                            <div className="pt-3 mt-3 border-t border-dashed border-gray-100 flex justify-between items-center">
                                                <span className="text-xs text-text-muted font-bold">ยอดรวม</span>
                                                <span className="text-lg font-black text-primary">฿{item.totalAmount.toLocaleString()}</span>
                                            </div>
                                        )}
                                    </motion.div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
            <BottomNav />
        </MobileContainer>
    );
}
