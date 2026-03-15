'use client';

import { useState, useRef, KeyboardEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import MobileContainer from '@/components/MobileContainer';
import Button from '@/components/ui/Button';
import { fadeInVariants, staggerContainerVariants } from '@/utils/animations';

export default function VerifyPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [timer, setTimer] = useState(60);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const handleChange = (index: number, value: string) => {
        if (value.length > 1) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto-focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleSubmit = async () => {
        const otpValue = otp.join('');
        if (otpValue.length !== 6) return;

        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setLoading(false);
        router.push('/profile-setup');
    };

    const handleResend = () => {
        setTimer(60);
        // Simulate resend OTP
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
                        ยืนยันตัวตน
                    </h1>
                    <p className="text-base text-text-muted">
                        กรอกรหัส OTP ที่ส่งไปยัง<br />
                        <span className="font-semibold text-text-main">0XX-XXX-XXXX</span>
                    </p>
                </motion.div>

                {/* OTP Inputs */}
                <motion.div
                    className="flex gap-3 justify-center mb-8"
                    variants={staggerContainerVariants}
                    initial="initial"
                    animate="animate"
                >
                    {otp.map((digit, index) => (
                        <motion.input
                            key={index}
                            ref={(el) => { inputRefs.current[index] = el; }}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleChange(index, e.target.value.replace(/[^0-9]/g, ''))}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            className="w-14 h-14 text-center text-2xl font-bold border-2 border-gray-200 rounded-xl bg-gray-50 outline-none transition-all duration-400 focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10"
                            variants={fadeInVariants}
                        />
                    ))}
                </motion.div>

                {/* Timer */}
                <motion.p
                    className="text-center text-sm text-text-muted mb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                >
                    {timer > 0 ? (
                        <>ส่งรหัสอีกครั้งใน <span className="font-semibold text-primary">{timer} วินาที</span></>
                    ) : (
                        <button
                            onClick={handleResend}
                            className="text-primary font-semibold"
                        >
                            ส่งรหัสอีกครั้ง
                        </button>
                    )}
                </motion.p>

                {/* Submit Button */}
                <div className="mt-auto">
                    <Button
                        onClick={handleSubmit}
                        loading={loading}
                        disabled={otp.join('').length !== 6}
                    >
                        ยืนยัน
                    </Button>
                </div>
            </div>
        </MobileContainer>
    );
}
