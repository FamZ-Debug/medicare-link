'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { ArrowLeft, User as UserIcon, UserRound as ProviderIcon } from 'lucide-react';
import MobileContainer from '@/components/MobileContainer';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { RegisterFormData, UserRole } from '@/types';
import { fadeInVariants, staggerContainerVariants } from '@/utils/animations';
import Link from 'next/link';

interface ExtendedRegisterFormData extends RegisterFormData {
    role: UserRole;
}

export default function RegisterPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<ExtendedRegisterFormData>();

    const onSubmit = async (data: ExtendedRegisterFormData) => {
        if (!selectedRole) return;
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setLoading(false);
        
        // Save role to state/local (mock)
        localStorage.setItem('pending_role', selectedRole);
        
        if (selectedRole === 'provider') {
            router.push('/register/upload');
        } else {
            router.push('/verify');
        }
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
                        className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center mb-8 transition-colors hover:bg-gray-200"
                    >
                        <ArrowLeft size={20} />
                    </button>

                    <h1 className="text-4xl font-extrabold text-text-main mb-3 tracking-tight">
                        ลงทะเบียน
                    </h1>
                    <p className="text-base text-text-muted">
                        สร้างบัญชีใหม่เพื่อเริ่มใช้งาน
                    </p>
                </motion.div>

                <motion.form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex-1 flex flex-col pb-8"
                    variants={staggerContainerVariants}
                    initial="initial"
                    animate="animate"
                >
                    <motion.div variants={fadeInVariants} className="mb-6">
                        <label className="block text-sm font-bold text-text-main mb-3">คุณต้องการสมัครในฐานะใด?</label>
                        <div className="grid grid-cols-2 gap-4">
                            <div 
                                onClick={() => { setSelectedRole('user'); setValue('role', 'user'); }}
                                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col items-center gap-2 ${selectedRole === 'user' ? 'border-primary bg-primary/5' : 'border-gray-100 bg-white'}`}
                            >
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${selectedRole === 'user' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500'}`}>
                                    <UserIcon size={24} />
                                </div>
                                <span className={`font-bold text-sm ${selectedRole === 'user' ? 'text-primary' : 'text-gray-500'}`}>ลูกค้า (User)</span>
                            </div>
                            <div 
                                onClick={() => { setSelectedRole('provider'); setValue('role', 'provider'); }}
                                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col items-center gap-2 ${selectedRole === 'provider' ? 'border-primary bg-primary/5' : 'border-gray-100 bg-white'}`}
                            >
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${selectedRole === 'provider' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500'}`}>
                                    <ProviderIcon size={24} />
                                </div>
                                <span className={`font-bold text-sm ${selectedRole === 'provider' ? 'text-primary' : 'text-gray-500'}`}>ผู้ให้บริการ</span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div variants={fadeInVariants}>
                        <Input
                            label="ชื่อ-นามสกุล"
                            type="text"
                            placeholder="กรอกชื่อ-นามสกุล"
                            {...register('fullName', { required: 'กรุณากรอกชื่อ-นามสกุล' })}
                            error={errors.fullName?.message}
                        />
                    </motion.div>

                    <motion.div variants={fadeInVariants}>
                        <Input
                            label="หมายเลขโทรศัพท์"
                            type="tel"
                            placeholder="0XX-XXX-XXXX"
                            {...register('phoneNumber', { 
                                required: 'กรุณากรอกหมายเลขโทรศัพท์',
                                pattern: { value: /^[0-9]{10}$/, message: 'กรุณากรอกหมายเลขโทรศัพท์ให้ถูกต้อง' }
                            })}
                            error={errors.phoneNumber?.message}
                        />
                    </motion.div>

                    <motion.div variants={fadeInVariants}>
                        <Input
                            label="อีเมล (ไม่บังคับ)"
                            type="email"
                            placeholder="example@email.com"
                            {...register('email')}
                        />
                    </motion.div>

                    <div className="mt-8">
                        <motion.div variants={fadeInVariants}>
                            <Button type="submit" loading={loading} disabled={!selectedRole}>
                                ดำเนินการต่อ
                            </Button>
                        </motion.div>
                        <motion.p className="text-center text-sm text-text-muted mt-6" variants={fadeInVariants}>
                            มีบัญชีอยู่แล้ว? <Link href="/login" className="text-primary font-semibold no-underline">เข้าสู่ระบบ</Link>
                        </motion.p>
                    </div>
                </motion.form>
            </div>
        </MobileContainer>
    );
}
