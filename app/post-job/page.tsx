'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { ArrowLeft, Megaphone } from 'lucide-react';
import MobileContainer from '@/components/MobileContainer';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { fadeInVariants, staggerContainerVariants } from '@/utils/animations';
import { useBookingStore } from '@/store/bookingStore';
import { useHistoryStore } from '@/store/historyStore';

interface PostJobForm {
    title: string;
    budget: number;
    location: string;
    date: string;
    time: string;
    description: string;
}

export default function PostJobPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<PostJobForm>();
    const { booking, updateBooking } = useBookingStore();
    const addBooking = useHistoryStore((s) => s.addBooking);

    const onSubmit = async (data: PostJobForm) => {
        setLoading(true);
        updateBooking({
            location: data.location,
            date: data.date,
            time: data.time,
            notes: data.description,
            totalAmount: Number(data.budget),
        });
        await new Promise((r) => setTimeout(r, 1200));
        addBooking({
            ...booking,
            serviceTitle: data.title,
            location: data.location,
            date: data.date,
            time: data.time,
            notes: data.description,
            totalAmount: Number(data.budget),
            status: 'waiting',
            userId: booking.userId || 'me',
        });
        setLoading(false);
        router.push('/waiting');
    };

    return (
        <MobileContainer>
            <div className="flex-1 flex flex-col p-8 pt-16 overflow-y-auto">
                <motion.div className="mb-6" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                    <button onClick={() => router.back()} className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center mb-6">
                        <ArrowLeft size={20} />
                    </button>
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
                            <Megaphone size={24} />
                        </div>
                        <h1 className="text-3xl font-extrabold text-text-main tracking-tight">ฝากประกาศ</h1>
                    </div>
                    <p className="text-sm text-text-muted">กรอกรายละเอียดเพื่อให้ผู้ดูแลในระบบเสนอราคา</p>
                </motion.div>

                <motion.form onSubmit={handleSubmit(onSubmit)} variants={staggerContainerVariants} initial="initial" animate="animate" className="flex-1 flex flex-col">
                    <motion.div variants={fadeInVariants}>
                        <Input label="หัวข้องาน" placeholder="เช่น ต้องการพยาบาลเฝ้าไข้ผู้สูงอายุ"
                            {...register('title', { required: 'กรุณากรอกหัวข้อ' })}
                            error={errors.title?.message} />
                    </motion.div>
                    <motion.div variants={fadeInVariants}>
                        <Input label="งบประมาณ (บาท)" type="number" placeholder="1500"
                            {...register('budget', { required: 'กรุณากรอกงบประมาณ', min: { value: 100, message: 'ต้องมากกว่า 100 บาท' } })}
                            error={errors.budget?.message} />
                    </motion.div>
                    <motion.div variants={fadeInVariants}>
                        <Input label="สถานที่" placeholder="ที่อยู่หรือสถานที่"
                            {...register('location', { required: 'กรุณากรอกสถานที่' })}
                            error={errors.location?.message} />
                    </motion.div>
                    <motion.div variants={fadeInVariants}>
                        <Input label="วันที่" type="date"
                            {...register('date', { required: 'กรุณาเลือกวันที่' })}
                            error={errors.date?.message} />
                    </motion.div>
                    <motion.div variants={fadeInVariants}>
                        <Input label="เวลา" type="time"
                            {...register('time', { required: 'กรุณาเลือกเวลา' })}
                            error={errors.time?.message} />
                    </motion.div>
                    <motion.div variants={fadeInVariants}>
                        <label className="block mb-2 font-medium text-text-main text-sm">รายละเอียดงาน</label>
                        <textarea rows={4}
                            {...register('description', { required: 'กรุณาอธิบายรายละเอียด' })}
                            placeholder="อธิบายอาการ ความต้องการ และทักษะที่ผู้ดูแลควรมี"
                            className="w-full py-4 px-5 rounded-xl border border-gray-200 bg-gray-50 outline-none focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 resize-none mb-6" />
                        {errors.description && <p className="text-sm text-red-500 -mt-4 mb-4">{errors.description.message}</p>}
                    </motion.div>

                    <div className="mt-auto pt-4">
                        <Button type="submit" loading={loading}>ประกาศงานนี้</Button>
                    </div>
                </motion.form>
            </div>
        </MobileContainer>
    );
}
