'use client';

import { Heart } from 'lucide-react';
import Link from 'next/link';
import SplitScreen from '@/components/SplitScreen';
import MobileContainer from '@/components/MobileContainer';
import Button from '@/components/ui/Button';

export default function SplashPage() {
    const topContent = (
        <div className="flex flex-col items-center">
            {/* Logo */}
            <div className="w-[100px] h-[100px] bg-white rounded-card flex items-center justify-center mb-6 shadow-[0_10px_25px_rgba(0,0,0,0.15)]">
                <Heart className="w-[60px] h-[60px] text-primary" fill="currentColor" />
            </div>

            {/* Title */}
            <h1 className="text-[1.75rem] font-extrabold mb-2">MediCare Link</h1>
            <p className="text-[0.9375rem] opacity-95">ดูแลคนที่คุณรัก เหมือนครอบครัวของเรา</p>
        </div>
    );

    const bottomContent = (
        <div className="flex flex-col gap-4">
            {/* Login Button */}
            <Link href="/login">
                <Button variant="primary" fullWidth>
                    เข้าสู่ระบบ
                </Button>
            </Link>

            {/* Register Button */}
            <Link href="/register">
                <Button variant="outline" fullWidth>
                    ลงทะเบียนใหม่
                </Button>
            </Link>

            {/* Terms */}
            <div className="text-center mt-8">
                <p className="text-xs text-text-muted">
                    การใช้งานหมายถึงคุณยอมรับ{' '}
                    <a href="#" className="text-primary no-underline">
                        เงื่อนไขการให้บริการ
                    </a>
                </p>
            </div>
        </div>
    );

    return (
        <MobileContainer>
            <SplitScreen topContent={topContent} bottomContent={bottomContent} />
        </MobileContainer>
    );
}
