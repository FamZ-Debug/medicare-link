'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, CreditCard, Smartphone, Banknote, Check } from 'lucide-react';
import MobileContainer from '@/components/MobileContainer';
import Button from '@/components/ui/Button';
import { fadeInVariants, staggerContainerVariants } from '@/utils/animations';
import { useBookingStore } from '@/store/bookingStore';
import { PaymentMethod } from '@/types';

const paymentMethods = [
    { id: 'credit-card', icon: CreditCard, label: 'บัตรเครดิต/เดบิต' },
    { id: 'promptpay', icon: Smartphone, label: 'พร้อมเพย์' },
    { id: 'cash', icon: Banknote, label: 'เงินสด' },
];

export default function PaymentPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('promptpay');
    const { booking, updateBooking } = useBookingStore();

    const handlePayment = async () => {
        setLoading(true);
        updateBooking({ paymentMethod: selectedMethod });

        // Simulate payment processing
        await new Promise(resolve => setTimeout(resolve, 2000));
        setLoading(false);
        
        if (booking.mode === 'quick') {
            router.push('/tracking');
        } else {
            router.push('/success');
        }
    };

    return (
        <MobileContainer>
            <div className="flex-1 flex flex-col h-full bg-white overflow-hidden relative">
                {/* Header - Fixed */}
                <div className="p-8 pb-4 z-10 bg-white/90 backdrop-blur-md">
                    <button
                        onClick={() => router.back()}
                        className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center mb-6 hover:bg-gray-100 transition-all active:scale-90 shadow-sm"
                    >
                        <ArrowLeft size={20} className="text-text-main" />
                    </button>
                    <h1 className="text-3xl font-black text-text-main tracking-tight leading-none mb-2">ชำระเงิน</h1>
                    <p className="text-sm text-text-muted font-bold">สรุปรายการและเลือกช่องทางชำระเงิน</p>
                </div>

                {/* Body - Scrollable */}
                <div className="flex-1 overflow-y-auto px-8 pb-32">
                    <motion.div
                        variants={staggerContainerVariants}
                        initial="initial"
                        animate="animate"
                        className="space-y-8 py-4"
                    >
                        {/* Summary Card */}
                        <motion.div
                            variants={fadeInVariants}
                            className="bg-gray-50 rounded-[2.5rem] p-8 border border-gray-100 shadow-sm relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-2xl" />
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center">
                                        <Check size={18} className="text-primary" />
                                    </div>
                                    <span className="font-extrabold text-text-main">รายละเอียดบริการ</span>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex justify-between items-start gap-4">
                                        <span className="text-xs text-text-muted font-black uppercase tracking-wider">บริการ</span>
                                        <span className="text-sm font-black text-text-main text-right">{booking.serviceTitle || '-'}</span>
                                    </div>
                                    <div className="flex justify-between items-start gap-4">
                                        <span className="text-xs text-text-muted font-black uppercase tracking-wider">สถานที่</span>
                                        <span className="text-sm font-black text-text-main text-right max-w-[150px]">{booking.location || '-'}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs text-text-muted font-black uppercase tracking-wider">วัน-เวลา</span>
                                        <span className="text-sm font-black text-text-main">{booking.date} • {booking.time}</span>
                                    </div>

                                    <div className="pt-6 mt-2 border-t border-dashed border-gray-200">
                                        <div className="flex justify-between items-end">
                                            <div>
                                                <p className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-1 text-primary">ยอดรวมสุทธิ</p>
                                                <p className="text-4xl font-black text-text-main leading-none">฿{booking.totalAmount?.toLocaleString()}</p>
                                            </div>
                                            <div className="text-[10px] font-black text-teal-600 bg-teal-50 px-2.5 py-1 rounded-full uppercase">
                                                Paid via App
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Payment Selection */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-black text-text-main px-1">เลือกวิธีชำระเงิน</h3>
                            <div className="grid grid-cols-1 gap-3">
                                {paymentMethods.map((method) => {
                                    const isSelected = selectedMethod === method.id;
                                    return (
                                        <motion.button
                                            key={method.id}
                                            variants={fadeInVariants}
                                            onClick={() => setSelectedMethod(method.id as PaymentMethod)}
                                            className={`p-5 rounded-3xl border-2 transition-all duration-500 text-left relative overflow-hidden flex items-center justify-between ${
                                                isSelected 
                                                ? 'border-primary bg-primary/5 shadow-lg shadow-primary/5' 
                                                : 'border-gray-50 bg-white active:scale-95'
                                            }`}
                                        >
                                            <div className="flex items-center gap-4 relative z-10">
                                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                                                    isSelected ? 'bg-primary text-white' : 'bg-gray-50 text-text-muted'
                                                }`}>
                                                    <method.icon size={26} />
                                                </div>
                                                <div>
                                                    <p className={`font-black text-base transition-colors ${isSelected ? 'text-primary' : 'text-text-main'}`}>
                                                        {method.label}
                                                    </p>
                                                    <p className="text-[10px] font-black text-text-muted mt-0.5 opacity-60">
                                                        {method.id === 'promptpay' && 'สแกน QR Code เพื่อชำระทันที'}
                                                        {method.id === 'credit-card' && 'บัตรเครดิต หรือ บัตรเดบิต'}
                                                        {method.id === 'cash' && 'ชำระที่หน้างานหลังได้รับบริการ'}
                                                    </p>
                                                </div>
                                            </div>
                                            {isSelected && (
                                                <motion.div 
                                                    layoutId="payment-active"
                                                    className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white shadow-md z-10"
                                                >
                                                    <Check size={18} strokeWidth={3} />
                                                </motion.div>
                                            )}
                                        </motion.button>
                                    );
                                })}
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Footer - Fixed */}
                <div className="p-8 pb-10 z-20 bg-white border-t border-gray-100 flex flex-col gap-4">
                    <div className="flex justify-between items-center px-2">
                        <div>
                            <p className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-0.5">ยอดรวมทั้งหมด</p>
                            <p className="text-2xl font-black text-text-main">฿{booking.totalAmount?.toLocaleString()}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-0.5">ช่องทางชำระ</p>
                            <p className="text-sm font-black text-primary">{paymentMethods.find(m => m.id === selectedMethod)?.label}</p>
                        </div>
                    </div>
                    <Button 
                        onClick={handlePayment} 
                        loading={loading}
                        className="h-16 text-lg font-black rounded-2xl shadow-xl shadow-primary/20"
                    >
                        ชำระเงินและจองเลย
                    </Button>
                </div>
            </div>
        </MobileContainer>
    );
}
