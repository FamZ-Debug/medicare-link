'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Activity, Bell, User, LayoutDashboard, Wallet, ShieldCheck, AlertTriangle } from 'lucide-react';
import { useUserStore } from '@/store/userStore';

export default function BottomNav() {
    const pathname = usePathname();
    const { user } = useUserStore();

    const userTabs = [
        { href: '/home', icon: Home, label: 'หน้าแรก' },
        { href: '/activity', icon: Activity, label: 'กิจกรรม' },
        { href: '/notifications', icon: Bell, label: 'แจ้งเตือน' },
        { href: '/profile', icon: User, label: 'โปรไฟล์' },
    ];

    const providerTabs = [
        { href: '/provider-dashboard', icon: LayoutDashboard, label: 'แดชบอร์ด' },
        { href: '/wallet', icon: Wallet, label: 'กระเป๋าเงิน' },
        { href: '/notifications', icon: Bell, label: 'แจ้งเตือน' },
        { href: '/profile', icon: User, label: 'โปรไฟล์' },
    ];

    const adminTabs = [
        { href: '/admin', icon: ShieldCheck, label: 'จัดการ' },
        { href: '/sos', icon: AlertTriangle, label: 'SOS' },
        { href: '/notifications', icon: Bell, label: 'แจ้งเตือน' },
        { href: '/profile', icon: User, label: 'โปรไฟล์' },
    ];

    let tabs = userTabs;
    if (user?.role === 'provider') tabs = providerTabs;
    if (user?.role === 'admin') tabs = adminTabs;

    return (
        <nav className="absolute bottom-0 left-0 right-0 h-[85px] flex justify-around items-center px-4 pb-4 border-t border-gray-100 z-[100] bg-white">
            {tabs.map(({ href, icon: Icon, label }) => {
                const isActive = pathname === href;

                return (
                    <Link
                        key={href}
                        href={href}
                        className={`flex flex-col items-center gap-1 text-xs font-semibold transition-colors duration-400 ${isActive ? 'text-primary' : 'text-text-muted'
                            }`}
                    >
                        <Icon size={24} strokeWidth={2} />
                        <span>{label}</span>
                    </Link>
                );
            })}
        </nav>
    );
}

const navItemsPlaceholder = []; // Not used anymore
