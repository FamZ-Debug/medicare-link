'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ButtonProps {
    children: ReactNode;
    variant?: 'primary' | 'outline';
    size?: 'sm' | 'md';
    fullWidth?: boolean;
    loading?: boolean;
    className?: string;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
    onClick?: () => void;
}

export default function Button({
    children,
    variant = 'primary',
    size = 'md',
    fullWidth = true,
    loading = false,
    className = '',
    disabled,
    type = 'button',
    onClick,
}: ButtonProps) {
    const baseClasses = `inline-flex items-center justify-center rounded-button font-bold transition-all duration-400 disabled:opacity-50 disabled:cursor-not-allowed ${
        size === 'sm' ? 'py-3 px-6 text-sm' : 'py-[1.125rem] px-8 text-lg'
    }`;

    const variantClasses = {
        primary: 'bg-primary-gradient text-white shadow-[0_10px_15px_-3px_rgba(20,184,166,0.3)]',
        outline: 'bg-transparent border-2 border-primary text-primary',
    };

    const widthClass = fullWidth ? 'w-full' : '';

    return (
        <motion.button
            className={`${baseClasses} ${variantClasses[variant]} ${widthClass} ${className}`}
            whileHover={!disabled && !loading ? { scale: 1.02, y: -2, boxShadow: variant === 'primary' ? '0 20px 25px -5px rgba(20, 184, 166, 0.4)' : undefined } : {}}
            whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
            disabled={disabled || loading}
            type={type}
            onClick={onClick}
        >
            {loading ? (
                <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>กำลังโหลด...</span>
                </div>
            ) : (
                children
            )}
        </motion.button>
    );
}
