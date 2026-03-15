'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, User, LayoutDashboard, Wallet, ClipboardList, Power, Check, X, Clock, MapPin, Image as ImageIcon } from 'lucide-react';
import MobileContainer from '@/components/MobileContainer';
import BottomNav from '@/components/BottomNav';
import IncomeHeader from '@/components/IncomeHeader';
import ActivityItem from '@/components/ActivityItem';
import Button from '@/components/ui/Button';

export default function ProviderDashboardPage() {
    const router = useRouter();
    const [isOnline, setIsOnline] = useState(false);
    const [activeTab, setActiveTab] = useState<'requests' | 'current' | 'schedule'>('requests');

    // Mock data
    const todayIncome = 2450;
    const completedTasks = 8;
    const rating = 4.8;

    const requests = [
        { id: 1, patientName: 'คุณสมชาย ใจดี', service: 'พาไปหาหมอ', dist: '0.8 กม.', price: 450 },
        { id: 2, patientName: 'คุณสมหญิง รักดี', service: 'เฝ้าไข้', dist: '2.4 กม.', price: 1200 },
    ];

    return (
        <MobileContainer>
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top Header */}
                <div className="p-8 pb-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center overflow-hidden">
                            <User size={24} className="text-primary" />
                        </div>
                        <div>
                            <h3 className="font-bold text-text-main">สวัสดี, คุณพยาบาลแอน</h3>
                            <div className="flex items-center gap-1.5">
                                <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`} />
                                <span className="text-xs font-semibold text-text-muted">{isOnline ? 'ออนไลน์' : 'ออฟไลน์'}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-text-main relative">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
                        </button>
                    </div>
                </div>

                <div className="px-8 pb-4">
                    <IncomeHeader todayIncome={todayIncome} completedTasks={completedTasks} rating={rating} />
                </div>

                {/* Status Toggle Button */}
                <div className="px-8 mb-6">
                    <button 
                        onClick={() => setIsOnline(!isOnline)}
                        className={`w-full p-4 rounded-2xl flex items-center justify-between transition-all duration-500 ${isOnline ? 'bg-green-500 text-white shadow-lg shadow-green-200' : 'bg-gray-100 text-text-main'}`}
                    >
                        <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isOnline ? 'bg-white/20' : 'bg-white shadow-sm'}`}>
                                <Power size={20} />
                            </div>
                            <span className="font-bold text-lg">{isOnline ? 'เปิดรับงานอยู่' : 'ปิดรับงานตอนนี้'}</span>
                        </div>
                        <div className={`w-14 h-8 rounded-full border-2 flex items-center p-1 transition-colors ${isOnline ? 'border-white justify-end' : 'border-gray-300 justify-start bg-gray-200'}`}>
                            <motion.div layout className="w-5 h-5 rounded-full bg-white shadow-sm" />
                        </div>
                    </button>
                </div>

                {/* Tabs */}
                <div className="px-8 border-b border-gray-100 flex gap-6">
                    {(['requests', 'current', 'schedule'] as const).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`pb-3 text-sm font-bold transition-all relative ${activeTab === tab ? 'text-primary' : 'text-text-muted'}`}
                        >
                            {tab === 'requests' && 'คำร้องขอ'}
                            {tab === 'current' && 'งานปัจจุบัน'}
                            {tab === 'schedule' && 'ตารางงาน'}
                            {activeTab === tab && (
                                <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-t-full" />
                            )}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="flex-1 overflow-y-auto p-8 pt-6">
                    <AnimatePresence mode="wait">
                        {activeTab === 'requests' && (
                            <motion.div 
                                initial={{ opacity: 0, x: -10 }} 
                                animate={{ opacity: 1, x: 0 }} 
                                exit={{ opacity: 0, x: 10 }}
                                className="flex flex-col gap-4"
                            >
                                {isOnline ? (
                                    requests.map((req) => (
                                        <div key={req.id} className="bg-white p-5 rounded-3xl border-2 border-gray-50 shadow-sm">
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <h4 className="font-bold text-lg text-text-main mb-1">{req.patientName}</h4>
                                                    <div className="flex items-center gap-1.5 text-xs font-bold text-primary">
                                                        <Clock size={12} />
                                                        <span>วันนี้ • {req.service}</span>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-lg font-extrabold text-primary">฿{req.price}</p>
                                                    <p className="text-[10px] text-text-muted font-bold">{req.dist}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 mb-4 text-xs text-text-muted">
                                                <MapPin size={12} />
                                                <span className="truncate">โรงพยาบาลศิริราช, กรุงเทพฯ</span>
                                            </div>
                                            <div className="flex gap-2">
                                                <Button variant="outline" size="sm" className="flex-1 py-3 text-sm">ปฏิเสธ</Button>
                                                <Button 
                                                    size="sm" 
                                                    className="flex-2 py-3 text-sm"
                                                    onClick={() => router.push('/provider-job')}
                                                >
                                                    รับงานนี้
                                                </Button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-12 text-center">
                                        <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-4 text-gray-300">
                                            <Power size={32} />
                                        </div>
                                        <h4 className="font-bold text-gray-400">กรุณาเปิดสถานะ &quot;ออนไลน์&quot;</h4>
                                        <p className="text-xs text-gray-400 mt-1">เพื่อรับงานจากลูกค้าในพื้นที่ของคุณ</p>
                                    </div>
                                )}
                            </motion.div>
                        )}
                        {activeTab === 'current' && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-12 text-center text-text-muted text-sm font-bold">
                                ไม่มีงานที่กำลังดำเนินอยู่
                            </motion.div>
                        )}
                        {activeTab === 'schedule' && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-12 text-center text-text-muted text-sm font-bold">
                                ยังไม่มีตารางงานนัดหมาย
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Bottom Navigation */}
            <BottomNav />
        </MobileContainer>
    );
}
