'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import MobileContainer from '@/components/MobileContainer';

export default function GrabSearchPage() {
    const router = useRouter();

    useEffect(() => {
        // Simulate search delay
        const timer = setTimeout(() => {
            router.push('/search-results');
        }, 3000);
        return () => clearTimeout(timer);
    }, [router]);

    return (
        <MobileContainer>
            <div className="flex-1 flex flex-col items-center justify-center p-8 bg-primary/5">
                <div className="relative mb-12">
                    {/* Pulsing circles */}
                    <motion.div
                        className="absolute inset-0 bg-primary/20 rounded-full"
                        initial={{ scale: 1, opacity: 0.5 }}
                        animate={{ scale: 2.5, opacity: 0 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                    />
                    <motion.div
                        className="absolute inset-0 bg-primary/20 rounded-full"
                        initial={{ scale: 1, opacity: 0.5 }}
                        animate={{ scale: 2, opacity: 0 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
                    />
                    
                    {/* Center Icon */}
                    <div className="relative w-24 h-24 bg-primary text-white rounded-full flex items-center justify-center shadow-2xl z-10">
                        <Zap size={40} fill="currentColor" />
                    </div>
                </div>

                <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h2 className="text-2xl font-extrabold text-text-main mb-3">กำลังค้นหาผู้ดูแล...</h2>
                    <p className="text-text-muted">โปรดรอสักครู่ ระบบกำลังหาผู้ที่ใกล้คุณที่สุด</p>
                </motion.div>

                {/* Simulated progress dots */}
                <div className="flex gap-2 mt-12">
                    {[0, 1, 2].map((i) => (
                        <motion.div
                            key={i}
                            className="w-2 h-2 rounded-full bg-primary"
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                        />
                    ))}
                </div>
            </div>
        </MobileContainer>
    );
}
