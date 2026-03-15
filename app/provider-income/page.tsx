'use client';

import { useRouter } from 'next/navigation';
import MobileContainer from '@/components/MobileContainer';
import BottomNav from '@/components/BottomNav';
import IncomeHeader from '@/components/IncomeHeader';
import TransactionItem from '@/components/TransactionItem';

export default function ProviderIncomePage() {
    const router = useRouter();

    // Mock data
    const monthlyIncome = 12850;
    const withdrawn = 8200;
    const remaining = 4650;

    const transactions = [
        {
            date: 'วันนี้', items: [
                { title: 'รับเงินจากงาน', description: 'ดูแลผู้สูงอายุ - คุณสมชาย', amount: 450, type: 'income' as const },
                { title: 'รับเงินจากงาน', description: 'ตรวจสุขภาพ - คุณสมหญิง', amount: 800, type: 'income' as const },
            ]
        },
        {
            date: 'เมื่อวาน', items: [
                { title: 'ถอนเงิน', description: 'โอนเข้าบัญชี xxx-xxx-1234', amount: -3000, type: 'withdrawal' as const },
                { title: 'รับเงินจากงาน', description: 'ฟื้นฟูสมรรถภาพ - คุณวิชัย', amount: 1200, type: 'income' as const },
                { title: 'รับเงินจากงาน', description: 'ดูแลผู้ป่วยติดเตียง - คุณมานี', amount: 2500, type: 'income' as const },
            ]
        },
        {
            date: '2 วันที่แล้ว', items: [
                { title: 'ถอนเงิน', description: 'โอนเข้าบัญชี xxx-xxx-1234', amount: -5200, type: 'withdrawal' as const },
                { title: 'รับเงินจากงาน', description: 'ตรวจสุขภาพ - คุณประยุทธ์', amount: 650, type: 'income' as const },
            ]
        },
    ];

    return (
        <MobileContainer>
            {/* Header */}
            <div className="p-8 pb-4 bg-primary-gradient text-white">
                <button
                    onClick={() => router.back()}
                    className="bg-white/20 border-none text-white w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer mb-4"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
                <h1 className="text-2xl font-extrabold">รายได้และธุรกรรม</h1>
            </div>

            {/* Content */}
            <div className="p-8 pb-24 flex-1 overflow-y-auto">
                {/* Summary Card */}
                <div className="bg-primary-gradient rounded-card p-6 text-white shadow-[0_10px_20px_rgba(20,184,166,0.3)] mb-8">
                    <div className="text-[2.5rem] font-extrabold mb-2">
                        ฿{monthlyIncome.toLocaleString()}
                    </div>
                    <div className="text-sm opacity-90 mb-6">รายได้เดือนนี้</div>

                    <div className="flex gap-8 pt-4 border-t border-white/20">
                        <div className="flex-1">
                            <div className="text-2xl font-bold mb-1">฿{withdrawn.toLocaleString()}</div>
                            <div className="text-xs opacity-85">ถอนแล้ว</div>
                        </div>
                        <div className="flex-1">
                            <div className="text-2xl font-bold mb-1">฿{remaining.toLocaleString()}</div>
                            <div className="text-xs opacity-85">คงเหลือ</div>
                        </div>
                    </div>
                </div>

                {/* Transaction History */}
                <h2 className="text-lg font-bold mb-4">ประวัติธุรกรรม</h2>

                <div className="bg-white rounded-card overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
                    {transactions.map((group, groupIndex) => (
                        <div key={groupIndex}>
                            {/* Date Header */}
                            <div className="px-4 py-4 bg-gray-50 border-b border-gray-100">
                                <p className="text-sm font-semibold text-text-muted">{group.date}</p>
                            </div>

                            {/* Transactions */}
                            {group.items.map((transaction, itemIndex) => (
                                <TransactionItem key={itemIndex} {...transaction} />
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom Navigation */}
            <BottomNav />
        </MobileContainer>
    );
}
