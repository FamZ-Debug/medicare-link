'use client';

interface TransactionItemProps {
    title: string;
    description: string;
    amount: number;
    type: 'income' | 'withdrawal';
}

export default function TransactionItem({ title, description, amount, type }: TransactionItemProps) {
    return (
        <div className="px-4 py-4 border-b border-gray-100 last:border-b-0 flex justify-between items-center">
            {/* Info */}
            <div className="flex-1">
                <h4 className="text-[0.9375rem] font-semibold mb-1">{title}</h4>
                <p className="text-xs text-text-muted">{description}</p>
            </div>

            {/* Amount */}
            <div
                className={`text-lg font-bold ${type === 'income' ? 'text-green-700' : 'text-red-600'
                    }`}
            >
                {type === 'income' ? '+' : '-'}฿{Math.abs(amount).toLocaleString()}
            </div>
        </div>
    );
}
