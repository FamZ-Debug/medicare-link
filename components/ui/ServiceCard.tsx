'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

interface ServiceCardProps {
    icon: LucideIcon;
    title: string;
    color: 'teal' | 'rose' | 'blue' | 'amber' | 'purple';
    onClick?: () => void;
}

const colorClasses = {
    teal: 'bg-[#f0fdfa] text-[#0d9488]',
    rose: 'bg-[#fff1f2] text-[#e11d48]',
    blue: 'bg-[#eff6ff] text-[#2563eb]',
    amber: 'bg-[#fffbeb] text-[#d97706]',
    purple: 'bg-[#f5f3ff] text-[#7c3aed]',
};

export default function ServiceCard({ icon: Icon, title, color, onClick }: ServiceCardProps) {
    return (
        <motion.div
            onClick={onClick}
            className="bg-white p-6 rounded-3xl border border-gray-100 flex flex-col gap-4 cursor-pointer"
            whileHover={{ y: -5, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
        >
            <div className={`w-[52px] h-[52px] rounded-2xl flex items-center justify-center ${colorClasses[color]}`}>
                <Icon size={24} strokeWidth={2.5} />
            </div>
            <h3 className="text-base font-extrabold leading-tight">{title}</h3>
        </motion.div>
    );
}
