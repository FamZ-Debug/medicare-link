'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { User, LogOut, Shield, Bell, HelpCircle, ChevronRight, Settings, Heart, FileText } from 'lucide-react';
import MobileContainer from '@/components/MobileContainer';
import BottomNav from '@/components/BottomNav';
import { useUserStore } from '@/store/userStore';

export default function ProfilePage() {
    const router = useRouter();
    const { user, logout } = useUserStore();

    const handleLogout = () => {
        if (confirm('ต้องการออกจากระบบใช่หรือไม่?')) {
            logout();
            router.push('/');
        }
    };

    const menuItems = [
        { icon: FileText, label: 'ข้อมูลส่วนตัว', onClick: () => router.push('/profile-setup') },
        { icon: Heart, label: 'ผู้ติดต่อฉุกเฉิน', onClick: () => router.push('/profile-setup') },
        { icon: Shield, label: 'ความปลอดภัย', onClick: () => {} },
        { icon: Bell, label: 'ตั้งค่าการแจ้งเตือน', onClick: () => router.push('/notifications') },
        { icon: HelpCircle, label: 'ช่วยเหลือ', onClick: () => {} },
        { icon: Settings, label: 'ตั้งค่าแอป', onClick: () => {} },
    ];

    return (
        <MobileContainer>
            <div className="flex-1 flex flex-col pb-24 overflow-y-auto">
                {/* Header */}
                <div className="bg-primary-gradient text-white p-8 pt-12 pb-16 relative">
                    <h1 className="text-2xl font-extrabold mb-8">โปรไฟล์</h1>
                    <div className="flex items-center gap-4">
                        <div className="w-20 h-20 rounded-full bg-white/20 border-4 border-white/30 flex items-center justify-center">
                            <User size={36} />
                        </div>
                        <div>
                            <h2 className="text-xl font-black">{user?.fullName || 'ผู้ใช้ทั่วไป'}</h2>
                            <p className="text-sm opacity-90">{user?.phoneNumber || '-'}</p>
                            <span className="inline-block mt-2 bg-white/20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                                {user?.role === 'provider' ? 'ผู้ให้บริการ' : user?.role === 'admin' ? 'ผู้ดูแลระบบ' : 'ลูกค้า'}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Menu */}
                <div className="p-6 -mt-8">
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-50 overflow-hidden">
                        {menuItems.map((item, idx) => (
                            <motion.button
                                key={idx}
                                onClick={item.onClick}
                                whileTap={{ scale: 0.98 }}
                                className="w-full p-5 flex items-center justify-between border-b border-gray-50 last:border-b-0 hover:bg-gray-50 transition-colors"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                                        <item.icon size={20} />
                                    </div>
                                    <span className="font-bold text-text-main text-sm">{item.label}</span>
                                </div>
                                <ChevronRight size={18} className="text-text-muted" />
                            </motion.button>
                        ))}
                    </div>

                    <button
                        onClick={handleLogout}
                        className="w-full mt-6 p-5 rounded-3xl border-2 border-rose-100 bg-white text-rose-500 font-bold flex items-center justify-center gap-2 hover:bg-rose-50 transition-colors"
                    >
                        <LogOut size={20} />
                        ออกจากระบบ
                    </button>

                    <p className="text-center text-xs text-text-muted mt-8">MediCare Link v1.0.0</p>
                </div>
            </div>

            <BottomNav />
        </MobileContainer>
    );
}
