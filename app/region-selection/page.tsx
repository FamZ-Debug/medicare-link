'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPinned } from 'lucide-react';
import MobileContainer from '@/components/MobileContainer';
import Button from '@/components/ui/Button';
import { fadeInVariants, staggerContainerVariants } from '@/utils/animations';
import { useBookingStore } from '@/store/bookingStore';

const regions = ['ภาคกลาง', 'ภาคเหนือ', 'ภาคใต้', 'ภาคอีสาน', 'ภาคตะวันออก', 'ภาคตะวันตก'];

export default function RegionSelectionPage() {
    const router = useRouter();
    const updateBooking = useBookingStore((state) => state.updateBooking);
    const [selectedRegion, setSelectedRegion] = useState('');

    const handleNext = () => {
        if (!selectedRegion) return;
        updateBooking({ region: selectedRegion });
        router.push('/province-selection');
    };

    return (
        <MobileContainer>
            <div className="flex-1 flex flex-col p-8 pt-16 overflow-y-auto">
                <motion.div
                    className="mb-8"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <button
                        onClick={() => router.back()}
                        className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center mb-8 hover:bg-gray-200 transition-colors"
                    >
                        <ArrowLeft size={20} />
                    </button>

                    <h1 className="text-4xl font-extrabold text-text-main mb-3 tracking-tight">
                        ระบุพื้นที่
                    </h1>
                    <p className="text-base text-text-muted">
                        เลือกภูมิภาคที่ต้องการรับบริการ
                    </p>
                </motion.div>

                <motion.div
                    className="flex-1 flex flex-col gap-3"
                    variants={staggerContainerVariants}
                    initial="initial"
                    animate="animate"
                >
                    {regions.map((region) => (
                        <motion.div
                            key={region}
                            variants={fadeInVariants}
                            onClick={() => setSelectedRegion(region)}
                            className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                                selectedRegion === region 
                                ? 'border-primary bg-primary/5 text-primary' 
                                : 'border-gray-100 bg-white text-text-main hover:border-gray-200'
                            }`}
                        >
                            <span className="font-bold">{region}</span>
                            <MapPinned size={20} className={selectedRegion === region ? 'opacity-100' : 'opacity-20'} />
                        </motion.div>
                    ))}

                    <div className="mt-8">
                        <Button onClick={handleNext} disabled={!selectedRegion}>
                            ถัดไป
                        </Button>
                    </div>
                </motion.div>
            </div>
        </MobileContainer>
    );
}
