'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Wallet, TrendingUp, History, ChevronRight, DollarSign, CheckCircle2 } from 'lucide-react';
import MobileContainer from '@/components/MobileContainer';
import Button from '@/components/ui/Button';

export default function WalletPage() {
    const router = useRouter();
    const [isWithdrawing, setIsWithdrawing] = useState(false);
    const [withdrawSuccess, setWithdrawSuccess] = useState(false);

    const transactions = [
        { id: 1, type: 'income', title: 'บริการเฝ้าไข้', date: 'วันนี้, 14:30', amount: 1200, status: 'completed' },
        { id: 2, type: 'income', title: 'พาไปหาหมอ', date: 'วันนี้, 10:15', amount: 450, status: 'completed' },
        { id: 3, type: 'withdraw', title: 'ถอนเงินเข้าธนาคาร', date: 'วานนี้', amount: -2000, status: 'completed' },
    ];

    const handleWithdraw = async () => {
        setIsWithdrawing(true);
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsWithdrawing(false);
        setWithdrawSuccess(true);
        setTimeout(() => setWithdrawSuccess(false), 3000);
    };

    return (
        <MobileContainer>
            <div className="flex-1 flex flex-col p-8 pt-16 overflow-y-auto">
                <header className="mb-8 flex items-center justify-between">
                    <button onClick={() => router.back()} className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                        <ArrowLeft size={20} />
                    </button>
                    <h2 className="text-xl font-extrabold text-text-main">กระเป๋าเงิน</h2>
                    <div className="w-10" />
                </header>

                {/* Balance Card */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-primary-gradient rounded-[2.5rem] p-8 text-white shadow-xl shadow-primary/20 mb-8"
                >
                    <p className="text-sm opacity-80 mb-2 font-bold">ยอดเงินที่ถอนได้</p>
                    <h1 className="text-5xl font-black mb-8 leading-none">฿1,650</h1>
                    <Button 
                        variant="outline" 
                        loading={isWithdrawing}
                        onClick={handleWithdraw}
                        className="bg-white/20 border-white/30 text-white hover:bg-white/30 py-4 text-base"
                    >
                        ถอนเงินเข้าบัญชี
                    </Button>
                </motion.div>

                {/* History */}
                <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-text-main">ประวัติรายการ</h3>
                        <History size={18} className="text-text-muted" />
                    </div>

                    <div className="flex flex-col gap-4">
                        {transactions.map((tx) => (
                            <div key={tx.id} className="bg-white p-4 rounded-3xl border border-gray-50 flex items-center justify-between shadow-sm">
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${tx.type === 'income' ? 'bg-teal-50 text-teal-600' : 'bg-rose-50 text-rose-600'}`}>
                                        {tx.type === 'income' ? <TrendingUp size={20} /> : <DollarSign size={20} />}
                                    </div>
                                    <div>
                                        <p className="font-bold text-text-main">{tx.title}</p>
                                        <p className="text-[10px] text-text-muted font-bold">{tx.date}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className={`font-black ${tx.type === 'income' ? 'text-teal-600' : 'text-rose-600'}`}>
                                        {tx.type === 'income' ? '+' : ''}{tx.amount.toLocaleString()}
                                    </p>
                                    <CheckCircle2 size={12} className="text-green-500 ml-auto mt-1" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Success Notification */}
                <AnimatePresence>
                    {withdrawSuccess && (
                        <motion.div 
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            className="fixed bottom-10 left-8 right-8 bg-green-500 text-white p-4 rounded-2xl shadow-2xl flex items-center gap-3 z-[2000]"
                        >
                            <CheckCircle2 size={24} />
                            <span className="font-bold">ส่งคำขอถอนเงินสำเร็จ! ระบบกำลังดำเนินการ</span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </MobileContainer>
    );
}
