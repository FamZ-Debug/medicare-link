'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Search, MapPin } from 'lucide-react';
import MobileContainer from '@/components/MobileContainer';
import Button from '@/components/ui/Button';
import { useBookingStore } from '@/store/bookingStore';

const provincesByRegion: Record<string, string[]> = {
    'ภาคกลาง': ['กรุงเทพมหานคร', 'นนทบุรี', 'ปทุมธานี', 'พระนครศรีอยุธยา', 'สระบุรี', 'สมุทรปราการ', 'นครปฐม', 'ราชบุรี'],
    'ภาคเหนือ': ['เชียงใหม่', 'เชียงราย', 'ลำปาง', 'ลำพูน', 'แม่ฮ่องสอน', 'น่าน', 'พะเยา', 'แพร่'],
    'ภาคใต้': ['ภูเก็ต', 'สุราษฎร์ธานี', 'สงขลา', 'นครศรีธรรมราช', 'กระบี่', 'พังงา', 'ตรัง', 'ชุมพร'],
    'ภาคอีสาน': ['ขอนแก่น', 'นครราชสีมา', 'อุดรธานี', 'อุบลราชธานี', 'บุรีรัมย์', 'ร้อยเอ็ด', 'สุรินทร์', 'ศรีสะเกษ'],
    'ภาคตะวันออก': ['ชลบุรี', 'ระยอง', 'จันทบุรี', 'ตราด', 'ฉะเชิงเทรา', 'ปราจีนบุรี', 'สระแก้ว'],
    'ภาคตะวันตก': ['กาญจนบุรี', 'ตาก', 'ประจวบคีรีขันธ์', 'เพชรบุรี'],
};

export default function ProvinceSelectionPage() {
    const router = useRouter();
    const { booking, updateBooking } = useBookingStore();
    const [query, setQuery] = useState('');
    const [selected, setSelected] = useState('');

    const provinces = useMemo(() => {
        const list = booking.region ? provincesByRegion[booking.region] || [] : Object.values(provincesByRegion).flat();
        if (!query) return list;
        return list.filter((p) => p.includes(query));
    }, [booking.region, query]);

    const handleNext = () => {
        if (!selected) return;
        updateBooking({ province: selected });
        router.push('/booking-mode');
    };

    return (
        <MobileContainer>
            <div className="flex-1 flex flex-col p-8 pt-16 overflow-y-auto">
                <motion.div className="mb-6" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                    <button onClick={() => router.back()} className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center mb-8">
                        <ArrowLeft size={20} />
                    </button>
                    <h1 className="text-4xl font-extrabold text-text-main mb-3 tracking-tight">เลือกจังหวัด</h1>
                    <p className="text-base text-text-muted">{booking.region || 'เลือกจังหวัดที่ต้องการรับบริการ'}</p>
                </motion.div>

                <div className="mb-6 relative">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="ค้นหาจังหวัด..."
                        className="w-full py-4 pl-12 pr-5 rounded-xl border border-gray-200 bg-gray-50 outline-none focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10"
                    />
                </div>

                <div className="flex-1 flex flex-col gap-2 pb-6">
                    {provinces.map((p) => (
                        <div
                            key={p}
                            onClick={() => setSelected(p)}
                            className={`p-4 rounded-2xl border-2 cursor-pointer flex items-center justify-between transition-all ${
                                selected === p ? 'border-primary bg-primary/5 text-primary' : 'border-gray-100 bg-white'
                            }`}
                        >
                            <span className="font-bold">{p}</span>
                            <MapPin size={18} className={selected === p ? 'opacity-100' : 'opacity-20'} />
                        </div>
                    ))}
                    {provinces.length === 0 && (
                        <p className="text-center text-text-muted py-8">ไม่พบจังหวัดที่ค้นหา</p>
                    )}
                </div>

                <div className="pt-4">
                    <Button onClick={handleNext} disabled={!selected}>ถัดไป</Button>
                </div>
            </div>
        </MobileContainer>
    );
}
