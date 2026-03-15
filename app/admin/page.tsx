'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, ShieldCheck, AlertTriangle, TrendingUp, DollarSign, Search, Check, X } from 'lucide-react';
import MobileContainer from '@/components/MobileContainer';
import BottomNav from '@/components/BottomNav';
import Button from '@/components/ui/Button';

export default function AdminDashboardPage() {
    const stats = [
        { label: 'รายได้รวม', value: '฿124,500', icon: DollarSign, color: 'text-teal-600', bg: 'bg-teal-50' },
        { label: 'ผู้ใช้ทั้งหมด', value: '1,240', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'เคส SOS', value: '3', icon: AlertTriangle, color: 'text-rose-600', bg: 'bg-rose-50' },
    ];

    const pendingProviders = [
        { id: 1, name: 'คุณวิชัย สายสืบ', type: 'พยาบาลวิชาชีพ', date: '15/02/2026' },
        { id: 2, name: 'คุณนพดล ใจงาม', type: 'ผู้ช่วยดูแลผู้ป่วย', date: '14/02/2026' },
    ];

    return (
        <MobileContainer>
            <div className="flex-1 flex flex-col p-8 pb-24 overflow-y-auto">
                <header className="mb-8">
                    <h1 className="text-3xl font-extrabold text-text-main mb-2">Admin Panel</h1>
                    <p className="text-text-muted text-sm font-semibold">ระบบจัดการหลังบ้าน MediCare Link</p>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 gap-4 mb-8">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4"
                        >
                            <div className={`w-12 h-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center`}>
                                <stat.icon size={24} />
                            </div>
                            <div>
                                <p className="text-xs text-text-muted font-bold">{stat.label}</p>
                                <p className="text-xl font-black text-text-main">{stat.value}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Management Sections */}
                <section className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-bold text-text-main">รอยืนยันตน (Provider)</h2>
                        <span className="bg-amber-100 text-amber-700 text-[10px] font-black px-2 py-1 rounded-full">{pendingProviders.length} รายการ</span>
                    </div>
                    
                    <div className="flex flex-col gap-3">
                        {pendingProviders.map((pro) => (
                            <div key={pro.id} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold">
                                        {pro.name[0]}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-text-main">{pro.name}</p>
                                        <p className="text-[10px] text-text-muted">{pro.type} • {pro.date}</p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center hover:bg-rose-100 transition-colors">
                                        <X size={16} />
                                    </button>
                                    <button className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center hover:bg-teal-100 transition-colors">
                                        <Check size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-bold text-text-main">Quick Actions</h2>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <button className="p-4 rounded-2xl bg-white border border-gray-100 shadow-sm flex flex-col items-center gap-2 hover:border-primary transition-all">
                            <ShieldCheck size={24} className="text-primary" />
                            <span className="text-xs font-bold">จัดการบทบาท</span>
                        </button>
                        <button className="p-4 rounded-2xl bg-white border border-gray-100 shadow-sm flex flex-col items-center gap-2 hover:border-rose-500 transition-all">
                            <AlertTriangle size={24} className="text-rose-500" />
                            <span className="text-xs font-bold">เคส SOS</span>
                        </button>
                    </div>
                </section>
            </div>

            {/* Admin flows often don't have the same bottom nav, but for consistency in this app we'll show it or a simplified version */}
            <BottomNav />
        </MobileContainer>
    );
}
