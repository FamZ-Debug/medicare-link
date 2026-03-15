'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import MobileContainer from '@/components/MobileContainer';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { ProfileFormData } from '@/types';
import { fadeInVariants, staggerContainerVariants } from '@/utils/animations';
import { useUserStore } from '@/store/userStore';

export default function ProfileSetupPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<ProfileFormData>();
    const setUser = useUserStore((state) => state.setUser);

    const onSubmit = async (data: ProfileFormData) => {
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Set user data
        const pendingRole = (localStorage.getItem('pending_role') as any) || 'user';
        setUser({
            id: '1',
            fullName: 'คุณสมชาย ใจดี',
            phoneNumber: '0812345678',
            dateOfBirth: data.dateOfBirth,
            gender: data.gender,
            bloodType: data.bloodType,
            role: pendingRole,
            emergencyContact: {
                name: data.emergencyContactName,
                phoneNumber: data.emergencyContactPhone,
                relationship: data.emergencyContactRelation,
            },
        });

        setLoading(false);
        
        if (pendingRole === 'provider') {
            router.push('/provider-dashboard');
        } else {
            router.push('/patient-category');
        }
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
                        ข้อมูลส่วนตัว
                    </h1>
                    <p className="text-base text-text-muted">
                        กรอกข้อมูลเพื่อความปลอดภัยในการใช้บริการ
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
                            label="วันเกิด"
                            type="date"
                            {...register('dateOfBirth', {
                                required: 'กรุณาเลือกวันเกิด',
                            })}
                            error={errors.dateOfBirth?.message}
                        />
                    </motion.div>

                    <motion.div variants={fadeInVariants}>
                        <label className="block mb-2 font-medium text-text-main text-sm">
                            เพศ
                        </label>
                        <select
                            {...register('gender', { required: 'กรุณาเลือกเพศ' })}
                            className="w-full py-4 px-5 rounded-xl border border-gray-200 bg-gray-50 outline-none transition-all duration-400 text-base focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 mb-6"
                        >
                            <option value="">เลือกเพศ</option>
                            <option value="male">ชาย</option>
                            <option value="female">หญิง</option>
                            <option value="other">อื่นๆ</option>
                        </select>
                        {errors.gender && (
                            <p className="mt-2 text-sm text-red-500">{errors.gender.message}</p>
                        )}
                    </motion.div>

                    <motion.div variants={fadeInVariants}>
                        <Input
                            label="กรุ๊ปเลือด"
                            type="text"
                            placeholder="เช่น A, B, AB, O"
                            {...register('bloodType', {
                                required: 'กรุณากรอกกรุ๊ปเลือด',
                            })}
                            error={errors.bloodType?.message}
                        />
                    </motion.div>

                    <motion.div variants={fadeInVariants}>
                        <h3 className="text-lg font-bold text-text-main mb-4 mt-6">
                            ผู้ติดต่อฉุกเฉิน
                        </h3>
                    </motion.div>

                    <motion.div variants={fadeInVariants}>
                        <Input
                            label="ชื่อผู้ติดต่อ"
                            type="text"
                            placeholder="ชื่อ-นามสกุล"
                            {...register('emergencyContactName', {
                                required: 'กรุณากรอกชื่อผู้ติดต่อฉุกเฉิน',
                            })}
                            error={errors.emergencyContactName?.message}
                        />
                    </motion.div>

                    <motion.div variants={fadeInVariants}>
                        <Input
                            label="หมายเลขโทรศัพท์"
                            type="tel"
                            placeholder="0XX-XXX-XXXX"
                            {...register('emergencyContactPhone', {
                                required: 'กรุณากรอกหมายเลขโทรศัพท์',
                                pattern: {
                                    value: /^[0-9]{10}$/,
                                    message: 'กรุณากรอกหมายเลขโทรศัพท์ให้ถูกต้อง',
                                },
                            })}
                            error={errors.emergencyContactPhone?.message}
                        />
                    </motion.div>

                    <motion.div variants={fadeInVariants}>
                        <Input
                            label="ความสัมพันธ์"
                            type="text"
                            placeholder="เช่น พ่อ, แม่, พี่, น้อง"
                            {...register('emergencyContactRelation', {
                                required: 'กรุณากรอกความสัมพันธ์',
                            })}
                            error={errors.emergencyContactRelation?.message}
                        />
                    </motion.div>

                    <div className="mt-auto pt-6">
                        <Button type="submit" loading={loading}>
                            เสร็จสิ้น
                        </Button>
                    </div>
                </motion.form>
            </div>
        </MobileContainer>
    );
}
