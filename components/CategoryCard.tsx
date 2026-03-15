'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface CategoryCardProps {
    icon: ReactNode;
    title: string;
    description: string;
    href?: string;
    onClick?: () => void;
    iconBgColor?: string;
    delay?: number;
}

export default function CategoryCard({
    icon,
    title,
    description,
    href,
    onClick,
    iconBgColor = 'bg-primary-light',
    delay = 0
}: CategoryCardProps) {
    const content = (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileTap={{ scale: 0.98 }}
            transition={{ delay, duration: 0.4 }}
            className="bg-white rounded-card p-5 shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-all duration-400 cursor-pointer flex items-center gap-4 hover:-translate-y-1 hover:shadow-[0_8px_16px_rgba(0,0,0,0.12)]"
            onClick={onClick}
        >
            {/* Icon */}
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 text-2xl ${iconBgColor}`}>
                {icon}
            </div>

            {/* Content */}
            <div className="flex-1">
                <h3 className="text-base font-bold mb-1">{title}</h3>
                <p className="text-[0.8125rem] text-text-muted">{description}</p>
            </div>
        </motion.div>
    );

    if (href) {
        return <Link href={href} className="no-underline">{content}</Link>;
    }

    return content;
}
