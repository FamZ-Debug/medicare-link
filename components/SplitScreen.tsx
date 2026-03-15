'use client';

import { ReactNode } from 'react';

interface SplitScreenProps {
    topContent: ReactNode;
    bottomContent: ReactNode;
    className?: string;
}

export default function SplitScreen({ topContent, bottomContent, className = '' }: SplitScreenProps) {
    return (
        <div className={`flex flex-col h-full ${className}`}>
            {/* Top Half - Teal Gradient Background */}
            <div className="flex-1 bg-primary-gradient flex flex-col items-center justify-center p-8 text-white">
                {topContent}
            </div>

            {/* Bottom Half - White Card with Rounded Top */}
            <div className="bg-white rounded-t-[2rem] p-8 shadow-[0_-10px_30px_rgba(0,0,0,0.1)]">
                {bottomContent}
            </div>
        </div>
    );
}
