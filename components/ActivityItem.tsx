'use client';

interface ActivityItemProps {
    patientName: string;
    serviceType: string;
    location: string;
    time: string;
    status: 'completed' | 'pending';
}

export default function ActivityItem({ patientName, serviceType, location, time, status }: ActivityItemProps) {
    return (
        <div className="bg-white rounded-xl p-4 mb-3 shadow-[0_2px_4px_rgba(0,0,0,0.05)] flex justify-between items-center transition-all duration-400 hover:shadow-[0_4px_8px_rgba(0,0,0,0.1)]">
            {/* Info */}
            <div className="flex-1">
                <h4 className="text-[0.9375rem] font-bold mb-1">{patientName}</h4>
                <p className="text-[0.8125rem] text-text-muted">
                    {serviceType} • {location}
                </p>
            </div>

            {/* Meta */}
            <div className="text-right">
                <div className="text-xs text-text-muted mb-2">{time}</div>
                <span
                    className={`inline-block px-3 py-1 rounded-xl text-xs font-semibold ${status === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                >
                    {status === 'completed' ? 'เสร็จสิ้น' : 'กำลังดำเนินการ'}
                </span>
            </div>
        </div>
    );
}
