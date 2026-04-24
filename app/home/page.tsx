'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Bell, Heart, Stethoscope, Briefcase, Home as HomeIcon, MapPin, Zap } from 'lucide-react';
import MobileContainer from '@/components/MobileContainer';
import BottomNav from '@/components/BottomNav';
import Button from '@/components/ui/Button';
import ServiceCard from '@/components/ui/ServiceCard';
import { fadeInVariants, staggerContainerVariants } from '@/utils/animations';
import { useBookingStore } from '@/store/bookingStore';
import { useUserStore } from '@/store/userStore';

const services = [
    { id: 'doctor-visit', icon: Stethoscope, title: 'พาไปหาหมอ', color: 'teal' as const },
    { id: 'nursing', icon: Heart, title: 'เฝ้าไข้', color: 'rose' as const },
    { id: 'physiotherapy', icon: Briefcase, title: 'กายภาพบำบัด', color: 'blue' as const },
    { id: 'ambulance', icon: HomeIcon, title: 'เรียกรถพยาบาล', color: 'purple' as const },
];

export default function HomePage() {
    const router = useRouter();
    const updateBooking = useBookingStore((state) => state.updateBooking);
    const { user } = useUserStore();
    const [showLocationPicker, setShowLocationPicker] = useState(false);

    const handleServiceClick = (serviceId: string, title: string) => {
        updateBooking({ serviceType: serviceId as any, serviceTitle: title });
        setShowLocationPicker(true);
    };

    const handleAreaSelect = (upcountry: boolean) => {
        setShowLocationPicker(false);
        router.push(upcountry ? '/region-selection' : '/booking-mode');
    };

    return (
        <MobileContainer>
            <motion.header
                className="py-10 px-8 flex justify-between items-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div>
                    <p className="text-sm text-text-muted mb-1">สวัสดี 👋</p>
                    <h2 className="text-2xl font-extrabold text-text-main">{user?.fullName || 'คุณสมชาย ใจดี'}</h2>
                </div>
                <button onClick={() => router.push('/notifications')} className="w-12 h-12 rounded-xl bg-white shadow-primary flex items-center justify-center text-text-main hover:bg-gray-50 transition-colors relative">
                    <Bell size={24} strokeWidth={2} />
                    <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
                </button>
            </motion.header>

            <div className="flex-1 px-8 pb-[100px] overflow-y-auto">
                <motion.div
                    className="bg-primary-gradient rounded-4xl p-6 text-white shadow-[0_20px_25px_-5px_rgba(20,184,166,0.2)] mb-8"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    <div className="flex justify-between items-center mb-4">
                        <span className="font-semibold opacity-90">สิทธิพิเศษวันนี้</span>
                        <span className="px-3 py-1.5 rounded-full bg-white/20 text-xs font-bold">NEW USER</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">ลด 20% สำหรับพาไปหาหมอ</h3>
                    <p className="text-sm opacity-80 mb-6">โค้ด: HEALCARE20 | วันนี้เท่านั้น</p>
                    <div className="flex items-center gap-3">
                        <Button variant="outline" size="sm" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                            รับสิทธิ์เลย
                        </Button>
                    </div>
                </motion.div>

                <motion.div variants={staggerContainerVariants} initial="initial" animate="animate">
                    <motion.div className="flex justify-between items-center mb-4" variants={fadeInVariants}>
                        <h3 className="text-xl font-extrabold text-text-main">บริการที่ต้องการ</h3>
                    </motion.div>

                    <div className="grid grid-cols-2 gap-5">
                        {services.map((service, index) => (
                            <motion.div key={service.id} variants={fadeInVariants} custom={index}>
                                <ServiceCard
                                    icon={service.icon}
                                    title={service.title}
                                    color={service.color}
                                    onClick={() => handleServiceClick(service.id, service.title)}
                                />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>

            <BottomNav />

            {/* Location Picker Modal */}
            <AnimatePresence>
                {showLocationPicker && (
                    <div className="absolute inset-0 z-[2000] flex items-end justify-center">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowLocationPicker(false)}
                            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ y: 300 }}
                            animate={{ y: 0 }}
                            exit={{ y: 300 }}
                            transition={{ type: 'spring', damping: 25 }}
                            className="relative bg-white rounded-t-[2.5rem] p-8 w-full shadow-2xl"
                        >
                            <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6" />
                            <h2 className="text-xl font-black text-text-main text-center mb-2">พื้นที่รับบริการ</h2>
                            <p className="text-sm text-text-muted text-center mb-6">เลือกพื้นที่ที่ต้องการรับบริการ</p>
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    onClick={() => handleAreaSelect(false)}
                                    className="p-5 rounded-3xl border-2 border-gray-100 hover:border-primary transition-all flex flex-col items-center gap-3"
                                >
                                    <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                                        <Zap size={28} />
                                    </div>
                                    <div className="text-center">
                                        <p className="font-black text-sm">ใกล้ฉัน</p>
                                        <p className="text-[10px] text-text-muted mt-1">ในเขตปัจจุบัน</p>
                                    </div>
                                </button>
                                <button
                                    onClick={() => handleAreaSelect(true)}
                                    className="p-5 rounded-3xl border-2 border-gray-100 hover:border-primary transition-all flex flex-col items-center gap-3"
                                >
                                    <div className="w-14 h-14 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center">
                                        <MapPin size={28} />
                                    </div>
                                    <div className="text-center">
                                        <p className="font-black text-sm">ต่างจังหวัด</p>
                                        <p className="text-[10px] text-text-muted mt-1">เลือกพื้นที่เอง</p>
                                    </div>
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </MobileContainer>
    );
}
