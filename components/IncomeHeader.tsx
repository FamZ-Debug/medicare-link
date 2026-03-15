'use client';

interface IncomeHeaderProps {
    todayIncome: number;
    completedTasks: number;
    rating: number;
}

export default function IncomeHeader({ todayIncome, completedTasks, rating }: IncomeHeaderProps) {
    return (
        <div className="bg-primary-gradient rounded-card p-6 text-white shadow-[0_10px_20px_rgba(20,184,166,0.3)]">
            {/* Income Amount */}
            <div className="text-[2.5rem] font-extrabold mb-2">
                ฿{todayIncome.toLocaleString()}
            </div>
            <div className="text-sm opacity-90 mb-6">รายได้วันนี้</div>

            {/* Stats Grid */}
            <div className="flex gap-8 pt-4 border-t border-white/20">
                <div className="flex-1">
                    <div className="text-2xl font-bold mb-1">{completedTasks}</div>
                    <div className="text-xs opacity-85">งานเสร็จสิ้น</div>
                </div>
                <div className="flex-1">
                    <div className="text-2xl font-bold mb-1">{rating} ⭐</div>
                    <div className="text-xs opacity-85">คะแนนเฉลี่ย</div>
                </div>
            </div>
        </div>
    );
}
