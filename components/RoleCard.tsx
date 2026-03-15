'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface RoleCardProps {
    icon: ReactNode;
    title: string;
    description: string;
    href: string;
    iconBgColor?: string;
    delay?: number;
}

export default function RoleCard({
    icon,
    title,
    description,
    href,
    iconBgColor = 'bg-primary-light',
    delay = 0
}: RoleCardProps) {
    return (
        <Link href={href}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay, duration: 0.4 }}
                className="bg-white rounded-card p-6 shadow-[0_4px_6px_rgba(0,0,0,0.05)] flex items-center gap-4 transition-all duration-400 cursor-pointer border-2 border-transparent hover:border-primary hover:-translate-y-1 hover:shadow-[0_12px_20px_rgba(0,0,0,0.1)]"
            >
                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 text-3xl ${iconBgColor}`}>
                    {icon}
                </div>

                {/* Content */}
                <div className="flex-1">
                    <h3 className="text-lg font-bold mb-1">{title}</h3>
                    <p className="text-sm text-text-muted">{description}</p>
                </div>
            </motion.div>
        </Link>
    );
}
