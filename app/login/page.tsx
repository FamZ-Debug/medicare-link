'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { ArrowLeft, Phone } from 'lucide-react';
import MobileContainer from '@/components/MobileContainer';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { LoginFormData } from '@/types';
import { fadeInVariants, staggerContainerVariants } from '@/utils/animations';
import Link from 'next/link';

export default function LoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();

    const onSubmit = async (data: LoginFormData) => {
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setLoading(false);
        router.push('/role-selection');
    };

    return (
        <MobileContainer>
            <div className="flex-1 flex flex-col p-8 pt-16">
                {/* Header */}
                <motion.div
                    className="mb-12"
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
                        เข้าสู่ระบบ
                    </h1>
                    <p className="text-base text-text-muted">
                        กรอกหมายเลขโทรศัพท์เพื่อเข้าใช้งาน
                    </p>
                </motion.div>

                {/* Form */}
                <motion.form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex-1 flex flex-col"
                    variants={staggerContainerVariants}
                    initial="initial"
                    animate="animate"
                >
                    <motion.div variants={fadeInVariants}>
                        <Input
                            label="หมายเลขโทรศัพท์"
                            type="tel"
                            placeholder="0XX-XXX-XXXX"
                            {...register('phoneNumber', {
                                required: 'กรุณากรอกหมายเลขโทรศัพท์',
                                pattern: {
                                    value: /^[0-9]{10}$/,
                                    message: 'กรุณากรอกหมายเลขโทรศัพท์ให้ถูกต้อง (10 หลัก)',
                                },
                            })}
                            error={errors.phoneNumber?.message}
                        />
                    </motion.div>

                    <div className="mt-auto">
                        <motion.div variants={fadeInVariants}>
                            <Button type="submit" loading={loading}>
                                ดำเนินการต่อ
                            </Button>
                        </motion.div>

                        <motion.p
                            className="text-center text-sm text-text-muted mt-6"
                            variants={fadeInVariants}
                        >
                            ยังไม่มีบัญชี?{' '}
                            <Link href="/register" className="text-primary font-semibold no-underline">
                                ลงทะเบียน
                            </Link>
                        </motion.p>
                    </div>
                </motion.form>
            </div>
        </MobileContainer>
    );
}
