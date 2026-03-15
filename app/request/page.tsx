'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import MobileContainer from '@/components/MobileContainer';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { ServiceRequestFormData } from '@/types';
import { fadeInVariants, staggerContainerVariants } from '@/utils/animations';
import { useBookingStore } from '@/store/bookingStore';

export default function RequestPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<ServiceRequestFormData>();
    const { booking, updateBooking } = useBookingStore();

    const onSubmit = async (data: ServiceRequestFormData) => {
        setLoading(true);

        // Update booking store
        updateBooking({
            location: data.location,
            date: data.date,
            time: data.time,
            notes: data.notes,
            totalAmount: 1500 // Mock price
        });

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setLoading(false);
        router.push('/payment');
    };

    return (
        <MobileContainer>
            <div className="flex-1 flex flex-col p-8 pt-16 overflow-y-auto">
                {/* Header */}
                <motion.div
                    className="mb-8"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <button
                        onClick={() => router.back()}
                        className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center mb-8 transition-colors hover:bg-gray-200"
                    >
                        <ArrowLeft size={20} />
                    </button>

                    <h1 className="text-4xl font-extrabold text-text-main mb-3 tracking-tight">
                        {booking.serviceTitle || 'ขอใช้บริการ'}
                    </h1>
                    <p className="text-base text-text-muted">
                        กรอกรายละเอียดการใช้บริการ
                    </p>
                </motion.div>

                {/* Form */}
                <motion.form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex-1 flex flex-col pb-8"
                    variants={staggerContainerVariants}
                    initial="initial"
                    animate="animate"
                >
                    <motion.div variants={fadeInVariants}>
                        <Input
                            label="สถานที่"
                            type="text"
                            placeholder="กรอกที่อยู่หรือสถานที่"
                            {...register('location', {
                                required: 'กรุณากรอกสถานที่',
                            })}
                            error={errors.location?.message}
                        />
                    </motion.div>

                    <motion.div variants={fadeInVariants}>
                        <Input
                            label="วันที่"
                            type="date"
                            {...register('date', {
                                required: 'กรุณาเลือกวันที่',
                            })}
                            error={errors.date?.message}
                        />
                    </motion.div>

                    <motion.div variants={fadeInVariants}>
                        <Input
                            label="เวลา"
                            type="time"
                            {...register('time', {
                                required: 'กรุณาเลือกเวลา',
                            })}
                            error={errors.time?.message}
                        />
                    </motion.div>

                    <motion.div variants={fadeInVariants}>
                        <label className="block mb-2 font-medium text-text-main text-sm">
                            หมายเหตุเพิ่มเติม (ไม่บังคับ)
                        </label>
                        <textarea
                            {...register('notes')}
                            placeholder="ระบุรายละเอียดเพิ่มเติม..."
                            rows={4}
                            className="w-full py-4 px-5 rounded-xl border border-gray-200 bg-gray-50 outline-none transition-all duration-400 text-base focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 resize-none"
                        />
                    </motion.div>

                    <div className="mt-auto pt-6">
                        <Button type="submit" loading={loading}>
                            ดำเนินการต่อ
                        </Button>
                    </div>
                </motion.form>
            </div>
        </MobileContainer>
    );
}
