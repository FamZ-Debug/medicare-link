'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Bell, MapPin, Heart, Stethoscope, Briefcase, Home as HomeIcon } from 'lucide-react';
import MobileContainer from '@/components/MobileContainer';
import BottomNav from '@/components/BottomNav';
import Button from '@/components/ui/Button';
import ServiceCard from '@/components/ui/ServiceCard';
import { fadeInVariants, staggerContainerVariants } from '@/utils/animations';
import { useBookingStore } from '@/store/bookingStore';

const services = [
    { id: 'doctor-visit', icon: Stethoscope, title: 'พาไปหาหมอ', color: 'teal' as const },
    { id: 'nursing', icon: Heart, title: 'เฝ้าไข้', color: 'rose' as const },
    { id: 'physiotherapy', icon: Briefcase, title: 'กายภาพบำบัด', color: 'blue' as const },
    { id: 'ambulance', icon: HomeIcon, title: 'เรียกรถพยาบาล', color: 'purple' as const },
];

export default function HomePage() {
    const router = useRouter();
    const updateBooking = useBookingStore((state) => state.updateBooking);

    const handleServiceClick = (serviceId: string, title: string) => {
        updateBooking({ serviceType: serviceId as any, serviceTitle: title });
        
        // Mock prompt: Is this service for upcountry?
        const isUpcountry = confirm('คุณต้องการรับบริการในต่างจังหวัดใช่หรือไม่?');
        
        if (isUpcountry) {
            router.push('/region-selection');
        } else {
            router.push('/booking-mode');
        }
    };

    return (
        <MobileContainer>
            {/* Header */}
            <motion.header
                className="py-10 px-8 flex justify-between items-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div>
                    <p className="text-sm text-text-muted mb-1">สวัสดีตอนเช้า 👋</p>
                    <h2 className="text-2xl font-extrabold text-text-main">คุณสมชาย ใจดี</h2>
                </div>
                <button className="w-12 h-12 rounded-xl bg-white shadow-primary flex items-center justify-center text-text-main hover:bg-gray-50 transition-colors">
                    <Bell size={24} strokeWidth={2} />
                </button>
            </motion.header>

            {/* Main Content */}
            <div className="flex-1 px-8 pb-[100px] overflow-y-auto">
                {/* Promo Card */}
                <motion.div
                    className="bg-primary-gradient rounded-4xl p-6 text-white shadow-[0_20px_25px_-5px_rgba(20,184,166,0.2)] mb-8"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    <div className="flex justify-between items-center mb-4">
                        <span className="font-semibold opacity-90">สิทธิพิเศษวันนี้</span>
                        <span className="px-3 py-1.5 rounded-full bg-white/20 text-xs font-bold">
                            NEW USER
                        </span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">ลด 20% สำหรับพาไปหาหมอ</h3>
                    <p className="text-sm opacity-80 mb-6">โค้ด: HEALCARE20 | วันนี้เท่านั้น</p>
                    <div className="flex items-center gap-3">
                        <Button variant="outline" size="sm" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                            รับสิทธิ์เลย
                        </Button>
                    </div>
                </motion.div>

                {/* Services Section */}
                <motion.div
                    variants={staggerContainerVariants}
                    initial="initial"
                    animate="animate"
                >
                    <motion.div
                        className="flex justify-between items-center mb-4"
                        variants={fadeInVariants}
                    >
                        <h3 className="text-xl font-extrabold text-text-main">บริการที่ต้องการ</h3>
                    </motion.div>

                    <div className="grid grid-cols-2 gap-5">
                        {services.map((service, index) => (
                            <motion.div
                                key={service.id}
                                variants={fadeInVariants}
                                custom={index}
                            >
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

            {/* Bottom Navigation */}
            <BottomNav />
        </MobileContainer>
    );
}
