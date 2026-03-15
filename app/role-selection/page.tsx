'use client';

import { User, Activity, Shield } from 'lucide-react';
import MobileContainer from '@/components/MobileContainer';
import RoleCard from '@/components/RoleCard';
import { useRouter } from 'next/navigation';

export default function RoleSelectionPage() {
    const router = useRouter();

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
                <h1 className="text-2xl font-extrabold">เลือกบทบาทของคุณ</h1>
            </div>

            {/* Content */}
            <div className="p-8 flex-1 overflow-y-auto">
                <div className="flex flex-col gap-4">
                    {/* User Role */}
                    <RoleCard
                        icon={<User className="w-8 h-8 text-primary" />}
                        title="ลูกค้า (User)"
                        description="สำหรับผู้ใช้บริการและครอบครัว"
                        href="/patient-category"
                        iconBgColor="bg-primary-light"
                        delay={0}
                    />

                    {/* Provider Role */}
                    <RoleCard
                        icon={<Activity className="w-8 h-8 text-blue-600" />}
                        title="ผู้ให้บริการ (Provider)"
                        description="สำหรับแพทย์ พยาบาล และผู้ดูแล"
                        href="/provider-dashboard"
                        iconBgColor="bg-blue-50"
                        delay={0.1}
                    />

                    {/* Admin Role */}
                    <RoleCard
                        icon={<Shield className="w-8 h-8 text-purple-600" />}
                        title="ผู้ดูแลระบบ (Admin)"
                        description="สำหรับผู้จัดการระบบ"
                        href="/admin"
                        iconBgColor="bg-purple-50"
                        delay={0.2}
                    />
                </div>
            </div>
        </MobileContainer>
    );
}
