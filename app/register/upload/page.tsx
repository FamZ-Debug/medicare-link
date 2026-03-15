'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Upload, FileCheck, X } from 'lucide-react';
import MobileContainer from '@/components/MobileContainer';
import Button from '@/components/ui/Button';
import { fadeInVariants, staggerContainerVariants } from '@/utils/animations';

export default function RegisterUploadPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const onSubmit = async () => {
        if (!file) return;
        setLoading(true);
        // Simulate upload
        await new Promise(resolve => setTimeout(resolve, 2000));
        setLoading(false);
        router.push('/verify');
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
                        อัปโหลดเอกสาร
                    </h1>
                    <p className="text-base text-text-muted">
                        กรุณาอัปโหลดรูปถ่ายบัตรประชาชนเพื่อยืนยันตัวตน
                    </p>
                </motion.div>

                <motion.div
                    className="flex-1 flex flex-col"
                    variants={staggerContainerVariants}
                    initial="initial"
                    animate="animate"
                >
                    <motion.div variants={fadeInVariants} className="flex-1 flex flex-col justify-center">
                        {!file ? (
                            <label className="border-2 border-dashed border-gray-200 rounded-3xl p-12 flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-primary transition-colors bg-gray-50/50">
                                <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                                <div className="w-20 h-20 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                                    <Upload size={32} />
                                </div>
                                <div className="text-center">
                                    <p className="font-bold text-text-main">เลือกรูปถ่าย</p>
                                    <p className="text-xs text-text-muted mt-1">ไฟล์ JPG, PNG (สูงสุด 5MB)</p>
                                </div>
                            </label>
                        ) : (
                            <div className="border-2 border-primary bg-primary/5 rounded-3xl p-8 flex flex-col items-center gap-4 relative">
                                <button 
                                    onClick={() => setFile(null)}
                                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-400"
                                >
                                    <X size={16} />
                                </button>
                                <div className="w-20 h-20 rounded-full bg-primary text-white flex items-center justify-center">
                                    <FileCheck size={32} />
                                </div>
                                <div className="text-center">
                                    <p className="font-bold text-text-main">{file.name}</p>
                                    <p className="text-xs text-primary mt-1 font-semibold">เลือกไฟล์สำเร็จแล้ว</p>
                                </div>
                            </div>
                        )}

                        <div className="mt-8 bg-amber-50 rounded-2xl p-4 border border-amber-100">
                            <p className="text-xs text-amber-700 leading-relaxed">
                                🔒 ข้อมูลของคุณจะถูกเก็บเป็นความลับและใช้เพื่อการยืนยันตัวตนเจ้าของบัญชีเท่านั้น
                            </p>
                        </div>
                    </motion.div>

                    <div className="mt-8">
                        <motion.div variants={fadeInVariants}>
                            <Button onClick={onSubmit} loading={loading} disabled={!file}>
                                ยืนยันและขอรับรหัส OTP
                            </Button>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </MobileContainer>
    );
}
