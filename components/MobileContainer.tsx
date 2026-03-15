'use client';

import { ReactNode } from 'react';

interface MobileContainerProps {
    children: ReactNode;
    className?: string;
}

export default function MobileContainer({ children, className = '' }: MobileContainerProps) {
    return (
        <div className={`w-full max-w-[430px] h-screen max-h-[932px] bg-white relative overflow-hidden shadow-mobile md:rounded-[3rem] md:h-[90vh] flex flex-col ${className}`}>
            {children}
        </div>
    );
}
